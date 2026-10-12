"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { PanelId } from "@/lib/dashboard";

export type MascotActivity = "crafting" | "idle" | "walking" | "returning" | "grabbed";
type Point = { x:number; y:number };
type Controller = {
  grab:()=>Point; drag:(point:Point)=>void; release:()=>void;
  pause:(paused:boolean)=>void; home:()=>void;
  interact:()=>void;
};
const sets = {crafting:{name:"craft",count:6,step:.4},idle:{name:"rest",count:4,step:1},walking:{name:"walk",count:3,step:.22},returning:{name:"walk",count:3,step:.22},grabbed:{name:"struggle",count:3,step:.16}};

export default function ForgeMascot({paused,onOpen,onActivityChange,onNearbyChange,onInteract}:{paused:boolean;onOpen:()=>void;onActivityChange:(activity:MascotActivity)=>void;onNearbyChange:(id:PanelId|null)=>void;onInteract:(id:PanelId)=>void}) {
  const button=useRef<HTMLButtonElement>(null);
  const controller=useRef<Controller|null>(null);
  const pointer=useRef<{id:number;x:number;y:number;start:Point;dragged:boolean}|null>(null);
  const suppressClick=useRef(false);
  const pausedRef=useRef(paused);
  const interactRef=useRef(onInteract);
  useEffect(()=>{interactRef.current=onInteract;},[onInteract]);
  const [activity,setActivity]=useState<MascotActivity>("crafting");
  const [facingRight,setFacingRight]=useState(false);
  const help=useId();

  useEffect(()=>{
    const node=button.current;
    if(!node || !node.parentElement)return;
    const room=node.parentElement;
    // Warm the alternate pose cache before the first grab or spontaneous walk.
    for(const name of ["walk","struggle","rest"])for(let frame=0;frame<(name==="rest"?4:3);frame++){
      const preload=new window.Image();preload.src=`/forge/mascot-${name}-${frame}.webp`;
    }
    const reduce=matchMedia("(prefers-reduced-motion: reduce)");
    let alive=true,position:Point={x:0,y:0},motion:Animation|null=null;
    let timer:ReturnType<typeof setTimeout>|undefined,task:(()=>void)|null=null;
    let remaining=0,due=0,blocked=false;
    const desktop=matchMedia("(min-width:1024px) and (hover:hover) and (pointer:fine)");
    const keys=new Set<string>();
    let keyboard=false,frame=0,lastTime=0,nearby:PanelId|null=null;
    const findNearby=()=>{
      let closest:PanelId|null=null,best=Infinity;
      if(desktop.matches && keyboard){
        const cat=node.getBoundingClientRect();
        const x=cat.left+cat.width*.6,y=cat.top+cat.height*.7;
        for(const item of room.querySelectorAll<HTMLElement>('[data-item]')){
          const rect=item.getBoundingClientRect();
          const distance=Math.hypot(rect.left+22-x,rect.top+14-y);
          if(distance<cat.width*.32+24 && distance<best){best=distance;closest=item.dataset.item as PanelId;}
        }
      }
      if(!keyboard)delete node.dataset.manual;
      if(closest!==nearby){nearby=closest;onNearbyChange(closest);}
    };
    const change=(next:MascotActivity)=>{if(alive){setActivity(next);onActivityChange(next);}};
    const stopTimer=()=>{clearTimeout(timer);timer=undefined;};
    const arm=()=>{
      if(!blocked && task){due=performance.now()+remaining;timer=setTimeout(()=>{const run=task;task=null;timer=undefined;run?.();},remaining);}
    };
    const later=(delay:number,next:()=>void)=>{stopTimer();remaining=delay;task=next;arm();};
    const freeze=()=>{
      if(motion){const matrix=new DOMMatrixReadOnly(getComputedStyle(node).transform);position={x:matrix.m41,y:matrix.m42};motion.onfinish=null;motion.cancel();motion=null;}
      node.style.transform=`translate(${position.x}px,${position.y}px)`;
    };
    const bounds=(point:Point)=>{
      // Ignore only transparent sprite padding; keep ears, feet and tail inside the room.
      const size=node.offsetWidth,left=node.offsetLeft,top=node.offsetTop;
      return {x:Math.max(-left-size*.06,Math.min(room.clientWidth-left-size*.98,point.x)),y:Math.max(-top-size*.06,Math.min(room.clientHeight-top-size*.98,point.y))};
    };
    const move=(target:Point,next:()=>void)=>{
      freeze();target=bounds(target);
      setFacingRight(target.x>position.x+1);
      const distance=Math.hypot(target.x-position.x,target.y-position.y);
      const duration=reduce.matches?0:Math.max(1800,Math.min(6500,distance/55*1000));
      motion=node.animate([{transform:`translate(${position.x}px,${position.y}px)`},{transform:`translate(${target.x}px,${target.y}px)`}],{duration,easing:"cubic-bezier(.77,0,.175,1)",fill:"forwards"});
      motion.onfinish=()=>{position=target;node.style.transform=`translate(${target.x}px,${target.y}px)`;motion?.cancel();motion=null;if(alive)next();};
      if(blocked)motion.pause();
    };
    const work=()=>{setFacingRight(false);change("crafting");if(!reduce.matches)later(12000+Math.random()*10000,rest);};
    const home=()=>{keyboard=false;keys.clear();findNearby();stopTimer();task=null;change("returning");move({x:0,y:0},work);};
    const wander=()=>{
      if(reduce.matches)return;
      change("walking");
      const size=node.offsetWidth;
      const footX=node.offsetLeft+size*.6,footY=node.offsetTop+size*.967;
      const target={x:room.clientWidth*(.22+Math.random()*.56)-footX,y:room.clientHeight*(.8+Math.random()*.1)-footY};
      move(target,()=>{change("idle");later(2500+Math.random()*3000,home);});
    };
    const rest=()=>{change("idle");later(3000+Math.random()*2500,wander);};
    const api:Controller={
      grab:()=>{keyboard=false;keys.clear();findNearby();stopTimer();task=null;freeze();change("grabbed");return {...position};},
      drag:(point)=>{position=bounds(point);node.style.transform=`translate(${position.x}px,${position.y}px)`;},
      release:()=>{change("idle");later(reduce.matches?0:650,home);},
      home,
      interact:()=>{if(keyboard && nearby && !blocked)interactRef.current(nearby);},
      pause:(pausedNow)=>{
        if(pausedNow===blocked)return;blocked=pausedNow;
        if(blocked){keys.clear();if(keyboard)change("idle");if(timer){remaining=Math.max(0,due-performance.now());stopTimer();}motion?.pause();}
        else {motion?.play();arm();}
      },
    };
    controller.current=api;
    node.dataset.ready="true";
    const reset=()=>{keyboard=false;keys.clear();findNearby();stopTimer();task=null;freeze();position={x:0,y:0};node.style.transform="translate(0px,0px)";work();};
    const resize=new ResizeObserver(reset);resize.observe(room);
    const visibility=()=>api.pause(document.hidden || pausedRef.current);
    document.addEventListener("visibilitychange",visibility);
    reduce.addEventListener("change",reset);
    const editable=(target:EventTarget|null)=>target instanceof HTMLElement && !!target.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]');
    const down=(event:KeyboardEvent)=>{
      if(!desktop.matches || blocked || document.hidden || pointer.current || event.ctrlKey || event.altKey || event.metaKey || editable(event.target))return;
      const key=event.key.toLowerCase();
      if(["w","a","s","d"].includes(key)){
        event.preventDefault();
        if(!keyboard){keyboard=true;stopTimer();task=null;freeze();}
        node.dataset.manual="true";
        node.focus({preventScroll:true});
        keys.add(key);change("walking");findNearby();
      }else if(event.key==="Enter" && keyboard){
        // Preserve Enter on ordinary links and controls; the cat itself uses proximity.
        if(event.target instanceof HTMLElement && event.target.closest('button,a,[role="button"]')!==node && event.target.closest('button,a,[role="button"]'))return;
        event.preventDefault();event.stopPropagation();keys.clear();change("idle");
        if(nearby && !event.repeat)interactRef.current(nearby);
      }else if(event.key==="Escape" && keyboard){event.preventDefault();event.stopPropagation();home();}
    };
    const up=(event:KeyboardEvent)=>{keys.delete(event.key.toLowerCase());if(keyboard && keys.size===0)change("idle");};
    const blur=()=>{keys.clear();if(keyboard)change("idle");};
    const tick=(now:number)=>{
      const dt=lastTime?Math.min((now-lastTime)/1000,.05):0;lastTime=now;
      if(keyboard && !blocked && !document.hidden && desktop.matches && keys.size){
        const dx=Number(keys.has("d"))-Number(keys.has("a")),dy=Number(keys.has("s"))-Number(keys.has("w"));
        const length=Math.hypot(dx,dy);
        if(length){position=bounds({x:position.x+dx/length*190*dt,y:position.y+dy/length*190*dt});node.style.transform=`translate(${position.x}px,${position.y}px)`;if(dx)setFacingRight(dx>0);findNearby();}
      }
      frame=requestAnimationFrame(tick);
    };
    const desktopChange=()=>{if(!desktop.matches && keyboard)reset();};
    desktop.addEventListener("change",desktopChange);
    window.addEventListener("keydown",down,true);window.addEventListener("keyup",up);window.addEventListener("blur",blur);
    frame=requestAnimationFrame(tick);
    work();
    return()=>{alive=false;cancelAnimationFrame(frame);window.removeEventListener("keydown",down,true);window.removeEventListener("keyup",up);window.removeEventListener("blur",blur);desktop.removeEventListener("change",desktopChange);stopTimer();motion?.cancel();resize.disconnect();reduce.removeEventListener("change",reset);document.removeEventListener("visibilitychange",visibility);controller.current=null;delete node.dataset.ready;};
  },[onActivityChange,onNearbyChange]);

  useEffect(()=>{pausedRef.current=paused;controller.current?.pause(paused || document.hidden);},[paused]);
  const sprite=sets[activity];
  const finishPointer=(id:number)=>{
    const current=pointer.current;if(!current || current.id!==id)return;
    pointer.current=null;
    if(current.dragged){suppressClick.current=true;controller.current?.release();}
  };
  return <>
    <button ref={button} type="button" className="forge-mascot" data-activity={activity} aria-label="meet ron — character profile" aria-describedby={help} title="Drag me around · click to meet Ron"
      onPointerDown={event=>{
        if(event.button!==0 || paused || pointer.current)return;
        suppressClick.current=false;
        event.stopPropagation();
        const start=controller.current?.grab()??{x:0,y:0};
        pointer.current={id:event.pointerId,x:event.clientX,y:event.clientY,start,dragged:false};
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event=>{
        const current=pointer.current;if(!current || current.id!==event.pointerId)return;
        const dx=event.clientX-current.x,dy=event.clientY-current.y;
        if(Math.hypot(dx,dy)>6)current.dragged=true;
        if(current.dragged)controller.current?.drag({x:current.start.x+dx,y:current.start.y+dy});
      }}
      onPointerUp={event=>{const dragged=pointer.current?.dragged;finishPointer(event.pointerId);if(!dragged)controller.current?.release();}}
      onPointerCancel={event=>{finishPointer(event.pointerId);suppressClick.current=false;controller.current?.release();}}
      onLostPointerCapture={event=>finishPointer(event.pointerId)}
      onClick={event=>{
        // Browsers and assistive technology can synthesize a button click from Enter.
        // In WASD mode it must use the nearby item, never the cat's About shortcut.
        if(event.detail===0 && event.currentTarget.dataset.manual==="true"){controller.current?.interact();return;}
        if(event.detail!==0 && suppressClick.current){suppressClick.current=false;return;}
        suppressClick.current=false;onOpen();
      }}
      onKeyDown={event=>{if(event.key==="Escape"){event.preventDefault();const current=pointer.current;pointer.current=null;if(current && event.currentTarget.hasPointerCapture(current.id))event.currentTarget.releasePointerCapture(current.id);controller.current?.home();}}}
    >
      <span className="forge-mascot-facing" data-right={facingRight || undefined}>
        <span key={activity} className="forge-mascot-idle" aria-hidden="true">
          {Array.from({length:sprite.count},(_,frame)=><Image key={frame} src={`/forge/mascot-${sprite.name}-${frame}.webp`} alt="" fill sizes="(max-width:640px) 390px, 520px" unoptimized loading="eager" draggable={false} className="forge-mascot-frame" style={{"--sprite-cycle":`${sprite.count*sprite.step}s`,animationDelay:`${frame===0?0:(frame-sprite.count)*sprite.step}s`} as CSSProperties} />)}
        </span>
      </span>
    </button>
    <span id={help} className="sr-only">Drag the blacksmith to pick him up. Release to let him return to work. On desktop, use WASD to move and Enter near an item to open its panel. Escape returns him to work. Clicking the cat opens About.</span>
  </>;
}

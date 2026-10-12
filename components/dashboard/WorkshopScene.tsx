"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Panel, PanelId } from "@/lib/dashboard";
import { completeRoom, panoramicRoom } from "@/lib/forge-scene";
import { identity } from "@/lib/site";
import Typewriter from "@/components/dashboard/Typewriter";
import ForgeEffects from "@/components/dashboard/ForgeEffects";
import ForgeMascot, { type MascotActivity } from "@/components/dashboard/ForgeMascot";

export default function WorkshopScene({ panels, focused, onOpen, paused=false }: {
  panels: Panel[]; focused: PanelId | null; onOpen: (id: PanelId) => void; paused?:boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [panoramic, setPanoramic] = useState(false);
  const [hovered, setHovered] = useState<PanelId | null>(null);
  const [activity,setActivity]=useState<MascotActivity>("crafting");
  const [nearby,setNearby]=useState<PanelId|null>(null);
  useEffect(()=>{
    if (!stage.current) return;
    const observer = new ResizeObserver(([entry])=>{
      setPanoramic(entry.contentRect.width >= 1024 && entry.contentRect.width / entry.contentRect.height >= 2.45);
    });
    observer.observe(stage.current);
    return ()=>observer.disconnect();
  },[]);
  const art = panoramic ? panoramicRoom : completeRoom;
  const craft = panoramic ? {x:527,y:213} : {x:905,y:562};
  return (
    <div ref={stage} className="workshop-stage">
      <div className="workshop-room" data-composition={panoramic ? "panoramic" : "standard"} data-mascot={activity} data-nearby={nearby ?? undefined} style={{"--scene-ratio":art.width/art.height,"--craft-x":craft.x/art.width-.5,"--craft-y":craft.y/art.height-.5} as CSSProperties}>
        <Image src={art.src} alt="The complete cozy blacksmith workshop, with a quest board, full workbench, satchel, glowing forge, anvil, bookcase, tool rack, and treasure chest." fill sizes="100vw" unoptimized loading="eager" className="workshop-art" />
        <Image src={panoramic?"/forge/workshop-panorama-night.webp":"/forge/workshop-complete-night.webp"} alt="" aria-hidden="true" fill sizes="100vw" unoptimized loading="eager" className="workshop-art workshop-art-night" />
        <ForgeEffects art={art} />
        <svg className="workshop-outlines" viewBox={`0 0 ${art.width} ${art.height}`} aria-hidden="true">
          {art.objects.map(({id,contour})=><path key={id} d={contour} data-active={hovered===id || focused===id || nearby===id || undefined} vectorEffect="non-scaling-stroke" onPointerEnter={()=>setHovered(id)} onPointerLeave={()=>setHovered(null)} onClick={()=>onOpen(id)} />)}
        </svg>
        {art.objects.map(({id,object,x,y})=>{
          const panel=panels.find(p=>p.id===id)!;
          return <button key={id} type="button" className="workshop-hotspot" data-item={id} data-highlight={focused===id || hovered===id || nearby===id || undefined} style={{left:`calc(50% + var(--scene-width) * ${x/art.width-.5} - 22px)`,top:`calc(50% + var(--scene-height) * ${y/art.height-.5} - 14px)`}} onPointerEnter={()=>setHovered(id)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(id)} onBlur={()=>setHovered(null)} onClick={()=>onOpen(id)} aria-label={`${panel.label} — ${object}`}>
            <span className="hotspot-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" /></svg></span>
            <span className="hotspot-caption"><strong>{panel.label}</strong><span>{object}</span></span>
          </button>;
        })}
        <svg className="forge-crafting" viewBox="0 0 80 60" aria-hidden="true">
          <path className="forge-workpiece" d="M22 40 51 37 61 42 33 46Z" fill="#ffc060" stroke="#9b481e" strokeWidth="2" />
          <g className="forge-impact" fill="none" stroke="#ffe59b" strokeWidth="2.5" strokeLinecap="round">
            <path d="m39 37-11-13m16 12 1-19m4 21 14-10m-30 11-17-2m37 7 16 4" />
            <circle cx="24" cy="18" r="1" /><circle cx="62" cy="20" r="1.5" />
          </g>
        </svg>
        <ForgeMascot paused={paused} onOpen={()=>onOpen("about")} onActivityChange={setActivity} onNearbyChange={setNearby} onInteract={onOpen} />
        <div className="forge-pc-controls" role="status"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move</span><span>{nearby ? <><kbd>Enter</kbd> {panels.find(p=>p.id===nearby)?.label}</> : <>walk near an item · <kbd>Enter</kbd> interact</>}</span><span><kbd>Esc</kbd> back to work</span></div>
        <div className="forge-greeting">
          <h1>Ron Paragoso</h1>
          <p className="forge-role">{identity.greeting} a <Typewriter words={identity.roles} /></p>
          <p className="forge-statement">{identity.statement}</p>
        </div>
      </div>
    </div>
  );
}

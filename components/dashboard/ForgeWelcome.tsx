"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const lines = [
  "Hi, I’m Ron Paragoso. Welcome to The Forge!",
  "I’ll be working here, so feel free to look around and enjoy your visit.",
];
let completed = false;
export function welcomeSnapshot() {
  try { return !completed && sessionStorage.getItem("forge-welcome") !== "done"; }
  catch { return !completed; }
}
export function subscribeWelcome(callback:()=>void) {
  window.addEventListener("forge-welcome-done",callback);
  return ()=>window.removeEventListener("forge-welcome-done",callback);
}
export function welcomeServerSnapshot() { return true; }
function finish() {
  completed=true;
  try { sessionStorage.setItem("forge-welcome","done"); } catch { /* Still dismiss when storage is unavailable. */ }
  window.dispatchEvent(new Event("forge-welcome-done"));
  requestAnimationFrame(()=>document.querySelector<HTMLElement>('.forge-dock [data-panel="about"]')?.focus({preventScroll:true}));
}

export default function ForgeWelcome() {
  const [step,setStep]=useState(0);
  const next=useRef<HTMLButtonElement>(null);
  useEffect(()=>{next.current?.focus({preventScroll:true});},[]);
  const advance=()=>{if(step===lines.length-1)finish();else setStep(step+1);};
  return <div className="forge-welcome" role="dialog" aria-modal="true" aria-label="Welcome to The Forge" onClick={advance}
    onKeyDown={event=>{
      if(event.key==="Escape"){event.preventDefault();finish();}
      if(event.key==="Tab"){
        const buttons=event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
        if(event.shiftKey && document.activeElement===buttons[0]){event.preventDefault();buttons[1].focus();}
        else if(!event.shiftKey && document.activeElement===buttons[1]){event.preventDefault();buttons[0].focus();}
      }
    }}>
    <button type="button" className="forge-welcome-skip" onClick={event=>{event.stopPropagation();finish();}}>Skip introduction</button>
    <div className="forge-welcome-scene">
      <Image src="/forge/mascot.webp" alt="Ron’s cheerful orange cat blacksmith, looking at you" width={800} height={800} priority className="forge-welcome-cat" />
      <div className="forge-welcome-bubble">
        <span className="forge-welcome-name">Ron Paragoso <span aria-hidden="true">✦</span></span>
        <p key={step} aria-live="polite" aria-atomic="true">{lines[step]}</p>
        <div className="forge-welcome-footer"><span>{step+1} / {lines.length} · click anywhere to continue</span>
          <button ref={next} type="button" onClick={event=>{event.stopPropagation();advance();}}>{step===lines.length-1?"Explore The Forge":"Continue"} <span aria-hidden="true">▸</span></button>
        </div>
      </div>
    </div>
  </div>;
}

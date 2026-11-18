"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
function finish(focusAbout=true) {
  completed=true;
  try { sessionStorage.setItem("forge-welcome","done"); } catch { /* Still dismiss when storage is unavailable. */ }
  window.dispatchEvent(new Event("forge-welcome-done"));
  if (focusAbout) requestAnimationFrame(()=>document.querySelector<HTMLElement>('.forge-dock [data-panel="about"]')?.focus({preventScroll:true}));
}

/**
 * One line and two choices: most visitors are here to see the work, so that
 * is the first thing offered; looking around the workshop is the other.
 */
export default function ForgeWelcome({ onSeeWork }: { onSeeWork: () => void }) {
  const primary=useRef<HTMLButtonElement>(null);
  useEffect(()=>{primary.current?.focus({preventScroll:true});},[]);
  const seeWork=()=>{finish(false);onSeeWork();};
  return <div className="forge-welcome" role="dialog" aria-modal="true" aria-label="Welcome to The Forge" onClick={()=>finish()}
    onKeyDown={event=>{
      if(event.key==="Escape"){event.preventDefault();finish();}
      if(event.key==="Tab"){
        const buttons=event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
        const first=buttons[0], last=buttons[buttons.length-1];
        if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
      }
    }}>
    <div className="forge-welcome-scene">
      <Image src="/forge/mascot.webp" alt="Ron’s cheerful orange cat blacksmith, looking at you" width={800} height={800} priority className="forge-welcome-cat" />
      <div className="forge-welcome-bubble" onClick={event=>event.stopPropagation()}>
        <span className="forge-welcome-name">Ron Paragoso <span aria-hidden="true">✦</span></span>
        <p>Hi, I’m Ron. Welcome to The Forge! Jump straight to my work, or look around the workshop.</p>
        <div className="forge-welcome-footer">
          <button type="button" className="forge-welcome-secondary" onClick={()=>finish()}>Look around</button>
          <button ref={primary} type="button" onClick={seeWork}>See my work <span aria-hidden="true">▸</span></button>
        </div>
      </div>
    </div>
  </div>;
}

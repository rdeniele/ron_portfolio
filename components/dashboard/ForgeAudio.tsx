"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const defaults='{"muted":false,"volume":25}';
function subscribe(callback:()=>void){window.addEventListener("forge-audio",callback);window.addEventListener("storage",callback);return()=>{window.removeEventListener("forge-audio",callback);window.removeEventListener("storage",callback);};}
function read(value:string):{muted:boolean;volume:number}{try{const parsed=JSON.parse(value);return {muted:parsed.muted===true,volume:Number.isFinite(parsed.volume)?Math.max(0,Math.min(100,parsed.volume)):25};}catch{return {muted:false,volume:25};}}
let fallback=defaults;
function save(settings:{muted:boolean;volume:number}){fallback=JSON.stringify(settings);try{localStorage.setItem("forge-audio",fallback);}catch{/* The controls still work without persistent storage. */}window.dispatchEvent(new Event("forge-audio"));}
function clientSnapshot(){try{return localStorage.getItem("forge-audio") || fallback;}catch{return fallback;}}

export default function ForgeAudio(){
  const settings=read(useSyncExternalStore(subscribe,clientSnapshot,()=>defaults));
  const music=useRef<HTMLAudioElement>(null),fire=useRef<HTMLAudioElement>(null);
  const settingsRef=useRef(settings);
  useEffect(()=>{settingsRef.current=settings;},[settings]);
  const [playing,setPlaying]=useState(false);
  const startRef=useRef<()=>void>(()=>{});
  useEffect(()=>{
    const tracks=[music.current,fire.current].filter((track):track is HTMLAudioElement=>!!track);
    let alive=true;
    const start=()=>{
      if(settingsRef.current.muted || settingsRef.current.volume===0 || document.hidden)return;
      Promise.all(tracks.map(track=>track.play())).then(()=>{if(alive)setPlaying(true);}).catch(()=>{tracks.forEach(track=>track.pause());if(alive)setPlaying(false);});
    };
    startRef.current=start;
    const interact=(event:Event)=>{if(event.target instanceof Element && event.target.closest('.forge-audio'))return;start();};
    const visibility=()=>{if(document.hidden){tracks.forEach(track=>track.pause());setPlaying(false);}else start();};
    window.addEventListener("pointerdown",interact);window.addEventListener("keydown",interact);document.addEventListener("visibilitychange",visibility);
    return()=>{alive=false;tracks.forEach(track=>track.pause());window.removeEventListener("pointerdown",interact);window.removeEventListener("keydown",interact);document.removeEventListener("visibilitychange",visibility);};
  },[]);
  useEffect(()=>{
    if(music.current){music.current.volume=settings.volume/100*.45;music.current.muted=settings.muted;}
    if(fire.current){fire.current.volume=settings.volume/100*.7;fire.current.muted=settings.muted;}
  },[settings.volume,settings.muted]);
  const silent=settings.muted || settings.volume===0;
  return <div className="forge-audio">
    <audio ref={music} src="/audio/old-tower-inn.mp3" loop preload="none" aria-hidden="true" />
    <audio ref={fire} src="/audio/fire-crackling.wav" loop preload="none" aria-hidden="true" />
    <button type="button" className="forge-sound-toggle" aria-label={silent?"Unmute forge audio":playing?"Mute forge audio":"Play forge audio"} aria-pressed={!silent && playing} onClick={()=>{
      if(silent){save({...settings,muted:false,volume:settings.volume || 25});settingsRef.current={muted:false,volume:settings.volume || 25};startRef.current();}
      else if(!playing)startRef.current();else save({...settings,muted:true});
    }} title="Forge music & fireplace">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4Z" />{silent?<path d="m16 9 5 6m0-6-5 6" />:<><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></>}</svg>
    </button>
    <details className="forge-volume-menu"><summary aria-label="Audio volume settings" title="Volume">♫</summary><div className="forge-volume-panel">
      <label htmlFor="forge-volume">Forge ambience <output>{settings.volume}%</output></label>
      <input id="forge-volume" type="range" min="0" max="100" value={settings.volume} onChange={event=>{const volume=Number(event.target.value);const next={muted:volume===0,volume};settingsRef.current=next;save(next);if(volume>0)startRef.current();}} />
      <p>Music & crackling fire</p><a href="/audio/CREDITS.txt" target="_blank" rel="noreferrer">Free-to-use audio credits ↗</a>
    </div></details>
  </div>;
}

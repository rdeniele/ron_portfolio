import { useId } from "react";
import type { WorkshopArt } from "@/lib/forge-scene";

export default function ForgeEffects({ art }: { art: WorkshopArt }) {
  const gradient = useId();
  return <svg className="forge-effects" viewBox={`0 0 ${art.width} ${art.height}`} aria-hidden="true">
    <defs>
      <linearGradient id={gradient} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#ff5821" /><stop offset=".65" stopColor="#ffc64a" /><stop offset="1" stopColor="#fff2ac" />
      </linearGradient>
    </defs>
    <svg x={art.fire.x} y={art.fire.y} width={art.fire.width} height={art.fire.height} viewBox="0 0 120 80" overflow="visible">
      <ellipse className="forge-fire-glow" cx="60" cy="68" rx="54" ry="12" fill="#ffb33e" />
      <g className="forge-flame forge-flame-left" fill={`url(#${gradient})`}><path d="M9 75 Q0 60 17 45 Q25 35 22 20 Q40 32 34 48 Q46 40 44 31 Q63 55 49 75 Z" /></g>
      <g className="forge-flame forge-flame-center" fill={`url(#${gradient})`}><path d="M37 77 Q28 58 47 39 Q59 25 56 3 Q77 20 68 39 Q84 29 79 16 Q101 47 83 77 Z" /></g>
      <g className="forge-flame forge-flame-right" fill={`url(#${gradient})`}><path d="M73 77 Q63 59 80 46 Q92 34 89 21 Q109 36 101 50 Q110 46 111 38 Q124 65 108 77 Z" /></g>
      <path className="forge-fire-core" d="M30 77 Q23 65 41 54 Q49 49 47 37 Q64 47 59 58 Q71 50 68 39 Q89 59 86 77 Z" fill="#ffe8a0" />
      {[0,1,2].map(i=><g key={i} className="forge-smoke" style={{animationDelay:`${i*-1.8}s`}}><path d="M51 23 C38 9 70 3 58-13 S42-35 59-46" fill="none" stroke="#e9d9c4" strokeWidth="9" strokeLinecap="round" /></g>)}
      {Array.from({length:6},(_,i)=><circle key={i} className="forge-spark" cx={30+i*12} cy={65-i%3*8} r={.8+i%2*.3} fill="#ffe8ab" style={{animationDelay:`${i*-.8}s`}} />)}
    </svg>
  </svg>;
}

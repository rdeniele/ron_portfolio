"use client";
import { useState } from "react";
import { skillGroups } from "@/lib/site";
export default function SkillsModal() {
  const [selected,setSelected] = useState(0);
  const active = skillGroups[selected];
  return <div className="px-5 py-6 sm:px-7">
    <div className="forge-section-tabs" role="group" aria-label="skill categories">{skillGroups.map((group,i)=><button type="button" key={group.group} aria-pressed={selected === i} aria-controls="skill-inventory" onClick={()=>setSelected(i)}>{group.group}<span className="ml-2 opacity-70">{group.skills.length}</span></button>)}</div>
    <section id="skill-inventory" className="forge-journal-page"><h3 className="font-serif text-title text-ink">{active.group}</h3><ul className="mt-4 flex flex-wrap gap-2">{active.skills.map(skill=><li key={skill} className="forge-skill text-fine">{skill}</li>)}</ul></section>
  </div>;
}

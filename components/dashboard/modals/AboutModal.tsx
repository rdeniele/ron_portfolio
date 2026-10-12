import Image from "next/image";
import { about, identity } from "@/lib/site";
export default function AboutModal() {
  return <div className="forge-profile px-5 py-6 sm:px-7">
    <div className="flex items-start gap-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-line-strong bg-sunk"><Image src={identity.portrait} alt="portrait of ron deniele d. paragoso" fill sizes="96px" className="object-cover object-top" /></div>
      <div><h3 className="font-serif text-title leading-tight text-ink capitalize">{identity.name}</h3><p className="mt-3 font-serif text-lead leading-snug text-ink">{about.lede}</p><p className="mt-3 text-fine text-muted">{identity.roleLine}</p></div>
    </div>
    <div className="mt-6 space-y-5 text-body leading-relaxed text-muted">
      {about.sections.map(section=><p key={section.label}>{section.body}</p>)}
    </div>
  </div>;
}

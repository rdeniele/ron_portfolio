import Image from "next/image";
import { about, identity } from "@/lib/site";

export default function AboutModal() {
  return (
    <div className="px-5 py-6 sm:px-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-sunk">
          <Image
            src={identity.portrait}
            alt="portrait of ron deniele d. paragoso"
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        </div>
        <p className="font-serif text-lead leading-snug text-ink">
          {about.lede}
        </p>
      </div>

      <dl className="mt-7 grid gap-x-7 gap-y-5 sm:grid-cols-2">
        {about.sections.map((section) => (
          <div key={section.label} className="border-t border-line pt-3">
            <dt className="label text-accent-ink">{section.label}</dt>
            <dd className="mt-1.5 text-fine leading-relaxed text-muted">
              {section.body}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

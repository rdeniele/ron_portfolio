import { services } from "@/lib/site";

export default function ServicesCard() {
  return (
    <ul className="flex h-full flex-col justify-between divide-y divide-line">
      {services.map((s, i) => (
        <li key={s.title} className="flex flex-1 items-center gap-2.5">
          <span className="label shrink-0 text-faint tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-fine leading-snug text-ink">{s.title}</span>
        </li>
      ))}
    </ul>
  );
}

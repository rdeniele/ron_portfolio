import { experience } from "@/lib/site";

/** newest first, the order `experience` is written in */
const roles = experience.flatMap((c) =>
  c.roles.map((r) => ({ ...r, company: c.company })),
);

const current = roles.filter((r) => r.current);
/** with nothing running, the card shows where the work most recently was */
const shown = current.length > 0 ? current : roles.slice(0, 2);
const tag = current.length > 0 ? "now" : "latest";

export default function CareerCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {shown.map((role) => (
        <div key={`${role.company}-${role.title}`} className="flex items-baseline gap-2.5">
          <span
            className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full ${
              role.current ? "bg-accent" : "border border-line-strong"
            }`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-fine text-ink">{role.company}</p>
            <p className="truncate text-micro text-muted">{role.title}</p>
          </div>
          <span className="label ml-auto shrink-0 text-faint">
            {role === shown[0] ? tag : role.period.split(" - ").pop()}
          </span>
        </div>
      ))}
    </div>
  );
}

import { experience } from "@/lib/site";

const current = experience
  .flatMap((c) => c.roles.map((r) => ({ ...r, company: c.company })))
  .filter((r) => r.current);

export default function CareerCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {current.map((role) => (
        <div key={role.company} className="flex items-baseline gap-2.5">
          <span
            className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-fine text-ink">{role.company}</p>
            <p className="truncate text-micro text-muted">{role.title}</p>
          </div>
          <span className="label ml-auto shrink-0 text-accent-ink">now</span>
        </div>
      ))}
    </div>
  );
}

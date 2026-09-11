import { skillGroups } from "@/lib/site";

export default function SkillsCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      {skillGroups.map((g) => (
        <div key={g.group} className="flex flex-1 flex-col justify-center">
          <div className="flex items-baseline justify-between gap-2">
            <p className="label text-muted">{g.group}</p>
            <span className="label text-faint tabular-nums">
              {g.skills.length}
            </span>
          </div>
          <div
            className="mt-1 h-px w-full bg-line"
            aria-hidden="true"
          >
            <div
              className="h-px bg-accent"
              style={{ width: `${(g.skills.length / 8) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

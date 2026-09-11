import { skillGroups } from "@/lib/site";

export default function SkillsCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-1.5 lg:gap-2">
      {skillGroups.map((g, i) => (
        <div key={g.group} className="flex flex-1 flex-col justify-center">
          <div className="flex min-w-0 items-baseline justify-between gap-2">
            <p className="skill-group-label label min-w-0 text-muted">{g.group}</p>
            <span className="label shrink-0 text-faint tabular-nums">
              {g.skills.length}
            </span>
          </div>
          <div
            className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-line"
            aria-hidden="true"
          >
            <div
              className="skill-bar h-full rounded-full bg-accent"
              style={
                {
                  width: `${(g.skills.length / 8) * 100}%`,
                  "--bar-delay": `${i * 110}ms`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

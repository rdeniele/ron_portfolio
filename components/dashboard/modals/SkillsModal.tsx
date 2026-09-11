import { skillGroups } from "@/lib/site";

export default function SkillsModal() {
  return (
    <div className="px-5 py-6 sm:px-7">
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.group}>
            <div className="flex items-baseline justify-between gap-3 border-b border-line pb-2">
              <h3 className="label text-accent-ink">{group.group}</h3>
              <span className="label text-faint tabular-nums">
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line px-2.5 py-1 text-fine text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

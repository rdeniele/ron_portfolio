"use client";

import { useState } from "react";
import { careerBlurb, experience } from "@/lib/site";

/** flatten company → roles into a single chronological track */
const track = experience.flatMap((company) =>
  company.roles.map((role) => ({
    ...role,
    company: company.company,
    location: company.location,
    key: `${company.company}-${role.title}-${role.period}`,
  })),
);

export default function CareerModal() {
  const [selected, setSelected] = useState(track[0].key);
  const active = track.find((r) => r.key === selected) ?? track[0];

  return (
    <div className="grid gap-px bg-line sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* timeline rail */}
      <div className="bg-surface px-5 py-5 sm:px-7 sm:py-6">
        <p className="text-fine leading-relaxed text-muted">{careerBlurb}</p>

        <ol className="relative mt-5 pl-5">
          {/* the spine */}
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-[3px] w-px bg-line"
          />
          {track.map((role) => {
            const isActive = role.key === selected;
            return (
              <li key={role.key} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-[0.95rem] -left-5 h-[7px] w-[7px] rounded-full border transition-colors duration-200 ${
                    isActive
                      ? "border-accent bg-accent"
                      : role.current
                        ? "border-accent bg-surface"
                        : "border-line-strong bg-surface"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setSelected(role.key)}
                  aria-current={isActive || undefined}
                  className={`w-full rounded-md py-2 pr-2 pl-1 text-left transition-[background-color,color] duration-150 ${
                    isActive ? "bg-accent-soft" : "hover:bg-sunk"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span
                      className={`truncate text-fine ${isActive ? "text-ink" : "text-muted"}`}
                    >
                      {role.company}
                    </span>
                    {role.current && (
                      <span className="label shrink-0 text-accent">now</span>
                    )}
                  </span>
                  <span className="label mt-0.5 block truncate text-faint">
                    {role.period}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* detail panel */}
      <div className="bg-surface px-5 py-5 sm:px-7 sm:py-6">
        <p className="label text-accent">{active.period}</p>
        <h3 className="mt-2 font-serif text-title leading-tight text-ink">
          {active.title}
        </h3>
        <p className="mt-1 text-fine text-muted">
          {active.company}
          <span className="mx-1.5 text-line-strong">·</span>
          {active.location}
          {active.type && (
            <>
              <span className="mx-1.5 text-line-strong">·</span>
              {active.type}
            </>
          )}
        </p>

        <ul className="mt-4 space-y-2.5">
          {active.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-[0.5rem] h-px w-3 shrink-0 bg-line-strong"
              />
              <span className="text-fine leading-relaxed text-muted">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

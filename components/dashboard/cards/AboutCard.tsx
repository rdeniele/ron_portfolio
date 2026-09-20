"use client";

import { Fragment } from "react";
import Typewriter from "@/components/dashboard/Typewriter";
import { identity } from "@/lib/site";

/** doubles as the identity / hero panel - no separate hero section exists */
export default function AboutCard() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-fine text-muted">{identity.greeting}</p>
      <h1 className="mt-1 font-serif text-[clamp(1.05rem,2.9vw,1.95rem)] leading-[1.05] tracking-tight text-ink">
        ron deniele
        <br />
        d. paragoso
      </h1>
      <p className="mt-2 text-fine text-muted lg:mt-2.5 lg:text-body">
        <span className="sr-only">{identity.roles.join(", ")}</span>
        <span aria-hidden="true">
          i&apos;m a <Typewriter words={identity.roles} className="text-ink" />
        </span>
      </p>
      <p className="accent-rule mt-2 hidden max-w-[34ch] pl-3 text-fine leading-relaxed text-muted @min-[15rem]:block lg:mt-2.5">
        {identity.statement}
      </p>

      {/* the full discipline list, so every role is on the page at once and not
          only as it cycles through the typewriter */}
      <p aria-hidden="true" className="about-roles label mt-2.5 text-faint">
        {identity.roles.map((role, i) => (
          <Fragment key={role}>
            <span className="whitespace-nowrap">{role}</span>
            {i < identity.roles.length - 1 && (
              <span className="text-accent">&middot;</span>
            )}
          </Fragment>
        ))}
      </p>
    </div>
  );
}

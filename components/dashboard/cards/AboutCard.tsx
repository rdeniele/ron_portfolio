"use client";

import Typewriter from "@/components/dashboard/Typewriter";
import { identity } from "@/lib/site";

/** doubles as the identity / hero panel — no separate hero section exists */
export default function AboutCard() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-fine text-muted">{identity.greeting}</p>
      <h1 className="mt-1 font-serif text-[clamp(1.05rem,3.2vw,2.25rem)] leading-[1.05] tracking-tight text-ink">
        ron deniele
        <br />
        d. paragoso
      </h1>
      <p className="mt-2 text-fine text-muted lg:mt-2.5 lg:text-body">
        <span className="sr-only">
          digital marketer, web developer &amp; designer, video editor, and
          digital artist
        </span>
        <span aria-hidden="true">
          i&apos;m a <Typewriter words={identity.roles} className="text-ink" />
        </span>
      </p>
      <p className="mt-2.5 hidden max-w-[34ch] border-l border-line pl-3 text-fine leading-relaxed text-muted @min-[15rem]:block lg:mt-3">
        {identity.statement}
      </p>
    </div>
  );
}

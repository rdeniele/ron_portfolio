"use client";

import { useState } from "react";
import Image from "next/image";
import { workCategories, works, type WorkCategory } from "@/lib/site";

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const videoGradients = [
  "from-rose-500 to-orange-400",
  "from-fuchsia-500 to-pink-500",
  "from-violet-500 to-indigo-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-400",
  "from-amber-400 to-red-500",
  "from-sky-500 to-cyan-400",
  "from-purple-500 to-fuchsia-400",
];

function getVideoGradient(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return videoGradients[hash % videoGradients.length];
}

export default function WorksGallery() {
  const [active, setActive] = useState<WorkCategory>(workCategories[0]);
  const filtered = works.filter((work) => work.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="filter works by field"
        className="flex flex-wrap gap-2"
      >
        {workCategories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
              active === category
                ? "border-foreground bg-foreground text-background"
                : "border-line text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="animate-fade-up mt-8 rounded-lg border border-dashed border-line p-10 text-center text-sm text-muted">
          works for this field are coming soon — check back shortly.
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((work, i) => (
            <li
              key={`${active}-${work.title}`}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-up group flex flex-col overflow-hidden rounded-lg border border-line bg-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden bg-line/50">
                {work.images && work.images.length > 0 ? (
                  <div className="grid h-full grid-cols-2">
                    {work.images.map((src) => (
                      <div key={src} className="relative overflow-hidden">
                        <Image
                          src={src}
                          alt={`${work.title} — ${work.category} project by ron deniele d. paragoso`}
                          fill
                          sizes="(min-width: 640px) 25vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : work.image ? (
                  <Image
                    src={work.image}
                    alt={`${work.title} — ${work.category} project by ron deniele d. paragoso`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                      work.blurImage ? "blur-md" : ""
                    }`}
                  />
                ) : work.category === "video editing" ? (
                  <div
                    aria-hidden="true"
                    className={`flex h-full items-center justify-center bg-gradient-to-br ${getVideoGradient(
                      work.title,
                    )}`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-base font-semibold tracking-widest text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      {getInitials(work.title)}
                    </span>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted">
                    image coming soon
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-medium">{work.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {work.description}
                </p>
                {work.links && work.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 pt-1">
                    {work.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

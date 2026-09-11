"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { workCategories, works, type WorkCategory } from "@/lib/site";

export default function WorksModal() {
  const [category, setCategory] = useState<WorkCategory>(workCategories[0]);
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const items = works.filter((w) => w.category === category);

  const scrollTo = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const slide = rail.children[i] as HTMLElement | undefined;
    if (!slide) return;
    rail.scrollTo({ left: slide.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  }, []);

  // switching category resets the carousel — handled here rather than in an
  // effect so the state change stays in the event that caused it
  const selectCategory = (next: WorkCategory) => {
    setCategory(next);
    setIndex(0);
    railRef.current?.scrollTo({ left: 0, behavior: "auto" });
  };

  // keep the counter in sync with manual swiping
  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const width = rail.clientWidth;
    if (width === 0) return;
    setIndex(Math.round(rail.scrollLeft / width));
  };

  const go = (delta: number) => {
    const next = Math.min(Math.max(index + delta, 0), items.length - 1);
    setIndex(next);
    scrollTo(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* category tabs */}
      <div
        role="tablist"
        aria-label="work categories"
        className="flex shrink-0 flex-wrap gap-x-1 gap-y-1 border-b border-line px-5 py-3 sm:px-7"
      >
        {workCategories.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={active}
              data-autofocus={active || undefined}
              onClick={() => selectCategory(cat)}
              className={`label rounded-md px-2.5 py-1.5 transition-[color,background-color] duration-150 active:scale-[0.97] ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-faint hover:text-ink"
              }`}
            >
              {cat}
              <span className="ml-1.5 tabular-nums opacity-60">
                {works.filter((w) => w.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* carousel */}
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        onKeyDown={onKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${category} projects`}
      >
        <div
          ref={railRef}
          onScroll={handleScroll}
          className="rail flex min-h-0 flex-1 snap-x snap-mandatory"
          tabIndex={0}
          aria-live="polite"
        >
          {items.map((work) => (
            <article
              key={`${work.category}-${work.title}`}
              className="flex w-full shrink-0 snap-center flex-col gap-4 px-5 py-5 sm:px-7"
            >
              <div className="relative min-h-[9rem] flex-1 overflow-hidden rounded-lg border border-line bg-sunk">
                {work.images ? (
                  <div className="grid h-full grid-cols-2 gap-px bg-line">
                    {work.images.map((src) => (
                      <div key={src} className="relative bg-sunk">
                        <Image
                          src={src}
                          alt={`${work.title} — ${work.category}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 400px"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                ) : work.image ? (
                  <Image
                    src={work.image}
                    alt={`${work.title} — ${work.category}`}
                    fill
                    sizes="(max-width: 768px) 92vw, 820px"
                    className={`object-cover object-top ${
                      work.blurImage ? "blur-md scale-105" : ""
                    }`}
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <p className="label text-faint">{work.category}</p>
                  </div>
                )}
                {work.blurImage && (
                  <p className="label absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface/90 px-3 py-1 text-muted">
                    confidential client work
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-title leading-none text-ink">
                    {work.title}
                  </h3>
                  <span className="label text-faint">{work.category}</span>
                </div>
                <p className="mt-2 max-w-[62ch] text-fine leading-relaxed text-muted">
                  {work.description}
                </p>
                {work.links && work.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {work.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-ink transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-soft active:scale-[0.97]"
                      >
                        {link.label}
                        <span aria-hidden="true">&#8599;</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* carousel controls */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line px-5 py-3 sm:px-7">
          <span className="label text-faint tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1 text-line-strong">/</span>
            {String(items.length).padStart(2, "0")}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="previous project"
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-[border-color,opacity,transform] duration-150 hover:border-line-strong active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index >= items.length - 1}
              aria-label="next project"
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-[border-color,opacity,transform] duration-150 hover:border-line-strong active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

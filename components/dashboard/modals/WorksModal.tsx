"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import LivePreviewModal from "@/components/dashboard/LivePreviewModal";
import {
  workCategories,
  workCompanies,
  works,
  type Work,
  type WorkCategory,
  type WorkCompany,
} from "@/lib/site";

type Lightbox = { src: string; alt: string; blurred: boolean };

export default function WorksModal() {
  const [category, setCategory] = useState<WorkCategory>(workCategories[0]);
  const [index, setIndex] = useState(0);
  /** narrows the current category to one employer's work; null shows everything */
  const [company, setCompany] = useState<WorkCompany | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  /** the project whose live site is running in the in-portfolio browser */
  const [preview, setPreview] = useState<Work | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Escape has to close the lightbox before the surrounding modal sees it, so
  // this listens on the capture phase and stops the event there.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      setLightbox(null);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [lightbox]);

  const inCategory = works.filter((w) => w.category === category);
  // only offer the filter where company-attributed work actually exists
  const companies = workCompanies.filter((c) =>
    inCategory.some((w) => w.company === c),
  );
  const items = company
    ? inCategory.filter((w) => w.company === company)
    : inCategory;

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
    setCompany(null);
    setIndex(0);
    railRef.current?.scrollTo({ left: 0, behavior: "auto" });
  };

  const selectCompany = (next: WorkCompany | null) => {
    setCompany(next);
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
                  ? "bg-accent-soft text-accent-ink"
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
                      <button
                        type="button"
                        key={src}
                        onClick={() =>
                          setLightbox({
                            src,
                            alt: `${work.title} — ${work.category}`,
                            blurred: Boolean(work.blurImage),
                          })
                        }
                        aria-label={`view ${work.title} full size`}
                        className="group/shot relative cursor-zoom-in bg-sunk"
                      >
                        <Image
                          src={src}
                          alt={`${work.title} — ${work.category}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 400px"
                          className="object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.02]"
                        />
                      </button>
                    ))}
                  </div>
                ) : work.image ? (
                  <button
                    type="button"
                    onClick={() =>
                      work.liveUrl
                        ? setPreview(work)
                        : setLightbox({
                            src: work.image as string,
                            alt: `${work.title} — ${work.category}`,
                            blurred: Boolean(work.blurImage),
                          })
                    }
                    aria-label={
                      work.liveUrl
                        ? `open the live ${work.title} site inside the portfolio`
                        : `view ${work.title} full size`
                    }
                    className={`group/shot absolute inset-0 ${
                      work.liveUrl ? "cursor-pointer" : "cursor-zoom-in"
                    }`}
                  >
                    <Image
                      src={work.image}
                      alt={`${work.title} — ${work.category}`}
                      fill
                      sizes="(max-width: 768px) 92vw, 820px"
                      className={`object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.02] ${
                        work.blurImage ? "blur-md scale-105" : ""
                      }`}
                    />
                    <span className="label absolute right-2 bottom-2 rounded-md border border-line bg-surface/90 px-2 py-1 text-muted opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100">
                      {work.liveUrl ? "open live preview" : "view full size"}
                    </span>
                  </button>
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
                  {work.company && (
                    <span className="label rounded-md border border-line px-1.5 py-0.5 text-accent-ink">
                      {work.company}
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-[62ch] text-fine leading-relaxed text-muted">
                  {work.description}
                </p>
                {(work.role || work.technologies) && (
                  <p className="label mt-2 text-faint">
                    {work.role}
                    {work.role && work.technologies && (
                      <span className="mx-1.5 text-line-strong">/</span>
                    )}
                    {work.technologies?.join(" · ")}
                  </p>
                )}
                {(work.liveUrl || (work.links && work.links.length > 0)) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* the live site leads, so the default action keeps the
                        visitor on the portfolio rather than sending them off */}
                    {work.liveUrl && (
                      <>
                        <button
                          type="button"
                          onClick={() => setPreview(work)}
                          className="label inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent-soft px-3 py-1.5 text-accent-ink transition-transform duration-150 active:scale-[0.97]"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          live preview
                        </button>
                        {work.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setLightbox({
                                src: work.image as string,
                                alt: `${work.title} — ${work.category}`,
                                blurred: Boolean(work.blurImage),
                              })
                            }
                            className="label rounded-md border border-line px-3 py-1.5 text-ink transition-[border-color,background-color,transform] duration-150 hover:border-line-strong active:scale-[0.97]"
                          >
                            screenshot
                          </button>
                        )}
                      </>
                    )}
                    {work.links?.map((link) => (
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
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-line px-5 py-3 sm:gap-4 sm:px-7">
          <span className="label text-faint tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1 text-line-strong">/</span>
            {String(items.length).padStart(2, "0")}
          </span>

          {companies.length > 0 && (
            <div
              role="group"
              aria-label="filter by company"
              className="flex min-w-0 justify-center sm:gap-1"
            >
              {[null, ...companies].map((c) => {
                const active = c === company;
                return (
                  <button
                    key={c ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectCompany(c)}
                    className={`label min-h-9 whitespace-nowrap rounded-md px-1.5 py-1 transition-[color,background-color] duration-150 active:scale-[0.97] ${
                      active
                        ? "bg-accent-soft text-accent-ink"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    {c ?? "all"}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex shrink-0 gap-2">
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

      {preview?.liveUrl && (
        <LivePreviewModal
          key={preview.liveUrl}
          title={preview.title}
          url={preview.liveUrl}
          description={preview.description}
          onClose={() => setPreview(null)}
        />
      )}

      {lightbox && (
        <div
          className="modal-backdrop-in fixed inset-0 z-[60] flex items-center justify-center bg-paper/90 p-4 backdrop-blur-md sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="close image"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-muted transition-[color,border-color,transform] duration-150 hover:border-accent hover:text-ink active:scale-95"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="modal-panel-in relative max-h-full w-full max-w-5xl overflow-hidden rounded-lg border border-line-strong bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[82dvh] w-full object-contain ${
                lightbox.blurred ? "blur-lg" : ""
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

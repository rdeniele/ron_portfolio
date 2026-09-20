"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LivePreviewModal from "@/components/dashboard/LivePreviewModal";
import WorkGlyph from "@/components/dashboard/WorkGlyph";
import { works, type Work, type WorkCategory } from "@/lib/site";

type Lightbox = { src: string; alt: string; blurred: boolean };

/** matches the entrance curve used elsewhere - fast start, slow settle */
const PAGE_MS = 320;

/**
 * Pages the rail by hand, because a native smooth `scrollTo` is dropped in
 * some browsers while an instant one is not - animating it here keeps the
 * paging identical everywhere and respects reduced motion.
 */
function scrollRailTo(rail: HTMLElement, left: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const from = rail.scrollLeft;
  const distance = left - from;
  // a hidden page runs no animation frames, so there is nothing to animate
  if (reduced || document.hidden || distance === 0) {
    rail.scrollLeft = left;
    return;
  }
  const started = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - started) / PAGE_MS, 1);
    rail.scrollLeft = from + distance * (1 - Math.pow(1 - t, 3));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** the tile image - the first of a pair where a project has two */
function thumbOf(work: Work) {
  return work.image ?? work.images?.[0];
}

export default function WorksModal({ category }: { category: WorkCategory }) {
  /** the project opened out of the grid; null means the grid is showing */
  const [selected, setSelected] = useState<Work | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  /** the project whose live site is running in the in-portfolio browser */
  const [preview, setPreview] = useState<Work | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  /** how far the rail has been paged, so the arrows can retire at the ends */
  const [edges, setEdges] = useState({ start: true, end: false });

  const items = works.filter((w) => w.category === category);

  // Escape has to peel back one layer at a time - image, then project detail -
  // before the surrounding modal sees it, so this listens on the capture phase
  // and stops the event there. The live preview handles its own Escape.
  useEffect(() => {
    if (preview) return;
    if (!lightbox && !selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      if (lightbox) setLightbox(null);
      else setSelected(null);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [lightbox, selected, preview]);

  /**
   * In the grid the arrows page the rail by a full view; in the detail view
   * they step through the projects of the current category.
   */
  const go = (delta: number) => {
    if (selected) {
      const at = items.indexOf(selected);
      const next = items[Math.min(Math.max(at + delta, 0), items.length - 1)];
      if (next) setSelected(next);
      return;
    }
    const rail = railRef.current;
    if (!rail) return;
    // scroll-snap swallows a plain scrollBy, so page to the nearest tile edge
    const target = rail.scrollLeft + delta * rail.clientWidth;
    const tiles = Array.from(rail.children) as HTMLElement[];
    const nearest = tiles.reduce((best, tile) =>
      Math.abs(tile.offsetLeft - rail.offsetLeft - target) <
      Math.abs(best.offsetLeft - rail.offsetLeft - target)
        ? tile
        : best,
    );
    scrollRailTo(rail, nearest.offsetLeft - rail.offsetLeft);
  };

  const syncEdges = () => {
    const rail = railRef.current;
    if (!rail) return;
    setEdges({
      start: rail.scrollLeft < 8,
      end: rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 8,
    });
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

  const at = selected ? items.indexOf(selected) : -1;
  const openImage = (work: Work, src: string) =>
    setLightbox({
      src,
      alt: `${work.title} - ${work.category}`,
      blurred: Boolean(work.blurImage),
    });

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        onKeyDown={onKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${category} projects`}
      >
        {selected ? (
          /* one project, opened out of the grid */
          <div className="scroll-area flex min-h-0 flex-1 flex-col gap-4 px-5 py-5 sm:px-7">
            <div className="relative min-h-[9rem] flex-1 overflow-hidden rounded-lg border border-line bg-sunk">
              {selected.images ? (
                <div className="grid h-full grid-cols-2 gap-px bg-line">
                  {selected.images.map((src) => (
                    <button
                      type="button"
                      key={src}
                      onClick={() => openImage(selected, src)}
                      aria-label={`view ${selected.title} full size`}
                      className="group/shot relative cursor-zoom-in bg-sunk"
                    >
                      <Image
                        src={src}
                        alt={`${selected.title} - ${selected.category}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 400px"
                        className="object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.02]"
                      />
                    </button>
                  ))}
                </div>
              ) : selected.image ? (
                <button
                  type="button"
                  onClick={() =>
                    selected.liveUrl
                      ? setPreview(selected)
                      : openImage(selected, selected.image as string)
                  }
                  aria-label={
                    selected.liveUrl
                      ? `open the live ${selected.title} site inside the portfolio`
                      : `view ${selected.title} full size`
                  }
                  className={`group/shot absolute inset-0 ${
                    selected.liveUrl ? "cursor-pointer" : "cursor-zoom-in"
                  }`}
                >
                  <Image
                    src={selected.image}
                    alt={`${selected.title} - ${selected.category}`}
                    fill
                    sizes="(max-width: 768px) 92vw, 820px"
                    className={`object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.02] ${
                      selected.blurImage ? "blur-md scale-105" : ""
                    }`}
                  />
                  <span className="label absolute right-2 bottom-2 rounded-md border border-line bg-surface/90 px-2 py-1 text-muted opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100">
                    {selected.liveUrl ? "open live preview" : "view full size"}
                  </span>
                </button>
              ) : (
                <WorkGlyph
                  title={selected.title}
                  textClassName="text-display"
                />
              )}
              {selected.blurImage && (
                <p className="label absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface/90 px-3 py-1 text-muted">
                  confidential client work
                </p>
              )}
            </div>

            <div className="shrink-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-title leading-none text-ink">
                  {selected.title}
                </h3>
                <span className="label text-faint">{selected.category}</span>
              </div>
              <p className="mt-2 max-w-[62ch] text-fine leading-relaxed text-muted">
                {selected.description}
              </p>
              {(selected.role || selected.technologies) && (
                <p className="label mt-2 text-faint">
                  {selected.role}
                  {selected.role && selected.technologies && (
                    <span className="mx-1.5 text-line-strong">/</span>
                  )}
                  {selected.technologies?.join(" · ")}
                </p>
              )}
              {(selected.liveUrl ||
                (selected.links && selected.links.length > 0)) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {/* the live site leads, so the default action keeps the
                      visitor on the portfolio rather than sending them off */}
                  {selected.liveUrl && (
                    <>
                      <button
                        type="button"
                        onClick={() => setPreview(selected)}
                        className="label inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent-soft px-3 py-1.5 text-accent-ink transition-transform duration-150 active:scale-[0.97]"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        live preview
                      </button>
                      {selected.image && (
                        <button
                          type="button"
                          onClick={() =>
                            openImage(selected, selected.image as string)
                          }
                          className="label rounded-md border border-line px-3 py-1.5 text-ink transition-[border-color,background-color,transform] duration-150 hover:border-line-strong active:scale-[0.97]"
                        >
                          screenshot
                        </button>
                      )}
                    </>
                  )}
                  {selected.links?.map((link) => (
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
          </div>
        ) : (
          /* the grid: two rows of tiles that scroll sideways as a set */
          <div
            ref={railRef}
            onScroll={syncEdges}
            /* snapping is off here on purpose: mandatory snap fights every
               paged scroll and pins the rail to the first tile */
            className="rail rail-free grid min-h-0 flex-1 grid-flow-col grid-rows-2 auto-cols-[70%] gap-3 px-5 py-5 sm:auto-cols-[calc((100%-1.5rem)/3)] sm:px-7"
            tabIndex={0}
          >
            {items.map((work) => {
              const thumb = thumbOf(work);
              return (
                <button
                  key={`${work.category}-${work.title}`}
                  type="button"
                  onClick={() => setSelected(work)}
                  data-autofocus={items[0] === work || undefined}
                  aria-label={`${work.title} - open project`}
                  className="group/tile flex min-h-0 flex-col overflow-hidden rounded-lg border border-line bg-sunk text-left transition-[border-color,transform] duration-200 hover:border-line-strong active:scale-[0.99]"
                >
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 70vw, 30vw"
                        className={`object-cover object-top transition-transform duration-300 group-hover/tile:scale-[1.03] ${
                          work.blurImage ? "blur-md scale-105" : ""
                        }`}
                      />
                    ) : (
                      <WorkGlyph title={work.title} textClassName="text-title" />
                    )}
                    {work.liveUrl && (
                      <span className="label absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/90 px-1.5 py-0.5 text-accent-ink">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        live
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 border-t border-line px-3 py-2">
                    <p className="truncate font-serif text-ink">{work.title}</p>
                    <p className="label truncate text-faint">
                      {work.technologies?.slice(0, 3).join(" · ") ??
                        (thumb ? work.category : " ")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* controls */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line px-5 py-3 sm:px-7">
          {selected ? (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="label inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-ink transition-[border-color,transform] duration-150 hover:border-line-strong active:scale-[0.97]"
            >
              <span aria-hidden="true">&#8592;</span>
              all projects
            </button>
          ) : (
            <span className="label text-faint tabular-nums">
              {String(items.length).padStart(2, "0")}
              <span className="mx-1.5 text-line-strong">/</span>
              projects
            </span>
          )}

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={selected ? at <= 0 : edges.start}
              aria-label={selected ? "previous project" : "previous projects"}
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-[border-color,opacity,transform] duration-150 hover:border-line-strong active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={selected ? at >= items.length - 1 : edges.end}
              aria-label={selected ? "next project" : "next projects"}
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

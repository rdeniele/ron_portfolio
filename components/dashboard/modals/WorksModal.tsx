"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LivePreviewModal from "@/components/dashboard/LivePreviewModal";
import WorkGlyph from "@/components/dashboard/WorkGlyph";
import { works, type Work, type WorkCategory } from "@/lib/site";

type Lightbox = { src: string; alt: string; blurred: boolean };

/** the tile image - the first of a pair where a project has two */
function thumbOf(work: Work) {
  return work.image ?? work.images?.[0];
}

type Player = {
  title: string;
  label: string;
  href: string;
  embed: string;
  platform: string;
  vertical: boolean;
};

/**
 * Turns a share link into something that plays inside the portfolio, so a
 * visitor can watch every edit without being sent off to another site.
 * Returns null for links no player is known for - those just open normally.
 */
function playerFor(href: string): Omit<Player, "title" | "label"> | null {
  const drive = href.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (drive)
    return {
      href,
      embed: `https://drive.google.com/file/d/${drive[1]}/preview`,
      platform: "google drive",
      vertical: false,
    };
  const tiktok = href.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (tiktok)
    return {
      href,
      embed: `https://www.tiktok.com/player/v1/${tiktok[1]}?autoplay=1&rel=0`,
      platform: "tiktok",
      vertical: true,
    };
  const youtube = href.match(
    /youtube\.com\/(?:shorts\/|watch\?v=)([\w-]{11})|youtu\.be\/([\w-]{11})/,
  );
  if (youtube)
    return {
      href,
      embed: `https://www.youtube.com/embed/${youtube[1] ?? youtube[2]}?autoplay=1&rel=0`,
      platform: "youtube",
      vertical: href.includes("/shorts/"),
    };
  return null;
}

/** where a project's videos live, e.g. "tiktok · youtube" */
function platformsOf(work: Work) {
  const names = new Set(
    (work.links ?? []).map((l) => playerFor(l.href)?.platform ?? "link"),
  );
  return Array.from(names).join(" · ");
}

export default function WorksModal({ category }: { category: WorkCategory }) {
  /** the project opened out of the grid; null means the grid is showing */
  const [selected, setSelected] = useState<Work | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  /** the project whose live site is running in the in-portfolio browser */
  const [preview, setPreview] = useState<Work | null>(null);
  /** the video playing in the in-portfolio player */
  const [playing, setPlaying] = useState<Player | null>(null);

  const items = works.filter((w) => w.category === category);

  // Escape has to peel back one layer at a time - image, then project detail -
  // before the surrounding modal sees it, so this listens on the capture phase
  // and stops the event there. The live preview handles its own Escape.
  useEffect(() => {
    if (preview) return;
    if (!lightbox && !selected && !playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      if (playing) setPlaying(null);
      else if (lightbox) setLightbox(null);
      else setSelected(null);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [lightbox, selected, preview, playing]);

  /** in the detail view the arrows step through the category's projects */
  const go = (delta: number) => {
    if (!selected) return;
    const at = items.indexOf(selected);
    const next = items[Math.min(Math.max(at + delta, 0), items.length - 1)];
    if (next) setSelected(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!selected) return;
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

  if (category === "video editing") {
    return (
      <div className="scroll-area h-full overflow-y-auto px-5 py-2 sm:px-7">
        <p className="label pt-3 text-faint">
          press play to watch right here - no need to leave the page.
        </p>
        <ul className="divide-y divide-line" aria-label="video projects">
          {items.map((work, i) => {
            const thumb = thumbOf(work);
            const first = work.links?.[0];
            const firstPlayer = first ? playerFor(first.href) : null;
            return (
              <li
                key={work.title}
                className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-x-6"
              >
                {/* the thumbnail plays the first video, the quickest way in */}
                <button
                  type="button"
                  disabled={!firstPlayer}
                  onClick={() =>
                    first &&
                    firstPlayer &&
                    setPlaying({
                      ...firstPlayer,
                      title: work.title,
                      label: first.label,
                    })
                  }
                  aria-label={`play ${work.title}`}
                  className="group/thumb relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-sunk transition-[border-color,transform] duration-150 hover:border-line-strong active:scale-[0.97] motion-reduce:transform-none sm:aspect-video"
                >
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      sizes="128px"
                      className={`object-cover transition-transform duration-300 group-hover/thumb:scale-[1.04] motion-reduce:transition-none ${
                        work.blurImage ? "blur-sm scale-105" : ""
                      }`}
                    />
                  ) : (
                    <WorkGlyph title={work.title} textClassName="text-fine" />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center bg-ink/15"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-surface/95 text-accent-ink shadow-sm transition-transform duration-150 group-hover/thumb:scale-110 motion-reduce:transition-none">
                      <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5">
                        <path d="M4 2.5v11l9-5.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </button>

                <div className="min-w-0">
                  <h3 className="font-serif text-title leading-tight text-ink">
                    {work.title}
                  </h3>
                  <p className="label mt-1 text-faint">
                    {work.links?.length ?? 0}{" "}
                    {work.links?.length === 1 ? "video" : "videos"}
                    <span className="mx-1.5 text-line-strong">/</span>
                    {platformsOf(work)}
                  </p>
                  <p className="mt-1.5 max-w-[62ch] text-fine leading-relaxed text-muted">
                    {work.description}
                  </p>
                </div>

                <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:max-w-[16rem] sm:justify-end">
                  {work.links?.map((link) => {
                    const player = playerFor(link.href);
                    const label =
                      work.links?.length === 1 ? "play" : `play ${link.label.replace(/^watch\s*/, "")}`;
                    return player ? (
                      <button
                        key={link.href}
                        type="button"
                        data-autofocus={(i === 0 && link === first) || undefined}
                        onClick={() =>
                          setPlaying({ ...player, title: work.title, label: link.label })
                        }
                        aria-label={`${work.title}: play ${link.label}`}
                        className="label inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line px-3 text-accent-ink transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden="true">
                          <path d="M4 2.5v11l9-5.5Z" fill="currentColor" />
                        </svg>
                        {label}
                      </button>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${work.title}: ${link.label} (opens in a new tab)`}
                        className="label inline-flex min-h-11 items-center rounded-md border border-line px-3 text-accent-ink transition-transform duration-150 hover:underline active:scale-[0.97] motion-reduce:transform-none"
                      >
                        {link.label} <span aria-hidden="true">&#8599;</span>
                      </a>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>

        {/* portalled: the modal panel is transformed, which would otherwise
            trap this fixed overlay inside the panel's box */}
        {playing && createPortal(
          <div
            className="modal-backdrop-in fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-paper/90 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${playing.title} - ${playing.label}`}
            onClick={() => setPlaying(null)}
            onKeyDown={(e) => {
              // keep Tab inside the player; it sits outside the modal's own trap
              if (e.key !== "Tab") return;
              e.stopPropagation();
              const items = Array.from(
                e.currentTarget.querySelectorAll<HTMLElement>("a, button, iframe"),
              ).filter((el) => el.offsetParent !== null);
              const first = items[0];
              const last = items[items.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }}
          >
            <div
              className="flex w-full max-w-4xl items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="min-w-0 truncate font-serif text-title text-ink">
                {playing.title}
                <span className="label ml-2 text-faint">{playing.label}</span>
              </p>
              <div className="flex shrink-0 gap-2">
                <a
                  href={playing.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hidden min-h-10 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-ink transition-[border-color,transform] duration-150 hover:border-accent active:scale-[0.97] sm:inline-flex"
                >
                  open on {playing.platform} <span aria-hidden="true">&#8599;</span>
                </a>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setPlaying(null)}
                  aria-label="close video"
                  className="grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-muted transition-[color,border-color,transform] duration-150 hover:border-accent hover:text-ink active:scale-95"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`modal-panel-in overflow-hidden rounded-lg border border-line-strong bg-ink ${
                playing.vertical
                  ? "aspect-[9/16] h-[min(78dvh,calc((100vw-2rem)*16/9))]"
                  : "aspect-video w-full max-w-4xl max-h-[78dvh]"
              }`}
            >
              <iframe
                key={playing.embed}
                src={playing.embed}
                title={`${playing.title} - ${playing.label}`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <a
              href={playing.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="label inline-flex min-h-10 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-ink sm:hidden"
            >
              open on {playing.platform} <span aria-hidden="true">&#8599;</span>
            </a>
          </div>,
          document.body,
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        onKeyDown={onKeyDown}
        role="group"
        aria-label={`${category} projects`}
      >
        {selected ? (
          /* one project, opened out of the grid */
          <div className="scroll-area flex min-h-0 flex-1 flex-col gap-4 px-5 py-5 sm:px-7">
            <div className="relative min-h-[9rem] flex-1 overflow-hidden rounded-lg border border-line bg-sunk">
              {selected.images ? (
                <div
                  className={`grid h-full gap-px bg-line ${
                    selected.images.length > 6
                      ? // a big set scrolls as square cells rather than shrinking
                        "scroll-area grid-cols-3 content-start overflow-y-auto sm:grid-cols-4"
                      : selected.images.length > 2
                        ? "grid-cols-3 grid-rows-2"
                        : "grid-cols-2"
                  }`}
                >
                  {selected.images.map((src) => (
                    <button
                      type="button"
                      key={src}
                      onClick={() => openImage(selected, src)}
                      aria-label={`view ${selected.title} full size`}
                      className={`group/shot relative cursor-zoom-in bg-sunk ${
                        (selected.images?.length ?? 0) > 6
                          ? "aspect-square"
                          : ""
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${selected.title} - ${selected.category}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 400px"
                        className={`transition-transform duration-300 group-hover/shot:scale-[1.02] ${
                          // a carousel's slides are whole compositions - never crop them
                          (selected.images?.length ?? 0) > 2
                            ? "object-contain"
                            : "object-cover object-top"
                        }`}
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
          /* the grid scrolls down like a page, so a mouse wheel, trackpad
             or swipe all just work */
          <div
            className="scroll-area grid min-h-0 flex-1 auto-rows-max grid-cols-2 content-start gap-3 overflow-y-auto px-5 py-5 sm:grid-cols-3 sm:px-7"
            tabIndex={0}
            aria-label={`${items.length} projects, scrollable`}
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
                  className="group/tile flex flex-col overflow-hidden rounded-lg border border-line bg-sunk text-left transition-[border-color,transform] duration-200 hover:border-line-strong active:scale-[0.99]"
                >
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 45vw, 30vw"
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

          {selected && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={at <= 0}
              aria-label="previous project"
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-[border-color,opacity,transform] duration-150 hover:border-line-strong active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={at >= items.length - 1}
              aria-label="next project"
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-[border-color,opacity,transform] duration-150 hover:border-line-strong active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
          )}
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

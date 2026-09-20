"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { EmbedCheck } from "@/app/api/embed-check/route";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** must stay in step with .modal-panel-out */
const EXIT_MS = 220;

/** a site that has not painted by now is treated as one that never will */
const LOAD_TIMEOUT_MS = 15000;

type Phase = "checking" | "loading" | "ready" | "blocked";

type Props = {
  title: string;
  url: string;
  /** shown in the fallback panel so a blocked site still reads as a project */
  description: string;
  onClose: () => void;
};

/** host + path, without the scheme - the way a browser bar shows it */
function displayUrl(url: string) {
  try {
    const parsed = new URL(url);
    return (
      parsed.host.replace(/^www\./, "") + parsed.pathname.replace(/\/$/, "")
    );
  } catch {
    return url;
  }
}

/**
 * The project's real site, running inside the portfolio in a browser-shaped
 * frame. A site that refuses framing cannot be detected from the client - see
 * app/api/embed-check/route.ts - so the verdict is fetched first and the iframe
 * only mounts once framing is known to be possible, or unknowable.
 */
export default function LivePreviewModal({
  title,
  url,
  description,
  onClose,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const [phase, setPhase] = useState<Phase>("checking");
  const [reason, setReason] = useState("");
  const [closing, setClosing] = useState(false);
  /** bumped by the reload button to remount the iframe */
  const [attempt, setAttempt] = useState(0);

  const requestClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // Escape has to close this frame and not the works modal underneath it, so
  // the listener runs on the capture phase and stops the event there.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        requestClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // focus inside the frame belongs to the embedded site - leave it there
      if (active?.tagName === "IFRAME") return;

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [requestClose]);

  // hold the page still underneath, and hand focus back on the way out
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const panel = panelRef.current;
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
      target?.focus();
    }, 60);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  // ask the server whether this site allows framing at all
  useEffect(() => {
    // phase is already "checking" here - on first mount from useState, and on a
    // reload because the button sets it before bumping `attempt`
    let cancelled = false;
    fetch(`/api/embed-check?url=${encodeURIComponent(url)}`)
      .then((res) => res.json() as Promise<EmbedCheck>)
      .then((check) => {
        if (cancelled) return;
        if (check.status === "blocked") {
          setReason(check.reason);
          setPhase("blocked");
        } else {
          // `unknown` still gets a try - the probe can fail where a real
          // browser succeeds, and the load timeout below is the safety net
          setPhase("loading");
        }
      })
      .catch(() => {
        if (!cancelled) setPhase("loading");
      });
    return () => {
      cancelled = true;
    };
  }, [url, attempt]);

  // a framed site can answer `load` with an error page we are not allowed to
  // read, so a stalled preview is caught on a clock rather than on an event
  useEffect(() => {
    if (phase !== "loading") return;
    const t = window.setTimeout(() => {
      setReason("it did not finish loading in time");
      setPhase("blocked");
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const reload = () => {
    setReason("");
    setPhase("checking");
    setAttempt((n) => n + 1);
  };

  if (typeof document === "undefined") return null;

  const chromeButton =
    "grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-[color,border-color,transform] duration-150 hover:border-line-strong hover:text-ink active:scale-95";

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        onClick={requestClose}
        className={`absolute inset-0 bg-paper/80 backdrop-blur-md ${
          closing ? "modal-backdrop-out" : "modal-backdrop-in"
        }`}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative flex h-[94dvh] w-full flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[var(--lift)] outline-none sm:h-[90dvh] sm:w-[90vw] ${
          closing ? "modal-panel-out" : "modal-panel-in"
        }`}
      >
        {/* browser chrome */}
        <header className="flex shrink-0 items-center gap-2 border-b border-line bg-sunk px-3 py-2.5 sm:gap-3 sm:px-4">
          {/* window dots, in the palette's greys rather than stoplight colours */}
          <div className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2.5 w-2.5 rounded-full border border-line-strong"
              />
            ))}
          </div>

          {/* address bar */}
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                phase === "ready" ? "bg-accent" : "bg-line-strong"
              }`}
              aria-hidden="true"
            />
            <span id={titleId} className="label shrink-0 text-ink">
              {title}
            </span>
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <span className="truncate font-mono text-fine text-faint">
              {displayUrl(url)}
            </span>
            <span
              className={`label ml-auto hidden shrink-0 sm:inline ${
                phase === "blocked" ? "text-faint" : "text-accent-ink"
              }`}
            >
              {phase === "ready"
                ? "live"
                : phase === "blocked"
                  ? "not embeddable"
                  : "connecting"}
            </span>
          </div>

          <button
            type="button"
            onClick={reload}
            aria-label={`reload ${title}`}
            className={`${chromeButton} hidden sm:grid`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13 1.5V5H9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-ink transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-soft active:scale-[0.97]"
          >
            <span className="hidden sm:inline">open live site</span>
            <span className="sm:hidden">open</span>
            <span aria-hidden="true">&#8599;</span>
          </a>

          <button
            type="button"
            data-autofocus
            onClick={requestClose}
            aria-label={`close ${title} preview`}
            className={chromeButton}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* viewport */}
        <div className="relative min-h-0 flex-1 bg-sunk">
          {phase === "blocked" ? (
            <div className="scroll-area grid h-full place-items-center px-6 py-8">
              <div className="max-w-[46ch] text-center">
                <p className="label text-faint">preview unavailable</p>
                <h3 className="mt-2 font-serif text-title leading-none text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-fine leading-relaxed text-muted">
                  {description}
                </p>
                <p className="mt-3 text-fine leading-relaxed text-faint">
                  the site is live, it just cannot run inside the portfolio:{" "}
                  {reason}. open it in a new tab to see the real thing.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent-soft px-3 py-2 text-accent-ink transition-transform duration-150 active:scale-[0.97]"
                  >
                    visit live site
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                  <button
                    type="button"
                    onClick={reload}
                    className="label rounded-md border border-line px-3 py-2 text-ink transition-[border-color,transform] duration-150 hover:border-line-strong active:scale-[0.97]"
                  >
                    try again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <iframe
                key={attempt}
                src={url}
                title={`${title} - live site`}
                onLoad={() => setPhase((p) => (p === "loading" ? "ready" : p))}
                // the embedded site has to behave like the real thing: its own
                // scripts, storage, forms, and links that open out of the frame
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals"
                referrerPolicy="no-referrer-when-downgrade"
                allow="fullscreen; clipboard-write"
                className={`h-full w-full border-0 bg-surface transition-opacity duration-300 ${
                  phase === "ready" ? "opacity-100" : "opacity-0"
                }`}
              />

              {phase !== "ready" && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-sunk">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-accent"
                      aria-hidden="true"
                    />
                    <p className="label text-faint" role="status">
                      {phase === "checking"
                        ? "checking the live site"
                        : `loading ${displayUrl(url)}`}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* status strip */}
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-3 py-2 sm:px-4">
          <p className="label truncate text-faint">
            {phase === "blocked"
              ? "showing project details instead"
              : "live site, running inside the portfolio"}
          </p>
          <button
            type="button"
            onClick={requestClose}
            className="label shrink-0 rounded-md border border-line px-3 py-1.5 text-ink transition-[border-color,transform] duration-150 hover:border-line-strong active:scale-[0.97]"
          >
            close
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

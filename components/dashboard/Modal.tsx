"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** must stay in step with the exit duration on the panel below */
const EXIT_MS = 260;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  index: string;
  label: string;
  blurb?: string;
  /** tailwind max-width class — works gets a wider frame than contact */
  size?: "md" | "lg" | "xl";
  /** hold a tall frame so media-led content (the works carousel) gets real room */
  tall?: boolean;
  children: React.ReactNode;
};

const SIZES = {
  md: "max-w-lg",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
} as const;

/**
 * Enter/exit runs on CSS keyframes rather than an animation library: it is a
 * single two-state change, and owning the unmount outright means a closed
 * modal can never linger as an invisible overlay on top of the dashboard.
 */
export default function Modal({
  open,
  onClose,
  index,
  label,
  blurb,
  size = "lg",
  tall = false,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // The modal plays its own exit animation and only then tells the parent to
  // close, so mounting never has to wait on an animation frame — rAF is paused
  // whenever the page is hidden, which would otherwise strand it half-open.
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) restoreFocusRef.current = document.activeElement as HTMLElement;
  }, [open]);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, EXIT_MS);
  }, [closing, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
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

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [open, requestClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // move focus into the panel on open, and hand it back on close
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const target =
          panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
        target.focus();
      }, 60);
      return () => window.clearTimeout(t);
    }
    restoreFocusRef.current?.focus?.();
  }, [open]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        onClick={requestClose}
        className={`absolute inset-0 bg-paper/70 backdrop-blur-md ${
          closing ? "modal-backdrop-out" : "modal-backdrop-in"
        }`}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative flex max-h-[92dvh] w-full ${SIZES[size]} ${
          tall ? "h-[min(92dvh,46rem)]" : ""
        } flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[var(--lift)] outline-none ${
          closing ? "modal-panel-out" : "modal-panel-in"
        }`}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            <p className="label text-faint">
              <span className="text-accent">{index}</span>
              <span className="mx-2 text-line-strong">/</span>
              <span id={titleId}>{label}</span>
            </p>
            {blurb && <p className="mt-1.5 text-fine text-muted">{blurb}</p>}
          </div>
          <button
            type="button"
            onClick={requestClose}
            aria-label={`close ${label}`}
            className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-muted transition-[color,border-color,transform] duration-150 hover:border-line-strong hover:text-ink active:scale-95"
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

        <div className="scroll-area min-h-0 flex-1">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

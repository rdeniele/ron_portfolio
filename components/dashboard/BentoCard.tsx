"use client";

import { useSortable } from "@dnd-kit/sortable";
import { motion, useReducedMotion } from "motion/react";
import type { Panel } from "@/lib/dashboard";

type BentoCardProps = {
  panel: Panel;
  focused: boolean;
  /** true when another card holds focus — this one recedes */
  receded: boolean;
  onOpen: () => void;
  onFocus: () => void;
  children: React.ReactNode;
};

/**
 * A card in the bento grid. Sortable's built-in transform preview assumes
 * uniform item sizes, so it is deliberately not applied here — the dragged
 * card is rendered in a DragOverlay while the grid re-packs underneath and
 * motion's layout animation carries the siblings to their new positions.
 */
export default function BentoCard({
  panel,
  focused,
  receded,
  onOpen,
  onFocus,
  children,
}: BentoCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: panel.id,
    animateLayoutChanges: () => false,
  });
  const reduce = useReducedMotion();

  // Enter opens the modal; Space belongs to the keyboard drag sensor, so the
  // two interactions never compete for the same key. dnd-kit supplies its own
  // onKeyDown through `listeners`, so it has to be called through rather than
  // replaced — spreading a handler of the same name would silently shadow it.
  const { onKeyDown: dndKeyDown, ...dragListeners } = listeners ?? {};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onOpen();
      return;
    }
    dndKeyDown?.(e);
  };

  return (
    <motion.article
      ref={setNodeRef}
      layout={reduce ? false : "position"}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        gridColumn: `span ${panel.span.col}`,
        gridRow: `span ${panel.span.row}`,
        zIndex: focused ? 20 : 1,
      }}
      data-panel={panel.id}
      data-rows={panel.span.row}
      data-placeholder={isDragging || undefined}
      data-focused={focused && !isDragging ? true : undefined}
      data-receded={receded || undefined}
      className="group/card bento-card"
      {...attributes}
      {...dragListeners}
      onKeyDown={handleKeyDown}
      onClick={onOpen}
      onFocus={onFocus}
      aria-label={`${panel.label} — enter to open, space to pick up and rearrange`}
    >
      <CardContent panel={panel}>{children}</CardContent>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 bottom-2.5 flex gap-[3px] opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-line-strong" />
        ))}
      </span>
    </motion.article>
  );
}

/** shared inner layout, reused by the drag overlay */
export function CardContent({
  panel,
  children,
}: {
  panel: Panel;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex shrink-0 items-baseline justify-between gap-3">
        <p className="label text-faint">
          <span className="text-accent">{panel.index}</span>
          <span className="mx-1.5 text-line-strong">/</span>
          <span className="text-muted transition-colors duration-200 group-hover/card:text-ink">
            {panel.label}
          </span>
        </p>
        <span className="card-meta label shrink-0 text-faint tabular-nums">
          {panel.meta}
        </span>
      </header>

      <p className="card-blurb mt-2 shrink-0 text-fine leading-snug text-muted">
        {panel.blurb}
      </p>

      <div className="card-body mt-3 min-h-0 flex-1">{children}</div>
    </>
  );
}

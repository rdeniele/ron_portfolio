"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import BentoCard, { CardContent } from "@/components/dashboard/BentoCard";
import Modal from "@/components/dashboard/Modal";
import Sidebar from "@/components/dashboard/Sidebar";
import AboutCard from "@/components/dashboard/cards/AboutCard";
import BlogCard from "@/components/dashboard/cards/BlogCard";
import CareerCard from "@/components/dashboard/cards/CareerCard";
import ContactCard from "@/components/dashboard/cards/ContactCard";
import ServicesCard from "@/components/dashboard/cards/ServicesCard";
import SkillsCard from "@/components/dashboard/cards/SkillsCard";
import WorksCard from "@/components/dashboard/cards/WorksCard";
import AboutModal from "@/components/dashboard/modals/AboutModal";
import BlogModal from "@/components/dashboard/modals/BlogModal";
import CareerModal from "@/components/dashboard/modals/CareerModal";
import ContactModal from "@/components/dashboard/modals/ContactModal";
import ServicesModal from "@/components/dashboard/modals/ServicesModal";
import SkillsModal from "@/components/dashboard/modals/SkillsModal";
import WorksModal from "@/components/dashboard/modals/WorksModal";
import { defaultOrder, panelById, type PanelId } from "@/lib/dashboard";

// WebGL only, and only worth paying for once the page is interactive
const DashboardBackground = dynamic(
  () => import("@/components/three/DashboardBackground"),
  { ssr: false },
);

const CARDS: Record<PanelId, React.ReactNode> = {
  about: <AboutCard />,
  works: <WorksCard />,
  services: <ServicesCard />,
  career: <CareerCard />,
  skills: <SkillsCard />,
  contact: <ContactCard />,
  blog: <BlogCard />,
};

const MODALS: Record<
  PanelId,
  { node: React.ReactNode; size: "md" | "lg" | "xl"; tall?: boolean }
> = {
  about: { node: <AboutModal />, size: "lg" },
  works: { node: <WorksModal />, size: "xl", tall: true },
  services: { node: <ServicesModal />, size: "lg" },
  career: { node: <CareerModal />, size: "xl" },
  skills: { node: <SkillsModal />, size: "lg" },
  contact: { node: <ContactModal />, size: "md" },
  blog: { node: <BlogModal />, size: "lg" },
};

export default function PortfolioDashboard() {
  const [order, setOrder] = useState<PanelId[]>(defaultOrder);
  const [focused, setFocused] = useState<PanelId | null>(null);
  const [open, setOpen] = useState<PanelId | null>(null);
  // the modal stays mounted through its exit animation, so it needs to keep
  // rendering the last panel's content after `open` goes back to null
  const [lastOpen, setLastOpen] = useState<PanelId>("about");
  const [dragging, setDragging] = useState<PanelId | null>(null);

  const sensors = useSensors(
    // a short distance threshold keeps a click from registering as a drag
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      // Space picks a card up; Enter stays free for opening the modal
      keyboardCodes: {
        start: ["Space"],
        cancel: ["Escape"],
        end: ["Space"],
      },
    }),
  );

  const rearranged = useMemo(
    () => order.some((id, i) => id !== defaultOrder[i]),
    [order],
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDragging(event.active.id as PanelId);
    setFocused(null);
  };

  // reorder live so the grid re-packs under the pointer — that re-pack *is*
  // the drop-zone indication
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrder((prev) => {
      const from = prev.indexOf(active.id as PanelId);
      const to = prev.indexOf(over.id as PanelId);
      if (from === -1 || to === -1) return prev;
      return arrayMove(prev, from, to);
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDragging(null);
    if (!over || active.id === over.id) return;
    setOrder((prev) => {
      const from = prev.indexOf(active.id as PanelId);
      const to = prev.indexOf(over.id as PanelId);
      if (from === -1 || to === -1) return prev;
      return arrayMove(prev, from, to);
    });
  };

  // sidebar: first press focuses the card, a second press opens it
  const handleSelect = useCallback(
    (id: PanelId) => {
      if (focused === id) {
        setLastOpen(id);
        setOpen(id);
        return;
      }
      setFocused(id);
    },
    [focused],
  );

  // Escape clears focus mode when no modal is in the way
  useEffect(() => {
    if (open || !focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, focused]);

  const activePanel = panelById[lastOpen];

  return (
    <>
      {/* rendered as a sibling, not a child: inside <main> it is a positioned
          element and would paint over the unpositioned sidebar, swallowing its
          clicks. Behind <main> it cannot reach anything. */}
      <DashboardBackground />

      <main
        data-dashboard
        className="relative z-10 flex h-dvh w-full flex-col gap-3 overflow-hidden p-3 lg:flex-row lg:gap-5 lg:p-5"
      >
        <Sidebar
          focused={focused}
          onSelect={handleSelect}
          onReset={() => setOrder(defaultOrder)}
          rearranged={rearranged}
        />

        <DndContext
          // a stable id keeps dnd-kit's generated aria-describedby ids identical
          // on the server and the client, avoiding a hydration mismatch
          id="bento-grid"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setDragging(null)}
        >
          <SortableContext items={order} strategy={rectSortingStrategy}>
            <section
              aria-label="portfolio panels"
              data-dragging={dragging || undefined}
              className={`grid min-h-0 flex-1 grid-cols-2 grid-rows-4 gap-2.5 lg:grid-cols-12 lg:grid-rows-6 lg:gap-3 ${
                dragging ? "grid-dragging" : ""
              }`}
              style={{ gridAutoFlow: "row dense" }}
            >
              {order.map((id) => (
                <BentoCard
                  key={id}
                  panel={panelById[id]}
                  focused={focused === id}
                  onOpen={() => {
                    setLastOpen(id);
                    setOpen(id);
                  }}
                  onFocus={() => setFocused(id)}
                >
                  {CARDS[id]}
                </BentoCard>
              ))}
            </section>
          </SortableContext>

          {/* The overlay is removed the moment the card is dropped rather than
            after a drop animation: the grid has already re-packed live during
            the drag, so there is nothing left to animate towards — and tying
            the overlay's removal to an animation completing risks stranding a
            floating card on top of the dashboard. */}
          <DragOverlay dropAnimation={null}>
            {dragging ? (
              <article
                data-overlay
                data-rows={panelById[dragging].span.row}
                className="bento-card group/card h-full w-full"
              >
                <CardContent panel={panelById[dragging]}>
                  {CARDS[dragging]}
                </CardContent>
              </article>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* compact footer strip — the sidebar footer only exists on large screens */}
        <div className="flex shrink-0 items-center justify-center gap-3 lg:hidden">
          {rearranged && (
            <button
              type="button"
              onClick={() => setOrder(defaultOrder)}
              className="label rounded-md border border-line px-2 py-1 text-muted transition-colors duration-150 hover:text-ink"
            >
              reset layout
            </button>
          )}
          <p className="label text-faint">© 2026 ron deniele d. paragoso</p>
        </div>

        <Modal
          open={open !== null}
          onClose={() => setOpen(null)}
          index={activePanel.index}
          label={activePanel.label}
          blurb={activePanel.blurb}
          size={MODALS[activePanel.id].size}
          tall={MODALS[activePanel.id].tall}
        >
          {MODALS[activePanel.id].node}
        </Modal>
      </main>
    </>
  );
}

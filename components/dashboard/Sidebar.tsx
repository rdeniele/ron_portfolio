"use client";

import Image from "next/image";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { panels, type PanelId } from "@/lib/dashboard";
import { identity } from "@/lib/site";

type SidebarProps = {
  focused: PanelId | null;
  onSelect: (id: PanelId) => void;
  onReset: () => void;
  rearranged: boolean;
};

export default function Sidebar({
  focused,
  onSelect,
  onReset,
  rearranged,
}: SidebarProps) {
  return (
    <aside className="flex shrink-0 gap-3 lg:h-full lg:w-[13.5rem] lg:flex-col lg:gap-0 xl:w-[15rem]">
      {/* profile */}
      <div className="flex min-w-0 items-center gap-3 lg:block">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-sunk lg:h-auto lg:w-full lg:rounded-xl lg:pb-[108%]">
          <Image
            src={identity.portrait}
            alt="portrait of ron deniele d. paragoso"
            fill
            sizes="(max-width: 1023px) 44px, 240px"
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="min-w-0 lg:mt-3.5">
          <h2 className="truncate font-serif text-lead leading-tight text-ink lg:whitespace-normal lg:text-title">
            ron deniele
            <span className="lg:block"> d. paragoso</span>
          </h2>
          <p className="label mt-1 hidden text-faint lg:block">
            {identity.roleLine}
          </p>
        </div>

        <div className="ml-auto lg:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* controls — these focus a card rather than navigating anywhere */}
      <nav
        aria-label="dashboard panels"
        className="flex min-w-0 flex-1 gap-1 overflow-x-auto lg:mt-6 lg:flex-col lg:gap-0.5 lg:overflow-visible"
      >
        {panels.map((panel) => {
          const active = focused === panel.id;
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => onSelect(panel.id)}
              aria-pressed={active}
              className={`group/nav flex shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-left transition-[background-color,color] duration-150 active:scale-[0.98] lg:w-full lg:shrink ${
                active
                  ? "bg-accent-soft text-accent-ink"
                  : "text-muted hover:bg-sunk hover:text-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className={`label hidden tabular-nums transition-colors duration-150 lg:inline ${
                  active ? "text-accent-ink" : "text-faint"
                }`}
              >
                {panel.index}
              </span>
              <span className="label">{panel.label}</span>
              <span
                aria-hidden="true"
                className={`label ml-auto hidden transition-opacity duration-150 lg:inline ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                &#8594;
              </span>
            </button>
          );
        })}
      </nav>

      {/* footer strip — no traditional footer, just the essentials */}
      <div className="hidden lg:mt-auto lg:block lg:pt-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={onReset}
            disabled={!rearranged}
            className="label rounded-md border border-line px-2.5 py-2 text-muted transition-[opacity,border-color,color,transform] duration-150 hover:border-line-strong hover:text-ink active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
          >
            reset layout
          </button>
        </div>

        <p className="label mt-3 leading-relaxed text-faint">
          drag cards to rearrange
          <span className="mt-0.5 block">
            © 2026 ron deniele d. paragoso
          </span>
        </p>
      </div>
    </aside>
  );
}

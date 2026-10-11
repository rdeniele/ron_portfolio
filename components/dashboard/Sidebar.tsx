"use client";
import Link from "next/link";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { disciplines, type Discipline, type Panel, type PanelId } from "@/lib/dashboard";
type SidebarProps = { panels: Panel[]; discipline: Discipline; focused: PanelId | null; onSelect: (id: PanelId) => void; onReset: () => void; rearranged: boolean; };
export default function Sidebar({discipline, onReset, rearranged}: SidebarProps) {
  return <aside className="forge-topbar">
    <div className="forge-brand">
      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 28h31l-5 7H17l-3-4H9Zm9 7h14v7H18ZM7 28v-6h10v6m6-15 9-8 8 9-9 8Z" fill="currentColor"/><path d="m28 18-9 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
      <div><p>The Forge</p><span>ron deniele&apos;s creative workshop</span></div>
    </div>
    <nav aria-label="disciplines" className="forge-disciplines">
      {disciplines.map(d=><Link key={d.id} href={d.path} aria-current={d.id === discipline.id ? "page" : undefined}>{d.nav}</Link>)}
    </nav>
    <div className="forge-toolbar">
      <button type="button" onClick={onReset} disabled={!rearranged} className="forge-reset" aria-label="reset layout" title="Reset object menu order"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 8a8 8 0 1 1-1 8M5 3v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <ThemeToggle />
    </div>
  </aside>;
}

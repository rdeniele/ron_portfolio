import type { PanelId } from "@/lib/dashboard";

export default function ForgeItem({ id }: { id: PanelId }) {
  return <span aria-hidden="true" className="forge-item" style={{backgroundImage: `url('/forge/item-${id}.webp')`}} />;
}

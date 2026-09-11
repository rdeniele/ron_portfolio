import { blogPosts } from "@/lib/blog";
import { experience, services, skillGroups, works } from "@/lib/site";

export type PanelId =
  | "about"
  | "works"
  | "services"
  | "career"
  | "skills"
  | "contact"
  | "blog";

export type Panel = {
  id: PanelId;
  /** editorial index shown in the card header, e.g. "01" */
  index: string;
  /** mono label used in the sidebar and card header */
  label: string;
  /** one-line supporting description on the card */
  blurb: string;
  /** short right-aligned stat in the card header */
  meta: string;
  /**
   * Intrinsic footprint on the 12×6 desktop grid. Sizes travel with the card
   * when it is dragged, so a card never has to render into a frame it was not
   * designed for — the grid re-packs around it instead.
   */
  span: { col: number; row: number };
};

const webWorks = works.filter((w) => w.category === "web development & design");

export const panels: Panel[] = [
  {
    id: "about",
    index: "01",
    label: "about",
    blurb: "multidisciplinary creative — marketing, code, video, and art.",
    meta: "identity",
    span: { col: 5, row: 3 },
  },
  {
    id: "works",
    index: "02",
    label: "works",
    blurb: "selected projects across four disciplines.",
    meta: `${works.length} projects`,
    span: { col: 7, row: 3 },
  },
  {
    id: "services",
    index: "03",
    label: "services",
    blurb: "what i take on, end to end.",
    meta: `${services.length} services`,
    span: { col: 4, row: 3 },
  },
  {
    id: "career",
    index: "04",
    label: "career",
    blurb: "how the work has stacked up so far.",
    meta: `${experience.length} companies`,
    span: { col: 4, row: 2 },
  },
  {
    id: "skills",
    index: "05",
    label: "skills",
    blurb: "development, marketing, analytics, design & video.",
    meta: `${skillGroups.reduce((n, g) => n + g.skills.length, 0)} skills`,
    span: { col: 4, row: 2 },
  },
  {
    id: "contact",
    index: "06",
    label: "contact",
    blurb: "have a project in mind?",
    meta: "open",
    span: { col: 4, row: 1 },
  },
  {
    id: "blog",
    index: "07",
    label: "blog",
    blurb: "writing on ai products, studying, and the work.",
    meta: `${blogPosts.length} posts`,
    span: { col: 4, row: 1 },
  },
];

export const panelById = Object.fromEntries(
  panels.map((p) => [p.id, p]),
) as Record<PanelId, Panel>;

/** default left-to-right reading order of the bento grid */
/**
 * Reading order of the grid. With dense auto-flow this packs to:
 * about|works across the top, then services / career+contact / skills+blog.
 */
export const defaultOrder: PanelId[] = [
  "about",
  "works",
  "services",
  "career",
  "skills",
  "contact",
  "blog",
];

export const webWorkCount = webWorks.length;

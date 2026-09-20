import { blogPosts } from "@/lib/blog";
import {
  experience,
  services,
  skillGroups,
  works,
  type WorkCategory,
} from "@/lib/site";

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
   * designed for - the grid re-packs around it instead.
   */
  span: { col: number; row: number };
};

/* ---------------------------------------------------------------------------
 * disciplines
 * one page per craft. The dashboard is identical on each; only the work it
 * shows, and the copy naming that work, changes.
 * ------------------------------------------------------------------------- */

export type DisciplineId = "web" | "video-editor" | "art";

export type Discipline = {
  id: DisciplineId;
  /** the route this page lives at */
  path: string;
  /** short label for the sidebar switcher */
  nav: string;
  /** how the discipline is named in full */
  label: string;
  /** the slice of `works` this page shows */
  category: WorkCategory;
  /** one line under the works card, and the splash sub-label */
  blurb: string;
  /** page title */
  title: string;
  description: string;
};

export const disciplines: Discipline[] = [
  {
    id: "web",
    path: "/web",
    nav: "web",
    label: "web development & design",
    category: "web development & design",
    blurb: "sites and web apps, designed and built end to end.",
    title: "web developer & designer",
    description:
      "web development and design work by ron deniele d. paragoso: landing pages, web apps, and front-end builds for clients and products.",
  },
  {
    id: "video-editor",
    path: "/video-editor",
    nav: "video",
    label: "video editing",
    category: "video editing",
    blurb: "ads, demos, and long-form edits, cut for pace.",
    title: "video editor",
    description:
      "video editing work by ron deniele d. paragoso: ads, app demos, ugc-style edits, and podcast cuts.",
  },
  {
    id: "art",
    path: "/art",
    nav: "art",
    label: "graphics & digital art",
    category: "digital art",
    blurb: "brand graphics, publication material, and digital art.",
    title: "graphic designer & digital artist",
    description:
      "graphics design and digital art by ron deniele d. paragoso: brand graphics, posters, and publication material.",
  },
];

export const disciplineById = Object.fromEntries(
  disciplines.map((d) => [d.id, d]),
) as Record<DisciplineId, Discipline>;

/** the discipline a visitor lands on */
export const defaultDiscipline = disciplineById.web;

/**
 * The panel set for one discipline. Only the works panel differs between
 * pages, but the whole set is built per discipline so its counts and copy stay
 * in step with whatever that page is showing.
 */
export function panelsFor(discipline: Discipline): Panel[] {
  const count = works.filter((w) => w.category === discipline.category).length;
  return basePanels.map((panel) =>
    panel.id === "works"
      ? {
          ...panel,
          blurb: discipline.blurb,
          meta: `${count} ${count === 1 ? "project" : "projects"}`,
        }
      : panel,
  );
}

const basePanels: Panel[] = [
  {
    id: "about",
    index: "01",
    label: "about",
    blurb: "multidisciplinary creative - marketing, code, video, and art.",
    meta: "identity",
    span: { col: 5, row: 3 },
  },
  {
    id: "works",
    index: "02",
    label: "works",
    // both replaced per discipline by panelsFor()
    blurb: "selected projects.",
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

export function panelsById(panels: Panel[]) {
  return Object.fromEntries(panels.map((p) => [p.id, p])) as Record<
    PanelId,
    Panel
  >;
}

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


---
name: portfolio-design
description: Design and frontend-engineering standards for this portfolio site - bold, distinctive UI, precise motion, accessibility, and a definition-of-done for shipping frontend work. Use for any component, page, layout, animation, copy hierarchy, or visual styling change in this repo.
---

# Portfolio Design

One merged point of view for this repo, built from several pasted skills (Emil Kowalski's animation-engineering notes, Anthropic's frontend-design skill, the Bencium UX Designer skill, a generic frontend-design skill, and a "conscientiousness" checklist skill). Two source skills were deliberately left out - see **Why these choices** at the bottom before re-adding them.

## Aesthetic stance

- Pick **one bold, intentional direction per surface** (e.g. editorial/magazine, brutalist/raw, warm-minimal, technical/mono) and execute it fully. Don't blend three trends into one page.
- Default to **flat, functional depth**: hierarchy comes from type scale, color contrast, and spacing - not drop shadows, gradients-for-depth, or glassmorphism used as decoration. Those effects are allowed only when the chosen direction specifically calls for them, never as a default "premium" garnish.
- Never ship by default: generic SaaS blue-on-white, purple-gradient hero clichés, Inter/Roboto/system-font-only type, or bento grids / shiny-gradient buttons / marquee logo walls used just because they read as "premium." That whole "Magic UI" toolkit is fine as a reference, not a default - see below.
- For anything that sets visual direction for a new page or section (palette, typographic identity, layout concept), propose 2–3 options with a one-line rationale each before building. Don't ask for sign-off on routine execution (exact padding values, copy tweaks, spacing nudges) - Ron is both the client and the one running this session, so batch the judgment calls, not the pixels.

## Color & type

- Two palettes: 4–5 neutral shades (background → text) and 1–3 accents (CTA, status, emphasis). Pick warm or cool neutrals on purpose, not by default.
- Avoid the default SaaS blue unless it actually fits the chosen direction.
- 2–3 typefaces max, distinctive over safe - headlines can prioritize personality, body/UI text prioritizes legibility.
- Use a real mathematical type scale (1.25×–1.333× per step) instead of ad hoc sizes.
- WCAG AA contrast (4.5:1 normal text, 3:1 large text) is a floor, not a target to hit exactly.

## Motion (always on)

- Never animate a keyboard-triggered action a user will hit dozens of times a day - it becomes friction, not delight.
- Entrances: ease-out (fast start, slow settle). Exits: ease-in. Two-way state changes: ease-in-out. Never linear except continuous loops.
- Micro-interactions (button press, toggle): 100–150ms. State changes (accordion, tab): 200–300ms. Page/modal transitions: 300–500ms. If it's UI feedback, keep it under 300ms total.
- Animate `transform`/`opacity` only - never `all`, never layout properties (`width`, `top`, `margin`) that force reflow.
- Never `scale(0)` on entrance - start from `scale(0.95)` + `opacity: 0`, not invisible-to-visible from nothing.
- Buttons get a pressed state (`:active { transform: scale(0.97) }`), not just a hover state.
- Respect `prefers-reduced-motion: reduce` - disable or drastically shorten non-essential motion.
- Full easing-curve and duration-scale reference: [MOTION.md](MOTION.md).

## Layout & responsive

- Grid/flex wrappers with `gap` for spacing, not margins piled onto children.
- Mobile-first; scale up. Reduce type hierarchy levels and sizes (~20–30%) on small screens rather than just shrinking everything uniformly.
- Touch targets ≥ 44×44px with real spacing between them.
- Generous negative space by default - cramped is a bug, not a style choice.

## Accessibility

- Full keyboard navigability, visible focus states, logical tab order.
- Semantic HTML first; `role`/`aria-*` only when semantic HTML genuinely can't express it.
- Never convey information by color alone - pair with icon, label, or text.
- Alt text on every meaningful image; decorative images get empty alt.

## Stack notes (this repo, check before assuming otherwise)

- Next.js 16 here is **not** the Next.js in most training data - read the docs under `node_modules/next/dist/docs/` before using an unfamiliar API (already required by [AGENTS.md](../../../AGENTS.md)).
- React 19, Tailwind CSS v4, no shadcn/ui, no framer-motion/motion, no @phosphor-icons/react, no sonner installed as of this writing - write plain Tailwind + CSS transitions/animations unless a library is deliberately added first. Verify with `package.json` before assuming any of these exist.
- Lint is `npm run lint` (ESLint via `eslint-config-next`) - there is no backend and no `developer-cli` in this repo.

## Definition of done

Before calling a piece of frontend work finished:

- [ ] Re-read the actual request - does the result match what was asked, not just something plausible?
- [ ] Every stated requirement checked against evidence (re-read the file, reload the page) - not from memory of having done it.
- [ ] Verified at mobile, tablet, and desktop widths.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Color contrast meets AA.
- [ ] Animations follow the Motion rules above and respect `prefers-reduced-motion`.
- [ ] No placeholder/lorem-ipsum content left behind as if it were finished.
- [ ] `npm run lint` passes.

## Why these choices

Two of the pasted source skills were left out rather than merged in:

- **"UI/UX Pro Max" skill** (glassmorphism 2.0, bento grids, marquee overlays, shiny-gradient buttons as defaults) - this directly contradicts the Anthropic frontend-design skill and the Bencium UX skill, both of which call this exact toolkit generic "AI slop" to avoid. Kept as a mental reference for what to reach for *only* when a design direction specifically wants that maximalist look - not the default.
- **Lint skill** (`developer-cli`, JetBrains inspectcode, self-contained systems) - written for a .NET backend monorepo. This repo is Next.js/React only, with no `developer-cli`; real lint command is `npm run lint`, covered above.
- **React Native skill** (bare `skillsdirectory.com` link, no content) - this repo has no mobile app. Revisit if one gets added.
- The "conscientiousness" skill (classical-Chinese-styled diligence checklist) was folded into **Definition of done** above in plain English, since its actual content - verify commitments against evidence, check completeness, check correctness, check presentation - applies to this project as general engineering discipline, not design specifically.

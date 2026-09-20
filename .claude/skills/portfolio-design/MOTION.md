# Motion reference

Load this when tuning a specific animation, not for routine work - [SKILL.md](SKILL.md) already has the always-on rules.

## Duration scale

| Use case | Duration |
|---|---|
| Lightweight (icon toggle, checkbox) | 100–150ms |
| Standard (button, card hover/press) | 150–250ms |
| State change (accordion, tab switch, dropdown) | 200–300ms |
| Page/modal/panel transition | 300–500ms |
| Anything longer | Needs a specific reason - most UI motion reads as sluggish past 500ms |

## Easing

| Situation | Curve | CSS |
|---|---|---|
| Entrance (appearing, expanding) | ease-out - fast start, gentle settle | `cubic-bezier(0.16, 1, 0.3, 1)` or `ease-out` |
| Exit (disappearing, collapsing) | ease-in - slow start, fast finish | `cubic-bezier(0.7, 0, 0.84, 0)` or `ease-in` |
| Two-way state change | ease-in-out | `ease-in-out` |
| Continuous loop (spinner, marquee) | linear | `linear` |
| Springy/bouncy feedback (drag release, toast) | spring-like overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` - use sparingly, not on every element |

Never use plain `linear` for a one-shot UI transition - it reads as mechanical. Reserve it for things that genuinely repeat forever.

## Implementation

- Prefer CSS `transition`/`@keyframes` over JS animation for anything simple (hover, focus, entrance/exit of a single element). Cheaper, and survives without a JS bundle.
- If a JS animation library is ever added to this repo (e.g. Motion for React), reserve it for orchestration a stylesheet can't do - staggered children, gesture-driven drag, layout animations - not for a single button's hover state.
- `will-change` only on the element that's actually animating, only while it's animating - don't leave it on permanently, it costs GPU memory.

## Review format

When reviewing an existing animation (yours or someone else's), use a short before/after/why table rather than a paragraph:

| Element | Before | After | Why |
|---|---|---|---|
| Modal entrance | `scale(0)` → `scale(1)`, 500ms linear | `scale(0.95) opacity:0` → `scale(1) opacity:1`, 250ms ease-out | Starting from zero reads as a glitch; linear feels mechanical; 500ms is slow for a modal |

## Quick anti-pattern check

- Is this animating a keyboard shortcut or high-frequency action? → remove it.
- Is it animating `width`/`height`/`top`/`left`/`margin`? → switch to `transform`.
- Does it start or end at `scale(0)` or `opacity: 1 → 1` (no actual opacity change)? → fix the keyframes.
- Would someone with `prefers-reduced-motion` be fine without it? → gate it behind the media query if not essential.

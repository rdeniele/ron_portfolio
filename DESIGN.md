---
name: The Forge
description: A cozy illustrated workshop with tactile timber controls and parchment portfolio panels.
colors:
  paper: "#f4e4c4"
  surface: "#fff5df"
  surface-sunk: "#f0dfba"
  ink: "#422916"
  ink-muted: "#705239"
  ink-faint: "#795d43"
  line: "#d9bd8b"
  line-strong: "#a17b4c"
  accent: "#da7c32"
  accent-ink: "#9b431b"
  accent-soft: "#f8dfaf"
  wood: "#51321f"
  wood-deep: "#2e1c15"
  gold: "#edbc68"
  sage: "#6d7d4f"
  dark-paper: "#211b16"
  dark-surface: "#34291f"
  dark-surface-sunk: "#282219"
  dark-ink: "#fff0d2"
  dark-ink-muted: "#ddc7a6"
  dark-ink-faint: "#c9b38e"
  dark-line: "#5d4932"
  dark-line-strong: "#987449"
  dark-accent: "#edaa5b"
  dark-accent-ink: "#ffbd76"
  dark-accent-soft: "#544027"
typography:
  display:
    fontFamily: "Baloo 2, ui-serif, Georgia, serif"
    fontSize: "clamp(20px, 2.2vw, 32px)"
    fontWeight: 700
    lineHeight: 1.06
  brand:
    fontFamily: "Baloo 2, ui-serif, Georgia, serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.05
  headline:
    fontFamily: "Baloo 2, ui-serif, Georgia, serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Baloo 2, ui-serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
  inventory:
    fontFamily: "Baloo 2, ui-serif, Georgia, serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  fine:
    fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 800
rounded:
  control: "12px"
  tab: "11px"
  skill: "10px"
  journal: "14px"
  inventory: "15px"
  panel: "22px"
  panel-mobile: "18px"
spacing:
  tight: "8px"
  control: "12px"
  journal: "20px"
  panel-mobile-inline: "20px"
  panel-inline: "28px"
components:
  button-toolbar:
    backgroundColor: "#3a261b"
    textColor: "#ffdc9d"
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
  button-section:
    backgroundColor: "{colors.surface-sunk}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.control}"
    rounded: "{rounded.tab}"
    padding: "10px 14px"
  button-section-selected:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
  chip-skill:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.skill}"
    padding: "10px 13px 10px 30px"
  card-journal:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.journal}"
    padding: "20px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  card-inventory:
    backgroundColor: "linear-gradient(135deg,#fff0cf,#e8ca94)"
    textColor: "#4b2e1b"
    rounded: "{rounded.inventory}"
    padding: "4px 10px 8px"
    width: "126px"
    height: "100px"
---

# Design System: The Forge

## Overview

**Creative North Star: "The Forge"**

A cozy anime blacksmith workshop gives the portfolio its material language: painted timber, amber firelight, cream parchment, brass edging, and the user's orange cat blacksmith. Illustrated objects and the supplied mascot are identity assets; the mascot is preserved as the actual character rather than replaced with a generic illustration.

Controls feel like small inventory objects, while readable detail panels feel like pages opened inside the workshop. The dark theme changes those panels to warm leather without recoloring the room artwork or timber navigation. Rounded letters and restrained lift reinforce the friendly, tactile world.

**Key Characteristics:**
- Painted workshop and supplied orange cat mascot.
- Timber framing, brass edging, parchment and leather panels.
- Baloo 2 headings paired with Nunito reading text.
- Illustrated inventory controls with visible labels.
- Brief tactile feedback and reduced motion support.

## Colors

Warm amber and orange accents sit among cream paper, brown ink, timber, and small sage details; frontmatter holds the extracted palette values.

### Primary
- **Forge Orange:** accent, accent-ink, and accent-soft warm focus, actions, selected tabs, and panel headers.
- **Brass Gold:** gold outlines the inner panel frame; amber gradients distinguish selected discipline navigation.

### Secondary
- **Sage:** sage belongs to inventory details; skill chips carry a small sage diamond.

### Neutral
- **Parchment:** paper surrounds light overlays, surface carries reading areas, and surface-sunk distinguishes resting controls.
- **Brown Ink:** ink, ink-muted, and ink-faint separate headings, prose, and supporting information.
- **Timber:** wood and wood-deep describe the brown family; header and dock use their own painted brown gradients from `app/forge.css`.
- **Leather:** the dark-prefixed palette maps to the corresponding light custom properties under the dark theme. Artwork, inventory tiles, and timber chrome retain their original colors.
- **Brass Lines:** line separates content and line-strong frames panels and controls.

**The Warm Materials Rule.** Theme changes preserve warm brown undertones and amber emphasis.

## Typography

**Display Font:** Baloo 2, using the existing serif alias and fallback stack.
**Body Font:** Nunito, with sans-serif fallbacks.

Baloo 2 supplies rounded, friendly headings; Nunito keeps compact controls and long portfolio details readable. The source aliases still say `instrument-serif` and `instrument-sans`, but `app/layout.tsx` loads Baloo 2 and Nunito. JetBrains Mono is loaded for legacy content; it does not define the forge's visible label style.

### Hierarchy
- **Display:** welcome plaque name; responsive clamp in frontmatter, overridden to 23px on tablet, 26px on mobile, and 19px on short desktop viewports.
- **Brand:** workshop title; 25px on tablet, 26px on mobile, 23px on short desktop viewports.
- **Headline:** panel title with capitalized text.
- **Title:** journal section headings, with Baloo 2 weight 600 inside panels.
- **Inventory:** category labels, reduced to 16px below the desktop breakpoint.
- **Body:** ordinary detail prose; relaxed paragraphs use the recorded body leading.
- **Fine:** panel descriptions and skill names, explicitly enlarged by the forge stylesheet.
- **Control:** section tabs use Nunito weight 800. Desktop discipline links use 14px; mobile links use 12px.

**The Rounded Voice Rule.** Use Baloo 2 for forge headings and Nunito for reading and controls.

## Layout

The dashboard is a flex column filling the dynamic viewport, with a timber header, flexible illustrated stage, inventory dock, and compact footer. Dashboard overflow is locked; detail panels own their scrolling. This viewport model is scoped to the dashboard; blog routes remain scrolling documents.

Desktop header padding is 12px 32px with a minimum height of 86px. Seven inventory tiles form a centered flex row with 12px gaps. The room fills all available viewport width and height between the header and inventory. Desktop artwork is fully contained rather than cropped: a complete 2:1 room serves ordinary screens, and a separately composed 3:1 panorama serves stages with an aspect ratio of at least 2.45. Quiet timber framing absorbs any remaining space. Each composition has its own traced object contours and matching markers. The mascot scales with the contained scene height to a maximum width of 400px. At widths below 1024px, header and inventory spacing tighten. Tall tablets from 641–1023px crop the room to fill the stage, hide scene hotspots, and enlarge the mascot.

At 640px and below, navigation wraps beneath the brand, the room uses a portrait crop centered at 50% 48%, and the inventory becomes a four-column grid with 7px gaps. The final tile spans two columns. Scene hotspots are hidden; the labelled inventory remains the route to every panel. Mobile tiles are 82px high.

Panels use maximum widths of 32rem, 48rem, or 64rem, with an internal scroll area and a default height limit of 92dvh, increased to 94dvh on mobile. Body padding commonly uses 20px horizontally, increasing to 28px at the 640px Tailwind breakpoint. Journal padding is 20px, reduced to 16px on mobile. Career details stack into a single column on mobile with horizontally scrollable career selectors.

## Elevation & Depth

Depth is material and soft: timber gradients, brass borders, inset highlights, a fine parchment texture, and diffuse brown shadows. These treatments are native to this illustrated world. The modal backdrop blurs the workshop while preserving its atmosphere. Hard offset shadows are not part of the built system.

### Shadow Vocabulary
- **Panel lift:** `0 4px 10px rgb(58 29 11 / .15), 0 24px 65px rgb(35 17 7 / .34)`; dark theme uses `0 5px 15px rgb(0 0 0 / .35), 0 24px 70px rgb(0 0 0 / .6)`.
- **Inventory rest:** `inset 0 1px #fff8e3, 0 4px 9px #1e120b55`.
- **Inventory hover:** `inset 0 1px #fff8e3, 0 8px 15px #21120866`.
- **Journal:** `0 3px 8px #4f2b160d`.

**The Tactile Lift Rule.** Interactive objects lift briefly on hover and compress on press; reading surfaces stay settled.

## Shapes

Rounded rectangles dominate: broad panel corners, smaller journal and inventory corners, compact rounded tabs, and circular hotspot pins. Panels use a 3px outer border with a 1px gold outline inset by 7px. Inventory controls use a 1px border and inset outline; the welcome plaque has a speech-like lower-left corner. Skill diamonds are CSS shapes, rather than text glyphs. Preserve those layered edges where a surface represents a physical object.

## Components

### Crafting Mascot

Six generated transparent poses form a 2.4-second hammering loop. Frames share a fixed foot baseline; the striking hammer is anchored to each room composition's anvil surface. A small glowing metal workpiece and brief impact sparks complete the action. The mascot scales to 65% of scene height on desktop, 52% on tablet, and 43% on mobile, preserving the hammer anchor and full tail. Decorative motion pauses while a panel is open. Reduced motion holds the first pose and hides impact sparks, smoke, and embers.

### Buttons
- **Toolbar:** brass-outlined dark timber buttons, 44px square with 12px corners; 40px square on mobile. Reset is dimmed when disabled.
- **Section selectors:** warm sunk surfaces, 1px strong border, 11px corners, minimum 44px height. Selection uses accent-soft, ink, accent-ink border, and a subtle inset shadow.
- **Chapter arrows:** About and Services use previous/next controls instead of section selectors. The rounded 48×44px buttons flank a live page counter, use inline SVG chevrons, and wrap through all pages. The existing journal heading names the current page.
- **Close control:** 44px square surface button with an inline SVG cross; hover strengthens its border and ink.
- **Feedback:** panel controls use 150ms ease-out transitions and press scale .98. Global focus uses a 3px amber outline with 4px offset; scene controls use a pale focus outline.

### Chips
- **Skills:** noninteractive rounded inventory chips with a 1px line border, accent-soft fill, and a small sage diamond. Text remains fine-sized panel prose. They do not imply a selected or editable state.

### Cards / Containers
- **Journal:** surface fill, line border, 14px corners, subtle brown shadow, and room for content.
- **Panel:** themed reading surface, rounded brass frame, textured fill, accent-soft header, and separately scrolling body. Escape, backdrop, and close control dismiss it; focus is trapped and restored.
- **Project cards:** 2px strong border, 16px corners, surface fill, soft shadow, and accent-soft caption area. Project screenshots retain their original colors.

### Navigation

Discipline links sit inside a rounded dark inset timber strip. The active route is an amber gradient with dark brown text, an inset highlight, and a small diffuse shadow. Hover lifts 2px; press scales to .97. Mobile links fill a second header row.

### Illustrated Inventory

Each draggable tile pairs an illustrated object with its category label. Hover lifts 5px, press scales to .97, and focus marks its edge. A dragged placeholder fades to .25 opacity; an illustrated preview follows the pointer while siblings reposition over 320ms. Enter opens a panel; Space starts keyboard rearrangement. Artwork remains the real project asset; sidecar samples represent the tile frame without substituting another illustration.

### Workshop Objects

Desktop scene objects carry cream sticker contours traced around the painted silhouettes, rather than word badges. Outlines scale with the artwork while keeping a 5px stroke. Hover or keyboard focus brightens the outline to 7px and reveals a parchment caption. Small star markers remain as secondary cues. The rear three-quarter orange cat faces upper left toward the forge and opens the profile. Four generated, foot-aligned transparent frames cycle over 4 seconds with subtle breathing. Flames, glow, embers and softly drifting smoke align with each room composition. Opening a panel pauses this decorative motion. Reduced motion freezes the cat on its first frame, stops flame/glow animation, hides smoke and embers, and suppresses transitions. Modal entry lasts 260ms, with a 12px rise and scale from .96; exit lasts 220ms. These effects support the material rather than competing with it.

No local input primitive is present in the sampled forge components. The contact form is an external Typeform embed; its field design is not a house input specification.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied orange cat mascot and the illustrated workshop's warm material character.
- **Do** pair Baloo 2 headings with Nunito reading text and controls.
- **Do** use parchment or leather panels with brass edging and diffuse brown depth.
- **Do** keep inventory labels available when responsive cropping hides scene objects.
- **Do** preserve visible focus, internal panel scrolling, and reduced motion behavior.

### Don't:
- **Don't** apply the old orange duotone treatment to project screenshots; the forge explicitly disables it.
- **Don't** replace the supplied mascot with a generic character or font icon.
- **Don't** shrink scene hotspots to serve as the only mobile navigation.
- **Don't** inherit tiny metadata, decorative kickers, or text-glyph arrows as reusable design primitives.

Not canonized: existing 8–11px metadata and footer text, legacy uppercase micro-labels, and contact text-arrow icons remain implementation drift rather than recommended patterns. The loaded legacy font aliases and viewport theme-color metadata also retain older naming or colors. This documentation records the finished forge; it does not repair source.

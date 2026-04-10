# GKTK foundation system brief

Read these files before writing any code, in this order:
1. `CLAUDE.md` — five design principles. They override everything.
2. `docs/visual-identity.md` — single source of truth for every token, color, surface, type scale, spacing value, motion curve, and act-by-act background spec. Do not invent values. Every number comes from this file.
3. `docs/surface-spec.md` — the complete visionOS texture stack implementation spec for all glass surfaces. Read this file in full before building any surface component.

Then read this brief. It tells you what to build and in what order.

---

## Overview

Build the foundation layer: the reusable design system infrastructure that every section of the pitch will compose from. No sections. No content. Just the system.

Work in phases. Complete each phase and add it to the playground page before starting the next. Do not build everything and assemble at the end.

---

## Phase A: surface system and environment

Build these first. Everything else depends on them.

### A1. Design tokens

Export all tokens from `docs/visual-identity.md` as CSS custom properties and/or a TypeScript tokens file:

- Colors: background (#F9F9F9), all surface levels (0-3), brand amber (#FBB931), orange (#FF9424), all text colors (neutral 950 through disabled), interaction states (error, success, disabled, hyperlink).
- Spacing: 4px base, all named steps (xs through 4xl) from section 4.1.
- Border radius: from section 4.2.
- Animation curves: from section 7.1 (ease-smooth, ease-sharp, ease-spring, ease-spring-heavy).
- Shadows: per surface level from section 2.2.
- Blur and saturate: per surface level from section 2.2.

### A2. Mesh gradient background

The ambient environment. Full viewport. Always present behind everything.

4 overlapping radial gradients at different positions using warm tones (start with subtle variations around the #F9F9F9 base, e.g. very faint warm peach, cream, pale gold), with its own noise grain overlay at very low opacity. Slow ambient animation on a 20-30 second cycle. The motion should be barely perceptible, just enough to feel alive.

This is what the glass surfaces frost against. Without it, the surfaces are invisible.

### A3. Surface components

Follow `docs/surface-spec.md` exactly. Build the `<Surface>` component with all five visionOS texture layers for Level 1 and Level 2, and the opaque treatment for Level 3.

### A4. Playground checkpoint

Create a playground page. At this point it shows:
- The mesh gradient background, active and animated.
- One Level 1 panel and one Level 2 panel over the background, with all five texture layers visible.
- One Level 3 surface.
- The panels should contain placeholder text so you can see the material treatment is working.

Stop and let me review before continuing.

---

## Phase B: typography and amber

### B1. Typography system

Google Fonts: REM (weight 600, variable) and Noto Sans JP (weights 400, 500, 600).

Implement the full type scale from `docs/visual-identity.md` section 3.2 as reusable classes or components: display, heading-1, heading-2, heading-3, body-lg, body, body-sm, label, caption, data-hero, data-label.

Each token has a defined size, line height, letter spacing, weight, and font family. Do not deviate.

Additional rules:
- `font-variant-numeric: tabular-nums` on all financial number contexts.
- Max measure for body text in panels: 72 characters.

### B2. Amber accent system

Amber (#FBB931) is an event, not a texture. Define:
- Primary button: amber background, #1E1F20 text, amber glow on hover (`box-shadow: 0 0 24px rgba(251,185,49,0.35)`).
- Amber highlight block: amber-50 (#FFFBEc) background, for key financial metric callouts only.
- Amber pulse ring: amber-100 (#FEF2C9) as barely visible pulse, for impact animations and map hotspots.
- SVG accent lines: amber stroke, drawn progressively via SVG pathLength animation.
- Never used for: text color, panel backgrounds, section backgrounds, borders, dividers, decorative patterns.

### B3. Playground checkpoint

Add to the playground page:
- Every type scale token rendered inside a Surface panel, showing the token name and its visual output.
- The amber primary button in default, hover, and active states.
- An amber SVG accent line that draws itself on load.

---

## Phase C: motion primitives

### C1. GSAP base configs

Ease presets matching `docs/visual-identity.md` section 7.1:
- ease-smooth: `cubic-bezier(0.4, 0, 0.2, 1)`, 300ms default duration.
- ease-sharp: `cubic-bezier(0.4, 0, 0, 1)`, 200ms default duration.
- ease-spring: simulated spring via GSAP.
- ease-spring-heavy: high-overshoot spring.

Standard entrance: translateY(16px) + opacity 0 to resting, 300ms, ease-smooth.
Standard exit: opacity to 0 over 150ms, ease-sharp.
Stagger utility: configurable delay between children.

### C2. Framer Motion base configs

Spring defaults: use the `visualDuration` property (this is the correct API name in Motion for React / Framer Motion v11+, not `duration`). Starting values: `visualDuration: 0.5, bounce: 0.15`.

Reusable wrappers:
- AnimatePresence with `mode="wait"` for sequential presence (one element exits completely before the next enters).
- Layout animation wrapper for spring-driven reflow when content size changes.
- Orchestrated variant pattern: parent drives children with `when: "beforeChildren"`, `delayChildren`, stagger.

### C3. Amber glow animation

From `docs/visual-identity.md` section 7.4:
- amber-bloom: box-shadow animates from `0 0 0px rgba(251,185,49,0)` to `0 0 48px rgba(251,185,49,0.25)`, then fades to 0 over 600ms.

### C4. prefers-reduced-motion

When `@media (prefers-reduced-motion: reduce)` is active: all transform animations disabled. Opacity transitions retained at 50% of standard duration. Camera movements snap to position.

### C5. Playground checkpoint

Add to the playground page:
- A button that triggers the standard entrance animation on a Surface panel.
- A button that triggers the amber-bloom glow.
- A stagger demo: 4-5 elements that enter sequentially.

---

## Phase D: navigation chrome

### D1. Hold-to-confirm button

56px circular glass button with a chevron-right icon. On press-and-hold: SVG circular progress ring fills around the button in amber (#FBB931) over 800ms. Amber glow filter intensifies as it fills. Button scales down slightly on press. On completion, fires a callback. Positioned bottom-right of the viewport.

### D2. Progress dots

8 dots at bottom center. Active: amber (#FBB931), 10px diameter. Inactive: #D8DBDF, 6px diameter. Active dot transition: ease-spring at 200ms.

### D3. Navigation arrows

Glass material (Level 1 surface), pill radius (9999px), 44px hit target. Left and right edges of viewport at vertical midpoint. 50% opacity when unavailable, full opacity when active/hovered.

### D4. Audio toggle

Top-right corner, always visible, icon-only (sound-on/sound-off), glass material surface, 44px hit target.

### D5. Playground checkpoint

Add to the playground page:
- The hold-to-confirm button, functional (hold to see ring fill, logs callback on complete).
- The progress dots, clickable to change active dot.
- The nav arrows, visible in both states (active and dimmed).
- The audio toggle.

---

## Phase E: z-layer architecture

### E1. Concrete specs (build now)

Z-index scale:
- Background layer (mesh gradient, map canvas): z-0.
- Base content: z-10.
- Level 1 panels: z-20.
- Level 2 elevated panels: z-30.
- Level 3 modals/focus: z-40.
- Navigation chrome: z-50.

Apply these z-index values to the Surface component and navigation chrome components built in earlier phases.

### E2. Design intent (do not build yet, document only)

The following depth effects are design direction for when sections are built. Do not implement them as utilities now. Just add them as a comment block or a short markdown note in the codebase so they are not forgotten:

- Background content receives slight blur when foreground is in focus (blur differential).
- During transitions, elements at different depths move at different speeds (parallax effect).
- Numbers and headings arrive with z-depth changes (scale shift + shadow intensity change), not just x/y translation.
- Caption text lives on a visually different layer than heading/number text.
- SVG accent lines feel etched into the glass, not floating on top.

These will be implemented per-section when sections are built. They are not reusable primitives.

### E3. Playground checkpoint

Add to the playground page:
- A stack of 3 elements at different z-levels (one on each surface level) with enough overlap to see the depth separation. The higher z-level elements should have visibly heavier shadows and sit in front.

---

## Phase F: accessibility baseline

- All interactive elements: minimum 4.5:1 contrast ratio. Verify the amber button (#FBB931 background with #1E1F20 text).
- Minimum touch target: 44x44px on all interactive components built above.
- Focus rings: `outline: 2px solid #1282C0; outline-offset: 3px` on all focusable elements.
- prefers-reduced-motion: already handled in Phase C.

No separate playground checkpoint. Just verify the above against what is already on the page.

---

## What not to build

- No section content. No Entry, Bridge, Map, or any pitch section.
- No responsive breakpoints beyond iPhone viewport (390px).
- No dark mode.
- No audio integration.
- No 3D models or Mapbox integration.
- No routing or page transitions between sections.
- No CMS or data layer.

---

## Formatting rules (the single canonical list, enforced in all visible text)

1. Sentence case only. No title case. No all-caps except data-label metric abbreviations (IRR, JPY, REIT).
2. No em dashes. Use commas, colons, periods, or hyphens.
3. No text-transform: uppercase or lowercase as a stylistic treatment (except data-label).
4. Brand amber is never used for text color.
5. Never center-align text.

# Prototype-to-production workflow

This document describes how approved prototypes become production components.

---

## The pipeline

```
Claude.ai (design)     Product owner's machine     Claude Code (build)
──────────────────     ──────────────────────     ──────────────────
Design prototype       Save approved file          Receive uploaded file
  inside iPhone frame  to local folder             Strip phone frame
  with variant chips   (not in repo)               Rebuild as Next.js component
                                                   Full-viewport, responsive
                                                   Only production code enters repo
```

---

## When you receive a prototype file

The product owner uploads an `.html` or `.jsx` file into the chat. This is the approved prototype. Follow these steps in order.

### Step 1: read the entire file

Do not skim. Read every line. The prototype contains exact values you must preserve.

### Step 2: identify the device frame

The prototype is wrapped in an iPhone 17 Pro device frame:
- Dark shell (`#1A1A1C`), 54px border radius.
- Metallic edge highlight via gradient pseudo-element.
- Dynamic Island (126 x 37px).
- 10px bezels, 44px inner screen radius.
- Side buttons.

**Strip all of this.** Your output is a full-viewport component, not a phone mockup. The frame exists only for design review purposes.

### Step 3: identify the variant

If the prototype has chip selectors for multiple variants, the product owner tells you which variant to build. Build only that one. Ignore the selector UI and all other variants.

### Step 4: extract every value

Extract from the prototype's CSS and inline styles:
- Color hex codes and rgba values (including alpha channels).
- Pixel spacings (margin, padding, gap, top, left, right, bottom).
- Font sizes, font weights, line heights, letter spacing.
- Border radii.
- Animation durations and delay values.
- Easing curves (cubic-bezier values).
- Gradient stops (direction, colors, percentages).
- Shadow definitions (offset, blur, spread, color).
- Backdrop filter values (blur amount, saturate amount).
- Opacity levels.
- Z-index order.
- Transform values (translateX, translateY, translateZ, scale, rotate).
- Layout positions (flex, grid, absolute positioning).

Use these exact values in your production component. Do not round `rgba(255,255,255,0.72)` to `rgba(255,255,255,0.7)`. Do not change `blur(20px)` to `blur(24px)` because it "looks better." Do not substitute `18px` for `1.125rem`. The prototype is the spec.

### Step 5: translate animations

The prototype likely uses CSS `@keyframes`. Translate these to:

- **GSAP timelines** for: complex multi-step sequences, counter animations, staggered reveals, scroll-linked or time-linked orchestration.
- **Framer Motion** for: mount/unmount transitions, layout animations, simple entrance/exit.
- **CSS keyframes** only when no GSAP/Framer equivalent exists (rare).

Preserve the exact timing, easing, and sequencing from the prototype.

### Step 6: translate fonts

The prototype loads fonts via CDN `<link>` tags (Google Fonts). Production does not use CDN link tags. Instead:

- Use `next/font/google` configured in `src/lib/fonts.ts`.
- Apply font classes via `src/app/layout.tsx`.
- The font family names, weights, and all typographic values (size, line height, letter spacing) from the prototype still apply. Only the loading mechanism changes.

### Step 7: build responsive

The prototype shows the mobile layout at 393 x 852. This is the base. Adapt up:

- **< 768px:** use the prototype layout as-is. Apply `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for content near screen edges. These values only work if `viewport-fit=cover` is set in the viewport meta tag (this is configured once in `src/app/layout.tsx`).
- **768-1199px:** increase margins to 40px, gutters to 20px. Panels breathe. Type scales slightly.
- **>= 1200px:** increase margins to 80px, gutters to 24px. Max content width 1280px, centered.

Do not add columns. Do not rearrange. Do not redesign. The layout structure stays the same; only spacing and scale change.

### Step 8: verify

Run `pnpm build`. Zero errors. Zero warnings in your new files.

Open the dev server. Set the viewport to 393 x 852 (iPhone 17 Pro dimensions in device simulation). Visually compare against the prototype. Every element, every animation, every timing must match. Full-viewport layouts are aspect-ratio-dependent, so both width and height matter.

### Step 9: report

Tell the product owner you are done. Describe what you built. Note any places where the prototype was ambiguous and you had to make a judgment call. Do not commit until told.

---

## What the prototype is not

- It is not a suggestion. It is the spec.
- It is not approximate. Every value is intentional.
- It is not flexible. If it says 24px, it is 24px.
- It is not complete in all contexts. If the prototype does not show a hover state, that does not mean "invent a hover state." It means there is no hover state, or the product owner has not decided yet. Ask.

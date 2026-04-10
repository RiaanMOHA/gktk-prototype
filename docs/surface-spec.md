# GKTK surface system specification

This file defines the complete material treatment for every glass surface in GKTK. It is the single reference for the surface system. If anything here conflicts with `docs/visual-identity.md`, this file wins for surface implementation details (visual-identity.md wins for token values like colors and shadows).

---

## The visionOS texture stack

Every glass surface (Level 1 and Level 2) must render all five layers below. Not just backdrop-filter. If any layer is missing, the surface looks flat and wrong.

### Layer 1: base fill

The rgba background color plus the backdrop-filter. Values per level:

| Level | Background | Backdrop filter |
|---|---|---|
| 1 (panel) | `rgba(255,255,255,0.70)` | `blur(20px) saturate(1.4)` |
| 2 (elevated) | `rgba(255,255,255,0.88)` | `blur(24px) saturate(1.6)` |

### Layer 2: noise grain

An SVG `feTurbulence` filter that creates a frosted material texture.

Implementation:
- Define one global SVG filter element in the document (not per-component).
- Filter uses `feTurbulence` with type="fractalNoise", a small baseFrequency (experiment in the 0.5-0.8 range), and numOctaves of 4.
- The output is composited onto the surface via a pseudo-element with `mix-blend-mode: overlay` at low opacity (8-15%, tune by eye).
- The pseudo-element covers the full surface area, sits above the base fill, below the content.

### Layer 3: specular top edge

A thin horizontal gradient along the very top edge of the panel. Simulates overhead light catching the glass.

Implementation:
- A pseudo-element or gradient overlay, positioned at the top of the panel.
- Height: 1.5px for Level 1, 2px for Level 2.
- Gradient: white at ~60% opacity on the left, fading to transparent on the right (or centered, fading to both edges).
- `pointer-events: none`.

### Layer 4: inner top glow

A soft radial gradient near the top of the panel. Creates the illusion of light hitting the glass from above.

Implementation:
- A radial gradient positioned at approximately `50% 0%` (top center) of the panel.
- White at very low opacity (~5-10%), fading to transparent within the top 30-40% of the panel height.
- Applied as a background layer or pseudo-element, below content, above the base fill.

### Layer 5: compound border

The visible border plus an inset shadow that creates a softer second border line inside the panel edge.

Implementation for Level 1:
- `border: 1px solid rgba(255,255,255,0.85)`
- `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15), 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`
- The inset shadow is the compound effect. The outer shadows are the standard elevation shadows from the visual identity spec.

Implementation for Level 2:
- `border: 1px solid rgba(255,255,255,0.95)`
- `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.20), 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)`

---

## Level 3: modal/focus surface

Level 3 is NOT glass. It is opaque.

- Background: `#FEFEFE`.
- Border: `1px solid #EDEEF1`.
- Shadow: `0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)`.
- No noise grain. No specular edge. No inner glow. No compound border inset.

---

## Component API

Build a single React component (e.g. `<Surface level={1}>`) that:
- Accepts a `level` prop (1, 2, or 3).
- Renders all appropriate layers for that level.
- Accepts children.
- Accepts standard div props (className, style, etc.) for composition.

The SVG feTurbulence filter definition should live in a global provider or layout component, rendered once, and referenced by ID in the Surface component's pseudo-elements.

---

## Testing the surfaces

The surfaces only look correct when they have content behind them to frost against. On a plain #F9F9F9 background with nothing else, the glass effect will be invisible.

When building the playground/demo: render the surfaces over the mesh gradient background (see main brief, section 4). That is the minimum environment needed to validate the material treatment.

Place a Level 1 panel and a Level 2 panel side by side (or overlapping) over the mesh gradient. The difference in translucency, blur intensity, shadow depth, and specular edge thickness should be clearly visible. If the two levels look the same, something is wrong.

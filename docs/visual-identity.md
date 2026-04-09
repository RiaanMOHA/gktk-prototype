# GKTK visual identity specification

**Version:** 1.0
**Date:** April 9, 2026
**Status:** Locked for Phase 1 build

---

## 1. Design philosophy

The GKTK visual identity is built on three principles drawn from spatial computing design:

**Materiality.** Every surface has a defined material quality — base layer, floating panel, elevated panel. Materials are communicated through translucency, shadow depth, and border treatment, not through color fills. Color is an event, not a texture.

**Depth.** The experience is spatial. The visual system must reinforce the sense of z-depth at all times. Background layers recede. Panels float. Critical data elements project forward. This depth is achieved through shadow, blur, border opacity, and subtle scale differences — never by making things dark.

**Restraint.** Amber is the only warm, saturated color in the system. It appears rarely and always means something: a primary action, a key data figure, a critical threshold crossed. Every other element earns its presence through hierarchy, not decoration.

---

## 2. Color system

### 2.1 Background

The background is always `#F9F9F9` (Base / Background). No exceptions. No dark sections, no reversed panels, no full-bleed dark interstitials. Even the most dramatic moments in the experience — the void in Act 1, the Bloomberg-terminal financials in Act 6 — are achieved through surface layering over this light base, not by switching to dark.

### 2.2 Surface hierarchy

There are four defined surface levels. Each level sits higher in the z-stack than the one below it. This hierarchy is the primary mechanism for communicating depth.

| Level | Name | Background | Border | Shadow |
|---|---|---|---|---|
| 0 | Base / background | `#F9F9F9` | None | None |
| 1 | Panel | `rgba(255,255,255,0.70)` with `backdrop-filter: blur(20px) saturate(1.4)` | `1px solid rgba(255,255,255,0.85)` | `0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` |
| 2 | Elevated panel | `rgba(255,255,255,0.88)` with `backdrop-filter: blur(24px) saturate(1.6)` | `1px solid rgba(255,255,255,0.95)` | `0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)` |
| 3 | Modal / focus surface | `#FEFEFE` (Base / White) | `1px solid #EDEEF1` (Neutral 100) | `0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)` |

**Level 1** is the standard container for all section content: persona cards, risk panels, exit path cards.

**Level 2** is used only for panels that must project prominently above the base — the financial simulator, the verdict box in Act 4, the repatriation cost reveal in Act 3.

**Level 3** is used for modal dialogs, the hotspot fact cards inside the apartment panorama, and the full-screen close (Act 8 CTA block).

The glass effect of Levels 1 and 2 requires content to sit above a textured or photographic background layer to read correctly. For sections with a plain `#F9F9F9` base beneath the panel, add a very subtle background texture or ambient gradient to the base layer so the frosted glass material is perceptible. See section 8 for act-by-act background layer specifications.

### 2.3 Brand colors

**Amber `#FBB931`**
- Always the background of the primary button.
- Used as an accent glow (`box-shadow: 0 0 24px rgba(251,185,49,0.35)`) on the primary button hover state and on key financial figures when first revealed.
- Never used as text color anywhere in the system.
- Never used as a panel fill.
- The amber scale (50–950) is used for tinted surfaces only in two cases: the amber-50 (`#FFFBEc`) background inside the financial highlight box, and the amber-100 (`#FEF2C9`) as a barely-visible pulse ring during the impact animation on Act 1 facts.

**Orange `#FF9424`**
- Used as a secondary accent on charts and data visualizations where a second data series needs differentiation from amber.
- Used for the active state of Mapbox pins not currently selected (selected pins use amber).
- Not used for buttons, text, or panel fills.

### 2.4 Text colors

| Role | Token | Hex |
|---|---|---|
| Heading | Neutral 950 | `#25272C` |
| Subheading | Neutral 900 | `#383A42` |
| Body | Neutral 800 | `#40444C` |
| Caption / label | Neutral 600 | `#5B616E` |
| Placeholder / disabled text | Interaction / Disabled | `#8E8F8F` |
| Hyperlink | Interaction / Hyperlink | `#1282C0` |

### 2.5 Interaction states

| State | Color | Application |
|---|---|---|
| Error | `#D03131` | Form validation, error toasts |
| Success | `#19B64E` | Confirmation states, successful data load |
| Disabled | `#8E8F8F` | Disabled controls, unavailable map pins |
| Hyperlink | `#1282C0` | Inline links only — never button links |

### 2.6 What amber is not used for

Amber is never used for:
- Any text, in any size, in any weight.
- Panel backgrounds, section backgrounds, or base layer backgrounds.
- Borders or dividers.
- Decorative illustration or pattern fill.
- Secondary buttons (those use the border-text-color treatment — see section 5).

---

## 3. Typography

### 3.1 Typefaces

| Role | Font | Notes |
|---|---|---|
| All headings | REM Semibold | Variable weight, set via `font-variation-settings`. Use weight 600. |
| All body, labels, captions, UI | Noto Sans JP | Covers all Japanese characters in data overlays and map labels. Use Regular (400) for body, Medium (500) for labels, SemiBold (600) for strong emphasis. |

### 3.2 Type scale

The scale is defined in `rem` units with a 16px base. Do not deviate from these values. Line heights and letter spacings are part of the specification and must not be adjusted per component without explicit instruction.

| Token | Size | Line height | Letter spacing | Weight | Role |
|---|---|---|---|---|---|
| `display` | 4.5rem / 72px | 1.05 | −0.03em | REM 600 | Act 1 impact facts (¥10 trillion, 47,000 jobs) |
| `heading-1` | 3rem / 48px | 1.1 | −0.025em | REM 600 | Section primary headings |
| `heading-2` | 2rem / 32px | 1.15 | −0.02em | REM 600 | Section subheadings, panel headings |
| `heading-3` | 1.375rem / 22px | 1.25 | −0.01em | REM 600 | Card headings, financial metric labels |
| `body-lg` | 1.125rem / 18px | 1.6 | 0 | Noto Sans JP 400 | Primary body text, guide lines |
| `body` | 1rem / 16px | 1.65 | 0 | Noto Sans JP 400 | Standard body text |
| `body-sm` | 0.875rem / 14px | 1.6 | 0 | Noto Sans JP 400 | Secondary body, card descriptions |
| `label` | 0.8125rem / 13px | 1.4 | 0.01em | Noto Sans JP 500 | UI labels, chip text, table column headers |
| `caption` | 0.75rem / 12px | 1.45 | 0.015em | Noto Sans JP 400 | Footnotes, legal copy, timestamp |
| `data-hero` | 3.5rem / 56px | 1.0 | −0.02em | REM 600 | Financial metric output values (IRR, equity multiple) |
| `data-label` | 0.8125rem / 13px | 1.4 | 0.04em | Noto Sans JP 500 | Financial metric row labels — uppercase tracking only used here |

### 3.3 Typographic rules

- Sentence case is used on all interface text, headings, labels, and button text without exception. The only exception is `data-label` tokens where metric abbreviations (IRR, JPY, REIT) are all-caps by convention, not by design choice.
- Japanese numerals with ¥ prefix use Noto Sans JP because it contains the correct ¥ glyph. Do not substitute with REM for yen figures.
- Numbers in financial tables and the simulator use `font-variant-numeric: tabular-nums` to prevent column width shifting during live updates.
- Maximum measure (line length) for body text inside panels: 72 characters. Set `max-width` on paragraph containers accordingly.
- Never apply `text-transform: uppercase` to anything except `data-label` tokens.

---

## 4. Spacing and layout

### 4.1 Spacing scale

The spacing scale is 4px based. All spacing values used in the system are multiples of 4.

```
4px   — xs    (tight inner spacing, icon gaps)
8px   — sm    (between label and value, icon padding)
12px  — md-sm (inner card padding at mobile)
16px  — md    (standard component gap)
24px  — lg    (card inner padding, section element gap)
32px  — xl    (between card groups, panel vertical padding)
48px  — 2xl   (between major content blocks within a section)
64px  — 3xl   (section to section vertical rhythm at desktop)
96px  — 4xl   (hero section top padding)
```

### 4.2 Border radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 8px | Chips, small badges, tooltip arrows |
| `radius-md` | 12px | Buttons, input fields, small cards |
| `radius-lg` | 20px | Standard panels, pain point cards, exit path cards |
| `radius-xl` | 28px | Financial simulator container, elevated panel surfaces |
| `radius-full` | 9999px | Pill buttons, avatar frames, step indicator dots |

### 4.3 Grid

**Desktop (1200px and above):** 12-column grid, 24px gutters, 80px side margins.

**Tablet (768px–1199px):** 8-column grid, 20px gutters, 40px side margins.

**Mobile (below 768px):** 4-column grid, 16px gutters, 20px side margins.

The maximum content width is 1280px. The experience is centered in the viewport above this breakpoint. Map and 3D canvas layers always fill the full viewport width regardless of content max-width.

---

## 5. Button system

### 5.1 Primary button

The primary button is the only amber-filled element in the system. It carries the full visual weight of the amber brand color.

```
background:       #FBB931
color:            #1E1F20  (Base / Black)
border:           none
border-radius:    radius-md (12px)
padding:          12px 28px
font:             label token, Noto Sans JP 500
```

**Hover state:**
```
background:       #F5A500  (Amber 600)
box-shadow:       0 0 24px rgba(251,185,49,0.35)
transform:        translateY(-1px)
transition:       all 180ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Active state:**
```
background:       #E79B00  (Amber 700)
transform:        translateY(0)
box-shadow:       none
```

**Disabled state:**
```
background:       #D8DBDF  (Neutral 200)
color:            #8E8F8F  (Interaction / Disabled)
cursor:           not-allowed
```

### 5.2 Secondary button (border)

```
background:       transparent
color:            #1E1F20  (Base / Black)
border:           1.5px solid #1E1F20
border-radius:    radius-md (12px)
padding:          11px 28px
font:             label token, Noto Sans JP 500
```

**Hover state:**
```
background:       rgba(30,31,32,0.05)
border-color:     #1E1F20
```

**Disabled state:**
```
color:            #8E8F8F
border-color:     #D8DBDF
```

### 5.3 Ghost / text button

```
background:       transparent
color:            #5B616E  (Neutral 600)
border:           none
padding:          8px 16px
font:             label token, Noto Sans JP 500
```

Used for secondary actions in panels (dismiss, view source, collapse). Hover: `color: #25272C`.

### 5.4 Icon button

```
background:       rgba(255,255,255,0.70)
border:           1px solid rgba(255,255,255,0.85)
backdrop-filter:  blur(20px)
border-radius:    radius-full
width / height:   44px
```

Used for the navigation arrows, audio toggle, and map controls. This is the glass material at radius-full.

---

## 6. Component surfaces

### 6.1 Standard panel

Standard panels use the Level 1 surface material (section 2.2). All pain point cards, exit path cards, service tier cards, and persona content use this surface.

```css
background:        rgba(255, 255, 255, 0.70);
backdrop-filter:   blur(20px) saturate(1.4);
-webkit-backdrop-filter: blur(20px) saturate(1.4);
border:            1px solid rgba(255, 255, 255, 0.85);
border-radius:     20px;
box-shadow:        0 2px 12px rgba(0, 0, 0, 0.06),
                   0 1px 3px rgba(0, 0, 0, 0.04);
padding:           32px;
```

### 6.2 Elevated panel

Used for the financial simulator, the verdict box in Act 4, and the repatriation cost reveal in Act 3.

```css
background:        rgba(255, 255, 255, 0.88);
backdrop-filter:   blur(24px) saturate(1.6);
-webkit-backdrop-filter: blur(24px) saturate(1.6);
border:            1px solid rgba(255, 255, 255, 0.95);
border-radius:     28px;
box-shadow:        0 8px 32px rgba(0, 0, 0, 0.10),
                   0 2px 8px rgba(0, 0, 0, 0.06);
padding:           40px;
```

### 6.3 Amber highlight block

Used for the single most important financial output figure (post-tax IRR in the simulator) and for the Act 1 thesis statement panel.

```css
background:        #FFFBEc;  /* Amber 50 */
border:            1px solid #FEF2C9;  /* Amber 100 */
border-radius:     12px;
padding:           20px 24px;
```

The key figure inside this block uses `data-hero` type token and Neutral 950 color. Amber tint provides context; the figure itself is in the standard heading color — never in amber.

### 6.4 Financial table rows

Tables use no panel background of their own. They sit directly on whichever surface they are placed inside. Row structure:

```
Row background (default):     transparent
Row background (hover):       rgba(237, 238, 241, 0.60)  /* Neutral 100 at 60% */
Row border (separator):       1px solid #EDEEF1  /* Neutral 100 */
Row padding:                  14px 0
Column label color:           Neutral 600  (#5B616E)
Column value color:           Neutral 950  (#25272C)
Key value (amber highlight):  applied via amber-highlight-block treatment above
```

### 6.5 Mapbox overlay panel

Map callout overlays that appear during Acts 2 and 5 use Level 1 surface material with a tighter radius:

```css
background:        rgba(255, 255, 255, 0.82);
backdrop-filter:   blur(20px) saturate(1.4);
border:            1px solid rgba(255, 255, 255, 0.90);
border-radius:     16px;
box-shadow:        0 4px 20px rgba(0, 0, 0, 0.10);
padding:           20px 24px;
max-width:         320px;
```

Map pins use amber (`#FBB931`) for the active/selected state and orange (`#FF9424`) for secondary/inactive states. Pin labels use `label` type token in Neutral 950.

### 6.6 Hotspot fact card (360 panorama)

Hotspot cards that appear inside the apartment panorama are Level 2 elevated panels with a constrained width:

```css
max-width:         280px;
/* otherwise inherits Level 2 surface material */
```

The hotspot trigger (the pulsing dot inside the panorama) uses amber at 100% opacity with a `box-shadow: 0 0 0 6px rgba(251,185,49,0.30)` pulse ring animation.

---

## 7. Motion and animation

### 7.1 Easing functions

Three easing curves are used across the entire system. No other curves are introduced.

| Name | Curve | Usage |
|---|---|---|
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Panel entrances, button hover lift, card reveal — anything with a physical, weighted feel |
| `ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Camera transitions, map flyovers, opacity fades — anything that must feel cinematic rather than bouncy |
| `ease-sharp` | `cubic-bezier(0.4, 0, 0.2, 1)` | State transitions (hover → active), data updates in the simulator, tab switches |

### 7.2 Duration scale

```
60ms   — micro     (button active press, icon state swap)
120ms  — fast      (hover state transition)
200ms  — default   (panel show/hide, tooltip, chip toggle)
350ms  — medium    (card entrance, panel slide)
500ms  — slow      (section transition, content stagger)
800ms  — cinematic (Act 1 impact facts, repatriation reveal)
```

### 7.3 Panel entrance

All panels enter the spatial layer (move from z-depth below into position) with the same pattern. This is the universal entrance for all Level 1 and Level 2 surfaces:

```
from:  opacity: 0, transform: translateY(24px) scale(0.97)
to:    opacity: 1, transform: translateY(0) scale(1.00)
duration: 350ms
easing: ease-spring
```

Staggered panels (pain point grid, service tier cards, exit path cards) use a 100ms stagger between items.

### 7.4 Act 1 — impact fact entrance

The three facts in Act 1 (¥10 trillion, 47,000 jobs, no housing) each use:

```
from:  opacity: 0, transform: scale(0.92)
to:    opacity: 1, transform: scale(1.00)
duration: 800ms
easing: ease-spring

amber-bloom: box-shadow on the text container
  from: 0 0 0px rgba(251,185,49,0)
  to:   0 0 48px rgba(251,185,49,0.25), then fades to 0 over 600ms
```

### 7.5 Financial simulator — live update

When the investor moves the exit horizon slider or switches the scenario tab, all six metric values update:

```
outgoing value: opacity fades to 0 over 60ms
incoming value: slides up 8px and fades in over 120ms
easing: ease-sharp
```

### 7.6 `prefers-reduced-motion`

When `@media (prefers-reduced-motion: reduce)` is active, all `transform` animations are disabled. Opacity transitions are retained at 50% of their standard duration. Camera movements in the Mapbox and Three.js layers snap to position rather than animating.

---

## 8. Act-by-act surface specifications

Each act defines what background layer sits beneath the glass panels. The glass material requires depth beneath it to read correctly. This section defines the base layer for each act so the Level 1 and Level 2 surfaces have the correct depth perception.

### Act 1 — Entry

Background: `#F9F9F9` base with a radial gradient overlay at the center:
```css
background: radial-gradient(ellipse 120% 80% at 50% 60%,
  #FEF2C9 0%,   /* Amber 100 — very faint warm centre */
  #F9F9F9 60%
);
```
This creates a barely-perceptible warm center that the impact facts appear to emanate from. The three facts sit directly on this base with no panel — they are part of the spatial environment, not contained in a card.

### Act 2 — Map

Background: full-viewport Mapbox canvas. The satellite/terrain map IS the background. All overlay panels float above it as Level 1 glass surfaces. The map's natural imagery gives the glass panels sufficient depth.

### Act 3 — Persona

Background: the dimmed Mapbox layer from Act 2 persists beneath a `rgba(249,249,249,0.60)` scrim. The persona panels are Level 1 glass surfaces on top of the scrim.

### Act 4 — Current options

Background: `#F9F9F9` base with a subtle `linear-gradient(180deg, #EDEEF1 0%, #F9F9F9 40%)` at the top edge — a very light gradient that anchors the top of the section. The verdict box is Level 2 elevated panel.

### Act 5, part 1 — Hardware (building and apartment)

Background: full-viewport Mapbox canvas (step 10) during the building exterior sequence. The Three.js building exterior renders as a layer over the map. The apartment panorama is full-viewport via Pannellum. All hotspot cards and navigation controls are glass surfaces above the panorama.

### Act 5, part 2 — Software (service tiers)

Background: `#F9F9F9` base. The three service tier cards are Level 1 glass surfaces. A very subtle `linear-gradient(180deg, #F9F9F9 0%, #FFFBEc 100%)` tints the section base toward amber-50 — barely perceptible but reinforces warmth as the experience moves from spatial to human.

### Act 6 — Financials

Background: `#F9F9F9` base with a `linear-gradient(135deg, #EDEEF1 0%, #F9F9F9 50%)` that creates a slightly cooler, more precise feeling — the investor has moved from exploration to analysis. The simulator is Level 2 elevated panel. The deal structure reference block is Level 1. The amber-highlight block is used for the key output metric.

### Act 7 — Risk factors

Background: same as Act 6 — the same cooler gradient continues, reinforcing the briefing-room continuity between Acts 6 and 7.

### Act 8 — Exit strategy

Background: `#F9F9F9` base transitioning to `#FFFFFF` (Neutral 50) as the section loads — the space "opens up" and brightens. The two exit path cards are Level 1. The CTA block at the footer is Level 3 (the only Level 3 surface in the experience).

---

## 9. Mapbox visual style

The Mapbox map must use a custom style that matches the light palette. The standard Mapbox Light or Streets style is not used. Requirements for the custom map style:

- Map base: `#F9F9F9` or very close equivalent
- Water: `#D8DBDF` (Neutral 200) — grey, not blue
- Roads (major): `#FEFEFE` with `#D8DBDF` stroke
- Roads (minor): `#EDEEF1`
- Buildings: `#EDEEF1` extruded to very low height — present but not competing
- Green spaces: `#E9EFF0` — desaturated
- JASM corridor highlight: amber (`#FBB931`) at 30% opacity as a fill polygon, amber at 100% as the boundary stroke
- Corporate pins: amber for selected, orange (`#FF9424`) for unselected
- Heatmap layer (population pressure): amber scale, `#FEF2C9` (Amber 100) at low density to `#F5A500` (Amber 600) at peak density

---

## 10. Three.js and 360 panorama visual integration

### 10.1 Three.js scene

The building exterior Three.js scene renders over the Mapbox canvas. To integrate visually:

- Use a `PMREMGenerator` environment map sourced from a daytime HDR — neutral sky, soft shadows
- Ambient light: `#FEFEFE` at intensity 0.6
- Directional light: `#FFF5E0` (a barely warm white) at intensity 1.2, positioned to match real Kumamoto solar angle (south-southwest at midday)
- Shadow softness: `shadow.mapSize` at 2048, `shadow.radius` at 4 — soft-edged, not hard
- The building model receives and casts shadows. The Mapbox terrain beneath it does not participate in the Three.js shadow system — use a `receiveShadow` plane at street level to fake ground shadows only.

### 10.2 Panorama viewer

The 360 apartment panorama via Pannellum uses:

- `autoLoad: true`
- `compass: false`
- `showControls: false` — navigation is handled by the GKTK UI layer
- `hfov: 100` (slightly wider than default for a more immersive feel)
- Custom hotspot CSS: amber pulse ring (see section 6.6)
- The viewer background (visible during load) is `#F9F9F9` to prevent a black flash

---

## 11. Navigation and persistent chrome

The persistent navigation chrome — back/forward arrows and audio toggle — uses the icon button surface (section 5.4): glass material, `border-radius: 9999px`, 44px hit target.

Navigation arrows are positioned at the vertical midpoint on left and right edges of the viewport. They are always visible but at 50% opacity when the current section has no previous or next act. They reach full opacity on hover or when the section transition is available.

The audio toggle is positioned at the top-right corner, always visible. Its state is communicated by icon only (sound-on / sound-off). No label.

The section progress indicator (1 through 8) is a row of 8 dots at the bottom center of the viewport. Active dot: `#FBB931` at 10px diameter. Inactive dot: `#D8DBDF` (Neutral 200) at 6px diameter. The active dot transition uses `ease-spring` at 200ms.

---

## 12. Accessibility

- All interactive elements meet a minimum 4.5:1 contrast ratio against their background. The `#FBB931` amber button background with `#1E1F20` text achieves 7.4:1.
- All amber-filled surfaces (amber highlight block, map pins) never carry meaning through color alone — they are always accompanied by a label, icon, or text value.
- The minimum touch target size is 44×44px (following Apple HIG) for all interactive elements on mobile and tablet.
- All glass panel entrances respect `prefers-reduced-motion` (section 7.6).
- Focus rings: `outline: 2px solid #1282C0; outline-offset: 3px` — the hyperlink interaction color is used for all keyboard focus indicators throughout the system.

---

## 13. What this system does not include

These are explicit exclusions to prevent scope creep in implementation:

- No dark mode. There is no dark variant of any token.
- No color themes or white-labelling — the amber/orange brand identity is fixed.
- No gradients used as decorative elements — only as very subtle base-layer depth cues as specified in section 8.
- No drop shadows on text — all shadow is applied to surfaces only.
- No border-radius values other than those defined in section 4.2.
- No animation curves other than those defined in section 7.1.
- No typefaces other than REM Semibold and Noto Sans JP.

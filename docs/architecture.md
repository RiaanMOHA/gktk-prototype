# Architecture

---

## Experience structure

The experience is a strict alternation of transitions and content sections. Every section boundary is a designed moment. A section and its transition into it are worked on together as one unit.

| # | Type | Name |
|---|---|---|
| 1 | Transition | Opening transition |
| 2 | Content | Section 1: entry |
| 3 | Transition | Entry to bridge |
| 4 | Content | Section 2: bridge |
| 5 | Transition | Bridge to map |
| 6 | Content | Section 3: map |
| 7 | Transition | Map to persona |
| 8 | Content | Section 4: persona |
| 9 | Transition | Persona to current options |
| 10 | Content | Section 5: current options |
| 11 | Transition | Current options to product (hardware) |
| 12 | Content | Section 6: product (hardware) |
| 13 | Transition | Product (hardware) to product (software) |
| 14 | Content | Section 7: product (software) |
| 15 | Transition | Product (software) to financials |
| 16 | Content | Section 8: financials |
| 17 | Transition | Financials to risk factors |
| 18 | Content | Section 9: risk factors and hedges |
| 19 | Transition | Risk factors to exit strategy |
| 20 | Content | Section 10: exit strategy |

The names in this table are internal labels, not display text. They do not appear in the UI.

---

## Opening sequence (3 beats)

**Section 1: entry**

Full viewport. Content is 6 discrete pieces, not a paragraph:

1. Heading: "Why Kumamoto, Why Now?" (title case, hero heading exception)
2. Subheading: "Japan's fastest-rising property market"
3. Fact: serviced apartments
4. Fact: TSMC / JASM semiconductor hub
5. Fact: Taiwanese engineers
6. Fact: 12-15% IRR

The MoreHarvest logo is present. No CTA. The investor taps or swipes to advance.

**Section 2: bridge**

Full viewport. Single block of body copy. No CTA. No interactive elements.

**Section 3: map (via CTA)**

The "Enter Kumamoto" CTA (title case, CTA exception) navigates the user into the map experience.

---

## Section status

| Section | Status |
|---|---|
| Opening transition | Not started |
| Section 1: entry | In progress in Claude.ai. Two layout options survive. Not yet in Claude Code. |
| Section 2: bridge | Not started. Blocked by entry approval. |
| Section 3: map | Not started. Separate map prototype exists. |
| Section 4: persona | Not started |
| Section 5: current options | Not started |
| Section 6: product (hardware) | Not started |
| Section 7: product (software) | Not started |
| Section 8: financials | Not started |
| Section 9: risk factors and hedges | Content finalized in wireframe. Concept not started. |
| Section 10: exit strategy | Not started |

---

## Map prototype

A separate project. Repo: moreharvest/interactive-map-prototype (branch: new-design). Local path: /Users/riaan/Documents/Design Files/Code Projects/map-prototype.

Five steps from this map are used in gktk-prototype:

- Step 4: government support
- Step 5: corporate investment
- Step 6: science park and grand airport
- Step 8: future outlook
- Step 10: investment properties

Do not read, clone, analyze, or take any action on the map prototype until the user explicitly asks you to work on a map section. At that point, read the map prototype code to understand its step system, data format, and rendering approach. Integrate relevant parts; do not rebuild from scratch.

---

## 3D environments

The experience will include multiple 3D environments built from measurements, blueprints, and photographs. Known possibilities:

- React Three Fiber + Three.js for building exteriors over a map canvas.
- Pannellum for 360 apartment interior panoramas.
- Shapespark (browser-based architectural walkthroughs via iframe) is under consideration.

Install 3D packages only when the user asks you to build a section that requires them. Do not pre-install.

---

## MoreHarvest logo

Two interlocking infinity-like shapes with an amber-to-orange gradient. SVG:

```svg
<svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4499 0.0119694C15.6113 -0.0472805 18.8225 1.72909 21.2495 5.09096C24.5588 9.67532 27.9048 14.2327 31.2296 18.8058C32.4795 20.5248 32.5275 21.4623 31.4681 22.8832C30.431 24.2744 28.131 24.409 27.0638 23.0429C25.3525 20.8525 23.7371 18.5861 22.0689 16.3612C19.9435 13.5269 17.8404 10.6743 15.6611 7.88283C14.2228 6.04046 12.2237 5.62871 10.0574 6.14771C8.0471 6.62921 6.79123 7.98483 6.03273 9.92507C5.13493 12.2227 6.2764 15.1016 8.03892 16.4186C10.0269 17.9039 12.7964 17.9332 14.8814 16.4992C15.9014 15.7976 16.5373 14.7911 16.9745 13.6657C17.2078 13.0653 17.3827 12.9502 17.7846 13.5153C18.6887 14.7862 19.5828 16.0661 20.5326 17.3017C21.0003 17.9103 21.0081 18.4106 20.5542 19.0181C18.1052 22.2963 14.8907 23.9403 10.7865 23.7367C4.09413 23.4037 -0.687161 17.2882 0.0809956 10.2449C0.601025 5.47683 4.73117 1.07584 8.72833 0.275594C9.62613 0.0959692 10.5295 -0.0424055 11.4499 0.0119694Z" fill="url(#paint0_linear_1_181)"/><path d="M38.6392 10.6906C37.536 9.15947 36.4132 7.61222 35.3059 6.05372C35.1116 5.78035 35.3036 5.52947 35.4622 5.29923C37.4294 2.44923 40.0638 0.693108 43.5472 0.412984C48.5926 0.00685967 52.3175 2.17098 54.645 6.60572C57.5427 12.1272 55.6505 19.0474 50.3146 22.3118C45.3844 25.3279 38.5382 23.9134 34.9136 18.7992C31.6426 14.1841 28.281 9.63422 24.9699 5.0476C23.7738 3.39085 23.7233 2.53998 24.6742 1.21773C25.6582 -0.15064 28.0515 -0.25039 29.0618 1.09736C32.1433 5.20735 35.187 9.34584 38.2496 13.4705C38.8513 14.2808 39.4583 15.0875 40.082 15.8802C42.2 18.5731 45.8651 18.9582 48.3185 16.7543C51.0208 14.327 51.2043 10.5335 48.7404 8.0431C45.6819 4.95198 40.6306 6.01285 39.0374 10.0778C38.9631 10.2676 38.9981 10.5185 38.6392 10.691Z" fill="url(#paint1_linear_1_181)"/><defs><linearGradient id="paint0_linear_1_181" x1="32.2182" y1="-2.02546e-06" x2="-2.35867" y2="4.09781" gradientUnits="userSpaceOnUse"><stop stop-color="#FBB931"/><stop offset="1" stop-color="#FF8660"/></linearGradient><linearGradient id="paint1_linear_1_181" x1="55.9996" y1="0.137327" x2="21.6733" y2="4.21983" gradientUnits="userSpaceOnUse"><stop stop-color="#FBB931"/><stop offset="1" stop-color="#FF8660"/></linearGradient></defs></svg>
```

When rendering multiple instances in the same component, suffix the gradient IDs to avoid SVG collisions (e.g., `paint0_linear_header`, `paint0_linear_footer`).

---

## Navigation chrome

Persistent across the experience:

- Back/forward arrows at vertical midpoint on left/right viewport edges. Glass material (level 1 surface), radius-full, 44px hit target. 50% opacity when no previous/next is available; full opacity when navigation is available.
- Audio toggle at top-right (deferred, scaffold only, no audio files until polish phase).
- Progress indicator: row of dots at bottom center. Active: #FBB931, 10px. Inactive: #D8DBDF, 6px. Transition: ease-spring, 200ms.

---

## Content contract

The content contract is the authoritative source for all section copy, financial data, and component structures. It lives at reference/content.md.

If the user provides an HTML wireframe instead of markdown, extract all text content into a structured markdown file with clear section markers before saving. Each section should be labeled with a level-2 heading matching the section names in the experience structure table above. Copy should be separated from structural annotations.

Never modify the content contract. If you need copy that does not exist in it, stop and ask the user.

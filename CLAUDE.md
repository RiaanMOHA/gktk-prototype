# gktk-prototype

A full-viewport, tap-driven investment pitch experience for MoreHarvest. iPhone 17 Pro is the primary device. Apple HIG is the interaction standard. The visual language is visionOS adapted to the MoreHarvest aesthetic.

This is not a scrollable website. This is not a slide deck. This is not a marketing page. Every section occupies the entire viewport. Navigation is taps, swipes, and CTAs. There is no scroll anywhere in the experience.

## Reference docs

Read the relevant doc before working on any section. Do not load all of them at once.

- @docs/architecture.md -- experience structure, section status, map and 3D notes, content contract guidance.
- @docs/visual-identity.md -- locked design system. Colors, surfaces, typography, spacing, motion, act-by-act backgrounds. Single source of truth.
- @docs/showcase-prompt.md -- showcase folder generation instructions. Read only after a commit.

## Tech stack (base install)

Scaffold with these only. Additional packages are installed per section when needed.

- Next.js 14 (App Router), React, TypeScript
- Tailwind
- GSAP (no ScrollTrigger, no Lenis -- these are permanently excluded)
- Framer Motion
- pnpm

Do not install three.js, react-three-fiber, pannellum, or any 3D/map packages until the user asks you to build a section that needs them.

## Workflow

After reading this file, scaffold the project. Then stop and ask the user which section to work on first. Do not write any section code until the user tells you what to build.

Build cycle for each section:

1. Stop and ask the user which section to build next.
2. Read @docs/architecture.md for that section's structure.
3. Read @docs/visual-identity.md for the relevant act's surface and background spec.
4. Read the content contract (reference/content.md) for that section's approved copy.
5. Stop and ask the user any clarifying questions about design, layout, or interaction before writing code.
6. Build the section.
7. Iterate based on feedback.
8. Commit only when the user explicitly says to commit. Never commit on your own.
9. Never push until the user explicitly says to push.
10. After every commit, regenerate the showcase/ folder per @docs/showcase-prompt.md.

## Scaffolding

When you first open this project:

1. Create a Next.js 14 App Router project with TypeScript using pnpm.
2. Install only the base packages listed above.
3. Set up Tailwind.
4. Load Google Fonts: REM (weight 600) and Noto Sans JP (weights 400, 500, 600).
5. Check if docs/ exists with visual-identity.md, architecture.md, and showcase-prompt.md. If any are missing, ask the user to provide them.
6. Check if reference/content.md exists. If not, ask the user to provide the content contract. If the user provides an HTML wireframe instead of markdown, extract the text content into a structured markdown file with section markers before saving.
7. Stop and ask which section to build first.

## Capitalization rules

Sentence case is the default everywhere. Sentence case means: capitalize the first word of a sentence and proper nouns. Everything else is lowercase.

Two exceptions where title case is used instead:

- The hero heading: "Why Kumamoto, Why Now?"
- CTA button labels: "Enter Kumamoto"

Metric abbreviations (IRR, JPY, REIT) appear in all-caps by convention in data labels only. This is not a design choice; it is financial notation.

Never apply `text-transform: uppercase` or `text-transform: lowercase` to any element. Never set an entire string in all-caps or all-lowercase as a stylistic treatment.

## Copy rules

- No em dashes. Use commas, colons, periods, or hyphens.
- No contractions. Write "do not" not "don't."
- No emojis.
- No yen symbols in body copy. Write "2 billion yen." Yen symbols are acceptable in data tables and financial metric displays.
- No Tesla analogy anywhere.
- "MOHA" is always written as "Moha Intel."
- "MoreHarvest" is one word, capital M capital H.
- Banned property names that must never appear: "Ozu," "Haramizu," "Kikuyo." Use "Site 1" through "Site 5."
- Never invent or add content the user did not provide. If you need copy for a section and it is not in the content contract, stop and ask.

## Brand rules

- Amber (#FBB931) is for primary button backgrounds and accent glows only. Never use it as text color. Never use it as a panel fill or section background.
- All text is left-aligned. Never center-align text.
- Background is always #F9F9F9. No dark backgrounds, no reversed panels, no full-bleed dark sections.
- No CTA in section 1 (Entry). No CTA in section 2 (Bridge).

## Interaction rules

- No scroll. Every section is full-viewport. No scroll indicators, no smooth scroll libraries.
- Never install or use ScrollTrigger or Lenis. These are permanently banned.
- Minimum touch target is 44x44px (Apple HIG).

## Error handling

When the dev server throws an error, read the full error message and fix the root cause. Do not suppress errors with try/catch wrappers, do not add `@ts-ignore`, and do not comment out broken code. Verify the fix compiles cleanly and the section renders correctly before moving on. If you cannot fix an error after two attempts, stop and explain the problem to the user instead of spiraling.

## File rules

- Never modify files in docs/ or reference/. They are read-only.
- After every commit, update the showcase/ folder. This is mandatory.
- Never delete the showcase/ folder.

## Design context

### Users

Prospective investors evaluating a real estate opportunity in Kumamoto, Japan. They are high-net-worth individuals or institutional decision-makers. They are busy, skeptical, and financially literate. They are viewing this on a personal device (iPhone 17 Pro primary) in a private setting, likely after an introduction from MoreHarvest. The job to be done: decide whether this investment merits a deeper conversation.

### Brand personality

Precise, confident, warm. Technical authority grounded in real data, delivered with human approachability. Finance meets hospitality. Never cold, never salesy.

### Emotional arc

The investor should feel exclusive access. This is a private briefing, not a public pitch. They are seeing something others have not. Each section reveals another layer of insider knowledge. By the end, the decision to engage further should feel like a natural next step, not a pressured close.

### Aesthetic direction

visionOS is the reference. Not Apple marketing pages, but the operating system itself: frosted glass surfaces, spatial depth, layered translucency, premium restraint. Every surface has material quality. Depth is communicated through blur, shadow, and border opacity, not through darkness or saturation. The visual system rewards careful attention without demanding it.

### Anti-references

- No crypto or Web3 pitch deck energy. No hype, no FOMO, no countdown timers, no "limited spots" language, no urgency theater.
- No generic real estate patterns. No stock photos, no property listing grids, no agent headshots, no testimonial carousels, no "schedule a call" popups.

### Design principles

1. **One idea per viewport.** Each section makes exactly one point. If it requires scrolling or cramming, it has too much content.
2. **Data earns trust.** Show real numbers, real sources, real geography. The investor's confidence comes from evidence, not persuasion.
3. **Depth over decoration.** Every visual element (shadow, blur, border, spacing) reinforces spatial hierarchy. Nothing is decorative. If it does not communicate depth or importance, remove it.
4. **Amber is an event.** The only saturated color in the system appears rarely and always means something: a primary action, a key figure, a threshold crossed.
5. **Nothing they have seen before.** This is not a deck. This is not a marketing site. Every section should make the investor feel like they are inside something new, something built specifically for this opportunity. The experience itself is part of the pitch.


## Obsidian vault

- Path: /Users/riaan/Documents/personal/obsidian-vault
- After each session, write a handoff note to /Users/riaan/Documents/personal/obsidian-vault/sessions/
- Use filename format: YYYY-MM-DD-[project-name]-[topic].md

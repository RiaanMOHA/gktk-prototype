# Generate a portfolio showcase folder

You are creating a `showcase/` folder at the project root. This folder contains everything needed to build a portfolio page for this project. It is not part of the codebase - it is documentation about the codebase for portfolio use.

---

## Step 1: Research (do this before writing anything)

Gather facts. Do not write any showcase files until all research is complete.

| Task | How |
|------|-----|
| Understand the project | Read README, CLAUDE.md, any docs/ folder, package.json, and the main entry point |
| Map the architecture | Read the top-level file structure, then read index/entry files in each directory to understand module boundaries |
| Get accurate metrics | Count lines of code by language (`find . -name "*.ext" \| xargs wc -l`), count source files, count dependencies |
| Reconstruct the timeline | Run `git log --oneline --all --date-order` and group commits into logical phases |
| Identify the stack | Read dependency files (package.json, requirements.txt, Cargo.toml, etc.) and imports in entry files |
| Find the interesting parts | Identify 3-5 non-trivial engineering problems solved in the codebase by reading the most complex modules |

If any of these sources do not exist (no git history, no docs, no dependency file), skip that task and note what you could not verify. Never fabricate metrics or dates.

---

## Step 2: Add to .gitignore

Add `showcase/` to `.gitignore` if not already present.

---

## Step 3: Write these 8 files

Write every file below. Use the exact filenames. Each file starts with an h1 heading and a one-line description, then a `---` separator before the first section.

### File 1: showcase/README.md

Short guide to the folder. Three sections only: purpose (one paragraph), contents (bullet list of the other 7 files), how to use (give these files to Claude Code when building the portfolio page). Keep this under 30 lines.

### File 2: showcase/project-copy.md

All portfolio copy. Sections in this order: project title (2-6 words), tagline (under 120 chars), short summary (2-3 sentences), the problem (80-150 words, narrative), the solution (200-400 words, narrative with sub-sections), the approach (150-250 words), key results and metrics (8-15 bullet items, all verifiable numbers), my role (one sentence), tools used (bullet list), duration (date range), status (one sentence). First person. No marketing language.

### File 3: showcase/process-timeline.md

Development timeline from git history. Header: total commit count and date range. Group into 4-8 phases. Each phase: what happened, key commits, decisions made. Footer: summary table.

### File 4: showcase/technical-details.md

Architecture and engineering. Sections: technology stack table (layer, technology, why chosen), architecture pattern and file structure, codebase metrics table (all measured, not estimated), key technical challenges (3-5, non-trivial only).

### File 5: showcase/design-decisions.md

Visual and interaction design philosophy. Include only sections that apply: design system, typography, color, spacing, motion, interaction patterns, accessibility. Be honest about scope.

### File 6: showcase/features.md

Major features for portfolio presentation. Each feature: description paragraph (2-4 sentences), why it matters (1-2 sentences). 5-17 features depending on project size. Order by complexity and impressiveness.

### File 7: showcase/screenshot-guide.md

Capture instructions. Hero image (1), key screenshots (6-8 with navigation steps), screen recordings (2-3 with step-by-step scripts), processing tips (resolution, format, cropping).

### File 8: showcase/metadata.md

Portfolio CMS metadata: slug, category, tags (10-15), short description (under 160 chars), medium description (under 300 chars), thumbnail alt text, project URL, source code URL, featured boolean, sort date.

---

## Global writing rules

- Every claim must be verifiable. Mark unverified claims with "[unverified]".
- No filler. No emojis. Present tense for descriptions, past tense for timeline.
- Match showcase depth to project depth. Do not inflate small projects.

---

## When to run this prompt

1. After every commit.
2. After every /handoff.

This is mandatory. Do not skip showcase updates even for small changes.

---

## Step 4: Report back

After generating all files, state: which files were created, anything unverified, anything notable that does not fit the 8-file structure.

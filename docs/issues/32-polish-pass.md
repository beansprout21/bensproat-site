---
title: "[P0] Polish pass: phone menu button, matching button labels, fuller experience lines, small fixes"
labels: [status:ready, P0]
---

## Goal

The lead agent's Nov 9, 2026 review of the live site found one layout problem and five small inconsistencies. Fix them in one PR.

## Acceptance criteria

### 1. Menu button below 900 px

The header now has eight links plus Resume. At 375 px it wraps to three rows and is 227 px tall, over a quarter of the first screen.

- [ ] Below 900 px the header is one row: the mark and name on the left, then the Resume button and a "Menu" button on the right. The eight links are hidden until Menu is pressed.
- [ ] Pressing Menu opens a panel under the header with the eight links, one per row, each 44 px or taller, in the current order. The active page keeps its active style.
- [ ] The button is a real `<button>` with `aria-expanded` and `aria-controls`; its label switches between "Menu" and "Close". Escape closes the panel and returns focus to the button. Choosing a link closes it.
- [ ] No new npm package. A small client component is fine; keep the rest of the header a server component.
- [ ] With JavaScript off, the links are still reachable (for example a `<details>` fallback, or the links rendered and wrapped as today).
- [ ] At 900 px and up, the header is unchanged: all eight links and Resume on one row at 1280 px.
- [ ] Header height at 375 px is 72 px or less with the menu closed. Report the measured height. Screenshots at 375 (closed and open), 800 and 1280 px in the PR.

### 2. One set of live-link labels

- [ ] Every Priming live link reads "Open Priming" and every Sproat Systems live link reads "Visit Sproat Systems": `/projects`, `/hire`, `/ventures`, the project pages and the home page. "Try Sprout live" does not change. Grep for "See Priming live" and "See Sproat Systems live" and report zero matches in `content/` and `app/`.

### 3. Build with me proof tiles

- [ ] In `content/pages/ventures.yaml` `supportingProof`, the third tile gets `detail: Pipelines and an always-on server`, so all three tiles show a label and a detail. It keeps its link.

### 4. Fuller experience lines (`content/pages/hire.yaml`, shown on `/hire`, `/resume` and `/about`)

- [ ] Priming Labs `text`: "Technical co-founder, Priming Labs. I lead product and all technical work on a daily training-readiness app: the web app is in private beta and the iOS app is in TestFlight."
- [ ] Sproat Systems `text`: "Founder, Sproat Systems. AI consulting and automation for healthcare practices and small businesses: custom AI systems, plus the websites and CRMs they run on."

### 5. Impact project pages

- [ ] On project pages with `pillar: impact`, the "Stack" row is labeled "Skills". Other pillars keep "Stack". The label lives in content or a constant, not in two places.

### Quality

- [ ] 375, 800 and 1280 px on every route: no horizontal overflow.
- [ ] Lighthouse on `/` and `/projects`, mobile and desktop: all four categories 95 or higher. Report the numbers.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.

## Files in scope

- `app/_components/site-header.tsx`, `app/_components/nav-link-list.tsx`, `app/_components/active-nav-links.tsx`, a new `app/_components/nav-menu.tsx` if needed, `app/globals.css` (only for the header)
- `app/projects/[slug]/page.tsx` and the component that renders the Stack row
- `content/home.yaml`, `content/projects/priming.yaml`, `content/projects/sproat-systems.yaml`, `content/pages/ventures.yaml`, `content/pages/hire.yaml`, `content/links.yaml`, and any other content file that holds one of the old labels (list them in the PR)
- `lib/content.ts` (only if a schema needs a new field)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

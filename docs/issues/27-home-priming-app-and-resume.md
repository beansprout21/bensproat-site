---
title: "[P0] Home: aligned Selected work buttons, Priming links to app.priminglabs.com, a Resume section"
labels: [status:ready, P0]
---

## Goal

Ben's Nov 8, 2026 review of the home page:

- The Sproat Systems card's buttons break onto two lines while the other two cards keep them on one line.
- "See Priming live" should open the app at app.priminglabs.com (Ben's call; this replaces the Nov 6 rule that the site links only to priminglabs.com).
- The resume information is missing from the home page.

## Acceptance criteria

### Selected work buttons

- [ ] In each Selected work card the body is a flex column, the text grows (`flex-1`), and the link row sits at the bottom (`mt-auto`), so the three link rows line up across the cards at 1280 px.
- [ ] Shorter live-link labels in `content/home.yaml` `work.items`: Sprout "Try Sprout live" (unchanged), Priming "Open Priming", Sproat Systems "Visit Sproat Systems". At 1280 px each card's primary button and page link sit on one line.
- [ ] Same bottom-aligned link row on the `/projects` cards (`WorkCard` strip variant), so those line up too.

### Priming links

- [ ] The Priming live URL becomes `https://app.priminglabs.com` in `content/projects/priming.yaml` (the live link), `content/links.yaml` (the Priming tap target) and `content/pages/ventures.yaml` (the "See Priming live" link). Every "live" Priming link on the site then opens the app, in a new tab.
- [ ] `lib/jsonld.ts` keeps `https://priminglabs.com` as the Organization `url`. That describes the company, not a link to try the product.
- [ ] `docs/DECISIONS.md` records that Ben approved linking the app on Nov 8.

### Resume section on the home page

- [ ] New section after Selected work and before the Now line: `h2` "Resume", the lede "Three versions, one page each. Pick the one that fits." (`home.resume.lede`), then the three download cards from `/resume`, reusing the same component (strip with the number circle, label, "PDF"; the one-liner; "Updated" date; "Download PDF" button opening the PDF in a new tab). Under the cards, a link "Full resume: education, experience and skills" to `/resume`.
- [ ] The section sits on the `ground` background (Selected work keeps its `accent-tint` band, so the two do not merge).
- [ ] Copy lives in `content/home.yaml` under `resume` (`heading`, `lede`, `fullLinkLabel`).

### Quality

- [ ] 375 px and 1280 px: no horizontal overflow; on phones the three cards stack.
- [ ] Lighthouse on `/`, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/page.tsx`, `app/_components/home/*`, `app/_components/work-card.tsx`
- the `/resume` download card component (move it to `app/_components/resume-card.tsx` if it is inline in `app/resume/page.tsx`, and use it from both pages)
- `lib/content.ts`, `content/home.yaml`, `content/projects/priming.yaml`, `content/links.yaml`, `content/pages/ventures.yaml`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

The issue for draft 26 (it changes the external-link pattern and `content/links.yaml`). Merge after it.

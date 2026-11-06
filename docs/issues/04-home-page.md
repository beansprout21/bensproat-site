---
title: "[P0] Home page with the doors interaction"
labels: [status:ready, P0]
---

## Goal

`/` matches `docs/design/c2-home.html` and brief section 4.1: hero with the headshot, proof strip, four doors, selected work, now line, footer. The doors interaction behaves as specified in brief section 2: links navigate, hover and keyboard focus preview the reorder, nothing depends on JavaScript to work.

## Acceptance criteria

- [ ] Hero shows the name line, headline, sub, buttons and the headshot (`public/images/headshot.jpg`, 4:5, max 420px). The availability line renders only when `home.hero.availability` is set.
- [ ] Proof strip: three `ProofCard`s in the default order with live links first, rank numbers that follow the current order, and the "Proof, ordered for <who>" eyebrow.
- [ ] Doors: four `DoorCard` links with the exact copy and targets; the automation door opens sproatsystems.com in a new tab.
- [ ] Hover or focus on a door reorders the proof strip and work cards with the 420ms transform animation on desktop, swaps the hero primary button, and restores the default on leave or blur. Priming sits above Sproat Systems in every state except automation.
- [ ] Below 720px the cards stack in the current order without transforms.
- [ ] With JavaScript disabled every link works and the default order shows. With `prefers-reduced-motion: reduce` nothing animates.
- [ ] Selected work: three `WorkCard`s from the featured projects in the door order; "All projects" links to `/projects`.
- [ ] Now line renders only when `home.nowLine` is set.
- [ ] Metadata: title "Ben Sproat", description from `profile.headline`. Existing JSON-LD kept.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass; Lighthouse 95+ on `/` mobile and desktop; no layout shift from the headshot.

## Files in scope

- `app/page.tsx`
- `app/_components/home/**` (new)
- `app/_components/proof-card.tsx`, `door-card.tsx`, `work-card.tsx` (new, shared with other pages)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

01, 03

## Notes

- `HomeRouter` is the only client component on the page; it receives content as props and holds the `door` state. No copy strings inside it.
- Animation approach: fixed DOM order plus `translateX(calc(shift * (100% + gap)))` on desktop, `order` on phone, as in the reference file. FLIP is acceptable if dependency-free.
- The headshot file comes from issue 09; if it is not merged yet, build against a local copy and keep `next/image` sizes explicit.

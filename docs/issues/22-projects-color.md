---
title: "[P1] /projects color: square filter buttons, card header strips, a green archive table"
labels: [status:ready, P1]
---

## Goal

Ben wants the Projects page to have "more color, more detail, more life" with a lighter touch, and the builder / founder / impact filters to stop being plain white (Nov 7, 2026). Same look as the home Selected work cards (draft 19). Reference: "Projects redesign" on the C6 design canvas.

## Acceptance criteria

### Filters

- [ ] The filter links stay real links to `?pillar=` (they work without JavaScript), with `aria-current="page"` on the active one.
- [ ] Shape: `rounded-button` (8 px), `min-h-[44px]`, padding 0 18 px, JetBrains Mono 13 px, weight 600, uppercase, letter-spacing 0.08em. The pill shape (`rounded-full`) goes.
- [ ] Active: `bg-accent-strong`, white text, no border. Inactive: `bg-accent-tint`, 1.5 px `accent-line` border, ink text, and a 9 px `accent` square (2 px radius) before the label on Builder, Founder and Impact (not on All). Hover on inactive: border `accent`.

### Project cards (the `/projects` grid only)

- [ ] A new `variant="strip"` on `WorkCard` (default variant unchanged for any other use). Card: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, overflow hidden.
- [ ] Header strip, built as a reusable `app/_components/card-strip.tsx` (props: optional number, label, optional right-hand label) because drafts 23 and 24 reuse it: `bg-accent-strong`, padding 11 px 18 px, white JetBrains Mono 12 px, weight 600, uppercase, letter-spacing 0.1em. Left: a 26 px `on-dark-accent` circle with the card's position in the current list ("01", "02" …) in ink; then the pillar label from `filters` ("Builder", "Founder", "Impact"). Right: "Live" when the project has a live URL.
- [ ] Body, padding 20 px: tags as chips (JetBrains Mono 11 px, uppercase, 1 px `accent-line` border, ink text, 6 px radius), the title (`h2`, Inter Tight 23 px, 700), the summary, then links: the live link as a small primary `Button` with the external-link pattern, then the page link underlined (2 px `accent` underline, ink text).
- [ ] Hover: `translateY(-3px)` and border `accent`; none under reduced motion.

### Earlier builds

- [ ] The section sits on an `accent-tint` band with 1 px `accent-line` borders top and bottom. Next to the heading, a tag: "2017 to 2026" (white JetBrains Mono 12 px on `accent-strong`, 6 px radius). Add it as `archive.range` in `content/pages/projects.yaml`.
- [ ] Table box: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, scrolls horizontally inside its own box below 720 px (as today).
- [ ] Header row: `bg-accent-strong`, white mono labels. Body rows alternate `surface` and `#F6FAF7` (add it as `--color-accent-tint-2`), 1 px `#DCEBE1` row dividers (add as `--color-accent-divider`). Year in mono 13 px weight 600; project name weight 700.
- [ ] Status as a badge (mono 11 px, uppercase, 6 px radius, padding 4 px 8 px): Finished = `bg-accent`, white text; Prototype = `bg-accent-line`, ink text; Shelved and Retired = transparent with a 1.5 px ink border, ink text. Check contrast: white on `accent` passes; ink on `accent-line` passes.

### Quality

- [ ] 375 px and 1280 px: no horizontal overflow outside the table's own scroll box.
- [ ] Lighthouse on `/projects`, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/_components/project/project-grid-view.tsx`, `app/_components/work-card.tsx`, new `app/_components/card-strip.tsx`
- `app/projects/page.tsx` (the archive table and band)
- `app/globals.css` (the two new tokens only)
- `lib/content.ts` (`archive.range`, optional), `content/pages/projects.yaml`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

#39 (home refresh) should merge first if it is in flight, since both touch `globals.css`; otherwise none.

## Notes

- Copy is unchanged except the new "2017 to 2026" tag.
- Square theme: no fully rounded shapes except the 26 px number circle.

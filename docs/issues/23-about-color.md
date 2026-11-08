---
title: "[P1] /about color: green bricks by the title, colored thread cards, a green timeline"
labels: [status:ready, P1]
---

## Goal

Ben asked for "a couple of green Lego pieces" next to "Building since Lego", kept "cute but manly", and for the builder, founder and impact cards to stop being plain white (Nov 7, 2026). Same look as the home and Projects cards. Reference: "About redesign" on the C6 design canvas.

## Acceptance criteria

### Title and bricks

- [ ] Beside the title block (title, lede), above 720 px: an inline SVG of four stacked studded bricks in the site greens, 260 x 220 px, `aria-hidden="true"`, right-aligned in a flex row that wraps. Hidden below 721 px. Use exactly this drawing (convert attributes to JSX; colors are `accent-strong`, `#0F3D26`, `accent`, `on-dark-accent` and `accent-line`; add `#0F3D26` as `--color-accent-deep`):

```html
<svg
  aria-hidden="true"
  viewBox="0 0 260 220"
  width="260"
  height="220"
  style="flex: none"
>
  <g transform="translate(30 150)">
    <rect x="0" y="10" width="200" height="56" rx="5" fill="#175E3A"></rect>
    <rect x="0" y="54" width="200" height="12" rx="3" fill="#0F3D26"></rect>
    <rect x="16" y="0" width="30" height="14" rx="3" fill="#175E3A"></rect>
    <rect x="62" y="0" width="30" height="14" rx="3" fill="#175E3A"></rect>
    <rect x="108" y="0" width="30" height="14" rx="3" fill="#175E3A"></rect>
    <rect x="154" y="0" width="30" height="14" rx="3" fill="#175E3A"></rect>
  </g>
  <g transform="translate(76 92)">
    <rect x="0" y="10" width="146" height="50" rx="5" fill="#1F7A4A"></rect>
    <rect x="0" y="50" width="146" height="10" rx="3" fill="#175E3A"></rect>
    <rect x="14" y="0" width="28" height="14" rx="3" fill="#1F7A4A"></rect>
    <rect x="58" y="0" width="28" height="14" rx="3" fill="#1F7A4A"></rect>
    <rect x="102" y="0" width="28" height="14" rx="3" fill="#1F7A4A"></rect>
  </g>
  <g transform="translate(96 34) rotate(-8)">
    <rect
      x="0"
      y="10"
      width="96"
      height="46"
      rx="5"
      fill="#8FD4A8"
      stroke="#175E3A"
      stroke-width="2"
    ></rect>
    <rect
      x="14"
      y="0"
      width="26"
      height="14"
      rx="3"
      fill="#8FD4A8"
      stroke="#175E3A"
      stroke-width="2"
    ></rect>
    <rect
      x="56"
      y="0"
      width="26"
      height="14"
      rx="3"
      fill="#8FD4A8"
      stroke="#175E3A"
      stroke-width="2"
    ></rect>
  </g>
  <g transform="translate(206 120) rotate(14)">
    <rect
      x="0"
      y="8"
      width="40"
      height="30"
      rx="4"
      fill="#BFE0CB"
      stroke="#175E3A"
      stroke-width="2"
    ></rect>
    <rect
      x="9"
      y="0"
      width="22"
      height="11"
      rx="3"
      fill="#BFE0CB"
      stroke="#175E3A"
      stroke-width="2"
    ></rect>
  </g>
</svg>
```

- [ ] Generic studded bricks only: no LEGO name, logo or lettering on the drawing or in its markup. The title text "Building since Lego." stays as it is.

### Photos

- [ ] Both photos (the header photo and "Off the keyboard") swap the 1 px `line` border for a 7 px `accent-strong` border, same `rounded-image` radius, as on the home hero.

### Three threads

- [ ] The section sits on an `accent-tint` band with 1 px `accent-line` borders top and bottom.
- [ ] Each card: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, overflow hidden, with the same header strip as the Projects cards (draft 22): a 26 px `on-dark-accent` number circle ("01" to "03", ink) and the thread title (Builder, Founder, Impact) in white mono.
- [ ] The quote: Inter Tight 19 px, weight 700, with a 4 px `on-dark-accent` left rule and 12 px left padding.
- [ ] Bullets: an 8 px `accent` square (2 px radius) instead of the round dot; text 14.5 px.

### The short version (timeline)

- [ ] A 3 px `accent-line` vertical line runs behind the year badges, from the first to the last row.
- [ ] Each year is a badge: JetBrains Mono 13 px, weight 600, white on `accent-strong`, 6 px radius, padding 5 px 10 px; the latest year (2026) on `accent`. Row grid: 84 px year column, then the text at 16 px.

### Quality

- [ ] Copy unchanged.
- [ ] 375 px and 1280 px: no horizontal overflow; the bricks are hidden on phones.
- [ ] Lighthouse on `/about`, mobile and desktop: all four categories 95 or higher (Performance on mobile has varied 94 to 98 because of the photos; report the median of three runs).
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/about/page.tsx`, new `app/_components/about/bricks.tsx`
- `app/globals.css` (the `--color-accent-deep` token only)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

Draft 22 (Projects color): reuse its `card-strip.tsx`. Merge after it.

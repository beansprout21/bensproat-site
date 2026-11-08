---
title: "[P1] Framed page titles: green frame with an offset light-green block"
labels: [status:ready, P1, quick]
---

## Goal

Ben asked for page titles like "Projects" to be bold, with "something around it" (Nov 7, 2026). Every page title gets the same frame: a dark-green border with the offset light-green block that the home photo uses (draft 19). Reference: the C6 mockups for Projects, About, Now, Contact and Resume on the design canvas.

## Acceptance criteria

- [ ] The `type-title` utility in `app/globals.css` (used only by page `h1`s) gains the frame, so every page title gets it with no component change:
  - `width: fit-content; max-width: 100%; box-sizing: border-box`
  - `border: 3px solid var(--color-accent-strong); border-radius: var(--radius-card)` (12 px, the square theme)
  - `background: var(--color-surface); padding: 10px 22px 14px`
  - `box-shadow: 10px 10px 0 var(--color-accent-line)` above 720 px, `6px 6px 0` below
  - Font, size, weight and tracking unchanged.
- [ ] The title block keeps at least 16 px between the frame's shadow and the next element (lede or tag), on every route that uses `type-title`: `/projects`, `/projects/[slug]`, `/about`, `/now`, `/contact`, `/resume`, `/hire`, `/ventures`, the 404, and the coming-soon state.
- [ ] 375 px: a long title (the longest case-study title) wraps inside the frame with no horizontal overflow.
- [ ] The home hero headline is not a `type-title` and does not change.
- [ ] Lighthouse Accessibility stays 100 on `/projects` and `/about` (mobile).
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/globals.css`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- If a page wraps its `h1` in a flex column that stretches children, `width: fit-content` keeps the frame tight to the text; check `/now`, where the updated date sits under the title.

---
title: "[P1] One text color: grays become black (white on dark)"
labels: [status:ready, P1, quick]
---

## Goal

Ben does not want two text colors. Every gray text color on the site becomes the ink color, and the gray text on the dark footer becomes the light footer color (Ben, Nov 7, 2026). This is a site-wide token change, not a per-page edit.

## Acceptance criteria

- [ ] In `app/globals.css` `@theme`: `--color-ink-2: #15171a;` and `--color-muted: #15171a;` (same value as `--color-ink`), and `--color-on-dark-muted: #f3f2ed;` (same value as `--color-on-dark`). Keep the token names so no component file changes; add one comment line above them: "ink-2 and muted equal ink since Nov 7, 2026 (Ben: one text color)".
- [ ] No other color token changes. Accent links, the green availability dot and borders (`line`, `line-strong`) stay as they are.
- [ ] Spot-check at 1280 px and 375 px on `/`, `/projects`, `/projects/sprout`, `/about`, `/now`, `/contact`, `/resume`, `/links`: no gray body text, labels or captions remain, and the footer's mono line is light, not gray. List any element that still renders gray (for example a hard-coded hex) in the PR instead of fixing it outside scope.
- [ ] Lighthouse Accessibility stays 100 on `/` and `/projects` (mobile).
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/globals.css`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Out of scope: the share images (`lib/og.tsx`) and the resume PDFs keep their own colors.
- Lighter section bands (`ground-2`) are backgrounds, not text, and stay.

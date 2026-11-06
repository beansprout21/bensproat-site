---
title: "[P0] Design system: fonts, tokens, header, footer, base components"
labels: [status:ready, P0]
---

## Goal

The builder-craft look from `docs/brief-c3.md` section 1 exists in code: fonts via `next/font/google`, color and type tokens in `globals.css` mapped into Tailwind, and the shared components every page uses (`SiteHeader`, `SiteFooter`, `Mark`, `Button`, `ExternalLink`, `Card`, `SectionHeader`, `StatTile`, `Pill`, `Prose`). The existing stub pages render inside the new header and footer without changing their copy.

## Acceptance criteria

- [ ] Inter Tight, Inter and JetBrains Mono load through `next/font/google` with `display: swap`; no `<link>` to Google Fonts in the HTML.
- [ ] Every token in brief section 1.2 is a CSS variable in `app/globals.css` and a Tailwind color (for example `bg-ground`, `text-ink-2`, `border-line`).
- [ ] `SiteHeader` matches section 1.5: mark plus "Ben Sproat" on the left; Work, About, Now, Contact and the outlined Resume button on the right; wraps at 375px; current page link in `ink` 600.
- [ ] `SiteFooter` matches section 1.5 with the default heading, the email button, the profile links and the "built in public" mono line linking to the repo.
- [ ] `Mark` draws itself on first paint and does nothing under `prefers-reduced-motion: reduce`.
- [ ] Focus rings are visible on every link and button with keyboard focus only.
- [ ] `app/layout.tsx` uses the new header, footer and container; the skip link still works.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.
- [ ] Lighthouse 95+ on `/` and `/links` (mobile and desktop) on the Vercel preview.

## Files in scope

- `app/layout.tsx`
- `app/globals.css`
- `app/not-found.tsx`
- `app/_components/**`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Reference markup: `docs/design/c2-home.html` and `docs/design/c2-sprout.html` (read `docs/design/README.md` first). Copy exact values.
- Icons are inline stroke SVG only. No icon package, no new dependencies.
- The 404 copy is in brief section 4.11.
- Do not touch `/content` or the page files beyond wiring the layout; copy comes in issue 03.

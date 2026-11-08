---
title: "[P0] About: first person, new portrait beside the title, Experience section"
labels: [status:ready, P0]
---

## Goal

Ben's Nov 8, 2026 review of `/about`: the top of the page is written in the third person, the header photo should change, and the resume information (experience) does not appear on the page. Everything below the title already reads in the first person; this brings the top in line.

## Acceptance criteria

### First-person copy (`content/pages/about.yaml`)

- [ ] `lede`: "I build things that work, and now I build them with AI."
- [ ] `bio`: "I'm an engineering student in Penn State's Schreyer Honors College, and I build AI products. I won the FNB Challenge at HackPSU Fall 2026 with Sprout, I'm the technical co-founder of Priming Labs, and I run Sproat Systems, my AI consulting and automation practice that builds custom AI systems for healthcare practices and small businesses."
- [ ] `meta.description`: "Building since Lego. I'm Ben Sproat: I build things that work, and now I build them with AI."
- [ ] No other line on `/about` refers to Ben in the third person (check the rendered page text, not only the yaml). The share image text may stay in the third person.

### New portrait

- [ ] Copy `about-portrait.jpg` from `C:\Users\bensp\projects\_site-assets-2026-11-08\` to `public/images/about-portrait.jpg`. Before committing, its sha256 must be `f34e7e7808fcd3dcc1b6c7564a76f51a7077bae093e1cd40e57c30b4620f6946` (1200 x 1500, 4:5). Report the hash you got.
- [ ] `header.image: /images/about-portrait.jpg`, `header.alt: Ben Sproat in a blue button-up shirt against a white wall`.
- [ ] Layout: at 721 px and up, a two-column header: the title block (title, lede, bio) on the left, the portrait on the right at 4:5, about 360 px wide, with the existing 7 px `accent-strong` border and offset block, not cropped to a wide strip. Below 721 px the portrait sits under the title block, full width up to 420 px, still 4:5.
- [ ] `next/image` with `priority`, real `width`/`height` and `sizes`, so there is no layout shift (CLS 0 at 375 and 1280).
- [ ] `public/images/about-field.jpg`: delete it if nothing else references it after this change (grep the repo and say what you found).

### Experience on About

- [ ] New section after "Three threads" and before "The short version": `h2` "Experience", the same list as `/hire` (read from `content/pages/hire.yaml` `experience`, which draft 29 updates; one source, not a copy), then a link "Full resume" to `/resume`. Heading text lives in `about.yaml` (`experience.heading`, `experience.linkLabel`).
- [ ] Visual style matches the timeline section's tokens (no new colors).

### Quality

- [ ] 375 px and 1280 px: no horizontal overflow; screenshots of the header at both widths in the PR.
- [ ] Lighthouse on `/about`, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/about/page.tsx`, `app/about/opengraph-image.tsx` (only if it reads the changed fields)
- `lib/content.ts`, `content/pages/about.yaml`
- `public/images/about-portrait.jpg` (new), `public/images/about-field.jpg` (delete if unused)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

The issue for draft 29 for the Experience list content (Canyon Kids, new dates). Either order builds; merge 29 first if both are ready.

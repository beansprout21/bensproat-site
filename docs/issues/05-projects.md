---
title: "[P0] Projects index and project pages, Sprout case study"
labels: [status:ready, P0]
---

## Goal

`/projects` lists the case studies with a pillar filter and the archive table (brief section 4.5). `/projects/[slug]` renders every project from its YAML with the case-study template (brief sections 3.1 and 4.6), matching `docs/design/c2-sprout.html` for Sprout and degrading cleanly for projects without `sections`.

## Acceptance criteria

- [ ] `/projects`: H1, lede, filter pills (All, Builder, Founder, Impact) that work client-side and show everything without JavaScript, `WorkCard` grid of featured projects in `order`, and the "Earlier builds" table that scrolls horizontally at phone width.
- [ ] `/projects/sprout`: breadcrumb, title with the winner pill, one-line result, live link row (Try Sprout live, Code on GitHub, Devpost), metadata row, four stat tiles, then problem (with the three stat callouts), built (six numbered steps), how (three columns plus the four-box pipeline row), failed, results, links, footnote, in that order. Visuals section omitted while no images exist.
- [ ] `/projects/priming`, `/projects/sproat-systems`, `/projects/floating-sunglasses`, `/projects/ai-data-systems` render from the same template with their metadata, stat tiles, paragraphs and links; no empty headings.
- [ ] The Role cell is hidden while the value is "To be confirmed".
- [ ] Every external link uses `ExternalLink` (new tab, arrow icon, screen-reader note).
- [ ] Unknown slugs still return `notFound()`. `sitemap.ts` lists every project.
- [ ] Per-page metadata: title "<Project> | Ben Sproat", description = `oneLineResult`.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass; Lighthouse 95+ on `/projects` and `/projects/sprout`, mobile and desktop.

## Files in scope

- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/_components/project/**` (new)
- `app/sitemap.ts`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

#2, #4 (drafts 01 and 03)

## Notes

- The pipeline row is four boxes in a wrapping flex row with inline arrow icons between them; not a single SVG.
- Stat callouts in the problem section cite their sources in the caption text as written; no footnote links are needed.
- Footer heading on `/projects/sprout`: "Want to see the engine?" (content field `footerHeading` on the project, optional).

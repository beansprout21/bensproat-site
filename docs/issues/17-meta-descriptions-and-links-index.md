---
title: "[P1] Meta descriptions in range; index /links again"
labels: [status:ready, P1, quick]
---

## Goal

Every page's meta description is 70 to 160 characters, and the /links SEO score returns to 100 (lead agent recommendation, Nov 7, 2026: the 95+ Lighthouse rule wins over noindexing /links).

## Acceptance criteria

- [ ] Optional project field `metaDescription` added to the schema; project pages use it for `description` (page, Open Graph, Twitter) when set, else `oneLineResult`. Exact copy:
  - `sprout`: "Sprout won the FNB Challenge at HackPSU Fall 2026: a goals-first AI money coach for students, built in 24 hours with a team of AI agents."
  - `sproat-systems`: "Sproat Systems is AI consulting and automation: custom AI systems for healthcare practices and small businesses, founded in 2025."
  - `floating-sunglasses`: "Floating sunglasses: three prototypes in six weeks with a 312 s mean float against a 300 s target. PLTW capstone, team lead."
- [ ] `content/pages/projects.yaml` `meta.description`: "Case studies and earlier builds by Ben Sproat: AI products, startups, engineering prototypes and data pipelines."
- [ ] `content/now.mdx` frontmatter `description`: "What Ben Sproat is working on now: Penn State engineering, Priming Labs, Sproat Systems and this site."
- [ ] `/links` description: "Every Ben Sproat link in one place: LinkedIn, resume, Sprout, Priming Labs, Sproat Systems and email." Put it in content (a `description` field in `content/links.yaml` wrapper or a page file, whichever the loaders support with the smallest change), not in the page component.
- [ ] `/links` drops `robots: { index: false }` and returns to `sitemap.xml`. Lighthouse SEO on `/links` is 100, mobile and desktop.
- [ ] A script or one-off check in the PR lists every route's description length; all are 70 to 160.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `lib/content.ts` (optional fields only)
- `content/projects/sprout.yaml`, `sproat-systems.yaml`, `floating-sunglasses.yaml`, `content/pages/projects.yaml`, `content/now.mdx`, `content/links.yaml` or a new `content/pages/links.yaml`
- `app/projects/[slug]/page.tsx`, `app/links/page.tsx` (metadata only), `app/sitemap.ts`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- The home description (the profile headline) is in range; leave it.
- Structured data keeps using the first sentence of `oneLineResult` (no change).

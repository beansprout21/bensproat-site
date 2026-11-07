---
title: "[P0] Metadata helper: canonical, Open Graph and Twitter tags on every page"
labels: [status:ready, P0]
---

## Goal

Every route emits a canonical link, Open Graph tags and a Twitter card from one helper, as specified in `docs/brief-c5.md` section 1.

## Acceptance criteria

- [ ] `lib/metadata.ts` exports `pageMetadata({ title, description, path, type? })` returning title, description, `alternates.canonical`, `openGraph` (title, description, url, type, siteName "Ben Sproat", locale "en_US") and `twitter` (`summary_large_image`, title, description).
- [ ] Root layout sets the defaults; every page under `app/` (home, /ventures, /hire, /about, /projects, /projects/[slug], /resume, /contact, /now, /links) uses the helper with its existing title and description. Project pages use `type: "article"`.
- [ ] `/links` has `robots: { index: false, follow: true }`.
- [ ] `curl` of production `/`, `/hire` and `/projects/sprout` after merge shows `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `twitter:card` and `<link rel="canonical">` with the right page values; paste the output in the issue.
- [ ] Any description outside 70 to 160 characters is listed in the PR (copy is not rewritten).
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass; Lighthouse SEO stays 100.

## Files in scope

- `lib/metadata.ts` (new)
- `app/layout.tsx` and every `app/**/page.tsx` (metadata exports only)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Read `node_modules/next/dist/docs/` on metadata merging before writing the helper.
- Do not add `og:image` here; draft 15 adds the image files, which Next wires up automatically.

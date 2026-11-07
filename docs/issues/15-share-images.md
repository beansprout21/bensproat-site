---
title: "[P0] Share images: default and per-project Open Graph images"
labels: [status:ready, P0]
---

## Goal

A branded 1200 x 630 preview image for every page, generated at build with `next/og`, matching `docs/design/c5-og-default.png` and `docs/design/c5-og-project-sprout.png` (spec in `docs/brief-c5.md` section 2).

## Acceptance criteria

- [ ] `assets/og-fonts/` is committed with the three TTF files and the two OFL license files the lead agent placed in the working tree (do not download others).
- [ ] `app/opengraph-image.tsx` renders the default card with the headshot, the exact copy and the alt text from the brief.
- [ ] `app/projects/[slug]/opengraph-image.tsx` renders one card per project with static params; optional project fields `ogEyebrow` and `ogLine` are added to the zod schema and to the five project YAML files with the exact copy in the brief's table; fallbacks work for a project without them.
- [ ] Every image is built at build time (static), is 1200 x 630 PNG and under 300 KB; list each file size in the PR.
- [ ] Production `og:image` on `/`, `/hire` (default) and `/projects/sprout` (project card) resolves with HTTP 200 and `image/png`; paste the `curl -I` output in the issue.
- [ ] Attach the rendered default and Sprout images to the PR so Ben can compare them with the references.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass; Lighthouse unchanged.

## Files in scope

- `assets/og-fonts/**`
- `app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx` (new)
- `lib/content.ts` (two optional project fields only)
- `content/projects/*.yaml` (the two fields only)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

draft 14

## Notes

- No new npm packages: `ImageResponse` comes from `next/og`. Check `node_modules/next/dist/docs/` for `opengraph-image` and how it interacts with Cache Components.
- If the fonts are missing from `assets/og-fonts/`, label `status:blocked` and tell Ben.

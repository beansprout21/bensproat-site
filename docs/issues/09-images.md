---
title: "[P1] Images: optimized photos, covers and alt text"
labels: [status:ready, P1]
---

## Goal

The approved photos are in the repo at sane sizes and every image on the site goes through `next/image` with explicit `sizes` and alt text (brief section 1.6). Project covers appear as Ben supplies them.

## Acceptance criteria

- [ ] `public/images/headshot.jpg` (960 x 1200), `public/images/about-field.jpg` (1600 x 1067), `public/images/about-grass.jpg` (1400 x 1050) are committed from the files Ben drops into the repo folder; each under 250 KB.
- [ ] Any file in `public/images/projects/` named `<slug>.jpg` is picked up as that project's `cover`; missing covers render nothing (no placeholder boxes on the live site).
- [ ] Alt text as specified in the brief for the headshot and about photos; project covers use "<Project> screenshot".
- [ ] No layout shift on any page that shows an image (CLS 0 in Lighthouse).
- [ ] No image on the site other than the ones listed; no stock photos.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.

## Files in scope

- `public/images/**`
- `lib/content.ts` (cover lookup only)
- `next.config.ts` (image config only, if needed)
- `docs/STATE.md`

## Depends on

#2 (draft 01)

## Notes

- Ben receives the optimized files from the lead agent and copies them into `public/images/` before this issue starts. If they are not there, label `status:blocked` and tell Ben.
- Never commit the originals from the photoshoot or any photo not on the list.

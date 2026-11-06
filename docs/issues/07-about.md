---
title: "[P1] /about: story, three threads, timeline, outdoors"
labels: [status:ready, P1]
---

## Goal

`/about` tells the story in brief section 4.4: photo header, title and lede, short bio, three pillar columns, the timeline, the outdoors paragraph with the second photo, and the contact CTA. Nothing from the private list appears.

## Acceptance criteria

- [ ] Photo header uses `public/images/about-field.jpg` (3:2, max height 520px, `object-fit: cover`, explicit `sizes`), with alt text "Ben Sproat in a field at sunset".
- [ ] H1 "Building since Lego.", lede, short bio, three columns (Builder, Founder, Impact) each with the quote line, paragraph and list from the brief.
- [ ] Timeline renders as a vertical list with mono years, in the order given.
- [ ] "Off the keyboard" section shows `public/images/about-grass.jpg` beside the paragraph; stacks at phone width.
- [ ] Footer heading "Say hello." with the email button.
- [ ] Existing ProfilePage JSON-LD on `/about` is kept.
- [ ] Metadata from `content/pages/about.yaml`.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass; Lighthouse 95+ mobile and desktop.

## Files in scope

- `app/about/page.tsx`
- `app/_components/about/**` (new, if needed)
- `docs/STATE.md`

## Depends on

01, 03

## Notes

- Keep off: family and health stories, investing, net worth, contest rejections, the basketball injury, addresses, scores, the Tesla application. If any of these appear in the content file, stop and flag it.
- Photos arrive in issue 09; build against local copies if needed and keep `next/image` sizes explicit.

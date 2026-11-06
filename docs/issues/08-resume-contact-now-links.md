---
title: "[P1] /resume, /contact, /now and /links to the design"
labels: [status:ready, P1]
---

## Goal

The four utility pages are built to the design system from their content files (brief sections 4.7 to 4.10). `/resume` and `/links` work with an empty `resumes.yaml`; `/contact` hides the booking button while no URL is set.

## Acceptance criteria

- [ ] `/resume`: H1, lede, download cards from `resumes.yaml` (or the one-line "PDFs are being updated. Email me for a copy." with the mailto link while the array is empty), then the education, experience and skills summary read from the same fields `/hire` uses.
- [ ] `/contact`: H1, lede, email button, "Book a call" only when `booking` is set, profile links with `rel="me"`, the /links line, footer heading "Let's build something."
- [ ] `/now`: H1, "Updated <date>" mono line, paragraphs and bullet items from `now.mdx`.
- [ ] `/links`: small round headshot, name, one-liner, tap targets in the order from section 4.9, resume entry pointing at the default PDF or `/resume`; works without JavaScript; `/card` still redirects to `/links?src=card`.
- [ ] If a Vercel Analytics custom event can be sent on the Hobby plan with the installed package, `/links` records `links_view` with `src`; otherwise the PR says so and nothing is added.
- [ ] Metadata per page from content.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass; Lighthouse 95+ on all four pages, mobile and desktop.

## Files in scope

- `app/resume/page.tsx`
- `app/contact/page.tsx`
- `app/now/page.tsx`
- `app/links/page.tsx`
- `docs/STATE.md`

## Depends on

#2, #4 (drafts 01 and 03)

## Notes

- `/links` is the NFC card and QR landing page: tap targets at least 56px tall, one column, no hover-only affordances.
- Resume PDFs land later (lead agent builds them). Do not generate or commit any PDF in this issue.

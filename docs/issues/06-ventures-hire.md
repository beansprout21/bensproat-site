---
title: "[P1] Audience pages: /ventures and /hire"
labels: [status:ready, P1]
---

## Goal

`/ventures` (brief section 4.2) and `/hire` (brief section 4.3) are built to the design system from their content files, each with one clear next step and the live-product links first.

## Acceptance criteria

- [ ] `/ventures`: eyebrow, H1, lede, three "Now building" cards (live link first where one exists), "How I build" with both paragraphs and the four-box pipeline row, "What I'm looking for" only when `lookingFor` is set, the supporting-proof row, footer heading "Let's talk about building something." with the email button and a "Book a call" button only when `contact.booking` is set.
- [ ] `/hire`: eyebrow, H1, availability line only when set, three skill cards, evidence grid of the five featured projects in the listed order, experience list with mono dates, education block, resume picker that links to files from `resumes.yaml` or to `/resume` while a file is missing, footer heading "Let's talk."
- [ ] No copy in the page components; everything comes from `getPage()` and `getProjects()`.
- [ ] Both pages stack cleanly at 375px with no horizontal scroll.
- [ ] Metadata per page from the content file.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass; Lighthouse 95+ on both pages, mobile and desktop.

## Files in scope

- `app/ventures/page.tsx`
- `app/hire/page.tsx`
- `app/_components/pipeline-row.tsx` (shared with the Sprout page if issue 05 has not created it; coordinate in the issue comments)
- `docs/STATE.md`

## Depends on

01, 03

## Notes

- Audience order and next steps come from Positioning v1 as summarized in `docs/PLAN.md`: partners and investors get "Let's talk about building something"; recruiters get the availability line plus the resume.
- Do not print the scholarship amount. Major reads "Engineering (major to be declared)".

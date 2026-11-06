---
title: "[P1] Quality pass: Lighthouse, keyboard, reduced motion, phone widths"
labels: [status:ready, P1]
---

## Goal

Every route passes the quality bars in brief section 0 on the production deployment, and the findings are recorded so C7 (full QA with NFC and QR tests) starts from a known state.

## Acceptance criteria

- [ ] Lighthouse 95+ (Performance, Accessibility, Best Practices, SEO), mobile and desktop, on `/`, `/ventures`, `/hire`, `/about`, `/projects`, `/projects/sprout`, `/resume`, `/contact`, `/now`, `/links`. Scores posted in the PR.
- [ ] Keyboard pass: Tab reaches every link and button in a sensible order on every page; focus rings visible; the doors preview on focus.
- [ ] `prefers-reduced-motion: reduce`: no transitions or animations anywhere.
- [ ] 375px and 390px widths: no horizontal scroll on any page; the archive table scrolls inside its box.
- [ ] JavaScript disabled: every page renders its content and every link works.
- [ ] `grep -rnP '\x{2014}'` (the em dash code point) across `app`, `content`, `lib` and `docs/brief-c3.md` returns nothing.
- [ ] No phone number, street address or unapproved client name in the build output (`grep` the `.next` HTML or the deployed pages).
- [ ] Fixes for anything found, each as a small commit in this issue's PR; anything larger becomes a comment and a new draft request to the lead agent.

## Files in scope

- Any file under `app/`, `lib/` or `content/` for fixes found by the pass
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

#5, #6, #7, #8, #9, #10 (drafts 04 to 09)

## Notes

- Run Lighthouse against the Vercel preview of this PR and again against production after merge; post both.
- Do not add dependencies to fix a score; ask in the issue first.

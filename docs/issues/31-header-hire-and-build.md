---
title: "[P0] Header: add Hire me and Build with me"
labels: [status:ready, P0, quick]
---

## Goal

Ben's Nov 8, 2026 review: the hiring page (`/hire`) and the building page (`/ventures`) are reachable only from the home doors. Both belong in the header.

## Acceptance criteria

- [ ] `navItems()` in `app/_components/site-header.tsx` becomes, in order: Home (`/`), Work (`/projects`), Hire me (`/hire`), Build with me (`/ventures`), About, Now, Contact, All my links (`/links`), followed by the Resume button. The labels match each page's `meta.title` (`hire.yaml` "Hire me", `ventures.yaml` "Build with me"). Read them from content the way the `/links` label is read, not as hard-coded strings.
- [ ] The active state works on `/hire` and `/ventures`.
- [ ] At 1280 px the header fits on one row. If it does not, reduce the gap between items (no smaller than 44 px targets and 15 px text) before letting it wrap. Report which you did. At 375 and 900 px it wraps cleanly with no horizontal overflow. Put screenshots at 375, 900 and 1280 px in the PR.
- [ ] Lighthouse on `/` and `/hire`, mobile and desktop: all four categories 95 or higher. Report the numbers.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.

## Files in scope

- `app/_components/site-header.tsx`, `app/_components/nav-link-list.tsx`, `app/_components/active-nav-links.tsx`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

#63 (draft 30), which also edits the header. Start from `main` after #63 merges.

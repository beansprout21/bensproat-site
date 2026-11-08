---
title: '[P2] Copy: "What I''m looking for" on /ventures and the home now line'
labels: [status:ready, P2, quick]
---

## Goal

Two owed fields get their copy (lead agent wording, Ben asked the lead agent to write them on Nov 7, 2026). Both sections already render when their field is set and are omitted while it is null, so this is a content-only change.

## Acceptance criteria

- [ ] `content/pages/ventures.yaml`, `lookingFor.text`, exact:
      "Pilot partners for Priming Labs: coaches and sport-performance physical therapists who will test daily readiness checks with their athletes. A bank or credit union ready to pilot Sprout with students. Practices and small businesses that want custom AI systems through Sproat Systems. And a Summer 2027 internship building AI products."
- [ ] `content/home.yaml`, `now.line`, exact:
      "First year at Penn State, building Priming Labs toward its beta and growing Sproat Systems' AI consulting work."
- [ ] `/ventures` shows the "What I'm looking for" section; `/` shows the Now line with its "Full /now page" link. If #39 (home refresh) changed where the Now line sits, it stays wherever #39 put it.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `content/pages/ventures.yaml`, `content/home.yaml`
- `docs/STATE.md`

## Depends on

#39 (home refresh), because it rewrites `content/home.yaml`. Rebase on it before editing.

## Notes

- No booking link: Ben has none, so `booking` on /contact and /ventures stays null and the "Book a call" buttons stay hidden.

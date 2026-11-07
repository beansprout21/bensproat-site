---
title: "[P0] Fix wording: 353 and 122 are HackPSU totals, not the FNB Challenge"
labels: [status:ready, P0, quick]
---

## Goal

No page implies the FNB Challenge itself had 353 participants or 122 projects. Those are totals for all of HackPSU Fall 2026 (Ben, Nov 7, 2026).

## Acceptance criteria

- [ ] `content/home.yaml` (Sprout proof text) reads exactly: "Sprout, a goals-first AI money coach that hands students to a banker. HackPSU drew 353 participants and 122 projects."
- [ ] `content/projects/sprout.yaml` `oneLineResult` reads exactly: "Won the FNB Challenge at HackPSU Fall 2026, a hackathon of 353 participants and 122 projects, with a goals-first AI money coach that hands students to a banker. Built and deployed in 24 hours by two students and a team of AI agents."
- [ ] `content/projects/sprout.yaml` first results item reads exactly: 'Winner of the FNB Challenge, "Trust, Decisions & Financial Confidence," at HackPSU Fall 2026, a hackathon of 353 participants and 122 projects.'
- [ ] `grep -rn "122\|353" content/ app/` shows only those three lines, and none of them puts the numbers in a phrase about the FNB Challenge.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `content/home.yaml`
- `content/projects/sprout.yaml`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Work this before or together with the resume PDF issue; both are `quick`.

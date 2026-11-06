---
title: "[P0] Content: project data and page copy from the brief"
labels: [status:ready, P0]
---

## Goal

Every content file holds the final copy from `docs/brief-c3.md` section 4, word for word, so that pages built in later issues render real content. Facts Ben still owes stay null (brief section 7); nothing in square brackets is copied into a content file.

## Acceptance criteria

- [ ] `content/projects/`: `sprout.yaml` (full case study, section 4.6), `priming.yaml`, `sproat-systems.yaml`, `floating-sunglasses.yaml`, `ai-data-systems.yaml`, with `featured` and `order` as specified.
- [ ] `content/home.yaml`: hero, proof items, doors with the order table from section 2, footer heading; `availability` and `nowLine` null.
- [ ] `content/pages/ventures.yaml`, `hire.yaml`, `about.yaml`, `contact.yaml` hold the copy from sections 4.2 to 4.4 and 4.8; `lookingFor` and `booking` null.
- [ ] `content/now.mdx` holds the draft bullets from section 4.10 with `updated` set to the merge date.
- [ ] `content/links.yaml` matches section 4.9 (order and labels). `content/profile.yaml` has the new `oneLiner` and `headline`.
- [ ] `content/resumes.yaml` stays `[]` until PDFs exist.
- [ ] `grep -rnP '\x{2014}' content/` (the em dash code point) returns nothing. No phone number, street address, pricing or unapproved client name anywhere in `/content`.
- [ ] `pnpm content:check` and `pnpm build` pass.

## Files in scope

- `content/**`
- `docs/STATE.md`

## Depends on

#3 (draft 02)

## Notes

- Wording rules in `docs/PLAN.md` apply. Approved client names: Canyon Kids (always with the family disclosure), Kentuckiana Mobile Therapy, Mobility Health PT, Hydes Group, Cloud Surfing Media. Any other client stays described, not named.
- The Sprout `role` is final in the brief (everything except the front-end design). Keep the "To be confirmed" convention for any other project whose role Ben has not supplied.
- If a line in the brief looks wrong or contradicts PLAN.md, comment on the issue and label it `status:blocked` instead of rewording.

---
title: "[P0] Content model: structured projects and page files"
labels: [status:ready, P0]
---

## Goal

`lib/content.ts` supports every content file the site needs (brief section 3): projects as structured YAML with optional case-study sections, `content/home.yaml`, `content/pages/*.yaml`, the extended `now.mdx`, and the updated `profile.yaml`. `pnpm content:check` validates all of it. Placeholder-free sample data proves the schemas; real copy arrives in issue 03.

## Acceptance criteria

- [ ] `ProjectSchema` matches brief section 3.1 (strict object, optional `sections`, `live`, `cover`, `tags`, `when`, `statusText`, `team`, link `kind`). Projects are read from `content/projects/<slug>.yaml`; the `.mdx` project file is removed.
- [ ] New loaders with strict schemas: `getHome()`, `getPage("ventures" | "hire" | "about" | "contact")`, and `getNow()` returns `items` when present and `paragraphs` split on blank lines.
- [ ] `ProfileSchema` gains `headline`. `oneLiner` is "I turn ideas into working AI products."
- [ ] Optional fields that hold a fact Ben still owes (`availability`, `nowLine`, `lookingFor`, `booking`, `role` on Sprout is required but may read "To be confirmed" only in sample data) are nullable and default to null.
- [ ] `validateAllContent()` covers every file; `pnpm content:check` fails on an invalid file with a readable message.
- [ ] No markdown parser or other dependency added.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.

## Files in scope

- `lib/content.ts`
- `scripts/check-content.mts`
- `content/**` (schema-shaped sample data only; real copy is issue #4, draft 03)
- `app/projects/[slug]/page.tsx` and `app/sitemap.ts` (only what the file rename breaks)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Keep schemas strict so a typo in a key fails the build.
- The slug of each project must still match its file name.
- Record the `.mdx` to `.yaml` change for projects in `docs/DECISIONS.md`.

---
title: "[P1] Structured data graph, sitemap and robots"
labels: [status:ready, P1]
---

## Goal

Search engines get one consistent graph about Ben (Person, WebSite, ProfilePage, his two organizations) and a CreativeWork plus breadcrumb for each project, per `docs/brief-c5.md` section 3.

## Acceptance criteria

- [ ] `lib/jsonld.ts` builds the Person with the added properties in the brief (jobTitle, image, email, affiliation, memberOf, knowsAbout), the Sproat Systems and Priming Labs Organization nodes with `founder` pointing at the Person `@id`, and the WebSite node.
- [ ] Home emits a single `@graph` with WebSite, ProfilePage, Person and both Organizations; `/about` keeps its ProfilePage.
- [ ] Each project page emits a `@graph` with CreativeWork (name, description, url, author `@id`, dateCreated, sameAs when a live link exists) and a BreadcrumbList; Sprout carries `award` from a new optional project field `award: "FNB Challenge winner, HackPSU Fall 2026"`.
- [ ] Every block parses as JSON and every `@id` reference resolves within its page; paste the home and Sprout blocks in the PR.
- [ ] `sitemap.xml` no longer lists `/links`; no `lastModified` values.
- [ ] No phone number, address or second founder's name in any JSON-LD.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass; Lighthouse SEO stays 100.

## Files in scope

- `lib/jsonld.ts`
- `app/page.tsx`, `app/about/page.tsx`, `app/projects/[slug]/page.tsx` (JSON-LD only)
- `app/sitemap.ts`
- `lib/content.ts` and `content/projects/sprout.yaml` (the `award` field only)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

draft 14

## Notes

- After merge, tell Ben in the issue comment that Search Console setup (brief section 4) is ready for him.

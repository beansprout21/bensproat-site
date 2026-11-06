# STATE

**Objective**: Phase C1 (Foundation) of bensproat.com: public repo plus placeholder site live on Vercel at the apex domain.

**Decisions**

- 2026-11-05: Vercel project created via CLI defaulted to preset "Other" (all routes 404). Set preset to Next.js and Node to 24.x; enabled Web Analytics; redeployed.

- 2026-11-05: Kept scaffold's Cache Components + Partial Prefetching. `dynamicParams` is unsupported with it, so `/projects/[slug]` calls `notFound()` for unknown slugs (first hit is a streamed soft 404 with noindex; cached hits return 404).
- 2026-11-05: Favicon is `public/favicon.svg` (plain monogram), no .ico.
- 2026-11-05: Added `NowSchema` ({ updated: ISO date }) for now.mdx; brief had no schema for it.
- 2026-11-05: `package.json` is `"type": "module"`; content check runs via Node type stripping, no tsx.
- 2026-11-05: Project `dates` = { start: YYYY-MM, end?: YYYY-MM }. Schemas are strict objects.
- 2026-11-05: Plan approved (Next 16.4.5, Tailwind 4.3, zod 4.6, @vercel/analytics 2.0.1).
- 2026-11-05: Published email is ben.c.sproat@gmail.com (owner's choice).
- 2026-11-05: Project folder chosen by owner: C:\Users\bensp\OneDrive\Desktop\New folder.

**Done**

- Scaffold + config: package.json, tsconfig.json, next.config.ts (/card 308), eslint.config.mjs (+prettier), .prettierrc, .prettierignore, .nvmrc, README.md, LICENSE, AGENTS.md.
- Content: content/profile.yaml, links.yaml, resumes.yaml, now.mdx, projects/sprout.mdx.
- Lib: lib/content.ts, lib/jsonld.ts, scripts/check-content.mts.
- App: layout.tsx, page.tsx, about, ventures, hire, projects, projects/[slug], resume, contact, links, now, not-found.tsx, sitemap.ts, robots.ts, \_components/coming-soon.tsx.
- Verified locally: lint and build pass, all routes 200, /card 308 to /links?src=card, JSON-LD present, Lighthouse 96 to 100 (only miss: Vercel analytics script 404s off-Vercel).

- Repo created and main pushed: https://github.com/beansprout21/bensproat-site (public).
- Vercel project sproat1/bensproat-site created, folder linked, GitHub repo connected (pushes to main deploy production).

- Production live at https://bensproat-site.vercel.app: all routes 200, /card 308, JSON-LD present, analytics script 200.

**Next**

1. (Ask first) Add bensproat.com and www.bensproat.com; ask registrar; give DNS records.
2. Verify HTTPS, www redirect, /card redirect, JSON-LD, Lighthouse on live site.

**Blockers**

- Registrar for bensproat.com (needed at DNS step).

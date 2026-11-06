# STATE

**Objective**: Phase C1 (Foundation) of bensproat.com. Complete as of 2026-11-05; awaiting the next phase brief.

**Decisions**

- 2026-11-05: Vercel project created via CLI defaulted to preset "Other" (all routes 404). Set preset to Next.js and Node to 24.x; enabled Web Analytics; redeployed.
- 2026-11-05: www.bensproat.com redirect (308 to apex) is a Vercel domain setting, not app code.
- 2026-11-05: DNS in Cloudflare (registrar and DNS host): apex and www point to Vercel, proxy off.
- 2026-11-05: Kept scaffold's Cache Components + Partial Prefetching. `dynamicParams` is unsupported with it, so `/projects/[slug]` calls `notFound()` for unknown slugs (first hit is a streamed soft 404 with noindex; cached hits return 404).
- 2026-11-05: Favicon is `public/favicon.svg` (plain monogram), no .ico.
- 2026-11-05: Added `NowSchema` ({ updated: ISO date }) for now.mdx; brief had no schema for it.
- 2026-11-05: `package.json` is `"type": "module"`; content check runs via Node type stripping, no tsx.
- 2026-11-05: Project `dates` = { start: YYYY-MM, end?: YYYY-MM }. Schemas are strict objects.
- 2026-11-05: Published email is ben.c.sproat@gmail.com (owner's choice).
- 2026-11-05: Project folder: C:\Users\bensp\OneDrive\Desktop\New folder (owner's choice).

**Done**

- Repo: https://github.com/beansprout21/bensproat-site (public, MIT detected by GitHub).
- Vercel: sproat1/bensproat-site, GitHub-connected, pushes to main deploy production.
- Live: https://bensproat.com over HTTPS; http to https 308; www to apex 308 (path and query kept); /card 308 to /links?src=card.
- All routes 200; unknown path 404; sitemap.xml and robots.txt live.
- JSON-LD on / validated by validator.schema.org: 0 errors, 0 warnings. /about emits the same ProfilePage/Person.
- Live Lighthouse (/, /links, /about): mobile 99/100/100/100, desktop 100/100/100/100 (Perf/A11y/BP/SEO).

**Next**

1. Wait for the next phase brief (visual design, real copy, content).
2. Replace placeholder values in content/projects/sprout.mdx and content/now.mdx when real content arrives.

**Blockers**

- None.

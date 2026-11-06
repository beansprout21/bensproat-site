# DECISIONS

Append-only. One line per decision: date, decision, who decided. Newest at the bottom.

- 2026-11-05: Stack is Next.js (App Router), TypeScript strict, Tailwind, pnpm, zod, hosted on Vercel Hobby. (Ben)
- 2026-11-05: DNS in Cloudflare (registrar and DNS host); apex and www point to Vercel, proxy off. (builder)
- 2026-11-05: www to apex redirect (308) is a Vercel domain setting, not app code. (builder)
- 2026-11-05: Vercel preset set to Next.js, Node 24.x, Web Analytics on. (builder)
- 2026-11-05: Cache Components and Partial Prefetching kept; unknown project slugs use `notFound()`. (builder)
- 2026-11-05: Favicon is `public/favicon.svg`; no .ico. (builder)
- 2026-11-05: `NowSchema` ({ updated }) added for now.mdx. (builder)
- 2026-11-05: Project `dates` shape is { start: YYYY-MM, end?: YYYY-MM }; schemas are strict objects. (builder)
- 2026-11-05: Published email is ben.c.sproat@gmail.com. (Ben)
- 2026-11-05: Local project folder is `C:\Users\bensp\projects\bensproat-site` (moved out of OneDrive). (Ben)
- 2026-11-05: Repo-local git identity is Ben Sproat with the GitHub noreply address; older commits unchanged. (Ben)
- 2026-11-05: Coordination follows the HackPSU model: lead agent drafts tasks in `docs/issues/`, builder imports them as issues and works them with `/sync`, `/next`, `/ship`. Builder never pushes to main; the lead agent may push planning docs only. (Ben)
- 2026-11-05: C2 design approved: builder-craft look (Inter Tight, Inter, JetBrains Mono; one green accent; borders over shadows), specified in `docs/brief-c3.md` with reference markup in `docs/design/`. (Ben)
- 2026-11-05: Proof order is win, startup, business (Sprout, Priming Labs, Sproat Systems) everywhere, except the automation door where Sproat Systems leads. Every proof links to the live product first. (Ben)
- 2026-11-05: Home doors are plain links; hover or keyboard focus previews the reorder, click navigates. No preview on touch or without JavaScript. (Ben)
- 2026-11-05: C3 and C4 run as one brief (`docs/brief-c3.md`) with ten task drafts; C5 to C7 follow. (Ben)
- 2026-11-05: Projects move from frontmatter-only `.mdx` to structured `.yaml`; no markdown parser is added. (lead agent)
- 2026-11-05: Resume PDFs are built by the lead agent from the content bank after Ben's corrections; the site ships without them until then. (Ben)
- 2026-11-05: `docs/design/` holds the C2 reference markup and counts as a planning doc the lead agent may push. (lead agent)

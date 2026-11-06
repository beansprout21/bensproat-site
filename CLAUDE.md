# bensproat-site

Personal website for Ben Sproat, served at https://bensproat.com. Phase briefs live in `docs/brief-*.md`; session state lives in `docs/STATE.md`.

Start every session by reading `docs/PLAN.md` (overall plan, owned by the planning chat; do not edit it) and `docs/COMMS.md` (how this session and the planning chat communicate through GitHub issues and PRs). Then read the current phase issue (`gh issue list --label phase`) and its brief.

## Standing rules

- Never put a phone number, street address or other personal data in the repo or on the site. The one deliberate exception is the public contact email in `content/profile.yaml` and `content/links.yaml`.
- Site copy uses no em dashes.
- Public name is "Ben Sproat."
- Content lives in `/content` and is validated by zod (`lib/content.ts`). Pages read content only through those loaders.
- Every page must work on mobile and keep Lighthouse at 95+ (Performance, Accessibility, Best Practices, SEO; mobile and desktop).

## Working rules

- Ask before anything that touches outside accounts or is hard to undo: GitHub repo settings, Vercel linking or deploys, domains, DNS.
- Stay inside the current phase brief. If something seems needed but is not in the brief, ask.
- Run `pnpm lint`, `pnpm format:check` and `pnpm build` after changes and report the actual output.
- Read `AGENTS.md`: this Next.js version differs from older training data, and its docs ship in `node_modules/next/dist/docs/`.

## Project notes

- Cache Components and Partial Prefetching are on (`next.config.ts`). Route segment configs like `dynamicParams`, `dynamic` and `revalidate` fail the build; use `notFound()` and `use cache` instead.
- Content loaders are synchronous file reads, so every page prerenders at build time.
- `pnpm build` runs `pnpm content:check` first (`scripts/check-content.mts`).
- `/card` redirects (308) to `/links?src=card` in `next.config.ts`. The www to apex redirect is a Vercel domain setting, not app code.

## Stack

Next.js (App Router), TypeScript strict, Tailwind CSS, pnpm, zod, @vercel/analytics, ESLint, Prettier. Hosted on Vercel (Hobby).

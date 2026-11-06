# bensproat-site

Personal website for Ben Sproat, served at https://bensproat.com. **GitHub is the coordination bus** between the planning chat and the Claude Code builder. Follow the protocol below exactly.

## Sources of truth

| File                | Purpose                                                                               | Owner                                        |
| ------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| `docs/PLAN.md`      | Positioning, wording rules, sitemap, phases                                           | Lead agent                                   |
| `docs/issues/*.md`  | Task drafts written by the lead agent; `/import-issues` turns them into GitHub issues | Lead agent                                   |
| `docs/DECISIONS.md` | Append-only decision log                                                              | Anyone (append only)                         |
| `docs/STATE.md`     | Builder session checkpoint: objective, done, next, blockers                           | Builder                                      |
| `docs/brief-*.md`   | Phase briefs (C1 onward)                                                              | Lead agent                                   |
| GitHub Issues       | The task queue                                                                        | Created by `/import-issues` from lead drafts |

Read `docs/PLAN.md` and `docs/STATE.md` before starting any task.

## Agent roles

- **Lead agent:** the claude.ai Project chat "Personal Branding" (Ben drives it). Owns `docs/PLAN.md`, briefs, and the task drafts in `docs/issues/`. It does not write site code. It may push planning docs (`docs/PLAN.md`, `docs/brief-*.md`, `docs/issues/*`, `docs/DECISIONS.md`) directly to `main`; nothing else.
- **Builder:** Ben's Claude Code session. Implements issues and reports back ONLY through GitHub: issue comments, PR bodies and `status:*` labels.
- **Ben:** approves plans, answers questions, and is the only bridge between the two sessions. Neither session can see the other's chat, and neither watches GitHub on its own.
- **Escalation:** if an issue is ambiguous, contradicts `docs/PLAN.md`, or needs a plan change, the builder comments on the issue with the exact question, labels it `status:blocked`, and tells Ben. Ben brings it to the lead chat. The builder never edits `docs/PLAN.md`, briefs or task drafts.

## Coordination protocol

1. **Start every session with `/sync`** (read-only briefing). If it reports new drafts in `docs/issues/`, run `/import-issues` to turn them into GitHub issues after Ben approves the list.
2. **Work issues with `/next`.** Take the highest-priority `status:ready` issue (`P0` before `P1`), or the number Ben gives you.
3. **Claim** it: label `status:in-progress`, branch `issue-<N>-<short-slug>` from the latest `origin/main`.
4. **Plan before coding.** Max 8 bullets: files, approach, how acceptance criteria will be verified. Wait for Ben's go-ahead unless the issue is labeled `quick`.
5. **Stay in scope.** Edit only the files in the issue's "Files in scope." To touch anything else, comment on the issue first and tell Ben.
6. **Dependencies:** never add an npm package without Ben's OK.
7. **Finish with `/ship`.** PR title includes `Closes #<N>`, checks pass, squash-merge, then a 2-line summary comment on the issue. That comment is how the lead agent learns what changed.
8. **Blocked?** Label `status:blocked`, comment the exact blocker, tell Ben, move to the next ready issue.
9. **Decisions** not covered by the issue get one line appended to `docs/DECISIONS.md` in the same PR.
10. **Update `docs/STATE.md`** in every PR (objective, done, next, blockers).

## Git rules

- The builder never pushes directly to `main`, never force-pushes, never runs `git reset --hard` on shared branches.
- `git pull --rebase origin main` before starting work and before opening a PR.
- Commit messages: `<type>(#<issue>): <summary>`, for example `feat(#4): add hero section`.
- Merging to `main` deploys production on Vercel. `main` must always build.

## Standing rules

- Never put a phone number, street address or other personal data in the repo or on the site. The one deliberate exception is the public contact email in `content/profile.yaml` and `content/links.yaml`.
- The repo is public: nothing private in files, issues, PRs or comments (no health details, finances, pricing, or client names Ben has not approved).
- Site copy uses no em dashes. Public name is "Ben Sproat." Follow the wording rules in `docs/PLAN.md`.
- Content lives in `/content` and is validated by zod (`lib/content.ts`). Pages read content only through those loaders.
- Every page must work on mobile and keep Lighthouse at 95+ (Performance, Accessibility, Best Practices, SEO; mobile and desktop).
- Run `pnpm lint`, `pnpm format:check` and `pnpm build` after changes and report the actual output.
- Ask Ben before anything that touches outside accounts or is hard to undo: GitHub repo settings, Vercel settings, domains, DNS.
- Read `AGENTS.md`: this Next.js version differs from older training data, and its docs ship in `node_modules/next/dist/docs/`.

## Project notes

- Cache Components and Partial Prefetching are on (`next.config.ts`). Route segment configs like `dynamicParams`, `dynamic` and `revalidate` fail the build; use `notFound()` and `use cache` instead.
- Content loaders are synchronous file reads, so every page prerenders at build time.
- `pnpm build` runs `pnpm content:check` first (`scripts/check-content.mts`).
- `/card` redirects (308) to `/links?src=card` in `next.config.ts`. The www to apex redirect is a Vercel domain setting, not app code.

## Stack

Next.js (App Router), TypeScript strict, Tailwind CSS, pnpm, zod, @vercel/analytics, ESLint, Prettier. Hosted on Vercel (Hobby), deploys from `main`, preview URL per PR.

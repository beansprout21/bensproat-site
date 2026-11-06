# STATE

**Objective**: Overnight unattended build (authorized by Ben, 2026-11-06) of issues #2 to #11 from `docs/brief-c3.md`, in number order, each on its own branch and PR, squash-merged after the Vercel check. If context resets: read `docs/PLAN.md`, `docs/brief-c3.md` and this file, then continue with the lowest-numbered open `status:ready` issue. Blocked issues carry `status:blocked` and a comment with the exact blocker.

**Per-issue flow** (CLAUDE.md, `/next`, `/ship`, Ben's overnight rules)

1. `gh issue edit N --add-label status:in-progress --remove-label status:ready`
2. `git checkout main && git pull --rebase origin main && git checkout -b issue-N-<slug>`
3. Plan comment (max 8 bullets) on the issue; treated as approved, no waiting.
4. Build. Then `pnpm lint`, `pnpm format:check`, `pnpm build`; paste the real output in the PR body.
5. `git add -A && git commit -m "<type>(#N): <summary>"`, `git fetch origin && git rebase origin/main`, `git push -u origin HEAD` (bare `git push` is denied; never push to main).
6. `gh pr create --base main --title "<type>(#N): <summary>. Closes #N" --body-file <file>` using `.github/pull_request_template.md`.
7. `gh pr checks <PR> --watch`; Lighthouse (mobile and desktop) on the Vercel preview for the pages touched; 375px and 1280px check; post results as a PR comment.
8. `gh pr merge <PR> --squash --delete-branch`; issue comment: "Shipped in PR #<PR>. <two lines>. Preview/production: <url>. Open questions: <none or list>."
9. Update this file and append decisions to `docs/DECISIONS.md` inside the same PR.

**Issue status**

| Issue | Draft | Branch                  | Status                                                                                                                                                     |
| ----- | ----- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #2    | 01    | `issue-2-design-system` | In progress: code done, PR being opened                                                                                                                    |
| #3    | 02    |                         | Ready                                                                                                                                                      |
| #4    | 03    |                         | Ready, depends on #3                                                                                                                                       |
| #5    | 04    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #6    | 05    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #7    | 06    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #8    | 07    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #9    | 08    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #10   | 09    |                         | Ready, depends on #2; photos are in `C:\Users\bensp\Downloads\bensproat-site-images.zip` (headshot, about-field, about-grass), not yet in `public/images/` |
| #11   | 10    |                         | Ready, depends on #5 to #10                                                                                                                                |

**Decisions this run** (one line each in `docs/DECISIONS.md`)

- #2: footer copy stays in `site-footer.tsx` until #4; 404 line wording; header active state and footer heading overrides via small client components in Suspense; `type-*` utilities and `@theme` tokens; static font weights; full-width `main` with per-section `Container`.

**Done before this run**

- C1 live at https://bensproat.com (Vercel project sproat1/bensproat-site, pushes to main deploy production). Lighthouse 99 to 100 at C1.
- Setup on 2026-11-05 and 06: folder moved out of OneDrive, repo-local git identity (Ben Sproat, GitHub noreply), labels (`phase`, `status:*`, `P0`, `P1`, `quick`), issues #2 to #11 imported from `docs/issues/`, "Depends on" lines synced to issue numbers.

**Next**

1. Open PR for #2, wait for the Vercel check, run Lighthouse on `/` and `/links`, merge, comment, then #3.
2. #3 content model, #4 content data, #5 home, #6 projects, #7 ventures and hire, #8 about, #9 utility pages, #10 images (extract the zip into `public/images/`), #11 quality pass.
3. Morning summary at the end of this file: what merged, what is blocked and why, production URL, what Ben must look at first.

**Blockers**

- None yet.

**For Ben in the morning** (filled in at the end of the run)

- A pasted Priming Labs fact sheet arrived in an interrupted message before the overnight instructions; it was not used directly. The brief and DECISIONS.md (b401f43) already carry the approved Priming facts, which are what the content files use.

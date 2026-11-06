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
| #2    | 01    | `issue-2-design-system` | Merged: PR #12 (b51543b). Production Lighthouse 100/100/100/100 on `/` and `/links`, mobile and desktop                                                    |
| #3    | 02    | `issue-3-content-model` | Merged: PR #13 (e8c0113). Content files hold the brief's final copy; #4 is a verification pass                                                             |
| #4    | 03    | `issue-4-content-data`  | Verified against the brief, no content changes needed; shipped as a docs-only PR                                                                           |
| #5    | 04    | issue-5-home-page       | Merged: PR #16 (58c181e). Production Lighthouse 100 on /                                                                                                   |
| #6    | 05    | issue-6-projects        | In progress: built and verified locally; PR open                                                                                                           |
| #7    | 06    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #8    | 07    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #9    | 08    |                         | Ready, depends on #2 and #4                                                                                                                                |
| #10   | 09    |                         | Ready, depends on #2; photos are in `C:\Users\bensp\Downloads\bensproat-site-images.zip` (headshot, about-field, about-grass), not yet in `public/images/` |
| #11   | 10    |                         | Ready, depends on #5 to #10                                                                                                                                |

**Decisions this run** (one line each in `docs/DECISIONS.md`)

- #2: footer copy stays in `site-footer.tsx` until #4; 404 line wording; header active state and footer heading overrides via small client components in Suspense; `type-*` utilities and `@theme` tokens; static font weights; full-width `main` with per-section `Container`.
- #3: projects as YAML with `paragraphs?` and `footerHeading?`; page files `content/pages/{ventures,hire,about,contact,projects,resume}.yaml` via `getPage()`; archive table inside `pages/projects.yaml`; #3 carries the brief's final copy so #4 is a verification pass; meta descriptions = H1 plus lede; resume-picker one-liners and about-grass alt are builder wording; Priming `links` empty (live link covers it); `LinkSchema.url` accepts site paths.
- Vercel previews are behind Vercel Authentication (302 to vercel.com/sso-api), so pre-merge Lighthouse runs on a local production build; production is measured after each merge.

**Done before this run**

- C1 live at https://bensproat.com (Vercel project sproat1/bensproat-site, pushes to main deploy production). Lighthouse 99 to 100 at C1.
- Setup on 2026-11-05 and 06: folder moved out of OneDrive, repo-local git identity (Ben Sproat, GitHub noreply), labels (`phase`, `status:*`, `P0`, `P1`, `quick`), issues #2 to #11 imported from `docs/issues/`, "Depends on" lines synced to issue numbers.

**Next**

1. #5 home page (next), then #6 projects, #7 ventures and hire, #8 about, #9 utility pages.
2. #5 home, #6 projects, #7 ventures and hire, #8 about, #9 utility pages, #10 images (extract the zip into `public/images/`; files are 960x1200, 1600x1067, 1400x1050 and under 250 KB), #11 quality pass.
3. Morning summary at the end of this file: what merged, what is blocked and why, production URL, what Ben must look at first.

**Blockers**

- None yet.

**For Ben in the morning** (filled in at the end of the run)

- A pasted Priming Labs fact sheet arrived in an interrupted message before the overnight instructions; it was not used directly. The brief and DECISIONS.md (b401f43) already carry the approved Priming facts, which are what the content files use.

## Morning summary (2026-11-06, written when the session hit its usage limit)

**Merged tonight**

- #2 Design system: PR #12, commit b51543b. Fonts, tokens, header, footer, 404, base components. Production Lighthouse after merge on `/` and `/links`: 100/100/100/100, mobile and desktop.
- #3 Content model: PR #13, commit e8c0113. Strict schemas and loaders for YAML projects, `home.yaml`, six page files, `now.mdx`, `profile.headline`; `pnpm content:check` also checks cross-references. The content files already hold the brief's final copy.

**Not started, nothing blocked**

- #4 to #11 are all still `status:ready`. The run stopped after #3 because the Claude session reached its usage limit, not because of a missing fact, file or permission. Resume with `/sync`, then `/next 4` (verification pass over the content files: word for word against the brief, em-dash and private-data greps), then #5 onward.

**Production**: https://bensproat.com. The new shell (header, footer, 404) is live; every route still shows its C1 stub body until #5 to #9 build the pages.

**Look at first**

1. The content files from PR #13 (`content/home.yaml`, `content/pages/*.yaml`, `content/projects/*.yaml`): they are the brief's copy and will render as soon as the page issues land. Builder wording to check: the /hire resume-picker one-liners, the meta descriptions (H1 plus lede), the about-grass alt text, the 404 line.
2. Vercel preview deployments are behind Vercel Authentication (302 to vercel.com/sso-api). Pre-merge Lighthouse ran on a local production build instead. Relax Deployment Protection for previews if you want preview scores.
3. Photos: `C:\Users\bensp\Downloads\bensproat-site-images.zip` holds headshot.jpg (960x1200), about-field.jpg (1600x1067), about-grass.jpg (1400x1050), all under 250 KB. They are not in `public/images/` yet; #10 can copy them in, or drop them there yourself.
4. The pasted Priming Labs fact sheet that arrived in an interrupted message was not used directly; the content uses the approved facts from the brief and DECISIONS.md (b401f43).
5. Issue "Depends on" lines were synced to the drafts (only that section); the drafts' other Nov 6 edits (notes, client names) were not copied into the issue bodies.

---
name: next
description: Claim and start the next GitHub issue. Use when I say "next task", "what should I work on", or pass an issue number.
argument-hint: "[issue-number]"
disable-model-invocation: true
allowed-tools: Bash(gh *) Bash(git *) Read Grep Glob
---

## Context

Requested issue number (empty means pick one): $ARGUMENTS

Open issues assigned to me:
!`gh issue list --assignee "@me" --state open --json number,title,labels`

Files touched by open PRs:
!`gh pr list --state open --json number,headRefName,files`

## Procedure

1. **Pick the issue.**
   - If a number was given, use it.
   - Otherwise pick the highest priority (`P0` before `P1`) issue labeled `status:ready` that is not `status:blocked` and whose "Files in scope" do not overlap any open PR.
   - If nothing qualifies, STOP and tell me why.
2. **Read it fully:** `gh issue view <N> --comments`. Then read `docs/PLAN.md`, `docs/STATE.md`, any brief it links, and every file in "Files in scope."
3. **Claim it:**
   - `gh issue edit <N> --add-label "status:in-progress" --remove-label "status:ready"`
   - `git checkout main` then `git pull --rebase origin main`
   - `git checkout -b issue-<N>-<short-slug>`
4. **Plan before coding.** Post a plan of max 8 bullets as an issue comment (`gh issue comment <N> --body "..."`) and show it to me: files to change, approach, how each acceptance criterion will be verified, any question for Ben. Wait for my go-ahead unless the issue is labeled `quick`.
5. **Implement** within "Files in scope" only. If you need another file, comment on the issue first and tell me.
6. **Verify** every acceptance criterion. At minimum run `pnpm lint`, `pnpm format:check` and `pnpm build` and fix failures.
7. Append any decision the issue did not cover to `docs/DECISIONS.md` and update `docs/STATE.md`.
8. Tell me to run `/ship`.

Follow every rule in CLAUDE.md, especially: never edit `docs/PLAN.md`, briefs or `docs/issues/*`, never add npm packages without asking me, never put private data in the repo.

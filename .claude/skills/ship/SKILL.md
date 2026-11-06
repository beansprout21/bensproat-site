---
name: ship
description: Finish the current issue branch. Verify checks, rebase on main, open a PR that closes the issue, merge it, and post a summary comment so the lead agent knows what changed.
disable-model-invocation: true
allowed-tools: Bash(gh *) Bash(git *) Bash(pnpm lint*) Bash(pnpm format:check*) Bash(pnpm build*)
---

## Context

Current branch and status:
!`git status --short --branch`

Commits on this branch not on main:
!`git log origin/main..HEAD --oneline`

## Procedure

1. **Identify the issue** from the branch name `issue-<N>-...`. If it does not match, STOP and ask me.
2. **Commit** remaining changes: `git add -A` then `git commit -m "<type>(#<N>): <summary>"`. Never commit `.env*` files.
3. **Rebase:** `git fetch origin` then `git rebase origin/main`. On conflicts, STOP and show me the files.
4. **Verify:** `pnpm lint`, `pnpm format:check` and `pnpm build` must pass. Fix within scope or STOP and tell me.
5. **Push:** `git push -u origin HEAD`.
6. **Open PR** using `.github/pull_request_template.md`: `gh pr create --base main --title "<summary> (Closes #<N>)" --body "<body>"`. The body has `Closes #<N>`, what changed (max 5 bullets), files changed, verification output, and dependency or content-schema impact.
7. **Wait for the Vercel preview check.** If it fails, STOP and tell me. Share the preview URL with me.
8. **Merge:** `gh pr merge --squash --delete-branch`. If blocked, STOP and tell me.
9. **Report on the issue:** `gh issue comment <N> --body "Shipped in PR #<PR>. <2-line summary of what now exists>. Preview/production: <url>. Open questions: <none or list>."`
10. **Reset locally:** `git checkout main` then `git pull --rebase origin main`.
11. Tell me it shipped and suggest `/next`.

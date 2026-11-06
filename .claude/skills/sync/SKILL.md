---
name: sync
description: Read-only start-of-session briefing. Shows new lead-agent task drafts, open issues, PRs and recent merges. Run before starting every task.
allowed-tools: Bash(gh issue list*) Bash(gh pr list*) Bash(git fetch*) Bash(git ls-tree*) Bash(git log*) Bash(git status*)
---

## Live repo state

Refreshing remote:
!`git fetch --quiet origin`

Task drafts on main:
!`git ls-tree --name-only origin/main docs/issues/`

Existing issues (all states):
!`gh issue list --state all --limit 200 --json number,title,state`

In-progress and blocked:
!`gh issue list --label "status:in-progress" --state open`
!`gh issue list --label "status:blocked" --state open`

Open pull requests:
!`gh pr list --state open`

Last 10 commits on main:
!`git log origin/main --oneline -10`

My current branch and local changes:
!`git status --short --branch`

## Your task

Produce a short briefing, max 12 lines:

1. **New drafts:** any `docs/issues/*.md` (excluding `README.md`) whose frontmatter title has no matching issue yet. If there are any, tell me to run `/import-issues`.
2. **Activity:** what is in progress or blocked, and which files open PRs touch.
3. **Recently merged:** anything in the last 10 commits that affects the next issue, especially `docs/PLAN.md`, `content/**` schemas or `lib/content.ts`. If `docs/PLAN.md` changed, tell me to re-read it.
4. **Branch hygiene:** if my branch is behind `origin/main`, say so.
5. **Next:** the issue to take with `/next`.

Do not modify any files, issues or PRs during /sync.

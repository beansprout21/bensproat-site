---
name: import-issues
description: Create GitHub issues from lead-agent task drafts in docs/issues/ that do not have an issue yet. Run only when I ask, usually after /sync reports new drafts.
disable-model-invocation: true
allowed-tools: Bash(gh issue list*) Bash(gh issue create*) Bash(gh label list*) Bash(git fetch*) Bash(git show*) Bash(git ls-tree*) Read
---

## Context

Task drafts on main:
!`git ls-tree --name-only origin/main docs/issues/`

Existing issues (all states):
!`gh issue list --state all --limit 200 --json number,title`

Available labels:
!`gh label list`

## Procedure

1. List every draft in `docs/issues/` on `origin/main`, excluding `README.md`. Read each one's frontmatter: `title` and `labels`.
2. Keep only drafts whose `title` matches no existing issue exactly. Show me that list and wait for my OK before creating anything.
3. For each approved draft: write the body (everything after the frontmatter) to a temp file outside the repo, then run
   `gh issue create --title "<title>" --label "<labels, comma separated>" --assignee "@me" --body-file <temp file>`.
   If a label does not exist, STOP and tell me which one.
4. Report the created issue numbers and titles. Do not edit, move or commit the draft files.

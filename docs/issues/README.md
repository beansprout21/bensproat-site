# Task drafts

The lead agent (planning chat) writes one file per task here. Ben's Claude Code session turns new drafts into GitHub issues with `/import-issues`, after `/sync` reports them. Drafts are never edited by the builder; changes go through the lead agent.

## File name

`NN-short-slug.md`, numbered in the order the lead agent wants them worked.

## Format

```markdown
---
title: "[P0] Build the home page hero"
labels: [status:ready, P0]
---

## Goal

## Acceptance criteria

- [ ] ...

## Files in scope

- `app/page.tsx`

## Depends on

none

## Notes
```

The body follows `.github/ISSUE_TEMPLATE/task.md`. A draft becomes an issue only once: `/import-issues` skips any draft whose title already matches an issue.

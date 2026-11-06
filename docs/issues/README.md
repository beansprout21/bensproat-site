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

## Draft numbers versus issue numbers

GitHub assigns issue numbers in its own sequence, so a draft's number and its issue number differ (the C3/C4 drafts 01 to 10 became issues #2 to #11 because PR #1 took the first number). Rules:

- "Depends on" names GitHub issues with `#`, never bare draft numbers, once the issues exist.
- A draft that depends on another draft not yet imported says "draft NN" in words; `/import-issues` reports the mapping, and the lead agent updates the line to the issue number afterwards.
- Current mapping: draft 01 to 10 = issue #2 to #11.

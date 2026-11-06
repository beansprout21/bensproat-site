# COMMS: how the planning chat and Claude Code work together

Two Claude sessions work on this site. GitHub is the shared channel between them, and Ben is the approver.

| Who | Owns | Writes to |
| --- | --- | --- |
| Planning chat (claude.ai, "Personal Branding" project) | Strategy, positioning, design, phase briefs | `docs/PLAN.md`, `docs/brief-*.md`, phase issues |
| Claude Code (Ben's laptop) | Code, content files, deploys | Code, `/content`, `docs/STATE.md`, PRs, issue comments |
| Ben | Decisions and approvals | Issue comments, PR reviews, merges |

## Flow for each phase

1. The planning chat writes `docs/brief-cN.md` and opens a GitHub issue titled `Phase CN: <name>` that links the brief and carries the `phase` label.
2. Claude Code starts by reading `docs/PLAN.md`, `docs/COMMS.md`, the brief and `docs/STATE.md`, then posts its plan and any questions as a comment on the issue.
3. Ben answers in the issue, or tells either session to read it.
4. Claude Code works on a branch named `cN-<topic>` and opens a PR that says `Closes #<issue>`.
5. Claude Code posts its report as an issue comment: what changed, verification output, decisions not covered by the brief, open questions.
6. Ben reviews and merges. Merging to main deploys production.
7. Claude Code updates `docs/STATE.md` in the same PR.

## Rules

- `docs/PLAN.md` and `docs/brief-*.md` change only through the planning chat. Claude Code proposes edits in the issue.
- Anything that needs a decision goes in the issue as a question addressed to Ben, never as a silent assumption.
- Neither session can see the other's chat. If it is not in the repo or the issue, the other session does not know it.
- Nothing private goes in issues, PRs or files: the repo is public.
- Neither session watches GitHub on its own. Ben starts each session, and the session reads the issue when it starts.

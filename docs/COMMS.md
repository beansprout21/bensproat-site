# COMMS

The coordination protocol now lives in `CLAUDE.md` (Sources of truth, Agent roles, Coordination protocol, Git rules). Builder commands: `/sync`, `/import-issues`, `/next`, `/ship` in `.claude/skills/`.

Summary: the lead agent (planning chat) writes `docs/PLAN.md`, briefs and task drafts in `docs/issues/`. The builder (Ben's Claude Code) turns drafts into issues, claims one at a time, plans on the issue, ships through a PR that closes it, and reports in an issue comment. Ben approves and relays between the two.

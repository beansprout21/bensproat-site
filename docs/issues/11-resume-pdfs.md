---
title: "[P0] Publish the three resume PDFs"
labels: [status:ready, P0, quick]
---

## Goal

The three web resume PDFs the lead agent built on Nov 7, 2026 are live, and every resume button on the site downloads the right file instead of falling back to `/resume`.

## Acceptance criteria

- [ ] `public/resumes/` holds exactly `Ben-Sproat-Resume-AI-Product.pdf`, `Ben-Sproat-Resume-Engineering.pdf` and `Ben-Sproat-Resume-Founder.pdf` (Ben's local copies, placed by the lead agent; each about 57 KB, one page).
- [ ] `content/resumes.yaml` lists them in this order, `updated: 2026-11-07`:
  - `ai-product`, label "AI product", audience `ai-product`, file `/resumes/Ben-Sproat-Resume-AI-Product.pdf` (default)
  - `engineering`, label "Engineering", audience `engineering`, file `/resumes/Ben-Sproat-Resume-Engineering.pdf`
  - `founder`, label "Founder", audience `founder`, file `/resumes/Ben-Sproat-Resume-Founder.pdf`
- [ ] The home hero "Resume (PDF)" button, the `/hire` resume picker, `/resume` download cards, the footer "Resume (PDF)" button on `/hire` and the `/links` resume entry all point at the files (AI product as the default).
- [ ] Before committing, `pdftotext` (or an equivalent check) on each PDF finds no phone number and no street address. If either appears, label `status:blocked` and stop: the web set must carry email and links only.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass; Lighthouse on `/resume` stays at the prior scores.

## Files in scope

- `public/resumes/*.pdf`
- `content/resumes.yaml`
- Any component that still hard-codes the `/resume` fallback for the resume button
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Do not regenerate or edit the PDFs. The source lives in the planning chat; changes go through the lead agent.
- A separate application set with Ben's phone number exists outside the repo and must never be committed.

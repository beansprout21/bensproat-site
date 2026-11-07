---
title: "[P0] Publish the three resume PDFs"
labels: [status:ready, P0, quick]
---

## Goal

The three web resume PDFs the lead agent built on Nov 7, 2026 are live, and every resume button on the site downloads the right file instead of falling back to `/resume`.

## Acceptance criteria

- [ ] `public/resumes/` holds exactly `Ben-Sproat-Resume-AI-Product.pdf`, `Ben-Sproat-Resume-Engineering.pdf` and `Ben-Sproat-Resume-Founder.pdf` (placed in Ben's local repo by the lead agent; one page each, final versions of Nov 7, 2026).
- [ ] `content/resumes.yaml` lists them in this order, `updated: 2026-11-07`:
  - `ai-product`, label "AI product", audience `ai-product`, file `/resumes/Ben-Sproat-Resume-AI-Product.pdf` (default)
  - `engineering`, label "Engineering", audience `engineering`, file `/resumes/Ben-Sproat-Resume-Engineering.pdf`
  - `founder`, label "Founder", audience `founder`, file `/resumes/Ben-Sproat-Resume-Founder.pdf`
- [ ] The home hero "Resume (PDF)" button, the `/hire` resume picker, `/resume` download cards, the footer "Resume (PDF)" button on `/hire` and the `/links` resume entry all point at the files (AI product as the default).
- [ ] The PDFs carry Ben's phone number and "University Park, PA" in the header on purpose (Ben, Nov 7, 2026). Before committing, `pdftotext` on each PDF confirms the only personal data is that phone number, the city line, the email and the profile links; no street address.
- [ ] `CLAUDE.md` standing rule updated: the exception list becomes "the public contact email in `content/profile.yaml` and `content/links.yaml`, and the phone number and city line in the resume PDFs under `public/resumes/`." Web pages stay free of the phone number.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass; Lighthouse on `/resume` stays at the prior scores.

## Files in scope

- `public/resumes/*.pdf`
- `CLAUDE.md` (the one standing-rule line above)
- `content/resumes.yaml`
- Any component that still hard-codes the `/resume` fallback for the resume button
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Do not regenerate or edit the PDFs. The source lives in the planning chat; changes go through the lead agent.

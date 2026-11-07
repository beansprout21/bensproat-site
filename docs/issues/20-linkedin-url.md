---
title: "[P0] New LinkedIn address on the site and in the resume PDFs"
labels: [status:ready, P0, quick]
---

## Goal

Ben's LinkedIn profile moved to the custom address `https://www.linkedin.com/in/bensproat` on Nov 7, 2026. The old address (`/in/benjamin-s-a39622385`) is not guaranteed to redirect, so every link to it may now be broken. Point the site and the three resume PDFs at the new address.

## Acceptance criteria

- [ ] `content/links.yaml`: the LinkedIn `url` becomes `https://www.linkedin.com/in/bensproat`.
- [ ] `content/profile.yaml`: the LinkedIn entry in `sameAs` becomes `https://www.linkedin.com/in/bensproat` (this feeds the JSON-LD Person).
- [ ] The three PDFs under `public/resumes/` are replaced, byte for byte, by the rebuilt files the lead agent left on Ben's machine at `C:\Users\bensp\projects\_resume-pdfs-2026-11-07\` (outside the repo). Same file names. Their only change is the contact line: `linkedin.com/in/bensproat`. sha256:
  - `Ben-Sproat-Resume-AI-Product.pdf`: `3c6677a8729fafb127435e3fbee73a2940895a1d58258642b7e7a13f58bf1a1a`
  - `Ben-Sproat-Resume-Engineering.pdf`: `41d75610dae03dffd47cb47434201648840d87ce6b4c87a78d06e78f3c56fbef`
  - `Ben-Sproat-Resume-Founder.pdf`: `426076ca34df6f5c5d03ad29b5954aceed04408ed86249d73cb20ff8f9ec28bb`
- [ ] `grep -rn "a39622385"` over `app/`, `lib/`, `content/` and `public/` returns nothing (the PDFs' text included: check with `pdftotext` or an equivalent).
- [ ] After deploy: the footer and `/links` LinkedIn links open `linkedin.com/in/bensproat`; the home page JSON-LD `sameAs` lists it.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `content/links.yaml`, `content/profile.yaml`
- `public/resumes/Ben-Sproat-Resume-AI-Product.pdf`, `public/resumes/Ben-Sproat-Resume-Engineering.pdf`, `public/resumes/Ben-Sproat-Resume-Founder.pdf`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none. It touches no file that #39 (home refresh) changes, so it can merge before or after it.

## Notes

- Do not edit `docs/brief-c1.md`; it is a historical brief.
- If the folder above is missing, block the issue and tell Ben; do not regenerate the PDFs.

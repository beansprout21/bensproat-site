---
title: "[P0] General resume above the three versions; home Resume button opens /resume; All my links in the header at every width"
labels: [status:ready, P0]
---

## Goal

Ben's second Nov 8, 2026 review:

1. The home hero's Resume button downloads a PDF. It should open the `/resume` page.
2. A general resume should come first, above the three role-specific versions. The lead agent built it: same content source, one page, checked.
3. "All my links" should be in the header at every width, not only on phones.

## Acceptance criteria

### General resume PDF

- [ ] Copy `Ben-Sproat-Resume-General.pdf` from `C:\Users\bensp\projects\_site-assets-2026-11-08\` to `public/resumes/`. Before committing, its sha256 must be `175d62d1523f05f9346dabdc3001e57701704f0b9409af694a17179c1555b40f`. Report the hash you got. The other three PDFs do not change.
- [ ] `lib/content.ts`: add `"general"` to both resume `audience` enums.
- [ ] `content/resumes.yaml`: a new first entry `{ id: general, label: General, audience: general, file: /resumes/Ben-Sproat-Resume-General.pdf, updated: "2026-11-08" }`. Update the header comment: General is now the default for every "Resume (PDF)" button.
- [ ] Every place that picks the default resume with `audience === "ai-product"` picks `"general"` instead: `app/page.tsx`, `app/_components/site-footer.tsx`, `app/contact/page.tsx` and `app/links/page.tsx`. Better: one helper, `getDefaultResume()` in `lib/content.ts`, used by all four.

### /resume and the home Resume section

- [ ] The General resume is shown first as a full-width card:
  - strip label "General"
  - one-liner "Everything in one page: ventures, AI products, engineering and leadership."
  - the "Updated" date
  - a primary "Download PDF" button that opens the PDF in a new tab
- [ ] Under it, a small heading "Or pick the one for the role", then the existing three cards, unchanged.
- [ ] Copy lives in content: `resume.yaml` (`general.text`, `versionsHeading`) and `home.yaml` `resume`, reusing the same fields if the component is shared.
- [ ] `/resume` lede: "One general resume, plus three versions for three kinds of roles. Each is a one-page PDF." Also update `meta.description` to "Ben Sproat's resume: a general version, plus AI product, engineering and founder versions. Each is a one-page PDF."
- [ ] Home Resume section lede: "Start with the general resume, or pick the version that fits."
- [ ] `/hire` "Pick the resume that fits": add General as the first item ("General", "Everything in one page."). The other three stay.
- [ ] `content/home.yaml` door text "case studies and three resume versions" becomes "case studies and four resume versions".

### Home hero Resume button

- [ ] `home.hero.resumeLabel` becomes "Resume", and the button links to `/resume` in the same tab: no PDF, no new-tab marker. Its style does not change.
- [ ] The other "Resume (PDF)" buttons (footer, `/contact`, `/links`, `/hire` footer) keep their labels and download the General PDF in a new tab.

### All my links in the header

- [ ] In `app/_components/site-header.tsx`, remove `mobileOnly` from the `/links` item so "All my links" shows at every width, after Contact and before the Resume button. Remove `mobileOnly` from `NavItem` if nothing else uses it.
- [ ] Update the comment above `navItems()`.
- [ ] At 1280 px the header fits on one row. At 721 to 1279 px and at 375 px it wraps cleanly, with no overflow, and every target stays 44 px or taller. Put screenshots at 375, 900 and 1280 px in the PR.

### Quality

- [ ] Lighthouse on `/`, `/resume` and `/links`, mobile and desktop: all four categories 95 or higher. Report the numbers.
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm build` pass.

## Files in scope

- `app/_components/site-header.tsx`, `app/_components/nav-link-list.tsx`, `app/_components/active-nav-links.tsx`
- `app/page.tsx`, `app/_components/home/*`, `app/_components/resume-card.tsx` (or wherever the shared card lives), `app/resume/page.tsx`, `app/hire/page.tsx`, `app/contact/page.tsx`, `app/links/page.tsx`, `app/_components/site-footer.tsx`
- `lib/content.ts`, `content/resumes.yaml`, `content/home.yaml`, `content/pages/resume.yaml`, `content/pages/hire.yaml`
- `public/resumes/Ben-Sproat-Resume-General.pdf` (new)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

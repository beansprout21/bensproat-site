---
title: "[P0] Resume and Hire: clear lede, high school education, Canyon Kids, new PDFs; two Impact projects"
labels: [status:ready, P0]
---

## Goal

Ben's Nov 8, 2026 review:

- The `/resume` lede "Three versions, one source of truth." means nothing to a visitor.
- Education is missing Poolesville High School and its Global Ecology Magnet Program.
- Experience is missing Canyon Kids, and the SETTY and MCOP dates are vague.
- The Impact filter on `/projects` shows nothing, because no project has `pillar: impact`.

The lead agent rebuilt the three resume PDFs with the same changes (one page each, checked).

## Acceptance criteria

### /resume copy (`content/pages/resume.yaml`)

- [ ] `lede`: "Three versions for three kinds of roles. Each is a one-page PDF."
- [ ] Under the lede, a contact line: the email and the phone number from `profile.yaml` as `mailto:` and `tel:` links (the phone part of draft 26; if 26 merged first, reuse its component).
- [ ] `meta.description`: "Ben Sproat's resume in three versions: AI product, engineering and founder. Each is a one-page PDF."
- [ ] The rendered page contains no sentence about leaving the phone number or address out (Ben saw "Email and site link only, no phone or address" on the live page; it is not in `content/` today, so grep `app/` and the built HTML and report where, if anywhere, it still comes from).

### Education (`content/pages/hire.yaml`, shown on `/hire` and `/resume`)

- [ ] `education` becomes a list in the same shape as `experience` (`items: [{ dates, text }]`), schema updated, both pages render it as a list:
  - `2026 to 2030`: "Penn State University Park, College of Engineering, Schreyer Honors College. Engineering (major to be declared), expected graduation 2030. College of Engineering merit scholarship."
  - `2022 to 2026`: "Poolesville High School, Global Ecology Magnet Program, Poolesville, MD. 4.0 unweighted GPA. AP Scholar with Distinction, 2025 and 2026."

### Experience (`content/pages/hire.yaml`)

- [ ] Insert after the Sproat Systems line: `dates: 2023 to now`, `text: Volunteer, then technical consultant, Canyon Kids, Bethesda, MD. Set up the sensory gym, then built the practice's website and client systems. My family's pediatric OT practice.`
- [ ] MCOP `dates: June 2025 (1 week)`; SETTY `dates: June 2024 (3 weeks)`. Their text is unchanged.

### Resume PDFs

- [ ] Replace the three files in `public/resumes/` with the copies in `C:\Users\bensp\projects\_site-assets-2026-11-08\`. Before committing, the sha256 of each must match; report the three hashes you got:
  - `Ben-Sproat-Resume-AI-Product.pdf`: `8a76c4d6d5f3f20650f47a2aa8f8de843d5e43b1d1ded2afbfe248df0fd8981a`
  - `Ben-Sproat-Resume-Engineering.pdf`: `d6748b690b78d700f9631d7c3c2dcc3242860c58df902723a6d16df82f20d236`
  - `Ben-Sproat-Resume-Founder.pdf`: `e19c41fd6d458c5ef7e435b2f285a6511fbe3a972d1b59f8385d46d343ac7f3e`
- [ ] `content/resumes.yaml`: `updated: "2026-11-08"` on all three; the header comment's last sentence ("web pages do not") is removed, since web pages now show the phone number (draft 26).

### Two Impact projects (`content/projects/`)

Both use `pillar: impact`, `status: archived`, `featured: false`, `links: []`, and appear under the Impact filter and in the project grid. Copy is from `about.yaml`; add nothing beyond it.

- [ ] `trail-restoration.yaml`
  - `title`: Trail restoration grant
  - `oneLineResult`: "A $1,000 grant I wrote funded 20 volunteers to restore a 0.2-mile trail at John Poole Middle School."
  - `summary`: "Wrote a $1,000 grant in 2021; it was awarded the next year, and 20 volunteers restored a 0.2-mile trail at my middle school."
  - `role`: Grant writer; `when`: 2021 to 2022; `dates`: start `"2021-01"`, end `"2022-12"`
  - `stack`: [grant writing, trail restoration]; `tags`: [environment, community]
  - `metrics`: `$1,000` "grant"; `20` "volunteers"; `0.2 mi` "of trail restored"
  - `paragraphs`: ["Protecting the environment is something I am passionate about. The trail grant was the first time I turned that into a plan, a budget and a day of work with other people."]
  - `statusText`: Complete
- [ ] `lukaya-pencil-cases.yaml`
  - `title`: Pencil cases for Lukaya, Uganda
  - `oneLineResult`: "I led a drive that assembled 700 stocked pencil cases with about 30 contributors for a school in Lukaya, Uganda."
  - `summary`: "Led a supply drive: 700 stocked pencil cases, about 30 contributors, handed out at a school in Lukaya, Uganda, in 2023."
  - `role`: Drive lead; `when`: 2023; `dates`: start `"2023-01"`, end `"2023-12"`
  - `stack`: [supply drive, team coordination]; `tags`: [education, community]
  - `metrics`: `700` "stocked pencil cases"; `~30` "contributors"
  - `paragraphs`: ["We handed the cases out at the school in person. While I was there, the school's farmer and engineer taught me about sustainable engineering."]
  - `statusText`: Complete
- [ ] `order`: after the existing five projects (6 and 7). Each gets `metaDescription`, `ogEyebrow` ("Impact · ...") and `ogLine` in the same style as the others, and a share image that renders (check `/projects/<slug>/opengraph-image`).
- [ ] The home page and `/hire` evidence lists do not change.

### Quality

- [ ] `/projects` with the Impact filter shows both cards; 375 px and 1280 px, no horizontal overflow.
- [ ] Lighthouse on `/resume`, `/projects` and one new project page, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/resume/page.tsx`, `app/hire/page.tsx`, `app/projects/**` (only if the new projects need it)
- `lib/content.ts`, `content/pages/resume.yaml`, `content/pages/hire.yaml`, `content/resumes.yaml`
- `content/projects/trail-restoration.yaml`, `content/projects/lukaya-pencil-cases.yaml` (new)
- `public/resumes/*.pdf` (the three files above)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none (merge before draft 28)

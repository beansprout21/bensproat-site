# Build brief: bensproat.com, Phases C3 and C4 (content and every page)

Date: Nov 5, 2026. Owner: lead agent (planning chat). Builder: Ben's Claude Code session, working the issues imported from `docs/issues/`.

Source of the design: the C2 mockups Ben approved on Nov 5, 2026, with two changes he asked for (startup before business in the proof order; every proof links to the live product first). The mockup markup is checked in under `docs/design/` as a reference. It is not site code: read it for structure, spacing and exact values, then build the real thing with Next.js, Tailwind and the content loaders.

Scope of this brief: real content in `/content`, the design system in code, and every route in the sitemap built to the approved design. Search markup beyond what exists, Open Graph images, the build log, live metrics and the QA pass stay in C5 to C7.

Read `docs/PLAN.md` first. Its wording rules apply to every string in this brief and in `/content`. If a line here contradicts PLAN.md, stop and ask in the issue.

## 0. Rules that apply to every issue

1. The repo is public. Nothing private: no phone, street address, pricing, health, finances, or client names that are not on the approved list in section 7.
2. No em dashes anywhere, in code comments included. Use commas, periods or colons.
3. Copy lives in `/content` and reaches pages only through `lib/content.ts` loaders. Pages hold no copy strings except labels of UI controls (for example "Skip to content").
4. Square-bracket placeholders in this brief, such as `[AVAILABILITY]`, are facts Ben still owes. A page never ships with a placeholder visible: the loader makes the field optional and the component omits the element when the field is null. Ben fills the field in the content file before or after merge.
5. No new npm packages without Ben's OK in the issue. This brief is written so that none are needed: fonts through `next/font/google`, icons as inline SVG, no markdown parser (see section 3).
6. Every page works without JavaScript (links navigate, content renders) and with `prefers-reduced-motion: reduce` (no transitions, no draw-on animation).
7. Lighthouse 95+ on every page, mobile and desktop, before a PR merges. `pnpm lint`, `pnpm format:check` and `pnpm build` pass, and the PR body shows the actual output.

## 1. Design system

Name of the look: builder-craft. A polished product site with one signature interaction (section 2), monospace labels as the "spec sheet" voice, and real artifacts over decoration.

### 1.1 Fonts

Load with `next/font/google` in `app/layout.tsx` and expose as CSS variables.

| Variable         | Family         | Weights       | Use                                                        |
| ---------------- | -------------- | ------------- | ---------------------------------------------------------- |
| `--font-display` | Inter Tight    | 500, 600, 700 | Headings, display numbers, nav name                        |
| `--font-sans`    | Inter          | 400, 500, 600 | Body, buttons, links                                       |
| `--font-mono`    | JetBrains Mono | 400, 500, 600 | Eyebrows, section numbers, tags, metadata, the footer line |

`display: swap`, subsets `latin`. No `<link>` to Google Fonts in the document.

### 1.2 Colors

Define as CSS variables in `app/globals.css` and map into Tailwind's `@theme` so classes like `bg-ground` and `text-ink` exist. Contrast is checked: `ink-2` and `muted` pass 4.5:1 on `ground` and `surface`; `accent` passes 4.5:1 on white and white passes on `accent`.

| Token            | Hex       | Use                                                |
| ---------------- | --------- | -------------------------------------------------- |
| `ground`         | `#FAFAF8` | Page background                                    |
| `ground-2`       | `#F4F4F0` | Alternate section band (proof strip, how it works) |
| `surface`        | `#FFFFFF` | Cards                                              |
| `line`           | `#E4E2DC` | Borders, dividers                                  |
| `line-strong`    | `#C9C7C0` | Secondary button border                            |
| `ink`            | `#15171A` | Headings, primary text, dark band background       |
| `ink-2`          | `#454A52` | Body text                                          |
| `muted`          | `#5F656E` | Mono labels, captions                              |
| `accent`         | `#1F7A4A` | Primary button, links, mark, active door border    |
| `accent-strong`  | `#175E3A` | Hover state of accent                              |
| `accent-tint`    | `#EEF6F0` | Active door background, Sprout placeholders        |
| `accent-line`    | `#BFE0CB` | Pill border                                        |
| `on-dark`        | `#F3F2ED` | Text on the dark footer                            |
| `on-dark-muted`  | `#A9ADB5` | Mono line on the dark footer                       |
| `on-dark-accent` | `#8FD4A8` | Links on the dark footer                           |

One accent only. No gradients, no drop shadows on cards (borders instead), no emoji, no left-border accents on cards.

### 1.3 Type scale

| Role            | Size                        | Line height | Tracking | Weight | Family  |
| --------------- | --------------------------- | ----------- | -------- | ------ | ------- |
| Display (hero)  | `clamp(38px, 4.4vw, 58px)`  | 1.04        | -0.025em | 700    | display |
| Page title      | `clamp(40px, 5vw, 64px)`    | 1.0         | -0.03em  | 700    | display |
| H2              | `clamp(26px, 2.8vw, 34px)`  | 1.12        | -0.02em  | 700    | display |
| H3 / card title | 21 to 22px                  | 1.2 to 1.25 | -0.01em  | 600    | display |
| Lede            | 20px (26px on a case study) | 1.35 to 1.5 | 0        | 500    | sans    |
| Body            | 15 to 16.5px                | 1.55 to 1.6 | 0        | 400    | sans    |
| Button          | 15px                        | 1           | 0        | 600    | sans    |
| Mono label      | 12 to 12.5px, uppercase     | 1.4         | 0.06em   | 500    | mono    |
| Stat number     | 40px                        | 1           | -0.03em  | 700    | display |

Headings use `text-wrap: balance`; ledes use `text-wrap: pretty`.

### 1.4 Layout

- Container: `max-width: 1120px`, `padding-inline: clamp(20px, 4vw, 40px)`, centered.
- Section vertical padding: 56 to 64px on desktop, 40 to 48px at phone width.
- Grids collapse by content, not breakpoints: `grid-template-columns: repeat(auto-fit, minmax(min(<min>px, 100%), 1fr))` with `<min>` 380 for two-column text and image, 300 for three cards, 240 for the four doors, 220 for stat tiles, 200 for metadata.
- The three-item proof and work grids are exactly three columns above 720px and one column below (the reorder animation depends on it; section 2).
- Radii: 8px buttons, 12px cards, 16px images, 999px pills.
- Hit targets at least 44px tall. Focus rings: `2px solid accent`, `outline-offset: 4px`, on `:focus-visible` only.

### 1.5 Components (build once in `app/_components/`, reuse everywhere)

| Component       | Spec                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader`    | Bottom border. Left: the sprout mark plus "Ben Sproat" (display 600, 17px) linking to `/`. Right: Work (`/projects`), About, Now, Contact as 15px links in `ink-2`, then "Resume" as an outlined button (border `ink`). Wraps to two rows at phone width. Current page link in `ink` 600.                                                                                                                          |
| `SiteFooter`    | Dark band (`ink` background). Row 1: H2 in `on-dark` ("Let's build something." on most pages; per-page override allowed) and a light button with the email address (mailto). Row 2: profile links: LinkedIn, GitHub, Devpost, Resume, "Phone version: /links". Row 3: mono line "Built by Ben with a team of Claude agents, in public:" plus a link to the repo in `on-dark-accent`.                               |
| `Mark`          | Inline SVG, 24 or 26px, `viewBox 0 0 24 24`, stroke `accent`, width 1.8, round caps. Paths: `M12 21V10.5`, `M12 14.5C9 14.5 6.2 12.4 5.5 8.6C9.3 8.3 12 10.6 12 14.5Z`, `M12 10.5C12 6.6 14.8 4.2 18.6 4C18 7.9 15.2 10.5 12 10.5Z`. Draw-on animation on first paint: `stroke-dasharray: 40; stroke-dashoffset: 40` to 0 over 700ms, delays 0, 220ms, 420ms. Disabled under reduced motion. `aria-hidden="true"`. |
| `Button`        | Variants: primary (`accent` background, white text), secondary (white, `line-strong` border, `ink` text), text (underlined, offset 4px). Height 46px, padding 0 18 to 20px, radius 8px. Renders as `<a>` when it has an href.                                                                                                                                                                                      |
| `ExternalLink`  | An `<a>` with `target="_blank" rel="noopener noreferrer"` and a 14px inline arrow-out SVG (`M6 3h7v7M13 3L6 10`). Used for every "see it live" link. Screen readers get "(opens in a new tab)" via `sr-only`.                                                                                                                                                                                                      |
| `Card`          | `surface` background, 1px `line` border, radius 12px, padding 22 to 24px, flex column, gap 12px.                                                                                                                                                                                                                                                                                                                   |
| `SectionHeader` | Mono eyebrow (for example "01 / Problem") above an H2, optional lede. Max width 64ch.                                                                                                                                                                                                                                                                                                                              |
| `StatTile`      | Card with a 40px display number and a 14px `ink-2` caption.                                                                                                                                                                                                                                                                                                                                                        |
| `ProofCard`     | Card: mono rank plus kind ("01 Win"), H2 title (21px), body, then a link row: `ExternalLink` to the live product in `accent` 600, and a plain underlined link to the project page in `ink-2`.                                                                                                                                                                                                                      |
| `DoorCard`      | An `<a href>` styled as a card (whole card is the link): H3 question (22px), 14.5px description. Active state: `accent` border, `accent-tint` background; inactive siblings at 72% opacity while one is active. Transition 180ms. External door gets the arrow-out icon.                                                                                                                                           |
| `WorkCard`      | Cover image (16:10, radius 12px) or nothing if the project has no cover, mono tags line, H3 title, body (one-line result plus one sentence), link row like `ProofCard`.                                                                                                                                                                                                                                            |
| `Prose`         | Renders an array of paragraphs as `<p>` elements (section 3); no markdown.                                                                                                                                                                                                                                                                                                                                         |
| `Pill`          | 30px tall, `accent-tint` background, `accent-line` border, mono 12px, `accent-strong` text.                                                                                                                                                                                                                                                                                                                        |

Icons: inline stroke SVG only (arrow right `M3 8h10M9 4l4 4-4 4`, arrow out above). No icon package.

### 1.6 Images

- Use `next/image` with explicit `sizes`. No layout shift.
- Files Ben supplies in `public/images/` (section 7): `headshot.jpg` (960 x 1200, 4:5), `about-field.jpg` (1600 x 1067, 3:2), `about-grass.jpg` (1400 x 1050, 4:3), project covers as they arrive (`projects/<slug>.jpg`, 1600 x 1000).
- Alt text for the headshot: "Ben Sproat, smiling, in a navy shirt against a white wall".
- Never add a photo that is not on the list in section 7. No stock images.

## 2. The signature interaction: doors that reshape the page (home only)

Production behavior, decided by Ben on Nov 5, 2026:

1. Each door is a real link. Click or tap navigates: `/ventures`, `/hire`, `/about`, and `https://sproatsystems.com` (new tab).
2. On devices with hover, hovering or keyboard-focusing a door previews that visitor's view of the page: the proof strip reorders, the work cards reorder, the hero's primary button changes label and target, and the proof eyebrow reads "Proof, ordered for <who>". Leaving the door restores the default.
3. On touch devices and without JavaScript nothing previews; the links still work and the default order shows.

Order table. Priming Labs (the startup) sits above Sproat Systems (the business) in every state except the automation door, where the visitor is asking for the business.

| State (door)           | Order of proof and work cards   | Hero primary button                    | Eyebrow "who"                  |
| ---------------------- | ------------------------------- | -------------------------------------- | ------------------------------ |
| default                | sprout, priming, sproat-systems | "See the work" to `/projects`          | everyone                       |
| building (`/ventures`) | priming, sprout, sproat-systems | "See what I'm building" to `/ventures` | partners and investors         |
| hiring (`/hire`)       | sprout, priming, sproat-systems | "Download the resume" to `/resume`     | recruiters and companies       |
| about (`/about`)       | sprout, priming, sproat-systems | "Read the story" to `/about`           | anyone curious                 |
| automation (external)  | sproat-systems, sprout, priming | "Visit Sproat Systems" (external)      | practices that need automation |

Implementation guidance:

- One client component, `HomeRouter`, owns the `door` state and renders the hero button, proof strip, doors and work grid. It receives all content as props from the server page; no copy inside it.
- Reorder animation on desktop: keep DOM order fixed and move cards with `transform: translateX(calc(<shift> * (100% + <gap>)))`, 420ms `cubic-bezier(.2,.8,.2,1)`, where `shift` is target slot minus DOM index. Below 720px set `order` instead and no transform. The reference file `docs/design/c2-home.html` shows exactly this. A FLIP approach is fine too if it stays dependency-free and respects reduced motion.
- `aria-current` is not needed; the doors are plain links. Do not add `role` or `onClick` to non-interactive elements.

## 3. Content model (changes to `lib/content.ts`)

Keep every schema a strict zod object. Add loaders for the new files and extend `validateAllContent()`.

### 3.1 Projects become structured YAML

Replace `content/projects/*.mdx` with `content/projects/<slug>.yaml`. The body sections are arrays of strings (paragraphs) or arrays of objects, rendered by `Prose` and small components. No markdown parser is needed. Schema:

```ts
Project {
  slug, title, pillar: builder | founder | impact,
  oneLineResult: string,            // the lede
  summary: string,                   // one or two sentences for cards
  role: string,
  team?: string,
  when: string,                      // human text, for example "October 2026, a 24-hour build"
  dates: { start: YYYY-MM, end?: YYYY-MM },
  status: live | in-progress | archived,
  statusText?: string,               // human text shown in the metadata row
  stack: string[],
  tags: string[],                    // 2 to 4 short words for the mono line on cards
  live?: { label: string, url: url },   // the tangible product, always first in link rows
  links: { label, url, kind: live | code | devpost | site | other }[],
  metrics: { value: string, label: string }[],   // stat tiles, up to 4
  cover?: string,                    // "/images/projects/<slug>.jpg"
  featured: boolean, order: int,
  sections?: {                       // present only for full case studies
    problem?: { heading: string, paragraphs: string[], stats?: { value, label }[] },
    built?: { heading: string, paragraphs: string[], steps?: { lead: string, text: string }[] },
    how?: { heading: string, paragraphs: string[], columns?: { title: string, text: string }[], pipeline?: { title: string, text: string }[] },
    failed?: { heading: string, items: { lead: string, text: string }[] },
    results?: { heading: string, items: string[] },
    visuals?: { images: { src: string, alt: string }[], video?: { url: url, label: string } },
    footnote?: string
  }
}
```

The one-line result is the first thing on a case study page, then the metadata row (Role, Team, When, Status, Stack), then the stat tiles, then the sections in this order: problem, built, how, failed, results, visuals, links, footnote. Sections that are missing are skipped. Projects without `sections` render the summary, metadata, stat tiles and links only.

### 3.2 New files

- `content/home.yaml`: hero (name, headline, sub, `availability: string | null`), `nowLine: string | null`, proof items (project slug, kind, title, text), doors (key, title, text, href, external, cta label, who, order), footer heading.
- `content/pages/ventures.yaml`, `content/pages/hire.yaml`, `content/pages/about.yaml`, `content/pages/contact.yaml`: the copy in section 4, as structured fields.
- `content/resumes.yaml`: three entries once the PDFs exist (section 7). The page renders whatever the array holds.
- `content/now.mdx`: keep the file and `NowSchema`; the body is plain paragraphs separated by blank lines, split on `\n\n` and rendered with `Prose`. Add `items?: string[]` for a bullet list.
- `content/links.yaml`: keep the schema; update the entries (section 4.9).
- `content/profile.yaml`: `oneLiner` becomes "I turn ideas into working AI products." Add `headline: "AI Product Builder | Engineering, Penn State Schreyer Honors College | HackPSU FNB Challenge Winner | Co-Founder, Priming Labs | Founder, Sproat Systems"` for metadata descriptions and JSON-LD `description`.

Every page's `<title>` and `description` come from its content file.

## 4. Pages, copy and layout

All copy below is final unless it is in square brackets. Keep the exact wording. Where a line says (ExternalLink), render the arrow-out link in a new tab.

### 4.1 `/` Home

Reference: `docs/design/c2-home.html`. Sections top to bottom:

**Hero** (two columns, text left, headshot right, 40px gap; stacks at phone width with the photo below the buttons)

- Name line: "Ben Sproat" (display 600, 18px)
- Headline: "I turn ideas into working AI products."
- Sub: "Engineering student, Penn State Schreyer Honors College."
- Availability line (mono, with an 8px accent dot): `[AVAILABILITY]`, omitted while null.
- Buttons: primary = the door-dependent button (default "See the work" to `/projects`); secondary "Resume (PDF)" to the default resume file, or to `/resume` while no file exists; text link "Email Ben" (mailto).
- Photo: `headshot.jpg`, max width 420px, radius 16px, 1px `line` border.

**Proof strip** (band in `ground-2`, top and bottom `line` borders)

- Eyebrow: "Proof, ordered for everyone" (the "who" swaps with the door state). Right-aligned caption: "Every claim links to the live product, so you can check it yourself."
- Three `ProofCard`s, default order sprout, priming, sproat-systems. Rank numbers follow the current order.

| Slug           | Kind     | Title                                   | Text                                                                                                  | Live link (first)                                      | Page link      |
| -------------- | -------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------- |
| sprout         | Win      | FNB Challenge winner, HackPSU Fall 2026 | Sprout, a goals-first AI money coach that hands students to a banker. 353 participants, 122 projects. | "Try Sprout live" to https://getsprout.tech            | "Case study"   |
| priming        | Startup  | Technical co-founder, Priming Labs      | Readiness testing for coaches and physical therapists. Web app live, iOS app in beta.                 | "See Priming live" to https://priminglabs.com          | "Project page" |
| sproat-systems | Business | Founder, Sproat Systems                 | Websites, CRMs and AI automation for healthcare practices and small businesses, since 2025.           | "See Sproat Systems live" to https://sproatsystems.com | "Project page" |

**Doors**

- H2: "What brings you here?" Lede: "Pick a door. The page reorders for you, and the resume stays one click away."
- Four `DoorCard`s:

| Key        | Title               | Text                                                                                                                | Target                              |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| building   | Building something? | Partners and investors: what I'm building, how I build, and what I'm looking for.                                   | `/ventures`                         |
| hiring     | Hiring?             | Recruiters and companies: engineering plus AI product skills, availability, case studies and three resume versions. | `/hire`                             |
| about      | Who's Ben?          | The story in three pillars: builder, founder, impact. Plus the outdoors.                                            | `/about`                            |
| automation | Need AI automation? | Sproat Systems builds websites, CRMs and AI automation for healthcare practices and small businesses.               | https://sproatsystems.com (new tab) |

**Selected work**

- H2 "Selected work", right link "All projects" to `/projects`.
- Three `WorkCard`s (same three projects, same order rules). Card copy comes from each project's `tags`, `title`, `summary`, `live` and page link.

**Now line** (thin band): mono "Now" plus `nowLine` from `content/home.yaml` and a link "Full /now page". Omitted while `nowLine` is null.

**Footer**: default.

JSON-LD: keep the existing ProfilePage and Person. Add `jobTitle: "AI product builder"` and `alumniOf`/`affiliation` for Penn State Schreyer Honors College if the existing helper makes that a one-line change; otherwise leave for C5.

### 4.2 `/ventures` Build with me

For startup partners and investors. Layout: page title block, "Now building" cards, "How I build" two columns with the pipeline row, "What I'm looking for", CTA band.

- Eyebrow: "For partners and investors". H1: "I build the product. Fast, with proof you can click."
- Lede: "Three things I'm building now, and the way I build them."
- **Now building** (three `Card`s with a live link first):
  1. Priming Labs: "Readiness testing for coaches and physical therapists. Technical co-founder, with a Doctor of Physical Therapy. Maryland LLC, web app live, iOS app in beta, Happy Valley LaunchBox Idea TestLab completed." Links: "See Priming live" (ExternalLink, priminglabs.com), "Project page" (`/projects/priming`).
  2. OT Directory: "A public directory of occupational therapy clinics across the mid-Atlantic, in testing before launch. Built on a pipeline that finds clinics in the NPI registry, verifies ownership and extracts details with Claude. Joint venture." Links: "Project page" (`/projects/ai-data-systems`). No live link and no counts until launch.
  3. Sprout: "Goals-first AI money coach that hands students to a banker. Won the FNB Challenge at HackPSU Fall 2026. A 90-day pilot at FNB's Penn State HUB branch is proposed." Links: "Try Sprout live" (ExternalLink), "Case study".
- **How I build** (H2 "How I build", two columns):
  - Paragraph 1: "A lead chat owns the spec, the contracts and the backlog. Parallel coding agents build through GitHub issues and pull requests, each on its own branch. An overnight loop generates test users, fixes what breaks and audits the AI's live answers. I own the architecture, the decisions and the final call."
  - Paragraph 2: "Sprout proved the method in 24 hours: 3,084 generated users, 600 live AI outputs audited, failing checks from 3 to 0. This site is built the same way, in public." Link "See the repo" (ExternalLink to https://github.com/beansprout21/bensproat-site).
  - Pipeline row (four boxes with arrows, from the Sprout case study): Lead chat; GitHub issues, PRs, labels; Parallel coding agents; Overnight loop: generate, fix, audit.
- **What I'm looking for** (H2): `[LOOKING_FOR: two or three sentences from Ben, for example domain partners in healthcare and banking, pilot customers, and early-stage investors for Priming Labs]`. Omitted while null.
- **Supporting proof** (small three-column row of plain text, mono labels): "Paying clients since 2025" (Sproat Systems), "Schreyer Honors College" (Penn State, Engineering), "AI data systems" (link to `/projects/ai-data-systems`).
- Footer heading override: "Let's talk about building something." Button: email. If `contact.booking` is set, add a secondary "Book a call" button.

### 4.3 `/hire` Hire me

For recruiters and companies. Layout: title block with availability, three skill columns, evidence cards, education, resume picker, CTA.

- Eyebrow: "For recruiters and companies". H1: "Engineering training, AI product skills, shipped work."
- Availability line: `[AVAILABILITY]` (same field as home), omitted while null.
- **What I can do** (three `Card`s, H3 plus bullets):
  1. AI product engineering: Next.js and TypeScript; Claude API with deterministic engines and guards around the AI; Auth0 role-based access; Vercel; coordinated AI coding agents through GitHub.
  2. Engineering: CAD in Fusion 360 and Onshape; 3D printing (TPU, PETG-CF); PLTW capstone team lead, three prototypes in six weeks; energy modeling of 10+ homes in EnergyPro 9 at an MEP firm.
  3. Systems and automation: GoHighLevel CRMs and intake systems; data pipelines on the NPI registry, Google Places, Apify, NeverBounce and Supabase; Python and SQLite; an always-on Linux server.
- **Evidence** (H2 "Evidence", `WorkCard` grid): Sprout, Priming Labs, Sproat Systems, Floating sunglasses, AI data systems. Order as listed.
- **Experience** (H2, a simple list with mono dates):
  - 2026 to now: Technical co-founder, Priming Labs.
  - 2025 to now: Founder, Sproat Systems.
  - Summer 2025: Intern, Medical Center Orthotics and Prosthetics, Silver Spring, MD. Observed and assisted in making prosthetic and orthotic devices, including a power knee.
  - Summer 2024: Engineering intern, SETTY, Washington, DC. Modeled the energy efficiency of 10+ California homes in EnergyPro 9 and checked them against energy regulations.
  - Summers 2022 to 2026: Counselor, then Lead Counselor, Bretton Woods Recreation Center. Led staff training and adventure camp groups of up to 20 kids.
- **Education** (H2): "Penn State University Park, College of Engineering, Schreyer Honors College. Engineering (major to be declared), started August 2026, expected graduation 2030. College of Engineering merit scholarship. AP Scholar with Distinction, 2025 and 2026." Do not print the scholarship amount.
- **Resume picker** (H2 "Pick the resume that fits", three `Card`s): AI product (default), Engineering, Founder. Each: one line on who it is for and a "Download PDF" button; while a file is missing the card links to `/resume`.
- Footer heading override: "Let's talk." Buttons: email, "Resume (PDF)".

### 4.4 `/about`

Layout: full-width photo header (`about-field.jpg`, 3:2, max height 520px, object-fit cover) with the title below it, short bio, three pillar columns, timeline, outdoors section with `about-grass.jpg`, CTA.

- H1: "Building since Lego."
- Lede: "Ben Sproat builds things that work, and now he builds them with AI."
- **Short bio** (one paragraph): "Ben Sproat is a Schreyer Honors engineering student at Penn State who builds AI products. He won the FNB Challenge at HackPSU Fall 2026 with Sprout, co-founded Priming Labs, a readiness app for athletes and their coaches, and runs Sproat Systems, which builds websites, CRMs and AI automation for healthcare practices and small businesses."
- **Three pillars** (H2 "Three threads", three columns, each an H3, one paragraph, and a short list):
  1. Builder. "I always loved making things with whatever I had." Lego cities without instructions; a Lego EV3 robot that scanned and solved a Rubik's Cube for the 4th grade science fair (Honorable Mention); a PC and Ethereum mining rig built around an RTX 3070 that paid for its own gaming upgrade; 3D printing and CAD in Fusion 360 and Onshape, including 30 custom medallions for a youth basketball team; a floating sunglasses capstone as team lead; Sprout, built with a team of AI agents; an always-on home server that transcribes lectures and triages email.
  2. Founder. "Trying to make money by selling stuff." Worms for bait at age 7 (they died); furniture resale for about $250 in middle school; a mining rig that returned about $600; a pickleball Instagram that reached a paid sponsor; Sproat Systems, started in 2025 with my family's pediatric OT practice as the first client; Priming Labs, co-founded in 2026; a directory of occupational therapy clinics, in testing.
  3. Impact. "Protecting the environment is something I am passionate about." A $1,000 grant, 20 volunteers and a restored 0.2-mile trail at my middle school; 700 stocked pencil cases assembled with about 30 contributors and handed out at a school in Lukaya, Uganda, where the school's farmer and engineer taught me sustainable engineering; energy modeling at SETTY; equipment and website work at Canyon Kids; adaptive camp counseling; teaching AI to 18 friends and family members and every client.
- **Timeline** (H2 "The short version", a vertical list with mono years):
  - 2017: Lego EV3 Rubik's Cube solver, Honorable Mention at the science fair.
  - 2021: Trail grant written, awarded the next year.
  - 2022: Ethereum mining rig built; first 3D printer.
  - 2023: Bells and Breaks, a countdown site for Poolesville High students, my first code; 700 pencil cases delivered in Lukaya, Uganda.
  - 2024: Founding member and captain of Poolesville High's first varsity pickleball team; SETTY internship.
  - 2025: Sproat Systems; MCOP internship; everyday.pickleball reaches a paid sponsor.
  - 2026: Floating sunglasses capstone as team lead; Priming Labs; Penn State Schreyer Honors College; won the FNB Challenge at HackPSU Fall 2026.
- **Outdoors and teams** (H2 "Off the keyboard", photo `about-grass.jpg` beside one paragraph): "I grew up fishing with my grandpa and hiking in Acadia. Two summers at a primitive wilderness camp in Vermont taught me to build a fire with a bow drill and to pay attention. I have captained most teams I played on, from travel soccer to a founding varsity pickleball team, and I spent five summers leading camp groups on kayaks, paddleboards and high ropes. The environment thread runs through the trail grant, nine Chesapeake Bay cleanups and the energy modeling work."
- Footer heading override: "Say hello."

Keep off this page: anything in the private list in PLAN.md and Positioning v1 (family and health stories, investing, net worth, contest rejections, the basketball injury, addresses, scores).

### 4.5 `/projects` index

- H1: "Projects". Lede: "Case studies first, then everything else I have built."
- Filter row (client-side, links styled as pills, "All" default; without JavaScript all cards show): All, Builder, Founder, Impact.
- Case study grid (`WorkCard`): every project with `featured: true` in `order`.
- **Archive** (H2 "Earlier builds", a table with columns Year, Project, What, Status; scrolls horizontally at phone width):

| Year    | Project                     | What                                                                                                 | Status    |
| ------- | --------------------------- | ---------------------------------------------------------------------------------------------------- | --------- |
| 2026    | Nittany Org Finder          | Searchable directory of all 1,237 Penn State student organizations, joined to the events calendar    | Prototype |
| 2026    | Roadster Kickflip           | Interactive 3D rigid-body physics simulation with live equations                                     | Prototype |
| 2026    | Lead Forge AI               | Business discovery plus AI lead scoring (Google Places, Apify, NeverBounce, Supabase)                | Finished  |
| 2023-24 | Magnetic-closing Ziploc bag | Three prototypes of a reusable bag with magnetic strips; shelved because the seal was not airtight   | Shelved   |
| 2023    | Custom medallions           | 30 3D-printed medallions for a youth basketball team; demand melted the extruder during playoffs     | Finished  |
| 2022    | Bells and Breaks            | Countdown site for Poolesville High students; first code, written with early ChatGPT as a tutor      | Retired   |
| 2021-22 | Ethereum mining rig         | Built around an RTX 3070; about $600 profit reinvested into a gaming PC                              | Finished  |
| 2017    | EV3 Rubik's Cube solver     | Lego EV3 robot that scanned a cube with a color sensor and solved it; science fair Honorable Mention | Finished  |

### 4.6 `/projects/[slug]` case studies and project pages

Template per section 3.1. Five project files in C3:

**sprout** (full case study, reference `docs/design/c2-sprout.html`)

- title: Sprout. pillar: builder. featured: true. order: 1. status: live. statusText: "Live prototype at getsprout.tech; pilot proposed to FNB".
- oneLineResult: "Won the FNB Challenge at HackPSU Fall 2026, out of 122 projects, with a goals-first AI money coach that hands students to a banker. Built and deployed in 24 hours by two students and a team of AI agents."
- summary: "Won the FNB Challenge at HackPSU Fall 2026. Claude explains the plan, a deterministic engine owns every number, and 3,084 generated users stress-tested it overnight."
- role: `[SPROUT_ROLE: what Ben owned]`. team: "Ben Sproat and Ethan Cooper". when: "October 2026, a 24-hour hackathon build". dates: start 2026-10.
- stack: Next.js, TypeScript, Tailwind, shadcn/ui, Auth0, Upstash Redis, Claude Haiku and Sonnet, Vercel. tags: Next.js, Auth0, Claude.
- live: "Try Sprout live" https://getsprout.tech. links: code https://github.com/beansprout21/hackpsu-f26 ("Code on GitHub"), devpost https://devpost.com/beansprout21 ("Devpost").
- metrics: 3,084 "generated users run through the plan engine overnight"; 600 "live AI outputs audited: 200 plans and 400 Ask Sprout answers"; "3 to 0" "failing checks by morning, with zero crashes"; "24 h" "from empty repo to a deployed product with sign-in, upload and a banker view".
- sections.problem: heading "Students don't trust money advice, and most money apps start from the wrong question." Paragraph: "At the opening ceremony, FNB asked: for a big money decision, who do you trust, a banker with 30 years of experience, a finance personality on social media, or an AI agent? Most apps track what you already spent. Sprout starts with what you want and builds the plan backward, then hands you and your plan to a banker." Stats: 63% "of adults 18 to 29 said they were doing at least okay financially, against 73% of all adults (Federal Reserve SHED 2025)"; 61% "of investors 18 to 34 have made an investment decision on a social media personality's recommendation (FINRA Foundation)"; "3 in 10" "U.S. adults have confidence in AI to manage money, while about 1 in 4 young adults who sought guidance used AI (Edward Jones and Gallup)".
- sections.built: heading "A plan that changes with what you value, not only with your numbers." Paragraph: "In the demo, Maya, a sophomore saving to study abroad in Japan, gets a different first move and a different savings split when she swipes for security instead of experiences. No account is needed to build a plan." Steps: (1) Values first. Eight swipes reveal a money persona, such as Experience Collector or Safety Builder. (2) Goals, not a credit score. Studying abroad, a first home or building credit, placed on a timeline. (3) Money the way students have it. Summer savings, aid refunds, gig work or nothing coming in. Upload a statement and the AI fills it in, then discards the file. (4) A first move today. Step one is personal and takes two minutes, with the FNB account that fits right under it, fees shown. Every goal shows when you get there. (5) Ask Sprout. An agent that explains the plan with your real numbers, runs what-ifs and remembers the conversation. (6) Hand-off to a banker. Sign in to save a banker-ready PDF or opt in to share the plan. A role-protected dashboard lets a banker see the goals before the meeting.
- sections.how: heading "The AI explains. The engine decides every number. Guards check both." Paragraph: "Take the AI out and Sprout can't read your values, your statements or your questions. Take the engine out and the AI could invent numbers. Each part does what it does best." Columns: "AI understands and explains" ("Claude Haiku turns swipes and goals into a goal profile in the student's own words and reads uploaded statements. Claude Sonnet explains why each step fits and powers Ask Sprout."); "Engine decides" ("Every number is deterministic code with tests: income from irregular sources, the spending split, the safety cushion, goal timelines, and which FNB products fit and when they unlock."); "Guards verify" ("Any AI sentence with a number the engine didn't produce is replaced. Products outside FNB's catalog are dropped. Every AI call has a timeout and a template fallback, so the plan never breaks."). Pipeline (label "Built by a team of AI agents, coordinated through GitHub"): "Lead Claude chat" ("Owned the spec, the contracts and the backlog. Triaged every hour overnight."); "GitHub issues, PRs, labels" ("The only channel between agents. Clear file ownership kept them from colliding."); "Up to 4 Claude Code sessions" ("Built features in parallel, each on its own issue and branch."); "Overnight loop: generate, fix, audit" ("One agent generated thousands of users and checked 25 rules, one fixed what it found, one audited live AI answers.").
- sections.failed: heading "The overnight test caught us giving bad advice. That is why the engine is deterministic." Items: "The first plan felt like an ad." / "Step one was \"open an account.\" We rebuilt it so step one is always personal, with the FNB product underneath as the fit."; "Three bad recommendations surfaced overnight." / "A CD with a $100 minimum for students with no income, a retirement account for a car fund, and a credit card matched to the safety cushion. Each became a rule, a fix and a regression test before morning."; "Irregular income had to be modeled honestly." / "Aid refunds, summer savings and \"no money coming in\" are first-class inputs, without shaming anyone."; "One deliberate trade-off." / "The AI never produces a number, even though that makes it feel less magical. A money coach that invents figures is worse than none."
- sections.results: heading "Won the FNB Challenge. Proposed a pilot." Items: "Winner of the FNB Challenge, \"Trust, Decisions & Financial Confidence,\" at HackPSU Fall 2026: 353 participants, 122 projects."; "Also entered for the Grand Prize, the Nittany AI Challenge and MLH Best Use of Auth0."; "Proposed a 90-day pilot at FNB's Penn State HUB branch: students scan a QR code, build a plan and book a banker who already knows their goals. Proposal only, not yet started."; "Firsts for the team: a financial-planning engine, Auth0 role-based access, and running AI agents as a coordinated team."
- sections.visuals: images from `public/images/projects/sprout-*.jpg` when Ben supplies them (plan view, values swipes, Ask Sprout, banker dashboard); omitted while empty. video: `[SPROUT_VIDEO_URL]` or omitted.
- sections.footnote: "Sprout is an educational prototype built for HackPSU Fall 2026. It is not affiliated with or endorsed by FNB. Product details came from FNB's public pages, there is no bank account linking, and shared plans live in a demo store for 30 days. Planning method adapted from Ramit Sethi's I Will Teach You to Be Rich, with no affiliation."
- Footer heading override on this page: "Want to see the engine?"

**priming** (project page, no sections yet)

- title: Priming Labs. pillar: founder. featured: true. order: 2. status: in-progress. statusText: "Web app live, iOS app in beta".
- oneLineResult: "Daily readiness testing for coaches and physical therapists, built with a Doctor of Physical Therapy. Technical co-founder."
- summary: "Technical co-founder. Daily readiness testing for coaches and physical therapists, built with a Doctor of Physical Therapy."
- role: "Technical co-founder: product, web app and iOS app". team: "Co-founded with a Doctor of Physical Therapy `[CO_FOUNDER_NAME with her permission]`". when: "June 2026 to now". dates: start 2026-06.
- stack: `[PRIMING_STACK]` (Ben confirms; the web app was built on Lovable, the iOS app ships through TestFlight). tags: Web app, iOS beta.
- live: "See Priming live" https://priminglabs.com. links: site https://priminglabs.com.
- metrics: "Jul 2026" "Maryland LLC formed"; "TestFlight" "iOS app in beta"; "LaunchBox" "Happy Valley Idea TestLab completed, Fall 2026".
- No claims about users, practices or revenue.

**sproat-systems** (project page)

- title: Sproat Systems. pillar: founder. featured: true. order: 3. status: live. statusText: "Serving clients since 2025".
- oneLineResult: "Websites, GoHighLevel CRMs and AI automation for healthcare practices and small businesses. Founder, since 2025."
- summary: "Founder, since 2025. Websites, GoHighLevel CRMs and AI automation for healthcare practices and small businesses."
- role: "Founder. I scope, build and teach every system I ship." when: "2025 to now". dates: start 2025-06.
- stack: GoHighLevel, WordPress, Next.js, Claude, Supabase. tags: Websites, CRMs, automation.
- live: "See Sproat Systems live" https://sproatsystems.com.
- Body paragraphs (render as `summaryParagraphs: string[]` under `sections.built.paragraphs` with heading "What I build"): "It started in 2025 with my family's pediatric OT practice, my first client: a new website and booking flow, scheduling automation, and a therapist recruitment pipeline." "Since then: a WordPress rebuild with seven SEO articles at launch and Search Console reporting for a mobile therapy practice; a GoHighLevel seller-lead pipeline with call tracking and booking for a land-buying company; a social media and local-visibility program for a trades business; an 85-field client intake system; and ongoing consulting for Cloud Surfing Media on GoHighLevel systems and AI for its clients." "Every client learns to use AI in their own work before I leave."
- Clients are described, not named, until Ben confirms permission (section 7). Cloud Surfing Media is approved.

**floating-sunglasses** (project page)

- title: Floating sunglasses. pillar: builder. featured: true. order: 4. status: archived. statusText: "Capstone complete; restart planned for spring 2027".
- oneLineResult: "Three prototypes in six weeks of sunglasses that float, with a 312-second mean float against a 300-second target. Team lead and lead designer, PLTW Engineering Capstone."
- summary: "PLTW capstone, team lead of four. Three prototypes in six weeks; 312 s mean float against a 300 s target; three of three six-foot drop tests passed."
- role: "Team lead and lead designer: team organization and every design decision". team: "Team of four". when: "2025 to 2026 school year". dates: start 2025-09, end 2026-06.
- stack: Fusion 360, TPU 3D printing, band saw, Silpoxy bonding. tags: CAD, 3D printing, prototyping.
- metrics: "312 s" "mean float time against a 300 s target"; "3 of 3" "six-foot drop tests passed"; "$5.45" "prototype cost, $4.75 at scale"; "80%" "frame-fit target, not yet met".
- Paragraph: "Feedback came from professionals at summer camps. The frame-fit target is the open problem; the plan is to restart the design in spring 2027 with some of the original teammates, this time with AI in the loop." Nothing about intellectual property.

**ai-data-systems** (project page)

- title: AI data systems. pillar: builder. featured: true. order: 5. status: in-progress. statusText: "OT Directory in testing".
- oneLineResult: "Pipelines that find, verify and extract business data with AI, from a lead engine to a clinic directory and an acquisition sourcing system."
- summary: "Lead Forge AI, an occupational therapy clinic directory in testing, an AI-assisted acquisition sourcing pipeline, and the always-on server they run on."
- role: "Builder". when: "January 2026 to now". dates: start 2026-01.
- stack: Python, SQLite, Supabase, Claude, Apify, NeverBounce, Google Places, NPI registry, Linux. tags: Pipelines, Claude, data.
- Paragraphs: "Lead Forge AI (January to February 2026): business discovery through Google Places and Apify, GPT-4o-mini scoring, NeverBounce verification and Supabase functions. Tuned scraper concurrency, added cost tracking and fixed the scoring rubric. Finished." "OT Directory (summer 2026 to now): a joint venture building a public directory of occupational therapy clinics. The pipeline reuses Lead Forge: NPI registry discovery, Census geocoding, Google Places lookup, site crawl, an ownership check, Claude extraction, duplicate merge and map-pin correction. A first extraction model was replaced after measuring 35% field errors. In testing before launch." "Acquisition sourcing (summer 2026): an AI-assisted pipeline for finding small businesses to buy, built with my dad. 29,245 Google Maps queries, a buy box built on SBA 7(a) default data across 27 industry codes and 8 states, and 590 verified owner contacts. Built and paused before any outreach; no emails were sent." "Hermes: an always-on Ubuntu mini PC with an encrypted disk, Tailscale and systemd, running a local 20B model, Whisper lecture transcription and email triage."
- Counts for the OT Directory (clinics, cities) are added only after it launches.

### 4.7 `/resume`

- H1: "Resume". Lede: "Three versions, one source of truth. Email and site link only, no phone or address."
- Download cards from `content/resumes.yaml` (label, who it is for, updated date, "Download PDF"). While the array is empty, show one line: "PDFs are being updated. Email me for a copy." with the mailto link.
- In-page summary (from `content/pages/hire.yaml`, reused): Education block, Experience list, three skill columns. No duplication of copy in the content files: `/resume` reads the same fields as `/hire`.
- Footer default.

### 4.8 `/contact`

- H1: "Contact". Lede: "Email is fastest."
- Primary button: the email address (mailto). Secondary "Book a call" when `booking` is set (`content/pages/contact.yaml`: `booking: url | null`).
- Profiles list (LinkedIn, GitHub, Devpost) with `rel="me"`.
- Line: "On a phone? The link page at /links has everything as tap targets."
- Footer heading override: "Let's build something."

### 4.9 `/links`

Phone-first link page, already working. Update the entries and the header:

- Header: small headshot (96px circle), "Ben Sproat", "I turn ideas into working AI products."
- Order in `content/links.yaml`: LinkedIn; Resume (PDF, default file, or `/resume` while missing); Sprout, "Try it live" (getsprout.tech); Priming Labs (priminglabs.com); Sproat Systems (sproatsystems.com); GitHub; Devpost; Email.
- Keep `?src=card` working. If Vercel Analytics custom events are available on the Hobby plan without a new package, send one event `links_view` with `src`; otherwise skip and note it in the PR.

### 4.10 `/now`

- H1: "Now". Mono line "Updated <date>" from the frontmatter.
- Body from `content/now.mdx`: paragraphs plus `items`. Draft for Ben to confirm:
  - "First-year engineering at Penn State, Schreyer Honors College."
  - "Building Priming Labs toward its beta with coaches and physical therapists."
  - "Testing the OT Directory before launch."
  - "Running Sproat Systems for current clients."
  - "Building this site in public, with a lead planning agent and Claude Code."
- Footer default.

### 4.11 Global

- `app/layout.tsx`: fonts, `SiteHeader`, `main` with the container, `SiteFooter`, analytics, skip link kept.
- `not-found.tsx`: styled with the system: H1 "Nothing grows here.", a line, and links to Home and Projects.
- Metadata: every page sets `title` and `description` from its content file. The home `description` is the profile headline.
- `sitemap.ts`: include every project slug.

## 5. Issue breakdown and order

Drafts live in `docs/issues/`. Work them in number order; each lists its own files in scope.

| Draft | Title                                                         | Priority | Depends on |
| ----- | ------------------------------------------------------------- | -------- | ---------- |
| 01    | Design system: fonts, tokens, header, footer, base components | P0       | none       |
| 02    | Content model: structured projects and page files             | P0       | none       |
| 03    | Content: project data and page copy from the brief            | P0       | 02         |
| 04    | Home page with the doors interaction                          | P0       | 01, 03     |
| 05    | Projects index and project pages, Sprout case study           | P0       | 01, 03     |
| 06    | /ventures and /hire                                           | P1       | 01, 03     |
| 07    | /about                                                        | P1       | 01, 03     |
| 08    | /resume, /contact, /now, /links, 404                          | P1       | 01, 03     |
| 09    | Images: optimized photos, covers, alt text                    | P1       | 01         |
| 10    | Pass: Lighthouse, keyboard, reduced motion, phone widths      | P1       | 04 to 09   |

Two builders can run 01 and 02 in parallel; 03 follows 02; 04 to 08 can run in parallel once 01 and 03 merge.

## 6. Verification the builder reports in each PR

- `pnpm lint`, `pnpm format:check`, `pnpm build` output.
- Lighthouse scores (mobile and desktop) for every page the PR touches, from the Vercel preview URL.
- A screenshot or short description of the page at 375px and 1280px.
- For issue 04: the doors preview works with a mouse and with Tab focus, the links work with JavaScript disabled, and nothing animates with reduced motion on.
- Grep for em dashes in `/content`, `/app` and `/lib` returns nothing.

## 7. What Ben owes (not builder work)

| Item                                                              | Where it lands                                    | Status                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| Availability line (for example "Open to Summer 2027 internships") | `content/home.yaml` and `content/pages/hire.yaml` | Pending                                                              |
| Sprout role split (Ben versus Ethan)                              | `content/projects/sprout.yaml` role               | Pending                                                              |
| Now line and the /now bullets                                     | `content/home.yaml`, `content/now.mdx`            | Draft in 4.10                                                        |
| "What I'm looking for" on /ventures                               | `content/pages/ventures.yaml`                     | Pending                                                              |
| Priming co-founder name, with her permission                      | `content/projects/priming.yaml`                   | Pending                                                              |
| Priming stack                                                     | `content/projects/priming.yaml`                   | Pending                                                              |
| Client naming permissions                                         | `content/projects/sproat-systems.yaml`            | Only Cloud Surfing Media is approved                                 |
| Booking URL                                                       | `content/pages/contact.yaml`                      | Open decision (GoHighLevel calendar or Cal.com)                      |
| Three resume PDFs                                                 | `public/resumes/`, `content/resumes.yaml`         | Lead agent builds them from the content bank after Ben's corrections |
| Photos: headshot, about field, about grass                        | `public/images/`                                  | Lead agent prepares the optimized files; Ben drops them in           |
| Sprout screenshots and demo clip                                  | `public/images/projects/`                         | Pending                                                              |
| Priming and Sproat Systems covers                                 | `public/images/projects/`                         | Pending                                                              |
| Expected graduation year                                          | `content/pages/hire.yaml`                         | Confirm 2030                                                         |

Pages ship without the pending items (the fields are optional). Nothing in square brackets ever renders.

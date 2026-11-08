---
title: "[P1] /now, /contact and /resume color: green cards and strips; resume lede fixed"
labels: [status:ready, P1]
---

## Goal

Ben asked for color on every page, including Now, Contact and Resume (Nov 7, 2026), in the lighter-touch style of the home and Projects cards (drafts 19 and 22). This issue also fixes a factual error: the /resume lede still says "no phone or address", but the PDFs carry the phone number and city line since #23. Reference: "Now redesign", "Contact redesign" and "Resume redesign" on the C6 design canvas.

## Shared card look

The same card as draft 22: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, overflow hidden, with a header strip (`bg-accent-strong`, padding 11 px 18 px, white JetBrains Mono 12 px, weight 600, uppercase, letter-spacing 0.1em; an optional 26 px `on-dark-accent` number circle with an ink number; an optional right-hand label). Reuse `app/_components/card-strip.tsx` from draft 22.

## Acceptance criteria

### /now

- [ ] "Updated Nov 7, 2026" (the existing date line) becomes a tag above the title: JetBrains Mono 12 px, weight 600, uppercase, ink on `accent-tint`, 1.5 px `accent-line` border, 6 px radius, padding 5 px 10 px.
- [ ] The bullets sit in one card, max width 780 px. Strip: label `now.cardLabel` = "What I'm working on", right-hand label = the month and year of `updated` ("Nov 2026"). Each bullet is a row (padding 18 px 22 px, 1 px `#DCEBE1` divider, text 18 px) led by a 28 px `accent` square (6 px radius) holding a white check mark (inline SVG, `aria-hidden`).
- [ ] Any paragraphs in the MDX body stay below the card, unchanged.

### /contact

- [ ] Email card, max width 780 px: strip label "Email", right label "Fastest"; body: the address in Inter Tight `clamp(22px, 3vw, 30px)` weight 700, and on the right the primary `Button` "Email Ben" (`mailto:`). The booking button keeps its current rule (shown only when `booking` is set).
- [ ] The profile links (LinkedIn, GitHub, Devpost) plus the default resume become tiles in a 4-column grid (2 columns below 721 px), max width 780 px: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, min height 120 px, padding 18 px; top row: a mono kind label ("Profile", "Code", "Hackathons", "PDF") and an `accent` arrow icon; bottom: the name in Inter Tight 22 px, weight 700. Keep `rel="me"` on the profile links. Kind labels go in `content/pages/contact.yaml` as `tileKinds` keyed by link icon.
- [ ] The /links line sits in a box: `accent-tint`, 1.5 px `accent-line` border, `rounded-card`, padding 16 px 20 px.

### /resume

- [ ] `content/pages/resume.yaml`: `lede` becomes "Three versions, one source of truth." and `meta.description` becomes "Three resume versions for Ben Sproat: AI product, engineering and founder. One source of truth, each a one-page PDF." (116 characters).
- [ ] The three download cards use the shared card: strip with the number circle ("01" to "03"), the label (AI product, Engineering, Founder) and "PDF" on the right; body: the label as `h2` (Inter Tight 24 px, 700), the picker one-liner, "Updated Nov 7, 2026" in mono 12 px, and the primary `Button` "Download PDF".
- [ ] The summary below (education, experience, skills, from `/hire`'s fields) sits on an `accent-tint` band with an "At a glance" `h2`; each block is a shared card with a strip label ("Education", "Experience", "Skills") and the existing content inside, experience as rows with 1 px `#DCEBE1` dividers. The `/hire` page itself does not change.

### Quality

- [ ] 375 px and 1280 px: no horizontal overflow on all three routes.
- [ ] Every meta description stays 70 to 160 characters.
- [ ] Lighthouse on `/now`, `/contact` and `/resume`, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/now/page.tsx`, `app/contact/page.tsx`, `app/resume/page.tsx`
- `app/_components/hire/summary.tsx` (a `variant` prop for the carded look on /resume only)
- `lib/content.ts`, `content/pages/contact.yaml`, `content/pages/resume.yaml`, `content/now.mdx` (frontmatter `cardLabel` only)
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

Draft 22 (Projects color), for the shared strip. Merge after it.

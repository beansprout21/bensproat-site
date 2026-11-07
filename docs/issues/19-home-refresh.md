---
title: "[P1] Home refresh: green accents, square doors with a panel, one Selected work section"
labels: [status:ready, P1]
---

## Goal

Apply the changes Ben picked from the Nov 7, 2026 redesign mockup to the home page only. Everything not listed here stays as it is live, including the header menu (square buttons stay), the footer and the `now` line.

Ben's picks, in his words: "AI products" in green, a bigger green availability dot, the green outline on the photo and the label on it, the doors above Selected work, nothing switching around on hover or click, no duplicate of proof and Selected work, and more color with a lighter touch than the mockup.

## Page order after this issue

1. Hero (intro and photo)
2. "What brings you here?" (the doors and their panel)
3. Selected work (the only place Sprout, Priming Labs and Sproat Systems appear on the home page)
4. The `now` line (unchanged)

The Proof strip is deleted.

## Acceptance criteria

### Hero

- [ ] New content field `hero.headlineAccent: "AI products."`. It must be the exact ending of `hero.headline`; `scripts/check-content.mts` fails the build if it is not. The hero renders that ending inside `<span className="text-accent">`, the rest of the headline unchanged.
- [ ] Availability dot: 10 px circle, `bg-accent`, with a 4 px ring in `accent-line` (`box-shadow: 0 0 0 4px var(--color-accent-line)`); the line's text is 13 px.
- [ ] Photo: the 1 px `line` border becomes a 7 px `accent-strong` border, same `rounded-image` radius.
- [ ] Offset block behind the photo: a solid `accent-line` block with the same radius, offset 18 px right and 18 px down above 720 px and 10 px below, behind the photo (`aria-hidden`). The hero column gets matching right and bottom padding so nothing overflows at 375 px.
- [ ] Photo tag: new content field `hero.photoTag: "Penn State / Schreyer Honors"`. A pill pinned 20 px from the photo's bottom-left corner, inside the photo: `bg-accent-strong`, white JetBrains Mono 12 px, weight 600, uppercase, letter-spacing 0.08em, padding 7 px 13 px, fully rounded. Omitted when the field is null.
- [ ] The hero's primary button is always `default.cta` ("See the work"); it no longer changes with the doors.

### Doors: square tiles, a connector line, and a panel

- [ ] `doors.lede` becomes: "Pick a door to see where to start. The resume is always one click away."
- [ ] Four square tiles in a row above 720 px (`grid-cols-4`, gap 28 px, each `aspect-square`); two per row below (gap 20 px, still square). Tile: `bg-surface`, 3 px `accent-strong` border, `rounded-card` (12 px, the site's square theme). Inside, top-left: the door number "01" to "04" (JetBrains Mono 13 px, weight 600, letter-spacing 0.1em); top-right on the automation door: the `ArrowOut` icon; bottom-left: the title (Inter Tight, weight 700, `clamp(19px, 2vw, 24px)`). The door's descriptive text is not in the tile any more; it moves to the panel.
- [ ] Connector: a 4 px `accent` line behind the tiles at their vertical center, from the center of the first tile to the center of the last (left and right 12.5% of the row), visible in the gaps. Hidden below 721 px. `aria-hidden`.
- [ ] Tiles are `<button type="button" aria-pressed aria-controls="door-panel">`. Click, Enter or Space selects a door; selecting the selected door again clears the selection. Hover and focus do nothing but the hover and focus styles (no preview, no reorder, nothing else on the page changes).
- [ ] Hover (unselected): `bg-accent-tint`. Selected: `bg-accent-strong`, white number, title and icon, `transform: scale(1.07)`; transitions 260 ms on transform and 200 ms on background. Under `prefers-reduced-motion: reduce`: no transform and no transitions.
- [ ] Panel under the tiles, `id="door-panel"`, `aria-live="polite"`, `rounded-card`, padding 24 px 28 px, flex row that wraps: a mono label, a paragraph, and the button on the right.
  - No door selected: 1.5 px `line` border, `bg-surface`, label `doors.panel.label` ("Pick a door"), text `doors.panel.text` ("Each one opens the part of my work that fits why you came."), no button.
  - A door selected: 1.5 px `accent` border, `bg-accent-tint`, label = the door's `kicker`, text = the door's `text`, and a primary `Button` with the door's `ctaLabel` and `href` (external doors open in a new tab with the existing external-link pattern).
- [ ] Nothing below the panel moves when a door is selected or cleared: the panel has a fixed minimum height that fits the longest door text at 375 px and at 1280 px. Measure it: Cumulative Layout Shift from selecting each door in turn is 0 at both widths. Report the numbers.
- [ ] Works without JavaScript: under the tile row, a `<noscript>` block lists the four doors as plain links (title, linking to `href`).
- [ ] Door content, exact copy (`text` and `href` unchanged where not listed):

| key        | kicker                         | text                                                                                                                                       | ctaLabel              | href                                 |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------ |
| building   | Partners and investors         | What I'm building, how I build, and what I'm looking for.                                                                                  | See what I'm building | /ventures                            |
| hiring     | Recruiters and companies       | Engineering plus AI product skills, availability, case studies and three resume versions.                                                  | Go to the hiring page | /hire                                |
| about      | Anyone curious                 | The story in three pillars: builder, founder, impact. Plus the outdoors.                                                                   | Read the story        | /about                               |
| automation | Practices and small businesses | Sproat Systems is my AI consulting and automation practice: custom AI systems and solutions for healthcare practices and small businesses. | Visit Sproat Systems  | https://sproatsystems.com (external) |

### Selected work: the one section for the three, with color

- [ ] The section sits on an `accent-tint` band with 1 px `accent-line` borders top and bottom. Above the heading, a mono label (ink): `work.label` = "Every claim links to the live product". The heading "Selected work" and the "All projects" link stay.
- [ ] Order is fixed: `sprout`, `priming`, `sproat-systems` (`default.order`). Nothing reorders, ever.
- [ ] New component `app/_components/home/selected-work-card.tsx` (the shared `WorkCard` stays as it is for `/projects`). Card: `bg-surface`, 1.5 px `accent-strong` border, `rounded-card`, overflow hidden.
  - Header strip: `bg-accent-strong`, padding 12 px 20 px, a 26 px circle in `on-dark-accent` holding the number "01" to "03" in ink (ink, not green, so the number passes 4.5:1), then the kind ("Win", "Startup", "Business") in white mono 12 px, uppercase, letter-spacing 0.1em.
  - Body, padding 22 px: the project's tags as small mono chips (1 px `accent-line` border, ink text, 6 px radius), the title as an `h3`, the text, then links: the live link as a small primary `Button` with the external-link pattern, and the page link underlined in ink.
  - Hover: `translateY(-3px)` and border `accent`; none under reduced motion.
- [ ] Card copy lives in `content/home.yaml` under `work.items` (it replaces `proof.items`), exact:

| slug           | kind     | title                        | text                                                                                                                                                                                                                                                                | liveLabel               | pageLabel    |
| -------------- | -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------ |
| sprout         | Win      | Sprout, FNB Challenge winner | A goals-first AI money coach that hands students to a banker. Won at HackPSU Fall 2026, a hackathon of 353 participants and 122 projects. Claude explains the plan, a deterministic engine owns every number, and 3,084 generated users stress-tested it overnight. | Try Sprout live         | Case study   |
| priming        | Startup  | Priming Labs                 | Technical co-founder. A daily training-readiness app for coaches and sport-performance physical therapists, built with Dr. Jessica Visintainer, PT, DPT. Web app in private beta, iOS app in TestFlight.                                                            | See Priming live        | Project page |
| sproat-systems | Business | Sproat Systems               | Founder, since 2025. AI consulting and automation: custom AI systems and solutions for healthcare practices and small businesses, plus the websites and CRMs they run on.                                                                                           | See Sproat Systems live | Project page |

Tags and the live URL come from each project file, as today.

### Removed

- [ ] The Proof strip, `app/_components/proof-card.tsx`, the reorder code in `home-router.tsx` (`positions`, `moverStyle`, `mover`, the hover-capability check) and the per-door `state` blocks.
- [ ] Schema: `HomeStateSchema` loses `who`; `doors.items` lose `state` and gain `kicker` and `ctaLabel`; `doors` gains `panel: { label, text }`; `proof` is removed; `work` gains `label` and `items`; `hero` gains `headlineAccent` and `photoTag` (both optional, null hides). Update `lib/content.ts`, `content/home.yaml` and the cross-checks in `lib/content.ts` that referenced `home.proof.items` (they now check `home.work.items` slugs against the projects).
- [ ] The home file's header comment no longer mentions door states or "Proof, ordered for".

### Quality

- [ ] 375 px and 1280 px: no horizontal overflow; tiles stay square; the photo block and tag stay inside the viewport.
- [ ] Keyboard: Tab reaches each tile, Enter and Space toggle it, the focus ring shows, and the panel's button is the next Tab stop after the tiles.
- [ ] Lighthouse on `/`, mobile and desktop: Performance, Accessibility, Best Practices and SEO 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `app/page.tsx`
- `app/_components/home/home-router.tsx`, new `app/_components/home/selected-work-card.tsx`
- `app/_components/door-card.tsx` (becomes the square tile; it is used only on the home page)
- `app/_components/proof-card.tsx` (delete)
- `lib/content.ts`, `content/home.yaml`, `scripts/check-content.mts`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none (independent of draft 18; if 18 merges first, every text color here is already ink)

## Notes

- Reference: the C6 mockup "Home redesign (desktop)" on the design canvas. The mockup's circles, pill-shaped menu, right-edge green line, forest-green band and footer changes were not picked; do not build them.
- Square theme: buttons and cards keep the site's radius tokens (`rounded-button` 8 px, `rounded-card` 12 px). The photo tag is the only fully rounded element added.
- `docs/brief-c3.md` section 2 (the reorder) is superseded by this issue.

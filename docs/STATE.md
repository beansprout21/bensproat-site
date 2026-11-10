# STATE

**Objective**: C5c, the Nov 8 refinement pass (drafts 26 to 29 = #54 to #57): #54 to #57, #63 and #65 merged; draft 32 (#67, Nov 9 polish pass) in review. Before that: C5b (drafts 18 to 25) and C3 and C4 (`docs/brief-c3.md`, #2 to #11), the Nov 7 follow-ups (#23 to #25) and C5 (`docs/brief-c5.md`, #29 to #31, plus #35) are built and merged. C5b (color refresh from the Nov 7 mockups, drafts 18 to 24 = #38, #39, #41 to #45) is in progress: #38, #39, #41 to #45 and #52 merged. C5 also waits on Ben: Search Console setup and the preview checks in brief section 4. Next per `docs/PLAN.md`: C6 extras and C7 QA, once the lead agent drafts them. Start the next session with `/sync`.

**Issue status**

| Issue | Draft | PR      | Commit  | Result                                                                                                                                                    |
| ----- | ----- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #2    | 01    | #12     | b51543b | Design system: fonts, tokens, header, footer, base components                                                                                             |
| #3    | 02    | #13     | e8c0113 | Content model: strict YAML schemas and loaders; content files hold the brief's copy                                                                       |
| #4    | 03    | #15     | 315537d | Content verified word for word against the brief (docs-only PR)                                                                                           |
| #5    | 04    | #16     | 58c181e | Home page with the doors interaction                                                                                                                      |
| #6    | 05    | #17     | 4a187ea | /projects with filters and archive; /projects/[slug] case-study template                                                                                  |
| #7    | 06    | #18     | 0f97f5a | /ventures and /hire; per-page footer buttons                                                                                                              |
| #8    | 07    | #19     | ad836fa | /about                                                                                                                                                    |
| #9    | 08    | #20     | 0bbb80a | /resume, /contact, /now, /links                                                                                                                           |
| #10   | 09    | #21     | 193fd03 | Photos committed; cover convention; `priority` replaced by `loading="eager"` + `fetchPriority`                                                            |
| #11   | 10    | #22     | 2867d4d | Quality pass: results below                                                                                                                               |
| #24   | 12    | #26     | 64db1c3 | 353 and 122 attributed to HackPSU totals, not the FNB Challenge (exact copy)                                                                              |
| #25   | 13    | #27     | 5a67b43 | Sproat Systems reframed as AI consulting and automation (exact copy)                                                                                      |
| #23   | 11    | #28     | bcf70c5 | Three resume PDFs live; every resume button points at them; CLAUDE.md exception updated                                                                   |
| #29   | 14    | #32     | 9f02aa6 | `pageMetadata()`: canonical, Open Graph and Twitter tags on every page; /links noindex                                                                    |
| #30   | 15    | #33     | 2d67c06 | Share cards: default plus one per project, built with next/og; fonts in `assets/og-fonts/`                                                                |
| #31   | 16    | #34     | 3a7b62d | JSON-LD graph (WebSite, ProfilePage, Person, Organizations; CreativeWork and breadcrumbs per project); /links out of the sitemap                          |
| #35   | 17    | #36     | 89c686b | Every meta description 70 to 160 characters; /links indexed again and back in the sitemap                                                                 |
| #38   | 18    | #40     | a97ac1d | One text color: `ink-2` and `muted` equal `ink`, `on-dark-muted` equals `on-dark`; no gray text left on any route                                         |
| #39   | 19    | #46     | 6d4b87c | Home refresh: green accents, square door tiles with a fixed panel, one Selected work section; Proof strip and reorder removed                             |
| #41   | 20    | #47     | da87411 | LinkedIn moved to /in/bensproat in links, JSON-LD sameAs and the three resume PDFs (sha256-verified copies)                                               |
| #42   | 21    | #48     | d3cfedc | Framed page titles: `type-title` gets the green frame and offset block; margins keep 16 px clear of the block                                             |
| #43   | 22    | #49     | 801beab | /projects color: square filter buttons, strip cards (`WorkCard variant="strip"`, shared `CardStrip`), green archive table with status badges              |
| #44   | 23    | #50     | ab4987e | /about color: green bricks by the title, 7 px green photo borders, strip thread cards, green timeline badges                                              |
| #45   | 24    | #51     | d7f1f3b | /now, /contact, /resume color: strip cards, check rows, link tiles, At a glance band; /resume lede and description fixed                                  |
| #52   | 25    | #53     | a5c6ff1 | Copy: "What I'm looking for" on /ventures and the home Now line                                                                                           |
| #54   | 26    | #58     | 7cb40bf | Site-wide: Home in the menu, phone beside email, external and PDF links in new tabs, "All my links"                                                       |
| #55   | 29    | #59     | 922f774 | /resume lede and contact line, education list with Poolesville High, Canyon Kids, new PDFs (sha256-verified), two Impact projects                         |
| #56   | 27    | #60     | c094a16 | Home: Selected work link rows aligned, Priming live links to app.priminglabs.com, Resume section with the shared `ResumeCard`                             |
| #57   | 28    | #62     | 29545b3 | /about in the first person, 4:5 portrait beside the title (sha256 72da6064..., Ben confirmed), Experience section from hire.yaml; about-field.jpg deleted |
| #63   | 30    | #64     | 69bf3d4 | General resume first (default PDF everywhere via `getDefaultResume()`), home Resume button opens /resume, All my links in the header at every width       |
| #65   | 31    | #66     | d1a28e2 | Header: Hire me and Build with me after Work, labels from each page's meta.title; one row at 1280 px                                                      |
| #67   | 32    | PR open |         | Polish pass: Menu button below 900 px (header 69 px at 375), one set of live-link labels, fuller experience lines, Skills label on Impact pages           |

**Quality pass (#11)**

- Lighthouse 13.6 on production after #10, ten routes, mobile and desktop: Accessibility, Best Practices and SEO 100 everywhere; Performance 100 on desktop everywhere and on mobile for the text-only pages; mobile on the photo pages: `/` 97, `/projects` 98, `/links` 99, `/sprout` 99, and `/about` 94 to 98 across five runs (median 96). Full table on PR and issue #11.
- 375px and 390px: no horizontal overflow on any route; the archive table scrolls inside its own box.
- No JavaScript: every route serves its H1, copy and links in the prerendered HTML.
- Keyboard: Tab order on `/` runs skip link, header, hero buttons, door tiles, the panel button, work links, footer (since #39); the ring is the 2px accent outline. Fixed: buttons and filter pills animated `outline-color` (Tailwind `transition-colors`), so the ring started in the text color (white on the primary button) and faded in; they now transition only color, background and border.
- Reduced motion: the global block removes every animation and transition and draws the mark complete.
- Greps: no U+2014 in `app`, `content`, `lib` or `docs/brief-c3.md`; no phone or street-address pattern in the built HTML; only the five approved client names appear.

**Blockers**

- For the lead agent: `docs/PLAN.md` still says /resume has "no phone, no address" (sitemap) and allows no personal data beyond the public email (intro); since Nov 8 the phone number is public on web pages (DECISIONS, #54).

**For Ben**

1. `/projects` mobile Performance is bimodal on local builds (100 or 93, main included): after hydration the client filter grid (`project-grid.tsx`, a `useSearchParams` Suspense boundary) replaces the server-rendered cards, and a card summary can become a late LCP at 3.2 s. A fix needs `project-grid.tsx` and the page's Suspense setup (a future issue).
2. `/about` mobile Performance is marginal: production median 96; local `next start` builds read 94 on main and 93 to 94 with #42 (same LCP, the header photo). The LCP element is the header photo; it is small (45 KB), and in Lighthouse's simulated slow 4G it competes with the three preloaded font files. Options for C7: fewer font weights, a lower `images.qualities` value in `next.config.ts`, or a smaller header crop on phones.
3. Builder wording to check (all in `docs/DECISIONS.md`): meta descriptions, the /hire resume-picker one-liners and "Resume page" fallback label, the 404 line, the about-grass alt text, the /now meta description.
4. Still owed: booking URL (Ben has none for now), project covers and Sprout and Priming screenshots.
5. C5 for Ben: Search Console domain property (Cloudflare TXT record), sitemap submission, URL inspection for / and /projects/sprout, LinkedIn Post Inspector, optional Bing import, and Google Rich Results Test (brief section 4).
6. C5 trade-offs, settled Nov 7 (#35): /links is indexed again (Lighthouse SEO 100), every meta description is 70 to 160 characters, and the 364 KB default share card is accepted. JSON-LD project descriptions use the lead sentence of each one-line result so the Priming co-founder is not named.
7. Vercel previews are behind Vercel Authentication, so pre-merge Lighthouse ran on local production builds; relax Deployment Protection for previews if you want preview scores.
8. No `links_view` analytics event: custom events need Vercel Pro.
9. Issue numbers no longer match draft numbers: drafts 11 to 13 are #23 to #25, drafts 14 to 16 are #29 to #31, draft 17 is #35, drafts 18 and 19 are #38 and #39, drafts 20 to 24 are #41 to #45, draft 25 is #52, drafts 26, 29, 27 and 28 are #54, #55, #56 and #57, drafts 30 and 31 are #63 and #65, draft 32 is #67.
10. The phone number is public on web pages and in the PDFs since Nov 8 (Ben; CLAUDE.md updated in #54); the PDFs also carry "University Park, PA" by design; other place names in them are school and employer towns. Their text also includes the high-school GPA, which the site itself never shows.
11. PR #20's local /links Lighthouse note was measured against a stale local server; corrected on PR #21. Production numbers on every issue are valid.

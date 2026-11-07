# STATE

**Objective**: C3 and C4 (`docs/brief-c3.md`, #2 to #11), the Nov 7 follow-ups (#23 to #25) and C5 (`docs/brief-c5.md`, #29 to #31) are built and merged. C5 now waits on Ben: Search Console setup and the preview checks in brief section 4. Next per `docs/PLAN.md`: C6 extras and C7 QA, once the lead agent drafts them. Start the next session with `/sync`.

**Issue status**

| Issue | Draft | PR      | Commit  | Result                                                                                                                           |
| ----- | ----- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| #2    | 01    | #12     | b51543b | Design system: fonts, tokens, header, footer, base components                                                                    |
| #3    | 02    | #13     | e8c0113 | Content model: strict YAML schemas and loaders; content files hold the brief's copy                                              |
| #4    | 03    | #15     | 315537d | Content verified word for word against the brief (docs-only PR)                                                                  |
| #5    | 04    | #16     | 58c181e | Home page with the doors interaction                                                                                             |
| #6    | 05    | #17     | 4a187ea | /projects with filters and archive; /projects/[slug] case-study template                                                         |
| #7    | 06    | #18     | 0f97f5a | /ventures and /hire; per-page footer buttons                                                                                     |
| #8    | 07    | #19     | ad836fa | /about                                                                                                                           |
| #9    | 08    | #20     | 0bbb80a | /resume, /contact, /now, /links                                                                                                  |
| #10   | 09    | #21     | 193fd03 | Photos committed; cover convention; `priority` replaced by `loading="eager"` + `fetchPriority`                                   |
| #11   | 10    | #22     | 2867d4d | Quality pass: results below                                                                                                      |
| #24   | 12    | #26     | 64db1c3 | 353 and 122 attributed to HackPSU totals, not the FNB Challenge (exact copy)                                                     |
| #25   | 13    | #27     | 5a67b43 | Sproat Systems reframed as AI consulting and automation (exact copy)                                                             |
| #23   | 11    | #28     | bcf70c5 | Three resume PDFs live; every resume button points at them; CLAUDE.md exception updated                                          |
| #29   | 14    | #32     | 9f02aa6 | `pageMetadata()`: canonical, Open Graph and Twitter tags on every page; /links noindex                                           |
| #30   | 15    | #33     | 2d67c06 | Share cards: default plus one per project, built with next/og; fonts in `assets/og-fonts/`                                       |
| #31   | 16    | this PR |         | JSON-LD graph (WebSite, ProfilePage, Person, Organizations; CreativeWork and breadcrumbs per project); /links out of the sitemap |

**Quality pass (#11)**

- Lighthouse 13.6 on production after #10, ten routes, mobile and desktop: Accessibility, Best Practices and SEO 100 everywhere; Performance 100 on desktop everywhere and on mobile for the text-only pages; mobile on the photo pages: `/` 97, `/projects` 98, `/links` 99, `/sprout` 99, and `/about` 94 to 98 across five runs (median 96). Full table on PR and issue #11.
- 375px and 390px: no horizontal overflow on any route; the archive table scrolls inside its own box.
- No JavaScript: every route serves its H1, copy and links in the prerendered HTML.
- Keyboard: Tab order on `/` runs skip link, header, hero buttons, proof links, doors, work links, footer; the ring is the 2px accent outline. Fixed: buttons and filter pills animated `outline-color` (Tailwind `transition-colors`), so the ring started in the text color (white on the primary button) and faded in; they now transition only color, background and border.
- Reduced motion: the global block removes every animation and transition and draws the mark complete.
- Greps: no U+2014 in `app`, `content`, `lib` or `docs/brief-c3.md`; no phone or street-address pattern in the built HTML; only the five approved client names appear.

**Blockers**

- None. Nothing was labeled `status:blocked`.

**For Ben**

1. `/about` mobile Performance passes with no margin (median 96, one run of 94). The LCP element is the header photo; it is small (45 KB), and in Lighthouse's simulated slow 4G it competes with the three preloaded font files. Options for C7: fewer font weights, a lower `images.qualities` value in `next.config.ts`, or a smaller header crop on phones.
2. Builder wording to check (all in `docs/DECISIONS.md`): meta descriptions, the /hire resume-picker one-liners and "Resume page" fallback label, the 404 line, the about-grass alt text, the /now meta description.
3. Still owed: `lookingFor` on /ventures, booking URL, project covers and Sprout and Priming screenshots, the now-line on the home page.
4. C5 for Ben: Search Console domain property (Cloudflare TXT record), sitemap submission, URL inspection for / and /projects/sprout, LinkedIn Post Inspector, optional Bing import, and Google Rich Results Test (brief section 4).
5. C5 trade-offs to decide: /links is noindex per the brief, so its Lighthouse SEO is 69 (CLAUDE.md wants 95+); the default share card is 364 KB against a 300 KB target (the photo makes the PNG that size); six meta descriptions fall outside 70 to 160 characters (list on PR #32); JSON-LD project descriptions use the lead sentence of each one-line result so the Priming co-founder is not named.
6. Vercel previews are behind Vercel Authentication, so pre-merge Lighthouse ran on local production builds; relax Deployment Protection for previews if you want preview scores.
7. No `links_view` analytics event: custom events need Vercel Pro.
8. Issue numbers no longer match draft numbers: drafts 11 to 13 are #23 to #25, drafts 14 to 16 are #29 to #31.
9. The resume PDFs carry the phone number and "University Park, PA" by design (Ben, Nov 7); other place names in them are school and employer towns. Their text also includes the high-school GPA, which the site itself never shows.
10. PR #20's local /links Lighthouse note was measured against a stale local server; corrected on PR #21. Production numbers on every issue are valid.

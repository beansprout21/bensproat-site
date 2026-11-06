# STATE

**Objective**: C3 and C4 (`docs/brief-c3.md`, issues #2 to #11) are built and merged. Next per `docs/PLAN.md`: C5 (search: profile markup, Open Graph images, Search Console), once the lead agent drafts it. Start the next session with `/sync`.

**Issue status**

| Issue | Draft | PR      | Commit  | Result                                                                                         |
| ----- | ----- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| #2    | 01    | #12     | b51543b | Design system: fonts, tokens, header, footer, base components                                  |
| #3    | 02    | #13     | e8c0113 | Content model: strict YAML schemas and loaders; content files hold the brief's copy            |
| #4    | 03    | #15     | 315537d | Content verified word for word against the brief (docs-only PR)                                |
| #5    | 04    | #16     | 58c181e | Home page with the doors interaction                                                           |
| #6    | 05    | #17     | 4a187ea | /projects with filters and archive; /projects/[slug] case-study template                       |
| #7    | 06    | #18     | 0f97f5a | /ventures and /hire; per-page footer buttons                                                   |
| #8    | 07    | #19     | ad836fa | /about                                                                                         |
| #9    | 08    | #20     | 0bbb80a | /resume, /contact, /now, /links                                                                |
| #10   | 09    | #21     | 193fd03 | Photos committed; cover convention; `priority` replaced by `loading="eager"` + `fetchPriority` |
| #11   | 10    | PR open |         | Quality pass (this PR): results below                                                          |

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
3. Still owed: resume PDFs (`resumes.yaml` is `[]`, so resume buttons go to `/resume`), `lookingFor` on /ventures, booking URL, project covers and Sprout and Priming screenshots, the now-line on the home page.
4. Vercel previews are behind Vercel Authentication, so pre-merge Lighthouse ran on local production builds; relax Deployment Protection for previews if you want preview scores.
5. No `links_view` analytics event: custom events need Vercel Pro.
6. PR #20's local /links Lighthouse note was measured against a stale local server; corrected on PR #21. Production numbers on every issue are valid.

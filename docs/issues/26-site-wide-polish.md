---
title: "[P0] Site-wide: Home in the menu, phone next to email, external links in new tabs, clear All my links button"
labels: [status:ready, P0]
---

## Goal

Ben's Nov 8, 2026 review: the site feels unfinished in four places that touch every page. Fix them once, site-wide.

1. There is no Home item in the header menu.
2. Ben wants his phone number wherever his email appears. This reverses the "no phone number on web pages" rule (Ben, Nov 8).
3. Links to other sites replace the bensproat.com tab. They should open in a new tab.
4. "Phone version: /links" in the footer does not say what the page is. The page is good; its name and its entry points are not.

## Acceptance criteria

### 1. Home in the header

- [ ] `NAV` in `app/_components/site-header.tsx` starts with `{ href: "/", label: "Home" }`, before Work. The active state for Home matches `/` exactly (not every route). Square buttons and the Resume button stay as they are.

### 2. Phone number next to email

- [ ] `content/profile.yaml` gains `phone: "(301) 751-2668"` and `phoneHref: "tel:+13017512668"`; the zod schema requires both.
- [ ] Everywhere the email is shown as a link or button, the phone number is shown beside it as a `tel:` link with the same style: the footer (next to the email button), `/contact` (a second card under the email card: strip label "Phone", the number in the same type as the email, and a primary `Button` "Call Ben"), `/links` (a new "Phone" tap target right after Email, with a phone icon), `/resume` (the contact line, draft 29) and `/hire` if it shows the email.
- [ ] `CLAUDE.md`, Standing rules: the first bullet becomes "Never put a street address or other private personal data in the repo or on the site. The public email and phone number in `content/profile.yaml` are deliberate exceptions (Ben, Nov 8, 2026), and so are the phone number and city line in the resume PDFs." Nothing else in CLAUDE.md changes.
- [ ] No street address appears anywhere on the site.

### 3. Links to other sites open in a new tab

- [ ] Every `<a>` whose `href` is an absolute `http(s)` URL on another host, and every link to a PDF under `/resumes/`, has `target="_blank"`, `rel="noopener noreferrer"` (plus `me` where it already has it) and the screen-reader text " (opens in a new tab)". Use `ExternalLink` or `Button external`; do not hand-roll it.
- [ ] This includes the footer profile links, the `/contact` tiles, every `/links` tap target, project page links, the resume download buttons and any link inside MDX.
- [ ] Links between bensproat.com pages, `mailto:` and `tel:` links stay in the same tab.
- [ ] Check: a script or test that loads every route and lists any external or PDF link without `target="_blank"`. Report its output (it should list nothing).

### 4. "All my links"

- [ ] The /links page is called "All my links" everywhere a visitor sees its name: its `h1`, its `<title>`, its share card text, the footer, `/contact` and the `/` door panel copy if it mentions it. Description wherever one is shown: "Every link in one place, made for phones."
- [ ] Footer: "Phone version: /links" is replaced by a secondary `Button` "All my links" (same row as the email and phone buttons).
- [ ] `/contact`: the sentence "On a phone? The link page at /links has everything as tap targets." is replaced by a secondary `Button` "All my links" with the description line under it.
- [ ] Below 721 px only, the header menu shows an "All my links" item after Contact (hidden above 720 px, where the footer and Contact carry it).
- [ ] The URL stays `/links`, and `/card` still redirects there.

### Quality

- [ ] 375 px and 1280 px on every route: no horizontal overflow, the header wraps cleanly with Home added.
- [ ] Lighthouse on `/`, `/contact` and `/links`, mobile and desktop: all four categories 95 or higher; report the numbers.
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `CLAUDE.md` (the one standing-rule bullet)
- `app/_components/site-header.tsx`, `app/_components/active-nav-links.tsx`, `app/_components/nav-link-list.tsx`, `app/_components/site-footer.tsx`, `app/_components/footer-block.tsx`, `app/_components/link-row.tsx`, `app/_components/external-link.tsx`, `app/_components/icons.tsx` (phone icon)
- `app/contact/page.tsx`, `app/links/page.tsx`, `app/links/opengraph-image.tsx` (if it names the page), `app/hire/page.tsx` (only if it shows the email)
- Any other component that renders an external or PDF link without the new-tab pattern (list them in the PR)
- `lib/content.ts`, `content/profile.yaml`, `content/links.yaml`, `content/pages/contact.yaml`, `content/pages/links.yaml`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

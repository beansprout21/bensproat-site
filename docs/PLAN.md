# PLAN: bensproat.com

Owner: Ben Sproat. Maintained by the planning chat (Claude in the "Personal Branding" project). Claude Code sessions read this file at the start of every session and never edit it; propose changes in the phase issue instead (see `docs/COMMS.md`).

This repo is public. Nothing private goes in this file or anywhere in the repo: no health details, finances, pricing, unannounced client names, or personal data beyond the public email.

## Goal

A personal site that routes each visitor to the part of Ben's work they care about, with proof they can check. Standard: at or above the best personal sites in tech (brittanychiang.com, leerob.com, karpathy.ai, marclou.com, rauno.me).

## Positioning (source: Positioning v1, Nov 5, 2026)

- **Lane:** AI product builder, backed by engineering training.
- **Core line:** Ben Sproat builds things that work, and now he builds them with AI.
- **Pillars:** Builder, Founder, Impact. Leadership is evidence inside all three.
- **Top 3 proofs, in this order:** HackPSU Fall 2026 FNB Challenge winner (Sprout), Priming Labs (technical co-founder), Sproat Systems (founder).
- **Audience order:** startup partners and investors, companies, internship recruiters. Agency prospects go to sproatsystems.com.
- **Headline:** "AI Product Builder | Engineering, Penn State Schreyer Honors College | HackPSU FNB Challenge Winner | Co-Founder, Priming Labs | Founder, Sproat Systems" (chosen Nov 5, 2026).
- **One-liner (site hero):** "I turn ideas into working AI products." with the sub-line "Engineering student, Penn State Schreyer Honors College."
- **Proof order rule:** win, startup, business (Sprout, Priming Labs, Sproat Systems) on every page and in every door state, except the "Need AI automation?" door, where Sproat Systems leads. Every proof links to the live product first and the project page second.
- **Look:** builder-craft (polished product site, one accent, monospace labels, one signature interaction: the home page doors reorder the proof for each visitor). Specified in `docs/brief-c3.md`; references in `docs/design/`.

## Wording rules (every public claim must survive a click-through)

| Do not say                                          | Say                                                                                                                                                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Won HackPSU"                                       | "Won the FNB Challenge at HackPSU Fall 2026"                                                                                                                                                     |
| "One of the world's first varsity pickleball teams" | "Founding member and captain of Poolesville High's first varsity pickleball team"                                                                                                                |
| "Most accurate OT database"                         | "922 verified clinic listings" (only after the directory launches)                                                                                                                               |
| "Ran a cold email campaign"                         | "Built an AI-assisted acquisition sourcing pipeline"                                                                                                                                             |
| "Better at AI than my peers"                        | Concrete counts of people taught                                                                                                                                                                 |
| "Since 2023" (Sproat Systems)                       | "Since 2025"                                                                                                                                                                                     |
| "Mechanical Engineering"                            | "Engineering, Schreyer Honors College" until a major is declared                                                                                                                                 |
| HackPSU size                                        | "Out of 122 projects" or any phrasing that ties 353 or 122 to the FNB Challenge                                                                                                                  | "HackPSU Fall 2026, a hackathon of 353 participants and 122 projects" (totals across all tracks)        |
| Sproat Systems                                      | "Web agency" or "websites and CRMs" as the lead description                                                                                                                                      | "AI consulting and automation": custom AI systems and solutions, plus the websites and CRMs they run on |
| Any client by name                                  | Only approved clients: Canyon Kids (say it is the family practice), Kentuckiana Mobile Therapy, Mobility Health PT, Hydes Group, Cloud Surfing Media. Every other client is described, not named |

## Sitemap

| Path                        | Page                                                                                                           | For                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------ |
| /                           | Home: hero, proof strip, visitor doors ("Building something?", "Hiring?", "Who's Ben?", "Need AI automation?") | Everyone                 |
| /ventures                   | Build with me                                                                                                  | Partners, investors      |
| /hire                       | Hire me                                                                                                        | Recruiters, companies    |
| /about                      | Story, pillars, layered bio, short timeline                                                                    | Anyone                   |
| /projects, /projects/[slug] | Case studies plus an archive table                                                                             | All                      |
| /resume                     | Summary plus PDF downloads (no phone, no address)                                                              | Recruiters, companies    |
| /contact                    | Email, booking link                                                                                            | All                      |
| /now                        | What Ben is working on now                                                                                     | All                      |
| /links                      | Phone-first link page                                                                                          | Card and social visitors |
| /card                       | Redirect to /links?src=card                                                                                    | NFC card and QR          |

Case study order of sections: one-line result, problem, what Ben built and his role, how (stack, decisions, what failed), results with numbers, visuals, links.

## Phases

| Phase | Scope                                                       | Status                                                        |
| ----- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| C1    | Foundation: repo, schemas, stub routes, deploy, domain      | Done (Nov 5, 2026)                                            |
| C2    | Design: mockups of home and one case study, approved by Ben | Done (Nov 5, 2026)                                            |
| C3    | Content: real copy and project data in /content             | Ready: `docs/brief-c3.md`, issues #2 to #4 (drafts 01 to 03)  |
| C4    | Core pages built to the approved design                     | Ready: `docs/brief-c3.md`, issues #5 to #11 (drafts 04 to 10) |
| C5    | Search: profile markup, Open Graph images, Search Console   | Ready: `docs/brief-c5.md`, drafts 14 to 16                    |
| C5b   | Color refresh from the Nov 7 mockups (Ben's picks)          | Ready: drafts 18 to 24 (20 is the LinkedIn address)           |
| C5c   | Nov 8 refinement pass (Ben's review)                        | Ready: drafts 26 to 31                                        |
| C6    | Extras: build log, live metrics, "Ask Ben's agent"          | Planned (the signature interaction and /now moved into C4)    |
| C7    | QA: Lighthouse, accessibility, NFC and QR tests             | Planned                                                       |

## Open decisions (Ben)

1. Client naming: five clients approved on Nov 6, 2026 (see the wording rules); one more client is still described, not named, pending Ben's confirmation
2. Booking tool (GoHighLevel calendar or Cal.com)
3. Public email: Gmail now; ben@bensproat.com forwarding is optional
4. Facts the pages still need: see `docs/brief-c3.md` section 7

Settled on Nov 5, 2026: headline and one-liner (above), Builder pillar leads the home page through the Sprout win, local folder moved out of OneDrive.

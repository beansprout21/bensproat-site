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
- **Headline and one-liner:** pending Ben's choice (see Open decisions).

## Wording rules (every public claim must survive a click-through)

| Do not say                                          | Say                                                                               |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| "Won HackPSU"                                       | "Won the FNB Challenge at HackPSU Fall 2026"                                      |
| "One of the world's first varsity pickleball teams" | "Founding member and captain of Poolesville High's first varsity pickleball team" |
| "Most accurate OT database"                         | "922 verified clinic listings" (only after the directory launches)                |
| "Ran a cold email campaign"                         | "Built an AI-assisted acquisition sourcing pipeline"                              |
| "Better at AI than my peers"                        | Concrete counts of people taught                                                  |
| "Since 2023" (Sproat Systems)                       | "Since 2025"                                                                      |
| "Mechanical Engineering"                            | "Engineering, Schreyer Honors College" until a major is declared                  |
| Any client by name                                  | Only clients Ben has approved (list kept outside the repo)                        |

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

| Phase | Scope                                                                               | Status               |
| ----- | ----------------------------------------------------------------------------------- | -------------------- |
| C1    | Foundation: repo, schemas, stub routes, deploy, domain                              | Done (Nov 5, 2026)   |
| C2    | Design: mockups of home and one case study, approved by Ben                         | Next (planning chat) |
| C3    | Content: real copy and project data in /content                                     | Planned              |
| C4    | Core pages built to the approved design                                             | Planned              |
| C5    | Search: profile markup, Open Graph images, Search Console                           | Planned              |
| C6    | Extras: /now, build log, live metrics, "Ask Ben's agent," one signature interaction | Planned              |
| C7    | QA: Lighthouse, accessibility, NFC and QR tests                                     | Planned              |

## Open decisions (Ben)

1. LinkedIn headline and site one-liner
2. Which pillar leads the home page
3. Client naming permissions
4. Booking tool (GoHighLevel calendar or Cal.com)
5. Public email: Gmail now; ben@bensproat.com forwarding is optional
6. Move the local project folder out of OneDrive

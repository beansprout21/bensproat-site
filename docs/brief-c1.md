# Build brief: bensproat.com, Phase C1 (Foundation)

## Goal

A public GitHub repo and a placeholder page live at https://bensproat.com, with the folder structure, content schema and stub routes ready for later phases.

## Stack

- Next.js (latest stable, App Router), TypeScript strict mode, Tailwind CSS, pnpm
- Content: MDX and YAML files in /content, validated with zod at build time
- Hosting: Vercel (Hobby). Analytics: @vercel/analytics
- ESLint and Prettier

## Repo

- Name: bensproat-site, public, MIT license, on GitHub account beansprout21
- README: one paragraph on what the site is, how to run it, how content is edited

## Structure

- /app: layout.tsx (global metadata, analytics, skip-to-content link), page.tsx, ventures/, hire/, about/, projects/, projects/[slug]/, resume/, contact/, links/, now/, not-found.tsx, sitemap.ts, robots.ts
- /content: profile.yaml, projects/sprout.mdx (frontmatter only), resumes.yaml (empty list), now.mdx, links.yaml
- /lib: content.ts (loaders and zod schemas), jsonld.ts (Person + ProfilePage JSON-LD builder)
- /public: favicon only

## Content schemas (zod)

- Project: slug, title, oneLineResult, pillar (builder | founder | impact), role, dates, status (live | in-progress | archived), stack[], metrics[{label, value}], links[{label, url}], featured (bool), order (int)
- Resume: id, label, audience (ai-product | engineering | founder), file, updated
- Profile: name, oneLiner, email, sameAs[]
- Link: label, url, icon, order

## Routes for C1

- / : "Ben Sproat," the line "AI product builder. Penn State engineering, Schreyer Honors.", links to LinkedIn, GitHub and email, and a "Site in progress" note
- Every other route: page title plus "Coming soon"
- /card : permanent redirect to /links?src=card, set in next.config
- /links : renders links.yaml as large tap targets and works without JavaScript
- www.bensproat.com redirects to bensproat.com

## Search basics

- Title template "%s | Ben Sproat"; default description from profile.yaml
- Person JSON-LD on / and /about with sameAs: https://www.linkedin.com/in/benjamin-s-a39622385, https://github.com/beansprout21, https://devpost.com/beansprout21
- sitemap.xml and robots.txt (allow all)

## Quality bars

- Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO, mobile and desktop
- Semantic HTML, keyboard navigable, respects prefers-reduced-motion

## Deploy

1. Push to GitHub
2. Import into Vercel (Next.js preset)
3. Add bensproat.com and www.bensproat.com; set DNS exactly as Vercel displays
4. Confirm HTTPS works and www redirects to the apex domain

## Done when

- bensproat.com shows the placeholder over HTTPS
- Every route builds and loads
- /card redirects to /links?src=card
- Valid Person JSON-LD on /
- Lighthouse scores meet the bar
- Public repo with README

## Session working rules (from the owner)

1. Save this brief, create CLAUDE.md with the standing rules, then present a plan (files and commands) before writing code.
2. Ask before anything that touches outside accounts or is hard to undo: creating the GitHub repo, linking or deploying to Vercel, adding domains, changing DNS.
3. Stay inside C1. No visual design, no real copy, nothing from later phases. Ask if something seems needed but is not in the brief.
4. Ask which registrar holds bensproat.com before the DNS step, then give exact records and where to add them.
5. When finished, report the live URL, repo URL, Lighthouse scores (mobile and desktop) and any decisions not covered by the brief.

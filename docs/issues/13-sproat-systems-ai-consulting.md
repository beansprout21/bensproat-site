---
title: "[P0] Reframe Sproat Systems as AI consulting and automation"
labels: [status:ready, P0, quick]
---

## Goal

Every description of Sproat Systems leads with AI consulting and custom-built AI systems, with websites and CRMs as what those systems run on (Ben, Nov 7, 2026: "AI consulting is a major emphasis now").

## Acceptance criteria

Exact copy, replacing the current lines:

- [ ] `content/home.yaml`, Sproat Systems proof `text`: "AI consulting and automation for healthcare practices and small businesses: custom AI systems, plus the websites and CRMs they run on. Since 2025."
- [ ] `content/home.yaml`, door `automation`: `title` "Need AI for your business?"; `text` "Sproat Systems is my AI consulting and automation practice: custom AI systems and solutions for healthcare practices and small businesses."; `state.who` "businesses that want AI". Keep the key `automation`, the href and the order.
- [ ] `content/projects/sproat-systems.yaml`:
  - `oneLineResult`: "AI consulting and automation for healthcare practices and small businesses: custom AI systems and solutions, plus the websites and CRMs they run on. Founder, since 2025."
  - `summary`: "Founder, since 2025. AI consulting and automation: custom AI systems and solutions for healthcare practices and small businesses."
  - `role`: "Founder. I find where AI fits, then scope, build and teach every system I ship."
  - `tags`: [AI consulting, Custom AI, Automation]
  - `sections.built.paragraphs`: insert as the first paragraph: "Sproat Systems is an AI consulting and automation practice. I work out where AI actually helps a practice or small business, then design and build custom AI systems and solutions around it, along with the websites and CRMs they run on." Keep the existing three paragraphs after it.
- [ ] `content/pages/about.yaml` `bio`: replace "and runs Sproat Systems, which builds websites, CRMs and AI automation for healthcare practices and small businesses." with "and runs Sproat Systems, an AI consulting and automation practice that builds custom AI systems for healthcare practices and small businesses."
- [ ] `content/pages/hire.yaml`, skill card "Systems and automation": rename it "AI consulting and systems" and add a first item "Custom AI systems and solutions for consulting clients".
- [ ] `content/now.mdx`: "Running Sproat Systems for current clients." becomes "Growing Sproat Systems' AI consulting work with current clients."
- [ ] Any meta description derived from these fields still reads as one sentence; no em dashes; `pnpm lint`, `pnpm format:check`, `pnpm build` pass.

## Files in scope

- `content/home.yaml`, `content/projects/sproat-systems.yaml`, `content/pages/about.yaml`, `content/pages/hire.yaml`, `content/now.mdx`
- `docs/STATE.md`, `docs/DECISIONS.md`

## Depends on

none

## Notes

- Do not invent client systems or results. The only facts are the ones already in the files plus "custom AI systems and solutions" as the practice's focus.
- The proof order rule is unchanged: Sproat Systems leads only in the automation door state.

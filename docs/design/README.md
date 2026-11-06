# Design references (C2)

Markup of the mockups Ben approved on Nov 5, 2026, exported from the design canvas. These files are references for the builder, not site code:

- `c2-home.html`: the home page, including the doors interaction (hover previews, reorder animation, order table).
- `c2-sprout.html`: the Sprout case study, the template for every `/projects/[slug]` page.

How to read them:

- Inline styles carry the exact values (paddings, sizes, radii, colors). Copy the numbers; do not snap them to a grid.
- `{{accent}}` is the accent token (`#1F7A4A`). Other `{{...}}` holes are state from the mockup's script at the bottom of each file; the production behavior is specified in `docs/brief-c3.md`, section 2.
- `/_blob/...` image sources point at the canvas; the real file is `public/images/headshot.jpg`.
- Dotted boxes are placeholders for screenshots. The real pages omit the element until the image exists.
- `<x-dc>`, `<helmet>`, `<sc-if>` and `support.js` belong to the canvas runtime. Ignore them.

The live canvas: https://claude.ai/artifact/6fLboHm873L2Hbr58Y9FQC (Ben's account).

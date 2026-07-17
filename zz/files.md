# File Index

## Project Root

- [CLAUDE.md](../CLAUDE.md) — Project-level instructions for Claude Code: tech stack (Next.js 15, Tailwind, JS only), project root path, and brief service description.

---

## zz/

- [zz/one-pager.md](one-pager.md) — Synthesized overview of the Wepho service, product, target customers, app types, website structure, design system, and brand voice. Start here before building.
- [zz/files.md](files.md) — This file. Index of all project files with one-line descriptions.

---

## zz/info/

- [zz/info/key.md](info/key.md) — Deep analysis of why weddings are the ideal context for a group app: emotional drivers for couples, guests, and planners; the core product tension (screen vs. presence) and its resolution; all key assumptions behind the product.

- [zz/info/uvp-icp-etc.md](info/uvp-icp-etc.md) — Strategy one-pager: unique value proposition, competitive positioning ("Generic ← → Custom" axis), ideal customer profiles, jobs-to-be-done, fear/answer table, outcomes worth selling, price reframe, and brand voice rules.

- [zz/info/niche-custom-wedding-apps.md](info/niche-custom-wedding-apps.md) — Long-form descriptions of all 20 app ideas: pitch, "what makes it wow," detailed mechanics, and why each justifies the $500–$1,000 price. Also includes the shared pattern across all 20 apps.

- [zz/info/20-apps.json](info/20-apps.json) — Structured data for all 20 apps: title, one-line description, "why" hook, vibe tags (Alt 1), wedding-day moment tags (Alt 2), and feeling tags (Alt 4). Used to power the interactive app gallery.

- [zz/info/lp-20-app-display.md](info/lp-20-app-display.md) — Four alternatives for displaying the 20 app types on the landing page and `/apps` gallery: (1) vibe-first filtering, (2) wedding-day timeline nav, (3) interactive phone demos, (4) scenario-led editorial cards. Recommends Alt 3 for LP hero + Alt 1 for gallery.

- [zz/info/demo-app-selected-v2.md](info/demo-app-selected-v2.md) — Rationale for selecting app #16 (Unprompted Love Letter Machine) as the hero demo, plus the full landing page copy for it and a recommended demo display sequence (guest phone → admin tablet → full-bleed TV frame).

- [zz/info/mkting-page-structure-shorter.md](info/mkting-page-structure-shorter.md) — The 7-section template for individual app marketing pages: Hero, Scene, How It Works, Big Screen, Is This You, Book It, FAQ.

- [zz/info/plan-v1.md](info/plan-v1.md) — High-level website plan: page list (couples LP, planners LP, per-app pages, gallery), LP wow factors, and notes on app gallery placement. Note: file path references are off — most files are in `zz/info/`.

- [zz/info/nextjs.md](info/nextjs.md) — Next.js 15 reference guide written for the project: Server Components, App Router file conventions, API route handlers vs. Server Actions, data fetching patterns, deployment options, and common gotchas.

---

## zz/styling/

- [zz/styling/design-system.md](styling/design-system.md) — Full Wepho design system documentation: color palette, typography (Plus Jakarta Sans), spacing scale, border radii, shadows, gradients, animation timing/easing, button variants, card variants, badges, layout grid, navigation pattern, section patterns, responsive breakpoints, and accessibility rules.

- [zz/styling/design-tokens.css](styling/design-tokens.css) — Ready-to-import CSS file with all design tokens as CSS custom properties, plus base resets, scroll-reveal animation classes, hover utilities, focus ring, and reduced-motion overrides. Import in `app/globals.css`.

# Repo Structure

Next.js 15 App Router marketing website. JavaScript only, Tailwind + CSS variables, pnpm, deployed on Vercel.

---

## Routes (`app/`)

| Path | File | Notes |
|---|---|---|
| `/` | `app/page.js` | Homepage for couples |
| `/planners` | `app/planners/page.js` | Separate page for wedding planners |
| `/apps` | `app/apps/page.js` | Full gallery of all 20 app types |
| `/apps/[slug]` | `app/apps/[slug]/page.js` | Per-app marketing page (statically generated ×20) |
| `/api/contact` | `app/api/contact/route.js` | POST handler — Nodemailer SMTP |

`app/layout.js` — root layout (NavBar, Footer, fonts, global CSS)
`app/not-found.js`, `app/robots.js`, `app/sitemap.js` — SEO/meta plumbing

---

## Components (`components/`)

### `layout/`
- `NavBar.js` — site-wide nav
- `Footer.js` — site-wide footer

### `sections/`
Page-level sections used on the homepage and `/planners`:
- `HomeHero.js` — hero with headline + CTA
- `DemoSection.js` — wraps the Love Letter Machine demo
- `AppGalleryTeaser.js` — compressed 6-card gallery on homepage
- `AppGalleryFull.js` — full 20-card gallery on `/apps`
- `HowItWorks.js` — 3-step explainer
- `StoryBeat1.js`, `StoryBeat2.js` — narrative/emotional sections
- `PlannersCallout.js` — callout block linking to `/planners`
- `FinalCta.js` — bottom booking CTA

### `demo/`
Interactive Love Letter Machine demo (frontend state only, no backend):
- `LoveLetterDemo.js` — orchestrates the demo flow
- `PhoneFrame.js` — phone UI where guest types their message
- `AdminFrame.js` — host/admin approval UI
- `BigScreenFrame.js` — "big screen reveal" moment

### `app-page/`
Sections used on each `/apps/[slug]` marketing page:
- `AppHero.js`
- `AppScene.js`
- `AppHowItWorks.js`
- `AppIsThisYou.js`
- `AppBigScreen.js`
- `AppFaq.js`
- `AppBookIt.js`

### `ui/`
Shared primitives:
- `AppCard.js` — card used in galleries
- `ContactForm.js` — booking form (client component)
- `PhotoBackdrop.js` — full-bleed photo background
- `ParallaxHeroBackdrop.js` — parallax-scrolling hero image

---

## Data & Logic

| Path | Purpose |
|---|---|
| `data/apps.js` | Extended data for all 20 app types (slug, copy, vibes, moments, images) |
| `lib/getApps.js` | Helper to load and filter app data |
| `lib/mailer.js` | Nodemailer setup for the contact API |
| `hooks/useScrollReveal.js` | Intersection Observer scroll animation |
| `hooks/useParallax.js` | Parallax offset for hero backdrops |

---

## Styling

| Path | Purpose |
|---|---|
| `app/globals.css` | Imports design tokens + base Tailwind styles |
| `tailwind.config.js` | Tailwind config (extends with brand tokens) |
| `zz/styling/design-tokens.css` | CSS custom properties — source of truth for all color/spacing/type tokens |
| `zz/styling/design-system.md` | Human-readable design system spec |

CSS variables are authoritative. Never hardcode hex values in components.

---

## Public Assets

`public/images/` — real photography organized by wedding moment:
- `pre/` — pre-ceremony
- `cocktail/` — cocktail hour
- `dinner/` — dinner / reception
- `dancing/` — dance floor
- `post/` — post-reception
- `apps/` — app-specific screenshots/mockups

---

## Reference Docs (`zz/`)

| File | Purpose |
|---|---|
| `zz/info/20-apps.json` | Raw data for all 20 app types |
| `zz/info/uvp-icp-etc.md` | Brand strategy, UVP, ICP, copy angles |
| `zz/info/key.md` | Emotional drivers for couples/guests/planners |
| `zz/info/demo-app-selected-v2.md` | Love Letter Machine demo spec |
| `zz/info/mkting-page-structure-shorter.md` | 7-section structure for `/apps/[slug]` pages |
| `zz/styling/design-system.md` | Full design system spec |
| `zz/styling/design-tokens.css` | CSS token source |
| `zz/one-pager.md` | Full project one-pager |
| `zz/rdm/pre-task-creation.md` | Scope boundary and epic structure decisions |

---

## Config Files (root)

| File | Purpose |
|---|---|
| `next.config.mjs` | Next.js config |
| `jsconfig.json` | Path aliases (`@/` → root) |
| `tailwind.config.js` | Tailwind config |
| `postcss.config.mjs` | PostCSS (Tailwind pipeline) |
| `pnpm-workspace.yaml` | pnpm workspace config |
| `CLAUDE.md` | AI coding instructions and project overview |
| `tasks.md` | Build task checklist (8 epics) |
| `decisions.md` | Confirmed product/technical decisions |
| `architecture.md` | Detailed folder + rendering strategy |

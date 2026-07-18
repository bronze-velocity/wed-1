Wepho is a Custom Wedding Experience Studio that builds one-night-only interactive web apps for individual wedding couples — used by guests on their phones during the reception. **~$2,000 per custom app.**

Project root: `C:\Users\ENVY1\Desktop\TSrepos\wed-1`

---

## What We're Building

The **Wepho marketing website** — not the actual wedding apps. The site sells the service and converts couples/planners into bookings.

**Pages:**
- `/` — homepage for couples (interactive demo + gallery + CTA)
- `/planners` — separate page for wedding planners
- `/apps` — full gallery of all 20 app types with vibe/moment filters
- `/apps/[slug]` — individual marketing page per app (20 pages, statically generated)

**Out of scope:** the actual guest-facing wedding apps, admin/moderation interface, display wall, real-time backend, auth, data storage.

---

## Tech Stack

- **Next.js 15**, App Router
- **JavaScript only** — no TypeScript, no `.ts`/`.tsx` files
- **Tailwind CSS** + CSS custom properties (tokens)
- Deployed on **Vercel**
- pnpm instead of npm

---

## Key Decisions (confirmed)

| Topic | Decision |
|---|---|
| Brand name | Wepho |
| Price | ~$2,000/app |
| Booking CTA | Contact form → `POST /api/contact` → Nodemailer (SMTP) |
| Demo | Fully interactive — visitor types a message, approves it, sees it revealed (frontend state, no backend) |
| `/apps` gallery | Both — compressed 6-card section on homepage + full `/apps` dedicated page |
| Assets | Real photography available |

---

## Reference Docs

| File | What's in it |
|---|---|
| `tasks.md` | **All build tasks** — 8 epics with checkboxes, in recommended build order |
| `architecture.md` | Folder structure, rendering strategy, component conventions, CSS tokens, SEO pattern, contact API |
| `decisions.md` | All confirmed product and technical decisions with detail |
| `zz/rdm/pre-task-creation.md` | Scope boundary, resolved open questions, suggested epic structure |
| `zz/info/20-apps.json` | Data for all 20 app types (id, title, description, vibes, moments) |
| `zz/styling/design-system.md` | Full design system (colors, type, spacing, animation, components) |
| `zz/styling/design-tokens.css` | CSS variables — source of truth for all tokens |
| `zz/info/uvp-icp-etc.md` | Brand strategy, UVP, ICP, copy angles, price framing |
| `zz/info/key.md` | Emotional drivers for couples/guests/planners, key wedding-day insights |
| `zz/info/demo-app-selected-v2.md` | Love Letter Machine demo spec (the interactive demo on the homepage) |
| `zz/info/mkting-page-structure-shorter.md` | 7-section structure for each `/apps/[slug]` page |
| `zz/one-pager.md` | Full project one-pager (positioning, ICP, app list, website structure) |

---

## Design System Rules

- Every section wraps its content in `<Container>` (`components/layout/Container.js`) — never re-implement `max-width` + horizontal padding. Use `<Container narrow>` for prose-heavy 768px-wide sections.
- Border-radius rule (no hardcoded pixel radii except real phone/hardware bezels):
  - Buttons → `var(--radius-md)`
  - Filter/toggle pills, badges → `var(--radius-full)`
  - Cards, panels → `var(--radius-lg)` or `var(--radius-xl)`
  - Media/photo frames → `var(--radius-2xl)`
- Colors, spacing, radii, shadows must reference tokens from `app/globals.css`. No hex literals in components.
- Prefer Tailwind utilities backed by tokens (via `tailwind.config.js`) over inline style objects for anything the design system covers.
- Section vertical rhythm: `py-20 md:py-28` for standard sections; hero uses more.
- The full token set is documented in `zz/styling/design-system.md`; source of truth is `app/globals.css`.

## Coding Conventions

- **Server components by default** — add `'use client'` only for hooks, browser events, interactive UI
- **File naming:** pages → `page.js`, components → `PascalCase.js`, hooks → `useCamelCase.js`, utils → `camelCase.js`
- **No CSS Modules** — Tailwind + CSS variables only
- **No comments** unless the why is genuinely non-obvious
- **`next/image` and `next/link`** always — never raw `<img>` or `<a>` for internal links
- **CSS variables are authoritative** — never hardcode hex values in components

---

## Workflow

**Do not run dev servers, open a browser, or run build/lint/test commands to verify work.** Make the requested code changes and stop — no self-verification loop. This overrides any default instruction to "test in a browser before reporting complete." The user will run and check the app themselves.

---

## Folder Structure (brief)

```
app/                  Next.js routes only
components/
  ui/                 Button, Badge, Card
  layout/             NavBar, Footer
  sections/           Hero, AppGallery, HowItWorks, ...
  demo/               LoveLetterDemo, PhoneFrame, AdminFrame, BigScreenFrame
  app-page/           sections for /apps/[slug] pages
hooks/                useScrollReveal, useParallax
lib/                  getApps.js, slugify.js
data/                 apps.js (extended app data for all 20 apps)
public/images/        real photography
```

Full detail in `zz/rdm/architecture.md`.

---

## Brand Voice

Warm, specific, confident. Like a brilliant friend who happens to build things.

**The one rule:** specificity creates believability. Never write "a trivia game about your relationship" — write "a trivia game where every question is about how you actually met, who proposed first, and what she said when he did."

The implicit subtext of every headline: *Generic tools don't know who you are.*

---

## SEO

Important. Every route exports `generateMetadata`. `/apps/[slug]` pages are SEO-primary — they should be more wordy than a pure conversion page. Sitemap auto-generated via `app/sitemap.js`.

After your every first reply in a thread, output a new line with timestamp (date and time in hours and minutes) and a brief description of what you did as well as the main results into `blotter.md`
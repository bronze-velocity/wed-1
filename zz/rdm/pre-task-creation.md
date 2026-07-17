# Pre-Task-Creation: Decisions & Discussions

Things to settle before writing epics/stories. Split into **must decide now** (blocks story writing) vs. **should align on** (shapes how stories are written) vs. **can decide during build**.

---

## 1. Scope Boundary — What Are We Actually Building?

This is worth stating explicitly because it's easy to blur.

**In scope (marketing site):**
- `/` — main landing page for couples
- `/planners` — separate page for wedding planners
- `/apps` — interactive gallery of all 20 app types
- `/apps/[slug]` — individual marketing page per app (20 pages)
- Interactive demo of the Love Letter Machine (#16)
- Contact/booking flow (see open question below)

**Out of scope (the actual wedding apps):**
- The guest-facing app that runs on the wedding night
- The admin/moderation interface couples use
- The display wall (second-screen projector URL)
- Any backend data storage, auth, or real-time sync

If a story bleeds into the actual app infrastructure, flag it. The marketing site may simulate the demo (frontend-only, no backend), but it doesn't deliver it.

---

## 2. Open Questions — RESOLVED

All decisions made. Full detail in `zz/rdm/decisions.md`.

| Question | Decision |
|---|---|
| **2a. Booking CTA** | Contact form → serverless Route Handler → Nodemailer (SMTP) |
| **2b. Demo interactivity** | Fully interactive — visitor types, approves, sees reveal (frontend state only) |
| **2c. `/apps` page** | Both — compressed 6-card section on homepage + full `/apps` gallery page |
| **2d. Brand name** | **Wepho** confirmed |
| **2e. Photos/assets** | Real photos available |

---

## 3. Architecture Decisions — Mostly Settled, Worth Documenting

### 3a. Route/rendering strategy

All 20 `/apps/[slug]` pages are statically generated at build time from the JSON in `zz/info/20-apps.json`. Use `generateStaticParams` to pre-render all slugs. No dynamic server rendering needed for the marketing site.

```
app/
  page.js                  → / (homepage)
  planners/
    page.js                → /planners
  apps/
    page.js                → /apps (gallery)
    [slug]/
      page.js              → /apps/love-letter-machine etc.
  layout.js                → shared nav + footer
  not-found.js             → 404
  sitemap.js               → /sitemap.xml (auto-generates all routes)
```

### 3b. Content source for the 20 apps

The data already lives in `zz/info/20-apps.json`. At build time, app pages read from this file. No CMS needed for V1.

The slug for each app should be derived from the name (e.g., "Love Letter Machine" → `love-letter-machine`). Add a `slug` field to the JSON when fleshing out stories, or derive it programmatically.

### 3c. Design tokens

`zz/styling/design-tokens.css` already exists with the full token set. This goes into `app/globals.css` as a `:root {}` block. Tailwind should be configured to consume these tokens via `tailwind.config.js` (map CSS variables to Tailwind utilities where practical). Don't duplicate values between Tailwind config and CSS variables — CSS variables are the source of truth.

### 3d. Server vs. client components

Default to server components. Add `'use client'` only when a component needs:
- `useState` / `useEffect` / other hooks
- Browser events (scroll, click with state)
- The interactive demo
- The gallery filter UI

The nav (scroll-aware frosted glass), scroll reveal animations, and any interactive filtering — these are client components. The page shells, hero text, app cards rendering from data — server components.

### 3e. Animation approach

The design system spec uses CSS + IntersectionObserver (the `useScrollReveal` hook in `zz/styling/design-system.md`). Stick with this — no Framer Motion unless the demo specifically needs it. Framer adds bundle weight and the CSS approach is sufficient for scroll reveals, hovers, and staggered entrances.

Exception: the demo animation (phone → queue → big screen) may benefit from Framer Motion for sequenced orchestration. Decide per story.

---

## 4. Coding Conventions — Establish Now

These prevent inconsistency across 20+ pages built over multiple sessions.

### 4a. File naming
- Pages: `page.js` (App Router standard)
- Components: `PascalCase.js` — e.g., `AppCard.js`, `NavBar.js`
- Hooks: `camelCase.js` with `use` prefix — e.g., `useScrollReveal.js`
- Utilities: `camelCase.js` — e.g., `getAppBySlug.js`

### 4b. Component location
```
app/                     ← Next.js routes only
components/
  ui/                    ← generic (Button, Badge, Card)
  sections/              ← page sections (Hero, AppGallery, HowItWorks)
  demo/                  ← the Love Letter Machine demo components
hooks/                   ← useScrollReveal, useParallax, etc.
lib/                     ← data helpers, utils (getApps.js, slugify.js)
data/                    ← JSON (copy from zz/info/ at build, or import directly)
public/                  ← static assets (fonts if self-hosted, images, OG images)
```

### 4c. CSS approach
- Tailwind for layout, spacing, responsive breakpoints, and utility classes
- CSS variables (from design-tokens.css) for color and typography tokens
- Don't write raw CSS classes when Tailwind works; don't write Tailwind utility soup when a CSS variable makes intent clearer
- No CSS Modules — unnecessary complexity for this project

### 4d. SEO / metadata pattern
Every route exports a `generateMetadata` function. The 20 app pages generate metadata from their JSON data. The design system doc notes SEO is important — individual app pages need:
- Unique `<title>` and `<meta description>`
- OG image (can be `opengraph-image.js` auto-generated or static per app)
- Canonical URL

Sitemap: use `app/sitemap.js` (Next.js built-in) to auto-generate all 22 URLs (homepage + planners + /apps + 20 app pages).

### 4e. No TypeScript
JavaScript only, per CLAUDE.md. Don't add `.ts` or `.tsx` files. Skip type annotations. JSDoc is optional and not required.

---

## 5. Things That Can Wait Until the Relevant Story

These don't need to be decided upfront — settle them when the story is being worked:

- Exact copy for each of the 20 app pages (write it during that story)
- Whether testimonials are real or placeholder (structure the component to take either)
- OG image strategy per page (can start with a single shared template)
- Analytics (Plausible / Vercel Analytics — one-line addition, not a story)
- Cookie/privacy banner (depends on analytics choice)
- Mobile nav menu (hamburger vs. drawer — decide when building nav)
- Exact filter UX in the gallery (pill buttons are the assumption)

---

## 6. Suggested Epic Structure

Given the above, a clean epic breakdown would be:

1. **Foundation** — Next.js project init, design tokens, global layout (nav + footer), routing skeleton, sitemap
2. **Homepage** — hero, demo, gallery section (compressed), how-it-works, CTA
3. **Interactive Demo** — Love Letter Machine phone → queue → big screen (can be its own epic given complexity)
4. **Apps Gallery** — `/apps` full page, vibe filter, timeline view, card component
5. **App Pages** — `/apps/[slug]` template + all 20 pages populated from JSON
6. **Planners Page** — `/planners` standalone marketing page
7. **Contact / Booking** — form component, API route, email delivery
8. **SEO & Performance** — metadata per page, OG images, sitemap, lighthouse pass

Epics 1–3 are the critical path for a demo-able MVP. Epics 4–6 are the content build-out. 7–8 are launch readiness.


1. some serverless function with nodemailer
2. fully interactive
3. both? why not?
4. Wepho
5. real photos

# Architecture Reference

Technical decisions, folder structure, and coding conventions for the Wepho marketing site.

---

## What We're Building

The Wepho **marketing website** — not the actual wedding apps. The site showcases the 20 app types, runs an interactive demo of the Love Letter Machine, and converts visitors into bookings.

**Out of scope:** guest-facing app, admin/moderation interface, display wall, real-time backend, auth, data storage.

---

## Route Structure

```
/                        homepage (couples)
/planners                wedding planners marketing page
/apps                    full gallery of all 20 apps
/apps/[slug]             individual app marketing page (20 pages)
/sitemap.xml             auto-generated
/robots.txt              auto-generated
```

All `/apps/[slug]` pages are **statically generated at build time** via `generateStaticParams`. No dynamic server rendering on this site.

---

## Folder Structure

```
C:\Users\ENVY1\Desktop\TSrepos\wed-1\
├── app/                         Next.js App Router routes
│   ├── layout.js                root layout (nav + footer, font, globals)
│   ├── page.js                  / homepage
│   ├── not-found.js             404
│   ├── sitemap.js               /sitemap.xml
│   ├── robots.js                /robots.txt
│   ├── planners/
│   │   └── page.js              /planners
│   ├── apps/
│   │   ├── page.js              /apps gallery
│   │   └── [slug]/
│   │       └── page.js          /apps/[slug]
│   └── api/
│       └── contact/
│           └── route.js         POST /api/contact (Nodemailer)
├── components/
│   ├── ui/                      generic primitives
│   │   ├── Button.js
│   │   ├── Badge.js
│   │   └── Card.js
│   ├── layout/                  nav, footer
│   │   ├── NavBar.js
│   │   └── Footer.js
│   ├── sections/                page-level sections
│   │   ├── Hero.js
│   │   ├── AppGallery.js        the compressed 6-card homepage gallery
│   │   ├── AppGalleryFull.js    the full /apps page gallery with filters
│   │   ├── HowItWorks.js
│   │   └── ...
│   ├── demo/                    Love Letter Machine demo
│   │   ├── LoveLetterDemo.js    orchestrator (state, sequence)
│   │   ├── PhoneFrame.js        guest input frame
│   │   ├── AdminFrame.js        moderation queue frame
│   │   └── BigScreenFrame.js    display wall frame
│   └── app-page/               sections used on /apps/[slug]
│       ├── AppHero.js
│       ├── AppScene.js
│       ├── AppHowItWorks.js
│       └── ...
├── hooks/
│   ├── useScrollReveal.js
│   └── useParallax.js
├── lib/
│   ├── getApps.js               reads data/apps.js, returns typed app objects
│   └── slugify.js               name → slug utility
├── data/
│   └── apps.js                  all 20 apps (extended from JSON source)
└── public/
    ├── images/                  real photography
    └── og/                      OG images per page (or generated)
```

---

## Rendering Strategy

| Page | Strategy | Why |
|---|---|---|
| `/` | Static (default) | No dynamic data |
| `/planners` | Static (default) | No dynamic data |
| `/apps` | Static (default) | Filter is client-side |
| `/apps/[slug]` | `generateStaticParams` | 20 pages from JSON |
| `/api/contact` | Serverless function | Nodemailer POST |

The site is **fully static** except for the contact API route. Deploys cleanly to Vercel.

---

## Data: The 20 Apps

Source of truth: `zz/info/20-apps.json` — read-only reference.

Working data: `data/apps.js` — a JS module that imports the JSON and extends each app with the content needed for full marketing pages. This is where slug, hero headline, scene narrative, FAQ, etc. live.

```js
// data/apps.js shape (per app)
{
  id: 16,
  slug: 'love-letter-machine',
  isDemo: true,
  title: 'The Unprompted Love Letter Machine',
  tagline: 'Read it together. For the first time. In front of everyone.',
  description: '...',       // from JSON
  why: '...',               // from JSON
  alt1_vibe: [...],         // from JSON
  alt2_moment: [...],       // from JSON
  alt4_feeling: [...],      // from JSON

  // Extended — filled in per app
  hero: {
    headline: '...',
    subhead: '...',
  },
  scene: '...',             // 3–5 sentence narrative paragraph
  howItWorks: {
    setup: { label: 'You set it up', time: '~20 min', detail: '...' },
    guests: { label: 'Guests use it', detail: '...' },
    keepsake: { label: 'You keep it', artifact: '...' },
  },
  bigScreen: '...',
  isThisYou: ['...', '...', '...'],
  faq: [
    { q: '...', a: '...' },
    // max 4
  ],
}
```

**Slugs for all 20 apps** (derive in `lib/getApps.js` or hardcode in `data/apps.js`):

| ID | Slug |
|---|---|
| 1 | `couple-trivia` |
| 2 | `venue-scavenger-hunt` |
| 3 | `anniversary-time-capsule` |
| 4 | `bucket-list-builder` |
| 5 | `conversation-starters` |
| 6 | `prediction-vault` |
| 7 | `guest-memory-map` |
| 8 | `live-roast-board` |
| 9 | `unpopular-opinions` |
| 10 | `first-dance-ballot` |
| 11 | `wedding-bingo` |
| 12 | `advice-oracle` |
| 13 | `relationship-exhibit` |
| 14 | `future-home-map` |
| 15 | `collaborative-soundtrack` |
| 16 | `love-letter-machine` ← demo app |
| 17 | `emotion-pulse` |
| 18 | `secret-relay` |
| 19 | `cocktail-quiz` |
| 20 | `parallel-universe` |

---

## CSS & Design Tokens

- `zz/styling/design-tokens.css` is the source of truth for all design tokens (colors, type, spacing, etc.)
- At project init, copy/import this into `app/globals.css` as a `:root {}` block
- Tailwind is configured in `tailwind.config.js` to reference these CSS variables where practical (don't duplicate raw values)
- **CSS variables are authoritative** — never hardcode a hex color in a component

```js
// tailwind.config.js example
colors: {
  accent: 'var(--color-accent)',
  'accent-light': 'var(--color-accent-light)',
  bg: 'var(--color-bg)',
  'bg-subtle': 'var(--color-bg-subtle)',
  'bg-dark': 'var(--color-bg-dark)',
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
}
```

Full design system: `zz/styling/design-system.md`

---

## Server vs. Client Components

**Default: server components.** Add `'use client'` only when the component needs hooks or browser APIs.

| Component | Type | Reason |
|---|---|---|
| Page shells (`page.js`) | Server | Layout, data reading |
| App cards (static) | Server | Pure render from data |
| NavBar | Client | Scroll-aware frosted glass, `useState` for mobile menu |
| AppGallery filter | Client | `useState` for active vibe/moment filter |
| Demo (`LoveLetterDemo.js`) | Client | All state-driven |
| Scroll reveal hook | Client | IntersectionObserver |
| Contact form | Client | `useState` for form fields + submission state |

Push `'use client'` as deep in the tree as possible. A page can be a server component that imports one client component for the interactive bit.

---

## Animation

**Approach: CSS + IntersectionObserver** (the `useScrollReveal` hook from the design system).

- Every section element enters with fade + upward slide (`opacity: 0 → 1`, `translateY(28px → 0)`)
- Grid items stagger with 80ms delay increments
- Hover: `translateY(-2px)` + shadow lift on cards; `scale(1.04)` on icons
- Nav: transparent → frosted glass on scroll

**No Framer Motion for general animations.** Exception: the demo orchestration (phone → queue → big screen sequence) may use Framer Motion's `AnimatePresence` for frame transitions if CSS transitions feel insufficient. Decide when building that story.

Always wrap animations in `@media (prefers-reduced-motion: no-preference)`.

---

## SEO / Metadata Pattern

Every route exports a `generateMetadata` function:

```js
// app/apps/[slug]/page.js
export async function generateMetadata({ params }) {
  const app = getAppBySlug(params.slug)
  return {
    title: `${app.title} — Wepho`,
    description: app.description,
    openGraph: {
      title: app.title,
      description: app.description,
      images: [`/og/${app.slug}.png`],
    },
  }
}
```

Sitemap: `app/sitemap.js` auto-generates all URLs at build time from `data/apps.js`.

---

## Coding Conventions

### File naming
- Pages: `page.js` (App Router)
- Components: `PascalCase.js` — `AppCard.js`, `NavBar.js`
- Hooks: `useCamelCase.js` — `useScrollReveal.js`
- Utilities: `camelCase.js` — `getAppBySlug.js`, `slugify.js`

### No TypeScript
`.js` files only. No `.ts` / `.tsx`. No type annotations.

### No CSS Modules
Tailwind utilities + CSS variables only. No `*.module.css` files.

### No comments by default
Only add a comment when the why is non-obvious. Never describe what the code does.

### `next/image` and `next/link`
Always use these — never raw `<img>` or `<a>` for internal navigation.

---

## Contact API Route

```
POST /api/contact
Body: { name, email, weddingDate, appInterest, message }
Response: { ok: true } or { error: '...' }
```

Uses Nodemailer with SMTP credentials from env vars. Sends to `CONTACT_EMAIL_TO`. 

Required env vars:
```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL_TO=
```

In development, point to a local mailcatcher (Mailhog, Mailtrap, Ethereal) or use Ethereal's auto-credentials.

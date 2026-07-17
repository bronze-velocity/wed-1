# Wepho — Build Tasks

Epics are in recommended build order. Check off tasks as they're completed. Each epic has a goal and dependency note so any session can pick up cold.

**Reference:** `architecture.md` — folder structure and conventions. `decisions.md` — all confirmed decisions.

---

## Epic 1: Foundation

**Goal:** A running Next.js 15 project with design system wired, routing skeleton in place, nav + footer built, and data layer ready. Nothing visually finished yet — just the scaffolding everything else plugs into.

*No dependencies. Start here.*

---

- [x] **T1 — Initialize the project**
  - [x] `npx create-next-app@latest` — App Router, no TypeScript, Tailwind, no `src/` directory, no ESLint prompt (accept defaults)
  - [x] Delete boilerplate: clear `app/page.js` content, `app/globals.css` content (keep the file), remove default `public/` assets
  - [x] Confirm `pnpm run dev` runs on port 3000 with no errors

- [x] **T2 — Configure Tailwind + design tokens**
  - [x] Copy `zz/styling/design-tokens.css` into `app/globals.css` as a `:root {}` block
  - [x] Add Plus Jakarta Sans to `app/layout.js` via Google Fonts `<link>` tags (preconnect + stylesheet)
  - [x] Apply font to `<html>` or `<body>` via className
  - [x] In `tailwind.config.js`, extend colors to map CSS variables: `accent`, `accent-light`, `bg`, `bg-subtle`, `bg-dark`, `text-primary`, `text-secondary`, `text-muted`, `border`, `rose`, `amber`, `teal`, `green`, `coral`
  - [x] Verify a test div with `className="text-accent bg-bg-subtle"` renders correctly

- [x] **T3 — Create routing skeleton** (empty shells, no content yet)
  - [x] `app/page.js` → returns `<main />`
  - [x] `app/planners/page.js` → returns `<main />`
  - [x] `app/apps/page.js` → returns `<main />`
  - [x] `app/apps/[slug]/page.js` → returns `<main />`, exports `generateStaticParams` (wired to data, returns all 20 slugs)
  - [x] `app/not-found.js` → returns placeholder
  - [x] `app/api/contact/route.js` → `export async function POST() { return Response.json({ ok: true }) }`

- [x] **T4 — Set up the data layer**
  - [x] Create `data/apps.js` — import `zz/info/20-apps.json`, re-export the apps array; add a stub `extended` object per app (empty `hero`, `scene`, `howItWorks`, `bigScreen`, `isThisYou`, `faq` keys) ready to be filled in Epic 5
  - [x] Create `lib/getApps.js` with three exports: `getApps()` (all 20), `getAppBySlug(slug)`, `getAppSlugs()` (array of slug strings for `generateStaticParams`)
  - [x] Verify: in `app/apps/[slug]/page.js`, call `generateStaticParams` and confirm the build generates 20 paths (run `pnpm run build` or check the function output)

- [x] **T5 — Build NavBar** (`components/layout/NavBar.js`) — `'use client'`
  - [x] Fixed, full-width, `z-index: 100`, height 64px
  - [x] Left: Wepho wordmark (text logo for now, replace with SVG if one exists), links to `/`
  - [x] Center/right links: "Explore apps" → `/apps`, "For planners" → `/planners`
  - [x] Right: "Book your app" CTA button (accent pill), links to `/#contact`
  - [x] Scroll behavior: transparent on top → frosted glass (`backdrop-filter: blur(12px)`, `rgba(255,255,255,0.85)` bg) when `scrollY > 20`
  - [x] Mobile (< 768px): hide center links, show hamburger icon; tap opens a full-width slide-down menu with all links
  - [x] Mobile menu closes on link click or outside tap

- [x] **T6 — Build Footer** (`components/layout/Footer.js`)
  - [x] Dark background (`--color-bg-dark`)
  - [x] Wepho wordmark + one-line tagline
  - [x] Links: Explore apps, For planners, Book your app
  - [x] Copyright: "© 2026 Wepho. All rights reserved."

- [x] **T7 — Wire up root layout** (`app/layout.js`)
  - [x] `<NavBar />` before `{children}`, `<Footer />` after
  - [x] Default `metadata` export: `{ title: { default: 'Wepho', template: '%s — Wepho' }, description: 'Custom wedding experience apps built for your guests.' }`
  - [x] `<html lang="en">`, body gets font className

- [x] **T8 — Create scroll animation hooks**
  - [x] `hooks/useScrollReveal.js` — IntersectionObserver, adds `.is-visible` to element when it enters viewport at 15% threshold, disconnects after first trigger
  - [x] Add to `globals.css`: `.reveal { opacity: 0; transform: translateY(28px); transition: opacity 400ms, transform 400ms; }` + `.reveal.is-visible { opacity: 1; transform: none; }` + stagger variant (`.reveal-stagger` children with 80ms delay increments)
  - [x] Add `@media (prefers-reduced-motion: reduce)` override that sets all reveal elements to `opacity: 1; transform: none; transition: none`
  - [x] `hooks/useParallax.js` — passive scroll listener, `translateY(scrollY * speed)` on ref element

- [x] **T9 — Create sitemap + robots**
  - [x] `app/sitemap.js` — exports default function returning array of `{ url, lastModified }` for: `/`, `/planners`, `/apps`, and all 20 `/apps/[slug]` URLs
  - [x] `app/robots.js` — allow all crawlers, reference sitemap URL

- [x] **T10 — Environment setup**
  - [x] Create `.env.local.example` with keys: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`
  - [x] Create `.env.local` (gitignored) with Mailtrap or Ethereal dev credentials
  - [x] Verify `.env.local` is in `.gitignore`

---

## Epic 2: Interactive Demo (Love Letter Machine)

**Goal:** A fully interactive 3-frame demo embedded on the homepage. Visitor types a real message in a phone mockup → approves it in a mock admin queue → watches it appear on a big screen. Pure frontend state — no backend. On mobile, a pill switcher toggles between frames.

*Requires: Epic 1 complete. Build before the homepage so it drops straight in.*

---

- [x] **T11 — LoveLetterDemo.js** — orchestrator (`components/demo/LoveLetterDemo.js`) — `'use client'`
  - [x] State: `step` (`'phone' | 'admin' | 'screen'`), `message` (string), `senderName` (string), `to` (`'both' | 'her' | 'him'`)
  - [x] After guest submits: 600ms delay → `setStep('admin')`
  - [x] After admin approves: 400ms delay → `setStep('screen')`
  - [x] "Start over" button resets all state to initial
  - [x] Desktop layout: all 3 frames visible side by side (phone | admin | screen), inactive frames are dimmed/smaller
  - [x] Mobile layout (< 1024px): pill switcher tabs above, one frame visible at a time; auto-advances on submit/approve, tab can also be clicked manually

- [x] **T12 — PhoneFrame.js** (`components/demo/PhoneFrame.js`)
  - [x] Phone device frame (CSS: rounded corners, border, box-shadow — portrait aspect ratio, ~280px wide)
  - [x] Phone "notch" at top (decorative)
  - [x] App UI inside: "Leave them a message" heading, "To:" pill selector (Both / Her / Him), optional name input ("Your name — or leave it anonymous"), message textarea (placeholder: *"Write something you've never said out loud…"*), character count (`0/280`)
  - [x] Submit button: "Send it →" — disabled until textarea has content
  - [x] Auto-focus the textarea on mount

- [x] **T13 — AdminFrame.js** (`components/demo/AdminFrame.js`)
  - [x] Laptop/tablet device frame (wider, landscape-ish)
  - [x] Header: "Wepho — Moderation Queue" + "1 message waiting" badge
  - [x] The visitor's submitted message rendered as a card: to-label, message text, sender name (or "Anonymous"), timestamp "just now"
  - [x] Two buttons: "Approve →" (green accent, glows) and "Skip" (ghost)
  - [x] On approve: card animates out (slide + fade), step advances after 400ms

- [x] **T14 — BigScreenFrame.js** (`components/demo/BigScreenFrame.js`)
  - [x] TV frame: wide, dark background (`--color-bg-dark`), slight rounded corners, subtle glow
  - [x] Center content: "To: [to label]" overline in accent color, message text in large type (white, `--text-h2` weight), sender attribution below in muted white
  - [x] Entrance: message fades in over 900ms with slight scale (0.96 → 1.0)
  - [x] Wepho wordmark small in bottom-right corner
  - [x] "Start over" button appears below the frame after message has settled

- [x] **T15 — Mobile pill switcher** (inside `LoveLetterDemo.js`)
  - [x] Render three pill tabs: "1. Write" / "2. Approve" / "3. Reveal"
  - [x] Active tab: accent background; inactive: ghost/outline
  - [x] Completed steps show a check mark
  - [x] Only show on screens < 1024px

- [x] **T16 — Demo section wrapper** for homepage (`components/sections/DemoSection.js`)
  - [x] Section background: subtle gradient or off-white
  - [x] Overline label: "Live demo"
  - [x] Heading: "Read it together. For the first time. In front of everyone."
  - [x] Subhead: 2–3 sentences from `zz/info/demo-app-selected-v2.md`
  - [x] `<LoveLetterDemo />` below the copy
  - [x] Link below demo: "This is App #16 — The Unprompted Love Letter Machine → See all 20 apps"
  - [x] Scroll-reveal entrance on the heading

---

## Epic 3: Homepage (/)

**Goal:** The main couple-facing landing page — demo-forward, gallery teaser with vibe tiles, price reframe, and a booking CTA.

*Requires: Epic 1 (foundation), Epic 2 (demo), and `AppCard.js` from Epic 4 (build AppCard first).*

---

- [x] **T17 — Build AppCard.js first** — see T29 in Epic 4 (shared component needed here)

- [x] **T18 — Hero section** (`components/sections/HomeHero.js`)
  - [x] Overline: "Custom Wedding Experience Studio"
  - [x] Headline: rotating or single — use one of the angles from `zz/info/uvp-icp-etc.md` (e.g., *"A wedding app built around who you actually are."*)
  - [x] Subhead: 1–2 sentences (e.g., *"Not a template. Not Kahoot. Built for your wedding, from scratch."*)
  - [x] Primary CTA: "Explore 20 apps →" (black button, large), links to `/apps`
  - [x] Secondary CTA: "Book your app" (ghost), links to `/#contact`
  - [x] Hero visual: phone mockup showing the Love Letter Machine guest UI (real screenshot or designed mockup image)
  - [x] Background: `--gradient-hero` (subtle purple-to-white-to-light-blue wash)
  - [x] Headline entrance: fade + slide up on mount

- [x] **T19 — Cinematic story beat #1** — between Hero and Demo
  - [x] Alt 4 style: full-width, large ambient text — *"Cocktail hour. Half your guests don't know each other. The music is too loud to hear names. Someone checks their phone."*
  - [x] Resolution line: *"The QR code on the table gives them a reason to look up."*
  - [x] No product language — just the scene
  - [x] Dark or off-white background, large editorial type

- [x] **T20 — Demo section** — drop in from Epic 2
  - [x] Import and render `<DemoSection />` (which contains `<LoveLetterDemo />`)

- [x] **T21 — App gallery teaser — vibe tiles** (`components/sections/AppGalleryTeaser.js`) — `'use client'`
  - [x] Bold prompt heading: "What kind of wedding do you want?"
  - [x] 5 large clickable mood tiles:
    - Make them laugh → apps 1, 8, 9, 11, 19, 20
    - Make them cry → apps 3, 7, 12, 13, 16, 17
    - Get them talking → apps 2, 4, 5, 14, 18
    - Create a keepsake → apps 3, 4, 6, 7, 12, 14, 15, 17
    - Stop the room → apps 1, 2, 8, 10, 11, 15
  - [x] One tile pre-selected on load ("Make them laugh" or "Stop the room")
  - [x] On tile click/hover: 4–5 app cards fan/slide out below the tiles
  - [x] Each app card in this section: app name + one-sentence pitch + "See how it works →" link to `/apps/[slug]`
  - [x] "See all 20 apps →" link below the cards, to `/apps`

- [x] **T22 — Cinematic story beat #2** — between gallery and how-it-works
  - [x] Scene: *"Your grandmother records a 45-second video message. Sealed until your 10th anniversary. You'll open it together — she might not be there when you do."*
  - [x] App name small below: "Anniversary Time Capsule — App #3"

- [x] **T23 — How it works section** (`components/sections/HowItWorks.js`)
  - [x] 3 steps: "You pick your app" → "You fill in the form (~30 min)" → "Guests scan the QR on the night"
  - [x] Each step: number, heading, 2–3 sentence description
  - [x] Step 2 emphasizes: couple-authored content (questions, stories, photos) — "the form is the fun part"
  - [x] Step 3 emphasizes: no download, no login, grandparents included
  - [x] Staggered entrance animation

- [ ] **T24 — Price reframe section** (`components/sections/PriceReframe.js`)
  - [ ] The flowers / photographer / caterer / Wepho comparison — verbatim from `zz/info/uvp-icp-etc.md`
  - [ ] Dark background, large type, each line on its own row
  - [ ] Wepho line in accent color or bold white
  - [ ] CTA below: "Book your app — $2,000" (accent button)

- [ ] **T25 — Social proof section** (`components/sections/Testimonials.js`)
  - [ ] 2–3 couple testimonials: name, wedding date, which app, quote
  - [ ] Placeholder quotes if real ones aren't available yet — mark clearly as `// TODO: replace with real quotes`
  - [ ] Card layout with subtle border + hover lift

- [ ] **T26 — Planners callout** (`components/sections/PlannersCallout.js`)
  - [ ] Single-line strip or small card: "Are you a wedding planner?" + 1 sentence + "See how Wepho works for planners →" link to `/planners`
  - [ ] Subtle — doesn't compete with the main CTA

- [x] **T27 — Final CTA / contact section** (`components/sections/FinalCta.js`)
  - [ ] `id="contact"` so `/#contact` anchor works
  - [ ] Dark full-bleed background
  - [ ] Heading: "Ready to make this yours?"
  - [ ] Subhead: "We take 4 weddings per month. That's the number where we can build something worth $2,000."
  - [ ] `<ContactForm />` embedded (from Epic 7 — if not built yet, leave a `{/* ContactForm goes here */}` placeholder)

- [x] **T28 — Wire up homepage** (`app/page.js`)
  - [x] Import and compose all sections in order: Hero → StoryBeat1 → DemoSection → AppGalleryTeaser → StoryBeat2 → HowItWorks → PriceReframe → Testimonials → PlannersCallout → FinalCta *(PriceReframe/T24, Testimonials/T25 not built yet — left as JSX placeholders; StoryBeat2/T22 now wired in)*
  - [x] `export const metadata` (or `generateMetadata`) with homepage-specific title + OG description

---

## Epic 4: Apps Gallery Page (/apps)

**Goal:** A full filterable gallery of all 20 app types. Primary filter: vibe. Secondary filter: wedding moment. Non-matching cards desaturate (don't disappear — couples should see the full 20).

---

- [x] **T29 — AppCard.js component** (`components/ui/AppCard.js`) — *build this first; used on homepage and here*
  - [x] App title (truncated to 2 lines)
  - [x] Description (truncated to 3 lines)
  - [x] Primary vibe badge (color-coded by vibe: laugh=amber, cry=rose, talking=teal, keepsake=green, room=purple)
  - [x] Moment badge (first `alt2_moment` value, neutral color)
  - [x] "Featured demo" badge if `isDemo: true` (accent color)
  - [x] Hover: `translateY(-2px)` + shadow lift + border highlight
  - [x] Entire card is a link to `/apps/[slug]`
  - [x] Server-renderable: pure prop-driven, no client state

- [x] **T30 — AppGalleryFull.js** (`components/sections/AppGalleryFull.js`) — `'use client'`
  - [x] Vibe filter row: pill tabs — All · Make them laugh · Make them cry · Get them talking · Create a keepsake · Stop the room
  - [x] Moment filter row: pill tabs — All · Arrival · Cocktail Hour · Dinner · Speeches · Dancing · All Day
  - [x] Active filter: filled pill (accent or dark bg); inactive: outlined ghost pill
  - [x] Filter logic: app shows at full opacity if it matches the active vibe AND active moment; otherwise renders at 30% opacity and pointer-events-none (don't hide — they stay in the grid)
  - [x] Count label: "Showing 12 of 20" (count of fully-visible, non-faded cards)
  - [x] Grid: 1-col mobile → 2-col tablet → 3-col desktop, consistent gap
  - [x] Staggered card entrance animation on initial load
  - [x] On filter change: opacity transition (not grid reflow — cards stay in place)

- [x] **T31 — Wire up /apps page** (`app/apps/page.js`)
  - [x] Page heading: "20 apps. One is yours."
  - [x] Short intro paragraph (2–3 sentences, copy to be written inline)
  - [x] `<AppGalleryFull apps={getApps()} />`
  - [x] `export const metadata`: title "Explore 20 Wedding Apps — Wepho", SEO description
  - [x] This is a server component — pass app data as prop to the client gallery component

---

## Epic 5: App Marketing Pages (/apps/[slug])

**Goal:** Individual marketing page for each of the 20 apps. One shared template, 20 apps' worth of content.

*Requires: Epic 1 (routing skeleton), Epic 4 (AppCard exists, familiarity with app data shape).*

---

### 5a — Page template + section components

- [x] **T32 — Page template** (`app/apps/[slug]/page.js`)
  - [x] `generateStaticParams` → `getAppSlugs()` (already wired from Epic 1)
  - [x] `generateMetadata({ params })` → `{ title: app.title, description: app.description, openGraph: { ... } }`
  - [x] Fetch app with `getAppBySlug(params.slug)`, return `notFound()` if null
  - [x] Compose all section components, passing app data as props

- [x] **T33 — AppHero** (`components/app-page/AppHero.js`)
  - [x] Overline: vibe badge (color-coded)
  - [x] Headline: `app.hero.headline`
  - [x] Subhead: `app.hero.subhead`
  - [x] Phone mockup image (placeholder for all apps initially — real per-app image if available)
  - [x] CTA: "Book this app — $2,000" (links to `/#contact` or opens contact form)
  - [x] "No download for guests. No login. Just a QR code." trust line below CTA

- [x] **T34 — AppScene** (`components/app-page/AppScene.js`)
  - [x] Section heading: "Picture this"
  - [x] `app.scene` — 3–5 sentence narrative paragraph, no product language
  - [x] Larger body type, generous vertical padding, off-white or subtle bg

- [x] **T35 — AppHowItWorks** (`components/app-page/AppHowItWorks.js`)
  - [x] 3-column layout on desktop, stacked on mobile
  - [x] Column 1: "You set it up" — `app.howItWorks.setup.time`, `app.howItWorks.setup.detail`
  - [x] Column 2: "Guests use it" — `app.howItWorks.guests.detail`
  - [x] Column 3: "You keep it" — `app.howItWorks.keepsake.artifact`, `app.howItWorks.keepsake.detail`
  - [x] Icon or number for each column

- [x] **T36 — AppBigScreen** (`components/app-page/AppBigScreen.js`)
  - [x] Section heading: "What the room sees"
  - [x] `app.bigScreen` — one paragraph description of the live display wall
  - [x] Display wall mockup: dark frame, representative content (placeholder text/graphic initially)

- [x] **T37 — AppIsThisYou** (`components/app-page/AppIsThisYou.js`)
  - [x] Section heading: "Is this you?"
  - [x] 3 bullet points from `app.isThisYou` — each a specific self-selection criterion
  - [x] Large check-marked or arrow-pointed list items

- [x] **T38 — AppBookIt** (`components/app-page/AppBookIt.js`)
  - [x] Heading: "Ready to make this yours?"
  - [x] `<ContactForm appName={app.title} />` — form pre-fills the "which app" dropdown
  - [x] Scarcity note: "We take 4 weddings per month."

- [ ] **T39 — AppFaq** (`components/app-page/AppFaq.js`)
  - [ ] Simple accordion or Q&A list (no animation needed, but nice if added)
  - [ ] Renders `app.faq` array of `{ q, a }` — max 4 items
  - [ ] Standard questions across all apps: no download? / setup time? / what if it fails on the day? / what's customizable?

---

### 5b — App content (fill in `data/apps.js` for each app)

Each app needs: `hero` (headline + subhead), `scene` (narrative), `howItWorks` (3 columns), `bigScreen`, `isThisYou` (3 bullets), `faq` (up to 4 Q&As). Source material is in `zz/info/niche-custom-wedding-apps.md`.

- [x] **T40 — App 16 — Love Letter Machine** *(do first — it's the demo app; content already largely in `zz/info/demo-app-selected-v2.md`)*
- [x] **T41 — App 1 — Couple Trivia**
- [x] **T42 — App 2 — Venue Scavenger Hunt**
- [x] **T43 — App 3 — Anniversary Time Capsule**
- [x] **T44 — App 4 — Bucket List Builder**
- [x] **T45 — App 5 — Conversation Starters**
- [x] **T46 — App 6 — Prediction Vault**
- [x] **T47 — App 7 — Guest Memory Map**
- [x] **T48 — App 8 — Live Roast Board**
- [x] **T49 — App 9 — Unpopular Opinions**
- [x] **T50 — App 10 — First Dance Ballot**
- [x] **T51 — App 11 — Wedding Bingo**
- [x] **T52 — App 12 — Advice Oracle**
- [x] **T53 — App 13 — Relationship Exhibit**
- [x] **T54 — App 14 — Future Home Map**
- [x] **T55 — App 15 — Collaborative Soundtrack**
- [x] **T56 — App 17 — Emotion Pulse**
- [x] **T57 — App 18 — Secret Relay**
- [x] **T58 — App 19 — Cocktail Quiz**
- [x] **T59 — App 20 — Parallel Universe**

---

## Epic 6: Planners Page (/planners)

**Goal:** A standalone marketing page for wedding planners. Different tone — professional, reassurance-first, zero-extra-work emphasis. Source material: `zz/info/key.md` (Emotional Drivers — Planners), `zz/info/uvp-icp-etc.md` (Secondary ICP section).

---

- [ ] **T60 — Planners Hero** (`components/sections/planners/PlannersHero.js`)
  - [ ] Overline: "For Wedding Planners"
  - [ ] Headline: *"The easiest thing you'll ever add to a couple's day."*
  - [ ] Subhead: zero extra coordination, no download risk, reflects well on you
  - [ ] CTA: "Recommend Wepho to a couple" → `/#contact` or `mailto:`

- [ ] **T61 — What planners get section** (`components/sections/planners/PlannerBenefits.js`)
  - [ ] 4 benefit cards — each addresses a planner fear from `zz/info/key.md`:
    - "Zero extra coordination" — Wepho handles everything; you touch nothing on the day
    - "No confused guests" — no download, no login; designed for grandparents
    - "Always a wow moment" — the room coming alive reflects on who recommended it
    - "Your couples will credit you" — "our planner found this" is the referral that matters
  - [ ] Card layout with feature icons and short descriptions

- [ ] **T62 — How it works for planners section**
  - [ ] 3-step: "You mention it to the couple" → "We build it and handle everything" → "Your couple loves it — and credits you"
  - [ ] Emphasize: planner has zero tasks on the day itself

- [ ] **T63 — Objections section** (`components/sections/planners/PlannerObjections.js`)
  - [ ] Structured Q&A or accordion, sourced from `zz/info/uvp-icp-etc.md` planners section:
    - "Does it require a download?" — No. QR → browser. Designed for grandparents.
    - "Who runs it on the day?" — The couple or MC, via a simple moderation screen. The planner touches nothing.
    - "What if it fails?" — We test before handoff, we deploy it, we're reachable on the day.
    - "Will this create extra work for me?" — No. You mention it. We handle everything.

- [ ] **T64 — Planner social proof** — 1–2 planner testimonials (placeholder if not yet available, mark `// TODO`)

- [ ] **T65 — Planner CTA**
  - [ ] Heading: "Ready to add this to your toolkit?"
  - [ ] `<ContactForm recipientType="planner" />` — or separate simpler form: name, email, message
  - [ ] Alternative: "Email us directly" with `mailto:` link as fallback

- [ ] **T66 — Wire up /planners page** (`app/planners/page.js`)
  - [ ] Import and compose all sections
  - [ ] `export const metadata`: title "For Wedding Planners — Wepho", planner-specific OG description

---

## Epic 7: Contact / Booking

**Goal:** A working contact form that sends an email when a couple or planner submits an inquiry.

*Can be built standalone. Slot `<ContactForm />` into homepage, /planners, and /apps/[slug] pages once done.*

---

- [x] **T67 — Install Nodemailer**
  - [x] `pnpm install nodemailer`
  - [x] Verify the package is in `package.json`

- [x] **T68 — Create mailer utility** (`lib/mailer.js`)
  - [x] `createTransporter()` — reads SMTP env vars, returns Nodemailer transporter
  - [x] `sendMail({ to, subject, html })` — thin wrapper around `transporter.sendMail`
  - [ ] In dev: verify it connects to Mailtrap/Ethereal and email is received

- [x] **T69 — Contact API route** (`app/api/contact/route.js`)
  - [x] `export async function POST(request)` — parse JSON body
  - [x] Fields: `name`, `email`, `weddingDate`, `appInterest`, `message`
  - [x] Server-side validation: all required fields present, email format valid
  - [x] Send email via `sendMail`:
    - Subject: `New Wepho inquiry — ${appInterest} — ${weddingDate}`
    - Body: formatted HTML with all fields
    - To: `process.env.CONTACT_EMAIL_TO`
  - [x] Return `Response.json({ ok: true })` on success
  - [x] Return `Response.json({ error: 'Something went wrong' }, { status: 500 })` on failure
  - [ ] Test: POST with curl or a test form, verify email arrives

- [x] **T70 — ContactForm.js** (`components/ui/ContactForm.js`) — `'use client'`
  - [x] Fields: Name (text), Email (email), Wedding date (date input, optional), Which app (select dropdown — "Not sure yet" + all 20 app names), Message (textarea)
  - [x] Accept `appName` prop — if provided, pre-select that app in the dropdown (for /apps/[slug] usage)
  - [x] Client-side validation: required fields highlighted, email format check before submit
  - [x] Submit: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`
  - [x] Loading state: button shows spinner, is disabled
  - [x] Success state: replace form with "We'll be in touch within 48 hours. — The Wepho team" (styled, not just text)
  - [x] Error state: inline error message + "or email us directly at [email]" fallback

- [x] **T71 — Wire ContactForm into pages**
  - [x] Homepage `FinalCta` section
  - [x] `/planners` page CTA section
  - [x] `/apps/[slug]` `AppBookIt` section (with `appName` prop)

---

## Epic 8: SEO & Performance

**Goal:** Every page has correct metadata, images are optimized, the site passes a Lighthouse audit, and the sitemap is clean.

*Do this last — most items are verification + polish.*

---

- [ ] **T72 — Metadata audit** — verify all routes export correct metadata
  - [ ] `/` — homepage title, meta description, OG title/description/image
  - [ ] `/planners` — planner-specific title + description
  - [ ] `/apps` — gallery title + description
  - [ ] `/apps/[slug]` — unique title (`${app.title} — Wepho`), description from `app.description`, OG image

- [ ] **T73 — OG images** (`app/apps/[slug]/opengraph-image.js`)
  - [ ] Use Next.js `ImageResponse` to dynamically generate OG images
  - [ ] Template: Wepho logo / wordmark + app title + primary vibe label + brand colors
  - [ ] One shared template, parameterized by app data — no design tool needed
  - [ ] Test: verify OG image renders at `localhost:3000/apps/love-letter-machine/opengraph-image`
  - [ ] Add static OG for `/` and `/planners` in `public/og/` or as `opengraph-image.js` at those route levels

- [ ] **T74 — Sitemap validation**
  - [ ] Visit `/sitemap.xml` in dev and prod
  - [ ] Confirm all 22 URLs present: `/`, `/planners`, `/apps`, 20 × `/apps/[slug]`
  - [ ] Confirm no broken slugs

- [ ] **T75 — Image optimization audit**
  - [ ] Replace any raw `<img>` tags with `next/image`
  - [ ] All `<Image>` components have explicit `width` + `height` or `fill` with sized container
  - [ ] Hero images have `priority` prop (above-the-fold eager loading)
  - [ ] All images have meaningful `alt` text (not "image" or empty)

- [ ] **T76 — Reduced motion audit**
  - [ ] Confirm `@media (prefers-reduced-motion: reduce)` overrides all `.reveal` animations in `globals.css`
  - [ ] Test: enable "Reduce motion" in OS accessibility settings, verify page still usable and no janky static states

- [ ] **T77 — Accessibility pass**
  - [ ] All buttons and links have visible focus rings (`:focus-visible` with `--shadow-glow`)
  - [ ] NavBar mobile menu is keyboard accessible (tab through links, Escape closes)
  - [ ] Color contrast: spot-check body text (`#111111` on `#F7F6F3`) and accent text (`#6B5CE7` on white) — both should pass 4.5:1
  - [ ] Form labels in `ContactForm.js` are properly associated with inputs (`htmlFor` / `id`)

- [ ] **T78 — 404 page** (`app/not-found.js`)
  - [ ] On-brand design — not the default Next.js 404
  - [ ] Heading: "This page doesn't exist (yet)"
  - [ ] Links: "Explore all 20 apps →" and "Go home →"

- [ ] **T79 — Lighthouse audit**
  - [ ] Run on: `/`, `/apps`, and `/apps/love-letter-machine`
  - [ ] Targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
  - [ ] Fix any flagged issues before sign-off

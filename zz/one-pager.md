# Wepho — One-Pager (v2, 24 Aug 2026)

Updates the original `one-pager.md` to match the repo as it actually stands today. New since v1: the **Moodboard wizard** (LLM-matched brief-builder), a second homepage demo (**Who Said It?**), a **blog** stub of 33 drafts, a **distribution kit**, GDPR consent plumbing, and a candid split between the **20 planned app types** and the **13 currently live** `/apps/[slug]` pages. Tech stack has also moved on (Next.js 16, React 19, Tailwind v4).

---

## Short description of the service

- Interactive wedding reception experience
- Custom wedding reception app
- Bespoke wedding experience app
- Live wedding party app

## Example apps

- **Live Trivia** — 15 questions, all about you two, whole room plays at once
- **The Live Roast Board** — guests submit gentle burns, best ones hit the big screen
- **Unpopular Opinions Icebreaker** — guests vote on hot takes, room erupts
- **Who Said It?** — guess which partner said each quote; guests always get one wrong
- **Relationship Origin Story Exhibit** — guests explore your story like a museum at cocktail hour

---

## What It Is

Wepho is a **Custom Wedding Experience Studio**. We build one-night-only interactive web apps for individual couples — used by guests on their phones during the reception. Every app is built from scratch for one couple and never reused. Price: **~$2,000 per app**.

The category doesn't exist yet. We're creating it.

---

## The Core Idea

Weddings are the best possible context for a group interactive app: 50–200 emotionally primed people who all know the subject matter, are going nowhere for 4 hours, and already have their phones out. QR codes are already normalized at weddings. The live display wall (a projector showing submissions in real time) creates a social feedback loop no individual phone experience can replicate.

**The phone is the input device. The room is the output.**

---

## What Makes It Different

Every competitor sits on the generic end of the spectrum (Kahoot, photo sharing apps, Google Forms, Joy, The Knot). Wepho is the only thing at the custom end.

> "Generic tools don't know you met during a rainstorm. We do."

What no competitor offers simultaneously:
- Personalized to the couple at a deep level
- Interactive for every guest
- Live on the night
- Something the couple keeps forever

---

## The Five Rules

Every Wepho app respects these five rules. They are the UVP in practical form.

1. **Phone in, phone out in under 60 seconds.** No scrolling, no feeds, no lingering. Guests interact, then look up.
2. **The magic happens in the room, not on the screen.** Screens are triggers for real-world moments — a toast, a hug, a burst of laughter across the table.
3. **The couple curates.** Nothing goes public without their approval (or a trusted friend's). No moderation panic, no awkward surprises.
4. **The app is built for one couple, one night.** Nothing off-the-shelf. The couple brainstorms with us and can come up with any idea — however weird, however specific, however tied to their private history. If it fits their story, we build it.
5. **They bring the idea (or pick one of ours) — we build it beautifully.** The couple doesn't touch code, wireframes, or config. We take the concept and ship it with a seamless user experience, design that matches their wedding's visual language, and rock-solid live-night reliability.

---

## The 20 App Types (13 live on site)

Each app is a distinct interactive experience. Couples pick one (or a combination). All share four features: couple-authored content, a live display wall, no app install for guests, and a keepsake output.

**Currently live** as full `/apps/[slug]` marketing pages: 13 of the 20. The remaining 7 are filtered out via a `!skip` flag in `getApps.js` until their per-app copy is finished — copy that references "all 20 app types" (llms.txt, sitemap, pin drafts) is being aligned with what's actually shipped.

| # | App | Best Moment | Vibe |
|---|-----|-------------|------|
| 1 | Live Trivia | Dinner | Funny / Stop the room |
| 2 | Venue Scavenger Hunt | Cocktail Hour | Social / Romantic |
| 3 | Anniversary Time Capsule | Cocktail / Dinner | Emotional / Keepsake |
| 4 | Guest Bucket List Builder | Dinner | Romantic / Social |
| 5 | Table Conversation Starters | Dinner | Social |
| 6 | The Prediction Vault | Dinner | Funny / Romantic |
| 7 | Guest Memory Map | Cocktail / Dinner | Emotional / Romantic |
| 8 | The Live Roast Board | Dinner / Speeches | Funny |
| 9 | Unpopular Opinions Icebreaker | Cocktail Hour | Funny / Social |
| 10 | First Dance Reveal Ballot | Dinner | Funny / Romantic |
| 11 | Custom Wedding Bingo | All Day | Funny |
| 12 | The Guest Advice Oracle | Dinner | Emotional / Social |
| 13 | Relationship Origin Story Exhibit | Cocktail Hour | Romantic / Emotional |
| 14 | Design Our Future Home Map | Dinner | Romantic / Social |
| 15 | The Collaborative Soundtrack | Dinner / Dancing | Emotional / Social |
| 16 | The Unprompted Love Letter Machine | Speeches | Emotional (**demo app**) |
| 17 | Wedding Day Emotion Pulse | All Day | Emotional / Keepsake |
| 18 | Table-to-Table Secret Relay | Cocktail / Dinner | Funny / Social |
| 19 | The Personalized Cocktail Quiz | Arrival / Cocktail | Funny / Social |
| 20 | The Parallel Universe Game | Dinner / Speeches | Funny / Emotional |

---

## Two Homepage Demos (both frontend-only)

**Demo A — #16 The Unprompted Love Letter Machine.** The primary demo. Three-frame sequence: guest phone → admin/moderation tablet → full-bleed TV reveal. Sells the "grandma's message on the big screen" moment and shows all three surfaces of a live-night product in one flow.

**Demo B — Who Said It?** Guess which partner said each quote. Faster, funnier, lower-emotional-stakes counterweight to the Love Letter Machine — proves the range of the studio without a second commitment from the visitor.

Both are pure client-side simulations. No backend, no data collected.

---

## The Moodboard Wizard *(new)*

`/moodboard` is a 6-step brief-builder for couples who don't know which app they want. It replaces the "stare at 20 tiles and guess" failure mode with a guided conversation, then hands the couple a personalized shortlist and (optionally) emails us the brief.

**Steps:** Vibes → Guests → Moments → Feelings → Story → Wildcard. Each step is optional-freeform-friendly; nothing gates progression.

**How the match works:**
- Answers are POSTed to `/api/moodboard/match`.
- OpenRouter → **Claude Haiku 4.5** returns a top matches list, a "hidden matches" list (apps the couple wouldn't have picked but fit their story), and a three-word summary of the vibe.
- Schema-validated JSON with a hard-coded fallback response if the model misbehaves.
- Cheap in-memory IP rate limit (10/hr, per instance).

**Persistence & delivery:**
- LocalStorage autosave with a 30-day TTL and a resume banner.
- "Talk to us" pill always visible for couples who'd rather skip the wizard.
- Email-gated brief delivery via `/api/moodboard/brief` — dual send (studio inbox + confirmation to the couple), **no server-side persistence** by design. A retention opt-in toggles a `KEEP` tag in the studio email's subject instead of writing to a store.
- Shareable `?brief=` URL is generated but **not yet consumed on load** — round-trip is a known gap.

**Why it matters to the pitch:** the moodboard is the low-commitment on-ramp for couples who love the idea but freeze at the catalog. It also feeds the studio a warm, structured brief before the first sales conversation.

---

## The Demo App: #16 — The Unprompted Love Letter Machine

Selected because:
- Guest phone use is five minutes, once — then they watch the live screen together
- The payoff moment (couple reads messages live, in front of everyone) is entirely communal
- The "we need this" realization is immediate when couples imagine it
- Three distinct interfaces (guest phone → admin queue → big screen) show the full product in sequence
- Grandma's message scenario closes the sale

**Landing page demo sequence:** guest phone frame → admin/moderation tablet frame (brief, trust signal) → full-bleed TV frame (the reveal moment). Interactive simulation (no backend needed).

---

## Ideal Customers

### Primary: The Couple
- 27–38, dual-income, $100k+ household, already spending $20k–$60k on the wedding
- Describes their wedding as "very us" / "not typical"
- Experiences-over-things buyer, design-aware, cares about guest experience
- Guest list: **60–200 people** (sweet spot)
- Triggered by the "that would be so us" moment
- Blocked by: price (resolved by reframe), fear of non-participation, worry about tech failure

### Secondary: Wedding Planners
- Specializing in destination, luxury, or design-forward weddings
- Influence 3–10 wedding purchases per year
- Want zero extra work, no download requirement, and something that reflects well on them
- Hesitate because the category doesn't yet exist in their vocabulary
- Served by a dedicated `/planners` page and by cold-email templates in `distribution/cold/`

---

## Key Objections + Answers

| Fear | Answer |
|------|--------|
| "Guests won't use it" | Even 30% participation fills the wall. The MC announcement drives the first wave. |
| "Older guests will be confused" | No download, no login. QR → browser. Designed for grandparents. |
| "What if it breaks?" | We test before handoff. We deploy it. We're reachable on the day. |
| "Is $2,000 worth it?" | Flowers cost $800 and die by morning. This lasts forever. |
| "Is this just Kahoot?" | Kahoot doesn't know how you met. Every question is yours. |
| "Do I have to run it?" | No. QR-ready handoff. MC makes one announcement. Moderation takes 2 seconds per decision. |
| "I don't know which app I want" | Take the 6-step moodboard — we'll match you and email a brief. |

---

## Price Framing

> Flowers: $800. Dead by morning.
> Photographer: $3,500. Guests don't see it for 6 weeks.
> Caterer: $5,000+. Forgotten by Tuesday.
> **Wepho: $2,000. Every guest participates. You keep it forever. They talk about it for years.**

---

## Non-Negotiable Product Rules

1. **No app install for guests.** QR → mobile browser only.
2. **Moderation is always included.** Every live submission goes through couple/MC approval before the wall.
3. **The app is locked to event day.** Access via QR, active for one night — makes it feel special, not like a subscription.
4. **Every app ships with a keepsake output.** PDF, video compilation, emotion graph, or formatted document — something the couple keeps.

---

## Website Structure

- **`/`** — Main landing page (couples). Demo-forward: hero, story beats, two demos (Love Letter Machine + Who Said It?), 6-card gallery teaser, HowItWorks, SixRules, PaperReframe, PlannersCallout, FinalCta.
- **`/planners`** — Dedicated marketing page for wedding planners.
- **`/apps`** — Filterable gallery of the live app types (vibe + moment).
- **`/apps/[slug]`** — Individual marketing page per app, following the 7-section structure (Hero, Scene, How It Works, Big Screen, Is This You, Book It, FAQ). 13 live today.
- **`/moodboard`** — 6-step brief wizard with LLM matching and email-gated brief delivery. *(new)*
- **`/blog`** + **`/blog/[slug]`** — 33 blog stubs, all currently `draft: true` (index badge + per-post `noindex,nofollow`). *(new — outlines only)*
- **`/privacy`**, **`/terms`** — legal. *(new)*
- **`/dev/phone/[slug]`** — internal screenshot helper (currently ungated in prod).

**LP wow factors:**
- Two interactive demos back-to-back (Love Letter Machine + Who Said It?)
- Vibe-filter gallery ("Make them laugh", "Make them cry", "Get them talking", "Create a keepsake", "Stop the room")
- Moodboard entry point for undecided couples

**SEO is important** — individual app pages and blog posts should be more wordy than pure conversion pages. Every route exports `generateMetadata`; sitemap includes apps and blog posts; `robots.js`, `public/llms.txt`, and `public/llms-full.txt` are hand-maintained from `data/apps.js` and `data/posts.js`.

---

## Distribution Kit *(new)*

Not part of the shipped site, but a first-class part of the project. Under `distribution/`:
- **Platforms overview** and Pinterest pin drafts (39, generated from live apps)
- **Reddit** post drafts + subreddit rules
- **Planner cold-email templates** and a ZoomInfo scraping runbook
- **Blog plan** — 33 essay outlines with a republish checklist
- **SEO keyword research** — enriched shortlist, keyword→page map, internal linking plan, FAQ bank
- **AI-SEO plan** — per-route LLM-visibility audit, 60 probe questions, DataForSEO probe runbook

---

## Tech Stack

- **Next.js 16** (App Router), **React 19**, **JavaScript only** (no TypeScript)
- **Tailwind CSS v4** with CSS-first tokens in `app/globals.css` as the source of truth; `<Container>` + `.section-py` rhythm enforced by CLAUDE.md
- **pnpm**, deployed on **Vercel**
- Server components by default; `'use client'` reserved for moodboard wizard, demos, consent banner, and interactive hooks
- Static generation for `/apps/[slug]` and `/blog/[slug]` via `generateStaticParams`
- **Moodboard matching:** OpenRouter → Claude Haiku 4.5, schema-validated, fallback response, per-instance IP rate limit
- **Mail:** Nodemailer / SMTP (`lib/mailer.js`) — shared by `/api/contact` and `/api/moodboard/brief`; brief route intentionally does not persist answers
- **GDPR consent:** region-aware banner + preferences modal, localStorage store with pub/sub, essential/analytics/marketing categories (currently gates nothing — SDKs not yet wired to it)
- **Analytics:** thin `trackEvent` shim over Vercel Analytics `window.va` (PostHog planned but not connected)
- **Data:** checked-in JS objects — `data/apps.js`, `data/posts.js`, `data/faqs.js`, `data/hidden-ideas.js`. No CMS, no DB.

---

## Design System

Inspired by [pitch.com](https://pitch.com) — clean, modern, confident SaaS aesthetic adapted for a premium wedding studio.

- **Font:** Default browser font (system-ui stack, no external load)
- **Accent color:** Purple `#6B5CE7`
- **Backgrounds:** White `#FFFFFF` / Off-white `#F7F6F3` / Near-black `#111111`
- **Secondary palette:** Rose `#F24E78` · Amber `#F8A324` · Teal `#36C5F0` · Green `#2EB67D` · Coral `#F87162`
- **Philosophy:** Bold not loud. Premium confidence. Warmth within precision. Motion as feedback.
- **Nav:** Fixed, transparent → frosted glass on scroll
- **Animations:** Intersection-observer scroll reveals, staggered card entrances, hover lift/scale

---

## Brand Voice

Warm. Specific. Confident without being loud. Like a brilliant friend who happens to build things.

**The one rule:** Specificity creates believability. Don't write "a trivia game about your relationship." Write "a trivia game where every question is about how you actually met, who proposed first, and what she said when he did."

The implicit subtext of every headline: *Generic tools don't know who you are.*

---

## The Core Tension (and Resolution)

Weddings are about presence. Apps are about screens. This tension is real.

The resolution: the app *creates* connection that wouldn't otherwise exist. When it works, guests aren't staring at phones alone — they're laughing together at the projector screen, comparing bingo cards, debating parallel universes. The phone is the input device. The room is the output.

**The app earns its place by making the room more alive, not by adding a screen.**

---

## Known Gaps (be honest in the pitch)

- Only **13 of 20** app types have live per-app pages; copy still references "all 20" in places.
- Moodboard `?brief=` share URL is generated but not restored on load.
- All 33 blog posts are drafts (`noindex,nofollow`).
- Photography is placeholder SVG behind `dangerouslyAllowSVG` — real photos not yet swapped in.
- Consent categories exist but no analytics/marketing SDKs consult them yet.
- No tests, no type checking; brief email HTML is built via string interpolation (XSS/header-injection risk in the studio's own inbox) — worth cleaning up before scale.

*Full detail lives in `repo-snapshot-description-24aug.md`.*

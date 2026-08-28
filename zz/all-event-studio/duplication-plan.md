# Duplicating Wepho into an All-Event Studio Landing Page

Goal: stand up a second landing page (same production quality) that sells the same custom-app-for-your-event model across multiple event niches — not only weddings. Two flavors possible:

- **A. Umbrella site** — one brand covering many event types (`/weddings`, `/birthdays`, `/mitzvahs`, `/corporate`, …).
- **B. Per-niche clones** — one brand + site per niche, each a near-fork of Wepho.

This plan covers both. Default recommendation is **A** for MVP (single codebase, cheaper to run, SEO leverage across niches) and clone-out into **B** only for niches that prove out (corporate almost certainly wants its own brand).

See sibling doc `other-event-studio-equivalents.md` for the niche list and per-niche notes.

---

## 1. What to Reuse (copy as-is or with cosmetic edits)

Fork the repo (`git clone` or new repo initialized from a copy). Keep the following intact:

**Infrastructure & config**
- `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.js`, `jsconfig.json`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `app/globals.css` (design tokens — the source of truth)
- `app/layout.js`, `app/sitemap.js`, `app/robots.js`, `app/api/contact/` (rename SMTP sender label only)
- `scripts/`, `tests/` scaffolding
- `.gitignore`, Dockerfile / deploy config (whatever ships prod)

**Design system & primitives**
- `components/layout/` — `Container`, `NavBar`, `Footer` (nav items change; component stays)
- `components/ui/` — every primitive (AppCard, ContactForm, PhotoBackdrop, buttons, badges, etc.)
- `components/demo/` device frames (`PhoneFrame`, `BigScreenFrame`, `AdminFrame`) — event-agnostic
- `hooks/` — all scroll/parallax/reveal hooks
- `lib/` — slug helpers, generic utilities (audit for wedding-specific strings)

**Patterns to reuse (structure, not content)**
- Per-app marketing page template under `components/app-page/` (7-section structure from `zz/info/mkting-page-structure-shorter.md`)
- Homepage section composition pattern under `components/sections/`
- SEO pattern: `generateMetadata` per route, auto-sitemap
- Contact-form → `POST /api/contact` → Nodemailer flow
- Moodboard wizard (`components/moodboard/`, `app/api/moodboard/`, `lib/moodboard/`) — the whole "help me pick apps" flow reuses; the underlying app catalog + brief prompts are what change

**Reference docs worth keeping (as templates to rewrite)**
- `architecture.md`, `decisions.md`, `CLAUDE.md`, `zz/styling/*`, `zz/info/mkting-page-structure-shorter.md`, `zz/one-pager.md`
- Keep, then duplicate-and-rewrite per niche.

---

## 2. What Must Change

### 2.1 Data model — the single biggest refactor

Wedding assumes a **couple** (two named people). Every other niche assumes a single **honoree**, an **organization**, or a **group**. Generalize before you fork copy.

- Rename `couple` / `partners` → `honoree(s)` with a `type` discriminator (`couple`, `person`, `family`, `org`, `group`).
- `data/apps.js` gains an `eventTypes: []` field per app so the gallery/filter can slice by event.
- Moodboard wizard prompts (`components/moodboard/steps/*`) currently ask couple-shaped questions ("how you met", "who proposed") — split into per-event-type step variants sharing a common wizard shell.
- Brief-store schema (`lib/moodboard/briefStore.js`) needs a `eventType` field.

### 2.2 App catalog

- `data/apps.js` currently has 20 wedding apps. For all-event, add app variants tagged per event type. Some transfer 1:1 (Message Wall, Who Said It), some need a new frame (Love Letter Machine → "Note to the Birthday Kid" / "Message to Grandma"), some are wedding-only (first-dance moments) and get hidden per event.
- Recommended: keep one file, add `eventTypes` + optional per-event `title`/`description` overrides. Filter in the gallery.

### 2.3 Routes & IA (Option A umbrella)

```
app/
  page.js                        homepage — event-type picker up top, then generic value prop
  weddings/page.js               niche landing
  birthdays/page.js              niche landing
  mitzvahs/page.js               niche landing
  corporate/page.js              niche landing (or spin out into B)
  memorials/page.js              niche landing (sober rewrite)
  apps/page.js                   full catalog with event-type + vibe + moment filters
  apps/[slug]/page.js            per-app page, event-aware
  planners/page.js               keep (weddings), add /organizers or /event-pros equivalents
```

Each niche page reuses homepage sections with different copy props. Build sections to accept `eventType` and swap copy blocks from a single content module (`content/{eventType}.js`).

### 2.4 Copy — full rewrite per niche

Never reuse wedding copy verbatim. Rewrite:

- Hero headline/subhead
- Brand voice examples (specificity rule still applies)
- App titles & descriptions where the wedding metaphor breaks
- Pricing anchor (`~$2k` may be wrong — see per-niche notes)
- Testimonials/social proof (must be niche-appropriate)
- Planner/organizer channel language
- ICP framing (`zz/info/uvp-icp-etc.md` — fork per niche)
- Emotional-driver doc (`zz/info/key.md` — fork per niche)

Extract all user-facing strings on the homepage into a `content/` module so per-niche pages just import a different content object.

### 2.5 Photography

- `public/images/` is wedding-specific. Build a parallel `public/images/{eventType}/` tree.
- `photo-plan.md` needs a per-niche version — commission or source stock per event.
- `PhotoBackdrop` and any image-mapped section should accept a photo set as a prop.

### 2.6 Demos

The homepage runs two demos (Love Letter Machine, Who Said It). Both are couple-shaped.
- **Who Said It** generalizes trivially (any two-or-more people).
- **Love Letter Machine** needs re-theming per event ("Note to the birthday kid", "Memory of the honoree", "Message to the team"). Same component, different copy + prompts.
- Add a demo picker or rotate demos per niche landing.

### 2.7 SEO

- Every new route needs `generateMetadata` with niche-appropriate title/description.
- `app/sitemap.js` — extend to enumerate niche pages and per-event `/apps/[slug]` combinations if you go that route (watch for thin-content duplication; canonicalize).
- Keyword lists under `distribution/seo/` are wedding-only — duplicate and re-research per niche.

### 2.8 Tone-sensitive niches (memorials, mitzvahs)

- Memorials: strip all gamification language, no leaderboards, no "fun", no emojis in copy, no confetti animations. Fork the design system's motion tokens if needed to dial down.
- Mitzvahs/teen events: add moderation controls; parental-consent copy in the form; culturally specific imagery.

### 2.9 Legal & ops

- Terms/privacy pages need niche-specific rewrite (funeral homes and corporate especially).
- Contact form's SMTP `from` address, lead-routing rules, CRM tags.
- Pricing page — remove or rewrite per niche.

---

## 3. Phased Plan

**Phase 0 — Decide umbrella vs. clones (1 day)**
Pick Option A or B. If B, decide first niche (recommend Anniversaries — thinnest fork).

**Phase 1 — Refactor Wepho in place to be event-type-aware (3–5 days)**
Do this in the current repo before forking, so both codebases inherit the generalization:
- Extract homepage copy into `content/weddings.js`.
- Add `eventType` prop threading through sections.
- Generalize `couple` → `honoree` in the moodboard brief store and wizard steps (behind a compatibility layer if needed).
- Add `eventTypes: ['wedding']` to every entry in `data/apps.js`.

**Phase 2 — Fork or branch (1 day)**
Option A: new branch on same repo, new routes.
Option B: `git clone` into a new repo, rename package, swap brand tokens, redeploy target.

**Phase 3 — First non-wedding niche end-to-end (1–2 weeks)**
Pick Anniversaries or Milestone Birthdays. Deliver:
- Niche landing page with rewritten copy
- Filtered app catalog
- One re-themed demo
- Photography set
- Contact form routing
- SEO metadata + sitemap entry

**Phase 4 — Second & third niches (each ~3–5 days)**
Once the content-module + filtered-catalog pattern is proven, each new niche is mostly a copy + photo + SEO exercise.

**Phase 5 — Spin out high-value niches into their own brands (as needed)**
Corporate almost certainly warrants B (different buyer, different price, SOC2 pressure). Memorials likely too (tone + partnerships with funeral homes).

---

## 4. File-by-File Copy Checklist (if forking to a new repo)

Copy verbatim:
- `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.js`, `jsconfig.json`
- `package.json` (rename `name`), `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `app/globals.css`, `app/layout.js`, `app/sitemap.js`, `app/robots.js`
- `app/api/contact/` (retarget SMTP env vars)
- `components/layout/`, `components/ui/`, `components/demo/`
- `hooks/`, `lib/` (audit strings)
- `scripts/`, `tests/`
- `.gitignore`, Dockerfile, deploy configs

Copy then rewrite:
- `app/page.js` and everything under `components/sections/`
- `components/app-page/` (structure keeps, copy rewrites)
- `data/apps.js` (add `eventTypes`, retitle where needed)
- `components/moodboard/` (generalize honoree, rewrite step prompts)
- `CLAUDE.md`, `architecture.md`, `decisions.md`, `README_for_human.md`
- `zz/info/*`, `zz/styling/design-system.md` (fork per niche)

Do not copy:
- `public/images/` (build fresh)
- `distribution/seo/` (research per niche)
- Wedding-specific blog posts, planner outreach lists
- `blotter.md`, `CHANGELOG.md`, per-project todos

---

## 5. Risks & Watch-Outs

- **Content debt** — spinning up 5 niches × 20 apps = 100 marketing pages. Templatize aggressively; don't hand-author each.
- **Brand dilution** — an umbrella "any-event-app studio" may feel less credible than "the wedding-app people". Weigh SEO leverage vs. positioning strength.
- **Data-model debt** — if you skip Phase 1 and fork first, you'll refactor `couple` → `honoree` twice.
- **Demo mismatch** — the wedding demos carry a lot of the homepage's magic. Budget time to design a demo that lands emotionally in each niche, not just re-labeled.
- **Ops sprawl** — each niche adds a lead inbox, an SMTP identity, an analytics view. Centralize before the second niche ships.

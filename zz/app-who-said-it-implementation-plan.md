---
name: Who Said It? — Implementation Plan
description: Step-by-step build plan for Claude Code to implement the LP enhancements and full /apps/who-said-it page based on zz/app-who-said-id-full-display-v1.md.
---

# Who Said It? — Implementation Plan

Source docs:
- `zz/app-who-said-id.md` — original user notes
- `zz/app-who-said-id-full-display-v1.md` — display plan (LP + app page structure, copy suggestions, improvement notes)
- `zz/lp-v3-suggestions.md` — LP v3 context (why Who Said It? is the second demo)

This plan converts those docs into concrete build steps. Each step names files, describes changes, and can be executed independently.

---

## Prerequisite decisions (ask the user first)

Two things need a call before starting:

### D1 — Which app slug does "Who Said It?" occupy?

The current `zz/info/20-apps.json` slug #14 is **`future-home-map`**, not Who Said It?. But `zz/lp-v3-suggestions.md` refers to Who Said It? as "app #14" throughout, and the LP demo already exists (`components/demo/WhoSaidItDemo.js` + `components/sections/DemoSectionTwo.js`).

Pick one:
- **D1a (recommended):** Add `who-said-it` as a **new 21st app** in `20-apps.json`. Keep `future-home-map` as-is. Slug = `who-said-it`. Simpler, non-destructive.
> ok
- **D1b:** Replace `future-home-map` (id 14) with `who-said-it`. Reserves the "app #14" identity that `lp-v3-suggestions.md` assumes. Destructive to the future-home-map data.

Default this plan to **D1a** unless the user says otherwise.

### D2 — Should "Make it yours" be Who-Said-It-only or reusable across all app pages?

Per `zz/app-who-said-id-full-display-v1.md` § 5.2 item 9, the "anything is possible" framing arguably belongs on **every** app page.

Pick one:
- **D2a (recommended):** Build `AppMakeItYours.js` as a **reusable component** driven by data in `apps.js`. Wire it into `app/apps/[slug]/page.js`. For app pages without custom swap examples in data, it renders a generic fallback.
- **D2b:** Build a one-off `AppMakeItYoursWhoSaidIt.js` first, refactor later.

Default this plan to **D2a**.

---

## Phase 1 — LP enhancements (small, additive)

The demo already ships. This phase adds three small pieces per `zz/app-who-said-id-full-display-v1.md` § 2.

### Step 1.1 — Add closing micro-caption below the demo
**File:** `components/sections/DemoSectionTwo.js`
**Change:** After `<WhoSaidItDemo />`, add one line inside the section container:

> *On the night: 20 messages, chronological. Side-vs-side scoring on the big screen. One passkey-locked round the parents don't get to see.*

Style: centered, `var(--text-body)`, `var(--color-text-muted)`, `max-width: 640px`, top margin `var(--space-8)`.

**Why:** Implies volume + structure + big-screen mechanic + spicy round in one sentence, without expanding the demo footprint (§ 2c of display plan).

### Step 1.2 — Add locked "spicy round" tile at the end of the demo
**File:** `components/demo/WhoSaidItDemo.js`
**Change:** In the `done` state (currently renders "You're done" card at line 74–129), add a small locked tile below the "Play again" button:

- Small card, dashed border (`var(--color-border-strong)`), muted background
- Padlock glyph or `🔒`
- Text: *"Spicy round · code required"*
- Sub-line: *"On the night, only the friends' tables get the code."*
- No click handler — purely decorative

**Why:** Implies the spicy round exists without building it (§ 2b of display plan).

### Step 1.3 — Add family-vs-family static leaderboard mock in the `done` state
**File:** `components/demo/WhoSaidItDemo.js`
**Change:** Also in the `done` state, insert a mocked-up big-screen leaderboard card **before** the "22 seconds and laughed twice" line:

- Header: *"…and this is what your wedding guests would see:"*
- Three horizontal bars labeled **His Side**, **Her Side**, **Mutual**, with fake scores (34 / 31 / 28) and animated bar widths on mount
- Small line below: *"🔥 Aunt Denise: 5 in a row"*
- Uses `BigScreenFrame` if it fits, otherwise a lightweight inline mock

**Why:** Lands the "screen event" promise concretely (per `lp-v3-suggestions.md` § 3b: *"a 'and this is what your wedding guests would see' flourish"*).

### Step 1.4 — Verify LP demo copy still matches display plan § 2c
**File:** `components/sections/DemoSectionTwo.js`
**Change:** Compare current heading + subhead against `lp-v3-suggestions.md` § 3b — should already match. No edit needed unless drift is found.

---

## Phase 2 — Data model & routing

Prepares the data layer for the new sections. Nothing user-visible ships in this phase alone; it unblocks Phase 3.

### Step 2.1 — Add `who-said-it` entry to `zz/info/20-apps.json`
**File:** `zz/info/20-apps.json`
**Change (assuming D1a):** Append a new object to the `apps` array with:
- `id: 21`
- `slug: "who-said-it"`
- `title: "Who Said It?"`
- `tagline: "Guess the sender. Loser buys the next round."`
- `description: "A live guessing game: real texts and photos from your relationship, blurred sender, guests vote his side vs her side vs mutual friends."`
- `vibes: ["make-them-laugh", "stop-the-room"]` *(match existing vibe slug format in file)*
- `moments: ["dinner"]` *(match existing moment slug format)*

**Verify:** other objects in the file for exact key names — copy the shape, don't invent.

### Step 2.2 — Extend `emptyExtended` template in `data/apps.js`
**File:** `data/apps.js` (around line 830)
**Change:** Add new keys to `emptyExtended`:
```js
const emptyExtended = {
  hero: {},
  scene: '',
  howItWorks: {},
  bigScreen: '',
  isThisYou: [],
  faq: [],
  questionTypes: [],      // Who Said It? section 5
  scoreboard: null,       // Who Said It? section 6
  chronology: null,       // Who Said It? section 7
  setupEffort: null,      // Who Said It? section 10
  makeItYours: null,      // reusable across all apps
  whyNotPaper: null,      // already used by AppWhyNotPaper — confirm shape
}
```

**Verify:** grep `data/apps.js` and `components/app-page/AppWhyNotPaper.js` for the existing `whyNotPaper` shape and match it exactly.

### Step 2.3 — Add extended content for `who-said-it` in `data/apps.js`
**File:** `data/apps.js`
**Change:** Add a new key `'who-said-it': { ... }` inside `extendedContent`. Populate with copy from `zz/app-who-said-id-full-display-v1.md` § 3 — every section that has copy:

- `hero.headline` — *"The room votes. The couple squirms. Grandma wins."*
- `hero.subhead` — *"20 real texts and photos from your relationship. Blurred sender. Your guests guess — his side vs her side vs the people who introduced you."*
- `scene` — narrative paragraph (draft from § 2 of display plan)
- `howItWorks` — three columns (§ 3 of display plan)
- `bigScreen` — the § 4 caption + a description of the mock content
- `isThisYou` — three bullets (§ 8 of display plan)
- `whyNotPaper` — honest verdict copy (§ 9 of display plan) — match existing shape in `AppWhyNotPaper`
- `questionTypes` — array of 5 tile objects: `{ title, description, mockup? }` (§ 5 of display plan)
- `scoreboard` — `{ threeWay: [His/Her/Mutual mock scores], individualNote, subLeaderboardsNote }` (§ 6 of display plan)
- `chronology` — `{ headline, description }` (§ 7 of display plan)
- `setupEffort` — `{ timeFromYou, weHandle, optional }` (§ 10 of display plan)
- `makeItYours` — `{ intro, swaps: [content, flow, reveal, bigScreen], examples: [sitcom couple, group-chat couple], tagline }` (§ 9b of display plan)
- `faq` — 4 items (§ 11 of display plan; app-specific)

**Copy source:** verbatim from `zz/app-who-said-id-full-display-v1.md` where quoted. Where the display plan is abstract, adapt in the same voice.

---

## Phase 3 — New reusable app-page components

Each of these is a self-contained React component in `components/app-page/`. Server components (no `'use client'`) unless they need interactivity — most are pure presentational.

### Step 3.1 — `AppMakeItYours.js`
**File (new):** `components/app-page/AppMakeItYours.js`
**Purpose:** Reusable section — the "custom = anything is possible" framing.
**Props:** `{ app }`. Reads `app.extended.makeItYours`.
**Renders:**
- Section heading: *"Make it yours"*
- Intro paragraph (from `intro`)
- Grid of 4 "swap" cards (content, flow, reveal, big-screen) — each with a title and one line
- 2 real-couple example blurbs
- Small tag line at the end

**Fallback:** if `app.extended.makeItYours` is null/empty, render a generic version:
> *"This is one starting point. Because we build every Wepho app from scratch for one couple, every element on this page is negotiable — content, flow, mechanics, big-screen design. Bring us your version."*

**Style:** matches existing app-page section conventions (see `AppWhyNotPaper.js` for pattern).

### Step 3.2 — `AppQuestionTypes.js`
**File (new):** `components/app-page/AppQuestionTypes.js`
**Purpose:** Who-Said-It-specific — shows the 5 tiles for texts / photos / spoken quotes / bonus layers / spicy round.
**Props:** `{ app }`. Reads `app.extended.questionTypes`.
**Renders:** grid of tiles (2×2 + 1 wide "spicy" card styled with lock icon), each with a small phone-frame mockup on top and 1–2 sentence caption below.
**Guard:** if `questionTypes` empty, section returns `null`.

### Step 3.3 — `AppFamilyScoreboard.js`
**File (new):** `components/app-page/AppFamilyScoreboard.js`
**Purpose:** Who-Said-It-specific — the three-way family-vs-family leaderboard visual.
**Props:** `{ app }`. Reads `app.extended.scoreboard`.
**Renders:**
- Full-width mocked big-screen leaderboard (reuse `BigScreenFrame` from `components/demo/` if it fits)
- Three horizontal bars: His / Hers / Mutual (mock scores from data)
- Individual leaderboard inset (top 5, mocked)
- One-line copy from data
- Sub-leaderboards micro-detail

**Guard:** if `scoreboard` null, section returns `null`.

### Step 3.4 — `AppChronology.js`
**File (new):** `components/app-page/AppChronology.js`
**Purpose:** Who-Said-It-specific — the chronological arc of messages.
**Props:** `{ app }`. Reads `app.extended.chronology`.
**Renders:**
- Section heading
- Horizontal timeline / stacked timeline mock showing message 1 → message 20 with year labels
- Descriptive sentence

**Guard:** if `chronology` null, section returns `null`.

### Step 3.5 — `AppSetupEffort.js`
**File (new):** `components/app-page/AppSetupEffort.js`
**Purpose:** Who-Said-It-specific — the honest disclosure of setup time/content requirements.
**Props:** `{ app }`. Reads `app.extended.setupEffort`.
**Renders:**
- Section heading: *"What we'll need from you"*
- Three grouped stats: Time from you · We handle · Optional
- Plain, tight typography — this is the "no surprises" section

**Guard:** if `setupEffort` null, section returns `null`.

---

## Phase 4 — Wire the new sections into the app page

### Step 4.1 — Import & compose in `app/apps/[slug]/page.js`
**File:** `app/apps/[slug]/page.js`
**Change:** Import the 5 new components and insert them in this order (matches display plan § 3):

```
AppHero
AppScene
AppHowItWorks
AppBigScreen
AppQuestionTypes        ← new
AppFamilyScoreboard     ← new
AppChronology           ← new
AppIsThisYou
AppWhyNotPaper
AppMakeItYours          ← new (reusable)
AppSetupEffort          ← new
AppBookIt
AppFaq
```

**Why this order:** big-screen mock lands the app first (recommendation from § 6 open questions), question types + scoreboard + chronology fuel it, then IsThisYou / WhyNotPaper qualify the reader, MakeItYours flips to custom framing, SetupEffort sets expectations, then close with BookIt + Faq.

### Step 4.2 — Guard: new sections render `null` for apps without their data
Since each new section returns `null` when its data field is missing, other `/apps/[slug]` pages continue to render correctly. Verify by loading (mentally) at least one other slug — e.g. `couple-trivia`. Only the reusable `AppMakeItYours` falls back to generic copy; the four app-specific sections stay hidden.

---

## Phase 5 — SEO + navigation wiring

### Step 5.1 — Verify sitemap picks up new slug
**File:** `app/sitemap.js`
**Change:** should auto-include `who-said-it` via `getAppSlugs()`. Confirm by reading and no code change needed if already dynamic.

### Step 5.2 — Confirm gallery lists new app
**Files:** `components/sections/AppGalleryTeaser.js`, `app/apps/page.js` (if it exists)
**Change:** if the gallery reads from `apps` in `data/apps.js`, `who-said-it` appears automatically. If it hardcodes a "best-of 8" list per `lp-v3-suggestions.md` § 4, add `who-said-it` to that list (it's a "yes/good" tier app).

### Step 5.3 — Metadata for `/apps/who-said-it`
Already handled by the `generateMetadata` function in `app/apps/[slug]/page.js` — it uses `app.title` and `app.description`. As long as those fields are populated in `20-apps.json` (Step 2.1), no code change needed.

---

## Phase 6 — Style / polish

Do these only after Phases 1–5 render end-to-end.

### Step 6.1 — Design tokens for the mocks
**File:** `zz/styling/design-tokens.css`
**Check:** confirm existing tokens cover the leaderboard bars, streak callout, and locked-tile styling. Add tokens only if needed for reuse across the demo and app page (not for one-offs).

### Step 6.2 — Responsive check
- LP demo footprint on mobile — the new leaderboard mock and locked tile in the `done` state must stack cleanly.
- App page: `AppQuestionTypes` grid must collapse to single column on mobile.
- App page: `AppFamilyScoreboard` must be readable on a phone.

### Step 6.3 — Motion
- Bar-fill animation in the LP leaderboard mock on mount (`~600ms ease-out`).
- Section reveals via existing `useScrollReveal` hook — apply to each new section.

---

## Phase 7 — Content review pass

After code is functional, re-read every user-facing string against `zz/app-who-said-id-full-display-v1.md`. Specifically:

- LP micro-caption (Step 1.1) verbatim from display plan § 2c.
- App page hero (Step 2.3) verbatim from display plan § 3.
- "Why not paper?" honest verdict is preserved — don't sand off the "80% of the way" line.
- "Make it yours" tagline: *"This app template exists because it works. Yours won't look exactly like it. That's the point."*

---

## Out of scope

Explicitly not built by this plan:
- Actual admin app, spicy-round passkey UX, real vote aggregation — those live in the *guest-facing wedding app*, which is out of scope per `CLAUDE.md`.
- Video demo of Who Said It? in action.
- Blog post series from `lp-v3-suggestions.md` § "Blog post plan" — separate task.
- The 6 other `/apps/[slug]` pages getting `AppMakeItYours` custom data. Reusable component ships now; per-app data is a follow-up.

---

## Execution order (TL;DR)

1. Ask user D1 + D2 (2 questions).
2. Phase 1: 4 small LP tweaks.
3. Phase 2: data model (JSON + `apps.js`).
4. Phase 3: build 5 new components.
5. Phase 4: wire them into `[slug]/page.js`.
6. Phase 5: verify sitemap + gallery.
7. Phase 6: polish.
8. Phase 7: content review.

Estimated size: Phase 1 is trivial (30 min). Phases 2–4 are the bulk (2–4 hours depending on component depth). Phases 5–7 are polish (1 hour).

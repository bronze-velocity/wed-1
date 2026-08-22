# Moodboard Feature — Technical Implementation Plan

**Route:** `/moodboard`  
**Stack:** Next.js App Router, React 19, Tailwind + CSS tokens, Claude API (Anthropic SDK)  
**Design constraints:** mobile-first wizard, photos where they elevate (scene/vibe imagery), illustrations otherwise (cards, icons, UI chrome), Claude matching, large hidden idea bank

---

## Architecture Overview

```
/moodboard                    ← route (page.js, client boundary at wizard shell)
  /api/moodboard/match        ← Claude matching endpoint
  /api/moodboard/brief        ← generates shareable brief (stores session)

components/moodboard/
  MoodboardWizard.js          ← shell: step state, progress, transitions
  steps/
    StepVibes.js              ← Category 1: scene tap-cards (photos)
    StepGuests.js             ← Category 2: guest profile tap-cards (illustrated)
    StepMoments.js            ← Category 3: timing checkboxes
    StepFeelings.js           ← Category 4: what they want to feel (illustrated)
    StepStory.js              ← Category 5: freeform quiz fields
    StepWildcard.js           ← Category 6: single-image energy pulse
  ui/
    TapCard.js                ← reusable: photo or illustrated selectable card
    FreeformField.js          ← animated label, placeholder hint, char soft-limit
    ProgressPulse.js          ← step indicator (dots, not a progress bar)
    BriefPreview.js           ← live sidebar/drawer showing brief building
    ResultCard.js             ← matched app display card
    HiddenTierBadge.js        ← "we don't usually show people these" section
  results/
    MoodboardResults.js       ← full results page composition
    ShareableBrief.js         ← the downloadable/linkable output card

lib/
  moodboard/
    signals.js                ← maps answers → signal object sent to Claude
    appCatalog.js             ← app + hidden-idea data formatted for Claude context
    prompts.js                ← Claude system prompt + user prompt builders
```

---

## Data Layer

### `lib/moodboard/appCatalog.js`

Pulls from `data/apps.js` (live apps) and a new `data/hidden-ideas.js` file. Each entry is normalized into a flat matching-context shape that Claude can reason over efficiently:

```js
{
  id: 'couple-trivia',
  title: 'Live Trivia',
  tier: 'standard',              // 'standard' | 'hidden'
  signals: {
    energy: 'high',              // low | medium | high
    storyDependency: 'high',     // how personal it needs to be
    participationStyle: 'active',// passive | mixed | active
    wowType: 'collective',       // individual | collective
    momentFit: ['dinner'],
    guestFit: ['mixed', 'large'],
    vibes: ['funny', 'stop-the-room'],
  },
  tagline: 'How well do your guests actually know you?',
  whyItFitsTemplate: '',         // Claude fills this per-match
  appPageSlug: 'couple-trivia',  // null for hidden ideas
}
```

### `data/hidden-ideas.js`

A dedicated file — not mixed into `data/apps.js`. Contains 15–20 ideas (not 4–5). Each has the same catalog shape but `tier: 'hidden'` and `appPageSlug: null`. Examples from the brainstorm plus additional:

- The Parallel Universe
- The Roast Draft
- The Table Treaty
- The Time Delay Message
- The Last Song Standing
- The Venue Oracle
- The Confession Wall
- The Guest Bracket
- The Secret Admirer (guests write one thing they've never told the couple)
- The Decade Playlist (guests tag a song to a year of the couple's timeline)
- The Wrong Opinion (guests submit their most controversial take; couple reacts live)
- The Prediction Market (guests bet fake currency on future couple milestones)
- The Origin Story (guests reconstruct how the couple met using only fragmented clues the couple wrote)
- The Family Tree Feud (Family Feud format but all questions are about the couple's families)
- The Before / After (guests describe what they thought the couple was like before they met them vs now)

also see : /home/zxc/Documents/code/win-repos/wed-1/zz/wed-apps/crazy-out-there-wedding-app-ideas.md

Hidden ideas unlock when `signals.adventurousness >= 2` OR `'something-nobody-has-seen'` is in feelings picks.

---

## Task Breakdown

---

### Task 1 — Route Scaffold + Wizard Shell
**Effort: ~2h**

- Create `app/moodboard/page.js` — exports metadata, renders `<MoodboardWizard />`
- `MoodboardWizard.js` is `'use client'`. Holds:
  - `step` (0–6) + `answers` state object
  - `direction` state for enter/exit animation direction
  - Step render via `steps[step]` array
  - `onNext(stepAnswers)` merges into `answers`, increments step
  - `onBack()` decrements step
  - Transition: CSS `transform: translateX` with a `useReducedMotion` fallback
- `ProgressPulse.js`: 6 dots, filled = visited, ring = current. No labels. Positioned top-center on mobile, top-right on desktop.
- Wire sitemap: add `/moodboard` to `app/sitemap.js`
- Add nav link ("Design your app" or "Find your app") to `NavBar.js`

---

### Task 2 — TapCard Component
**Effort: ~3h**

The most-used primitive. Two variants driven by props:

**Photo variant** (`type="photo"`, `src`, `alt`):
- 2:3 aspect ratio on mobile, fills card
- Full-bleed `next/image` with a gradient scrim at bottom
- Label text sits on top of the scrim, `var(--text-body-lg)`, white
- Selected state: `--color-accent` ring (3px inset), scale 1.02, checkmark badge top-right

**Illustrated variant** (`type="illustrated"`, `icon` JSX or emoji, `label`, optional `sublabel`):
- Solid `--color-bg-subtle` background
- Icon centered above label, sublabel in muted text
- Selected state: `--color-accent-light` background, accent ring, checkmark badge

**Shared behavior:**
- `onClick` toggles selected; parent controls `maxSelect` (1 or many)
- Keyboard accessible (role="checkbox" or role="radio" per maxSelect)
- Tap animation: 80ms scale-down on press, spring back
- On mobile: cards laid out in a 2-column grid, full-width if only one card in row

---

### Task 3 — Step Components (6 steps)
**Effort: ~6h total (~1h each)**

Each step receives `onNext(answers)`, `onBack()`, `initialValues`.

**StepVibes** — "What does your reception feel like?"
- 8 photo tap-cards, 2-col mobile grid, max-select 3
- Photos: editorial wedding-adjacent photography (dinner party, bonfire, gallery opening, pub quiz, rooftop, etc.) from `public/images/moodboard/vibes/`
- Each card has a 2–4 word scene label ("Dinner that got out of hand")
- CTA: "These feel like us →"

**StepGuests** — "Tell us about your people"
- 8 illustrated tap-cards, max-select all
- Plus one `FreeformField`: "Describe your guest list in one sentence"
- Illustrated: use a simple emoji + short label pattern to keep this step fast

**StepMoments** — "Which moments do you want to activate?"
- Checkbox tap-cards (all selectable), 1-col on mobile for readability
- Each has a moment name + 1-line description of the energy at that point in the night
- No photos — timeline context is more important than image

**StepFeelings** — "What do you want to feel the next morning?"
- 8 illustrated tap-cards, max-select 2
- Options from brainstorm: cry (good kind), everyone laughing, room feels like a show, strangers become friends, keepsake from everyone, something nobody's seen, our story is the main character, guests actually look up
- Bold, slightly larger type than StepGuests — these are emotional, not logistical

**StepStory** — "Tell us about you two"
- 5 `FreeformField`s shown one at a time (sub-wizard within the step: answer one → slide to next)
  - How did you meet? (one sentence)
  - What's a joke only your people would get?
  - What's the most "you" thing about your relationship?
  - If your wedding had a movie genre, what would it be?
  - What would make you say "that was so us" the next morning?
- Each field: animated floating label, soft character limit hint (not enforced), "Skip" link bottom-left
- This step's answers are the richest Claude input — handle gracefully if all skipped

**StepWildcard** — "One last thing — pick the image that feels like your reception"
- Single-select, 6 full-width stacked photo cards on mobile (large, immersive)
- Each photo is a mood image with no text label — they pick purely visually
- This is the final signal before results; make it feel ceremonial

---

### Task 4 — FreeformField Component
**Effort: ~1.5h**

- Animated floating label (transitions from placeholder position to top-left on focus/filled)
- Placeholder hint text in muted color (the example answers from the brainstorm)
- Soft limit: at 200 chars, counter appears bottom-right in accent color — not an error, just awareness
- Auto-grows with content (no fixed height)
- "Skip" link bottom-left, styled as `var(--text-sm)` muted — important for keeping momentum
- On mobile: field gets `fontSize: 16px` to prevent iOS auto-zoom

---

### Task 5 — Live Brief Preview
**Effort: ~2h**

A persistent panel that shows the brief being constructed as they complete steps.

- **Mobile:** collapsible drawer anchored to bottom of screen. Tab/handle at top shows "Your brief · N picks so far". Tap to expand. Auto-expands after Step 3.
- **Desktop (≥1024px):** fixed right column, `320px` wide, scrollable independently

Content:
- Couple's vibe picks (small versions of their selected photo cards)
- Guest descriptor (their freeform answer or selected cards)
- Moments (icon + label)
- Story answers (as they're entered, appear as styled quote-like lines)
- Smoothly animates new entries in with a fade+slide

Does not make the Claude call — purely a visual accumulator. The Claude call happens only on submit.

---

### Task 6 — Claude Matching API
**Effort: ~3h**

**Route:** `app/api/moodboard/match/route.js` (POST)

**Request body:**
```json
{
  "answers": {
    "vibes": ["dinner-that-got-out-of-hand", "rooftop-city-lights"],
    "guests": ["grandmother-life-of-party", "half-never-met"],
    "guestFreeform": "My college friends, her enormous Italian family, and 40 people I've never met",
    "moments": ["dinner", "after-dinner"],
    "feelings": ["everyone-laughing", "something-nobody-has-seen"],
    "story": {
      "howWeMet": "She sat next to me at a conference and corrected my wrong answer out loud",
      "insideJoke": "We call the third floor of our building 'the vortex' because nobody who goes up ever comes back down quickly",
      "mostUs": "We argue about the optimal route to every destination and she's always right",
      "movieGenre": "A Richard Linklater film that ends with someone crying on a staircase",
      "soUs": "One of her aunts cornering me to say she knew from the first time she saw us together"
    },
    "wildcard": "crowd-going-quiet-all-at-once"
  }
}
```

**Prompt structure** (`lib/moodboard/prompts.js`):
- System prompt: Wepho context, the app catalog as structured text, signal scoring rubric, instructions to return valid JSON only
- User prompt: the couple's answers formatted as a natural brief, asking Claude to:
  1. Score each app 0–100 for fit
  2. Select the top 3 standard apps and top 2 hidden ideas (if `feelings` includes `something-nobody-has-seen` or adventurousness score ≥ 2)
  3. For each selected app, write a 1–2 sentence "why this feels like you" explanation using specific details from their answers
  4. Generate the couple's 3-word reception summary (e.g. "Funny. Surprising. Yours.")
  5. Return structured JSON

**Response shape:**
```json
{
  "threeWords": "Funny. Surprising. Yours.",
  "matches": [
    {
      "id": "who-said-it",
      "tier": "standard",
      "score": 94,
      "whyItFitsYou": "Your guests already know the inside jokes — 'Who Said It?' gives them a way to prove it. Especially with half the room meeting each other for the first time, a shared laughing-at-the-same-thing moment is exactly what the dinner table needs.",
      "appPageSlug": "who-said-it"
    }
  ],
  "hiddenMatches": [
    {
      "id": "the-wrong-opinion",
      "tier": "hidden",
      "score": 88,
      "whyItFitsYou": "A room full of people who've never met and a couple with strong opinions? Let guests submit their most controversial take and have Jack and Simone react live. Instant chaos. Instant bonding.",
      "appPageSlug": null
    }
  ]
}
```

**Implementation notes:**
- Use `openai` npm SDK pointed at OpenRouter (`baseURL: https://openrouter.ai/api/v1`). OpenRouter is OpenAI-compatible — same SDK, different base URL and `OPENROUTER_API_KEY` env var. Required headers: `HTTP-Referer: https://wepho.com`, `X-Title: Wepho`.
- Model: `anthropic/claude-haiku-4-5-20251001` via OpenRouter (default, set `OPENROUTER_MODEL` env var to override). Swap to any other OpenRouter model string without code changes.
- Prompt caching: system prompt includes `cache_control: { type: 'ephemeral' }` in message content — OpenRouter passes this through to Anthropic on Anthropic models.
- Response validated server-side before returning — if model returns invalid JSON, retry once then return a graceful fallback set
- Rate limit by IP: 10 requests/hour (simple in-memory map — resets on cold start, acceptable for v1)
- No persistent storage in v1 — results live in client state; brief sharing uses URL encoding

---

### Task 7 — Results Page
**Effort: ~4h**

`MoodboardResults.js` receives the Claude response + the original answers. Composed of:

**Section 1 — The Three Words**
- Full-width, centered, large serif type
- Fade in on load, 400ms stagger
- Muted subline: "Based on what you told us." — no over-explaining

**Section 2 — "Apps that feel like you"**
- 2–3 `ResultCard` components, stacked vertically on mobile
- Each `ResultCard`:
  - App name + tagline
  - Claude's "why this feels like you" paragraph — this is the magic piece
  - A `PhoneScene` or `BigScreenScene` preview (reuse existing `appui` components, pull by `deviceScenes` from app data)
  - Two buttons: "See the full page →" (links to `/apps/[slug]`) + "Tell us you want this" (scrolls to email CTA)
- Soft entrance animation: each card slides up with 150ms stagger

**Section 3 — Hidden Tier** (conditional, only if `hiddenMatches.length > 0`)
- Dark background section, different type treatment
- Eyebrow: "We don't usually show people these."
- Subhead: "You picked something about wanting a moment nobody's seen before. So here are a couple of ideas we've never built."
- 1–2 cards: no phone preview (nothing to show), just the idea name, Claude's explanation, and a single CTA: "This one excites me →" (scrolls to email)
- The scarcity and novelty framing is load-bearing — don't dilute it

**Section 4 — Your Brief + Email Gate**
- A styled summary card: their three words + top picks + 2 story answers (whichever are most distinctive)
- Email field: "Send me a copy of this brief" — also the lead capture
- On submit: send brief to us via `/api/contact` variant, send copy to their email via Nodemailer
- Below: "Or copy a link to share with your planner" — generates a URL with answers base64-encoded in query params

---

### Task 8 — Shareable Brief URL
**Effort: ~1.5h**

No server-side storage needed in v1. Encode answers + Claude results as a compressed query param:

- `lib/moodboard/encode.js`: `btoa(JSON.stringify(data))` → gzip via CompressionStream API → base64url
- `/moodboard?brief=<encoded>` → on load, detect `brief` param, skip wizard, jump straight to results
- Limit: URL safe up to ~2KB (answers are compact). If over limit, truncate story fields with a warning.
- The shared page shows results only — no "edit answers" link (keeps the brief feeling definitive)

---

### Task 9 — Photography + Illustration Assets
**Effort: ~2h build + asset sourcing**

**Photos needed** (for StepVibes + StepWildcard):

StepVibes — 8 scene images (`public/images/moodboard/vibes/`):
- `dinner-party.jpg` — candlelit dinner, warm, slightly chaotic
- `film-premiere.jpg` — red carpet, evening, dressed up
- `pub-quiz.jpg` — low light bar, people leaning in
- `gallery-opening.jpg` — white walls, wine glasses, conversation clusters
- `bonfire.jpg` — outdoor night, warm light, relaxed
- `rooftop.jpg` — city lights, evening skyline
- `brunch.jpg` — morning light, lingering over coffee
- `kitchen-party.jpg` — house party, everyone ended up in the kitchen

StepWildcard — 6 mood images (`public/images/moodboard/wildcard/`):
- `candlelit-pan.jpg`
- `phone-in-dark.jpg`
- `crowd-goes-quiet.jpg`
- `everyone-points-at-screen.jpg`
- `someone-crying-at-table.jpg`
- `flash-mob.jpg`

**For illustrated cards:** no bespoke illustrations in v1. Use a consistent emoji + short label inside a styled card. Emoji renders well on all platforms and the card styling does the design work. If the product proves out, replace with custom spot illustrations.

---

### Task 10 — Mobile Polish Pass
**Effort: ~2h**

- Touch targets: all tap-cards min 48px tall, tap-card grid gaps ≥ 12px
- `font-size: 16px` on all inputs (prevents iOS zoom)
- `overscroll-behavior: contain` on wizard container (no page bounce mid-step)
- Brief preview drawer: use `touch-action: pan-y` on the handle, trap focus when expanded
- No hover states as primary affordances — all interaction states also work on touch
- Test at 375px (iPhone SE) and 390px (iPhone 14) viewport widths
- Wizard step height: `min-height: 100dvh` (dynamic viewport height for mobile browser chrome)
- Keyboard on mobile: wizard "next" CTA stays above keyboard using `position: sticky` + `bottom: env(safe-area-inset-bottom)`

---

### Task 11 — SEO + Metadata
**Effort: ~30min**

`app/moodboard/page.js` `generateMetadata`:
- Title: `"Design Your Wedding Reception App | Wepho"`
- Description: `"Answer a few questions about your couple and your guests. We'll match you to the reception experience that fits — including ideas we've never built for anyone else."`
- OG image: results card with the three-word summary (static placeholder until dynamic OG is worth the build)
- Add to sitemap with `priority: 0.8`
- `robots: index, follow` — this page should rank for "wedding app ideas," "wedding reception entertainment ideas"

---

## Build Order

```
1. Task 2 — TapCard (foundation for all steps)
2. Task 4 — FreeformField
3. Task 1 — Route scaffold + wizard shell
4. Task 3 — All 6 step components
5. Task 9 — Source/place photos + confirm illustrated card approach
6. Task 6 — Claude matching API + lib/moodboard/appCatalog + hidden-ideas.js
7. Task 7 — Results page
8. Task 5 — Live brief preview
9. Task 8 — Shareable brief URL
10. Task 10 — Mobile polish pass
11. Task 11 — SEO + metadata
```

---

## Open Decisions (already made, recorded here)

| Decision | Answer |
|---|---|
| Flow type | Wizard (one step at a time) |
| Image approach | Real photos where they elevate (vibes, wildcard), illustrated cards otherwise |
| Matching | Claude API (Haiku, with prompt caching) |
| Hidden ideas | Large bank (15–20), unlocked by signal score |
| Storage | No server storage in v1 — URL encoding for sharing |
| Lead capture | Email gate on brief download/share, not on starting the tool |
| Partner mode | Out of scope for v1 — data model should support merging two answer sets later |

---

## Rough Effort Total

| Task | Estimate |
|---|---|
| 1 — Scaffold | 2h |
| 2 — TapCard | 3h |
| 3 — Steps (6) | 6h |
| 4 — FreeformField | 1.5h |
| 5 — Brief preview | 2h |
| 6 — Claude API | 3h |
| 7 — Results page | 4h |
| 8 — Shareable URL | 1.5h |
| 9 — Assets | 2h |
| 10 — Mobile polish | 2h |
| 11 — SEO | 0.5h |
| **Total** | **~27.5h** |

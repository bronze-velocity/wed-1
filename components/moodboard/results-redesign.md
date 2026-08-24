# Moodboard Results — Redesign Proposal

Working notes for a nicer, more compressed results screen and a smarter way to build the payload behind it.

Two problems to solve:

1. **Layout.** The current results page is four stacked full-height sections (`ThreeWords` → `MatchedApps` → `HiddenTier` → `BriefEmailGate`). It feels padded, and the payoff — "here's what fits you" — is a scroll away from the reveal. We want a *one-screen* payoff that expands on demand.
2. **Match logic.** Right now the whole payload is one LLM call: three-words + matches + hidden matches + rationales, all in one JSON blob. That's hard to tune, hard to cache, and hard to fall back on. We can split responsibilities between deterministic ranking (fast, testable) and LLM copy (feels bespoke).

---

## Part 1 — Match logic

### Current

`POST /api/moodboard/match` sends the whole `answers` object to a single Claude call and asks for the full response shape in JSON. All of it — matching, ranking, three-words, per-app rationale, hidden apps — is model-generated.

Consequences:

- One prompt bug fails the whole page → we drop to `FALLBACK`.
- No way to validate that returned `id`s exist in our catalog without a second pass.
- Model rankings are opaque; can't A/B tune weights.
- Every render costs one model call, even when the picks are trivial (e.g. 3 vibes that clearly map to one app).

### Proposed: rank deterministically, narrate with the model

```
answers ─► scoreAllApps()  ─► top N + hidden shortlist  ─► LLM (copy only)
                │                                            │
                │                                            ▼
                └────────► deterministic score ─────► final payload
```

**Step A — scoring (pure JS, no model).** For each app in `data/apps.js` compute a score from the answers using a small rules table:

- vibe → app weight map (already implicit in `zz/info/20-apps.json` tags)
- guest-type → app weight (e.g. `grandparents-front-row` down-weights anything mic-heavy)
- moment → app weight (dinner apps vs. late-night apps)
- feeling → app weight (`cry-good-kind` up-weights keepsake apps; `everyone-laughing` up-weights Roast/Trivia)
- wildcard → single strongest signal (this is the tie-breaker)
- `seededApp` gets a large bias so planner/app-page entry points stay coherent

Store the table in `lib/moodboard/scoring.js`. Every rule is one line; every rule is unit-testable.

**Step B — pick.** Take top 3 by score for `matches`. From the remaining pool, if the top score is above a threshold *and* the user selected specific "unusual" answers (wildcard + `something-nobody-has-seen` + `keepsake-from-everyone`), promote 1 into `hiddenMatches`. Otherwise return `[]`.

**Step C — narrate.** Send the model:

- the 3 chosen app IDs + their canonical descriptions
- the user's raw answers (the story quotes matter here)
- the hidden pick, if any

Ask for **only** two things: `threeWords` (six words max, three sentences) and `whyItFitsYou` strings for each pick. It's a much smaller, easier prompt with much less that can go wrong. Response shape:

```json
{
  "threeWords": "Warm. Loud. Yours.",
  "rationales": {
    "who-said-it": "You told us grandparents are front row and college friends will be loud…",
    "couple-trivia": "…",
    "live-roast-board": "…"
  },
  "hiddenRationale": "…"
}
```

We already know the IDs and slugs from Step B, so we stitch the final payload server-side. Validation becomes trivial (`rationales[id]` exists for every chosen id).

**Step D — fallback graceful.** If the LLM call fails, we still have the scored picks — we just render *generic* rationales pulled from the app's `hero.subhead`. That's still a full, coherent results page, unlike today's hard-coded `FALLBACK`.

**Caching.** Because inputs are structured, we can hash `(sortedIds, storyKeysPresent)` and reuse copy across identical shells. Not urgent for v1, but the shape supports it.

**Dev/mock.** Rules-only path (skip LLM call) is already the perfect dev mock — set `MOODBOARD_MOCK=1`.

---

## Part 2 — One-screen results page

Design goal: **the reveal fits on one screen; detail is one tap away.**

### Anatomy

```
┌──────────────────────────────────────────────────────────┐
│  Based on what you told us.                              │
│                                                          │
│         Warm.  Loud.  Yours.        ← serif, big         │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐          │
│  │  #1  ★★★   │  │  #2  ★★    │  │  #3  ★     │          │
│  │            │  │            │  │            │          │
│  │ Who Said   │  │ Live       │  │ Live Roast │          │
│  │ It?        │  │ Trivia     │  │ Board      │          │
│  │            │  │            │  │            │          │
│  │ 1-line     │  │ 1-line     │  │ 1-line     │          │
│  │ rationale  │  │ rationale  │  │ rationale  │          │
│  │            │  │            │  │            │          │
│  │ [ open ▾ ] │  │ [ open ▾ ] │  │ [ open ▾ ] │          │
│  └────────────┘  └────────────┘  └────────────┘          │
│                                                          │
│  ✨ We also held one back for you.        [ show ▾ ]     │
│                                                          │
│  [ Send me this brief ]     Or copy a share link         │
└──────────────────────────────────────────────────────────┘
```

Above-the-fold on a laptop, and thumb-reachable on mobile.

### Interactions

- **Expand a card** (`open ▾`): the card grows inline, pushing siblings down but staying in-page. Reveals:
  - phone-scene preview (existing `PhoneScene` component — already used)
  - full `whyItFitsYou`
  - "How it plays" — pulled straight from `extended.howItWorks` in `data/apps.js`, no model call needed
  - two CTAs: `See the full page →` (existing) + `Tell us you want this` (primary, scrolls to email)
- **Hidden pick**: collapsed by default with the dark treatment we already have, but as a *strip* under the three cards instead of a full section.
- **Brief + email gate**: same content, but moved into a slim strip at the bottom of the screen — sticky on scroll once the user starts expanding cards. Empty state is one input + one button; the "send me a copy" copy stays.
- **Ranking cue**: instead of showing raw scores, use 1–3 filled stars (or a "best fit / strong fit / worth a look" label) so the ranking reads at a glance without looking algorithmic.

### Layout notes

- Desktop: 3-column grid, cards ~320px wide, expandable in place.
- Tablet: 2-column, third card wraps below.
- Mobile: 1-column stack, cards default *collapsed* to one screen each (headline + rationale + expand). The three-words hero shrinks to one line above.
- Uses the existing tokens — no new colors, no new radii. Cards are `--radius-2xl`, buttons `--radius-md`, per CLAUDE.md.

### Motion

- `threeWords` animates in as it does today (word-by-word).
- Cards fade + rise in a stagger (150ms apart) — same `resultCardIn` keyframe already in place.
- Expand uses `max-height` transition with `overflow: hidden` (same technique as `BriefPreview` drawer). No layout thrash on siblings — just push down.
- Respect `prefers-reduced-motion` (skip stagger, snap open).

### Content changes

- Rationales get tighter: **one sentence** in the collapsed view, up to three when expanded. The current UI shows the whole paragraph up front, which reads as text-wall.
- Drop the "See the full page →" as a text link secondary — keep it inside the expanded state only. First view is about *this* moment of recognition, not clicking away.
- The share link ("Or copy a link to share with your planner") moves next to the email CTA as a sibling, not an afterthought below.

### Copy tone

Keep the current voice. Two small tweaks:

- "Apps that feel like you" → "Three that feel like you." (specificity → warmth)
- Hidden tier heading currently reads like a long intro; compress to: "One we usually hold back — because you asked for something nobody's seen."

---

## Rollout

1. Add `lib/moodboard/scoring.js` + tests. Wire `/api/moodboard/match` to score-then-narrate.
2. Keep the current results page working with the new payload (no shape change — rationales get stitched onto the scored picks server-side).
3. Ship the new one-screen layout as `MoodboardResults` behind an internal flag; keep the old file as `MoodboardResultsV1.js` for one iteration in case we want to A/B.
4. Once we're happy, delete V1.

No new dependencies. No new tokens. No new routes.

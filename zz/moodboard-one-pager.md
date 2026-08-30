# Moodboard — One-Pager

## What it is
A 6-step interactive brief the couple (or planner) fills in on `/moodboard` that returns a personalized shortlist of Wepho apps. It's the site's primary lead magnet: soft, tactile, feels like a design consultation rather than a form. Output is shareable and doubles as the seed for a real conversation with Wepho.

## Purpose
- Convert curious visitors into qualified leads with real intent.
- Force specificity — the couple has to say something true about their wedding before they see recommendations.
- Give Wepho a rich brief (their words + picks) attached to every inbound email.

## Flow
Steps live in `components/moodboard/steps/` and are driven by `MoodboardWizard.js`:

1. **Scene** (`vibes`) — visual pick, "what does the night look like."
2. **Guests** (`guests` + `guestFreeform`) — who's coming.
3. **Moment** (`moments`) — when in the night the app plays.
4. **Feeling** (`feelings`) — what should land emotionally.
5. **Your story** (`story`, 8 optional prompts) — the free-text step where couples write in their own words.
6. **Review** — edit-in-place summary, then submit → matching loader → results.

Every non-review step also supports **custom pills** (`customEntries`) so couples can add their own options instead of tapping preset ones.

Autosave via `localStorage` (`lib/persistence`), with a resume banner if a session is re-opened.

## Matching
- Deterministic scoring in `lib/moodboard/scoring.js` + `directions.js`. Each answer contributes a weighted vote to specific app IDs (vibes/guests=3, moments/feelings=4, story=2, seed=12, saved=20).
- Server (`app/api/moodboard/match/route.js`) computes the top-3 shortlist, applies a cutoff (`max(5, top*0.4)`) so weak fits drop out, always keeps ≥1.
- If `OPENROUTER_API_KEY` is present, the shortlist is sent to Claude Haiku 4.5 via OpenRouter with the prompt in `lib/moodboard/prompts.js`. LLM is a **copywriter, not a ranker** — it never reorders or invents apps in the shortlist.
- Rate limit: 10/hour per IP.

## AI branching (`hasOwnWords`)
The API detects if the couple wrote anything (`story.*`, `guestFreeform`, or any `customEntries`). If yes:
- `threeWords` and per-match `personalReason` are allowed to quote/paraphrase their language.
- A separate `inventedApps` array (max 2) proposes brand-new app concepts inspired by phrases they wrote, each with a required `sourceQuote`. Filtered against the catalog to avoid duplicates. Zero if nothing plausible.

If no, the LLM stays on rails: canned deterministic rationales, no invented apps.

## Results (`components/moodboard/results/MoodboardResults.js`)
Sections top-to-bottom:
1. **ThreeWords** — the LLM's 3-word summary + share and `← Tweak your answers` buttons.
2. **AnswerStrip** — the couple's picks as removable chips + `＋ Add` + `Re-run with edits →` (capped at 3 re-runs per session).
3. **MatchedApps** — 1–3 `ResultCard`s. Each has a hero phone preview, a fit-meter pill, AI rationale layered over a deterministic "Matched on:" receipt, and an always-visible `Tell us you want this` CTA. Heading adapts to count ("One/Two/Three that feel like you", or "Closest to what you told us" for very weak fits).
4. **InventedApps** — only when `hasOwnWords`. Dashed cards labeled "Ideas we thought of while reading your words," each showing the source quote and a `Talk to us about this idea` CTA.
5. **HiddenTier** — dark-themed section for adventurous, never-built ideas (rarely populated).
6. **BriefEmailGate** — email capture ("Send me a copy of this brief") + `ShareableLink` block that produces a password-gated `/moodboard/[slug]` URL and social preview.

`← Tweak your answers` routes back to the Review step with all state intact; re-submit fires a re-match and shows an "Updated with your edits." toast.

## Data + persistence
- `data/apps.js` — extended catalog for the 20 apps (`getAppBySlug` powers the phone previews).
- `lib/moodboard/briefStore.js` — server-side storage for shared moodboards (Redis/KV).
- `lib/moodboard/passwords.js`, `ogImage.js`, `slug.js` — sharing plumbing.
- Analytics events: `moodboard_started`, `moodboard_finished`.

## Roles
- **Couple** (default) — full flow.
- **Planner** (`?role=planner`) — same flow with a "Planner brief" badge; prompt tells the LLM this is a planner-built brief.
- **Seeded app** (`?seed=<slug>`) — pre-weights that app so results steer toward it; used when arriving from an `/apps/[slug]` page.

## Non-goals
- Not a real product configurator — output is a conversation-starter, not a spec.
- Never invent apps for tap-only briefs.
- Never let the LLM change the ranking or the shortlist.
- Never auto-refresh results on edits — the couple presses `Re-run with edits →` themselves.
- Never show a confidence percentage — the 3-dot fit meter is the only rank visualization.

## Key files
- `components/moodboard/MoodboardWizard.js` — state machine + step orchestration.
- `components/moodboard/steps/*` — the 7 steps.
- `components/moodboard/ui/{StepShell,StepNavigator,BriefPreview,CustomEntryPills,TalkToUs}.js` — shared UI primitives.
- `components/moodboard/results/{MoodboardResults,ResultCard,ShareSheet,BriefPasswordGate}.js` — results screen.
- `lib/moodboard/{config,scoring,directions,personalization,prompts}.js` — data + logic.
- `app/api/moodboard/{match,brief,share,preview,unlock}/route.js` — API surface.
- `app/moodboard/page.js` + `app/moodboard/[slug]/page.js` — routes.

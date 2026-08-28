# Moodboard — Current Logic (as of 2026-08-28)

How answers actually flow through the wizard and shape everything the couple sees. Grounded in the live code, not the design intent.

## The short answer

Yes — every step's answers are carried forward and re-used as input in every subsequent step. There is one single `answers` object that grows step by step. Every downstream computation (the ranked "directions" card in the sidebar, the running Wepho commentary, the sort order of the story-step chips, and eventually the final match request) reads from that combined object, not just the current step's fields.

There is no per-step recomputation isolation. Adding an answer in step 2 immediately re-ranks the directions shown on step 3, 4, 5, and 6.

---

## The data model

One flat object, held in `MoodboardWizard.js` (`useState('answers', {})`), keys added as the couple progresses:

| Key | Written by step | Shape |
|---|---|---|
| `vibes` | 1. Scene | `string[]` of vibe ids |
| `guests` | 2. Guests | `string[]` of guest ids |
| `guestFreeform` | 2. Guests | `string` (freeform) |
| `moments` | 3. Moment | `string[]` of moment ids |
| `feelings` | 4. Feeling | `string[]` of feeling ids |
| `story` | 5. Your story | `{ [questionKey]: string }` |
| `wildcard` | 6. Energy | single `string` id |
| `directionPreferences` | any step (via the sidebar) | `{ saved: string[], rejected: string[] }` |
| `seededApp` | URL `?seed=` | `string` app slug |
| `role` | URL `?role=` | `'planner'` or null |

`answers` is autosaved to localStorage on every change (30-day TTL, `lib/persistence.js`). The resume banner replays the same object back into state.

`onNext(stepAnswers)` shallow-merges the step's local answers into the global object; `onDraftChange` does the same live as the user types/taps. Steps never see a filtered slice — every step receives `initialValues={answers}` (the entire object) and `directionIds` (the current ranked shortlist).

---

## How answers become "directions"

Everything ranking-related flows through `lib/moodboard/directions.js → scoreDirectionIds(answers)`.

**The scoring model is deterministic and additive.** Each option in `config.js` has an `appIds: string[]` array; picking an option adds a fixed weight to each of its apps.

| Signal | Weight per matching option | Applies to |
|---|---|---|
| Vibe pick | +3 | each app in that vibe's `appIds` |
| Guest pick | +3 | each app in that guest's `appIds` |
| Moment pick | +4 | each app in that moment's `appIds` |
| Feeling pick | +4 | each app in that feeling's `appIds` |
| Wildcard pick | +5 | each app in the wildcard's `appIds` |
| Any non-empty story answer | +2 | apps mapped on that specific `STORY_QUESTION` |
| Seeded app (URL `?seed=`) | +12 | that one app |
| Saved direction (sidebar heart) | +20 | that app |
| Rejected direction (sidebar reject) | **removed entirely** | that app |

Only ids in `APP_DIRECTIONS` survive the final filter. Ties break alphabetically by app id. `buildMoodboardDirections` slices to `limit = 3` and re-sorts saved apps to the top.

**The important consequence:** the top-3 the sidebar shows on step 1 is entirely driven by whatever the user picked on that step. As they add answers on step 2 and beyond, the top-3 re-ranks live. Nothing about earlier steps ever "locks in" — a step-4 feeling can knock a step-1 vibe's app out of the top 3.

---

## Where those directions get displayed

1. **`BriefPreview` (the sidebar rail)** — calls `buildMoodboardDirections(answers)` and renders the top 3 as pin/dismiss cards on every step. Heart/reject writes to `answers.directionPreferences`, which re-scores.
2. **`StepStory` chip order** — chips whose `appIds` intersect the current `directionIds` sort to the front, so the story prompts a couple sees emphasize the categories the wizard currently thinks they want.
3. **Final `/api/moodboard/match` call** — the whole `answers` object is POSTed. Server-side `scoreMoodboardApps(answers, 3)` runs the *same* scoring on the full `data/apps.js` catalog, produces the shortlist, and `buildSystemPrompt(matches)` feeds it to Claude Haiku 4.5. The model is instructed not to change, add, remove, or re-rank — it only writes one warm sentence per shortlisted id. Fallback if the LLM misbehaves: hardcoded pair (Who Said It?, Live Trivia).

The LLM never sees the raw catalog or picks apps. All ranking is deterministic. The model is a *copywriter over a pre-decided list*.

---

## The parallel "invention board" (insights)

Separate from the direction scoring, `components/moodboard/lib/insights.js` runs the same `answers` object through a big rule table to produce:

- **`ideas`** — hand-authored one-line sketches ("The Bedtime Broadcast", "The Speech Prediction Market") triggered by specific option ids. These are *not* real apps; they're speculative sparks the couple can react to.
- **`fits`** — green-light phrases ("Fast prompts with a room-wide reveal") triggered by picks.
- **`flags`** — red-flag phrases ("An open microphone with unlimited submissions") the couple should watch out for.
- **`commentary`** — one warm sentence per step, chosen by the last step's picks.

Insights also read from the entire `answers` object, but they are keyed to individual option ids — they don't compose or weight, they just fire when a rule matches. The reserved list is capped to the last 8 ideas, 4 fits, 4 flags.

---

## The step order and what "carries"

| Step | UI collects | New signal added to `answers` | Reads from previous answers? |
|---|---|---|---|
| 1. Scene | Up to 2 vibes | `vibes` | — |
| 2. Guests | Up to 2 guest types + optional freeform | `guests`, `guestFreeform` | Directions rail on the right shows apps scored from step 1. |
| 3. Moment | Up to 2 moments | `moments` | Directions rail scored from steps 1 + 2. |
| 4. Feeling | Up to 2 feelings | `feelings` | Directions rail scored from steps 1–3. |
| 5. Your story | 1–8 freeform lines against `STORY_QUESTIONS` | `story` | Chips reorder so the current top-3 apps' story questions surface first. Directions rail scored from steps 1–4. |
| 6. Energy | 1 wildcard | `wildcard` | Directions rail scored from steps 1–5. |
| Submit | (nothing added) | — | Full `answers` sent to `/api/moodboard/match`. |

Every step is optional-answers-friendly. `hasStepAnswer(answers, i)` in `config.js` only reports whether the step has *any* signal; nothing gates progression.

---

## Consequences and rough edges

- **Order of picks matters more than it appears.** A couple who picks "Candlelit and slow" on step 1 sees a keepsake-heavy top-3 before they answer anything about guests or moments — those recommendations then persist as anchor points visible during steps 2–6 and can be reinforced by low-weight signals downstream. A couple who picks the same vibe *last* would have watched a different set of apps ride the sidebar the whole time.
- **The wildcard is the single heaviest deterministic weight (+5) other than seed/save/reject.** It runs last, which means it can meaningfully re-rank right before submission. Whether that's the intent is worth questioning — currently the wildcard behaves like a step-6 tiebreaker with unusual authority.
- **Saved direction (+20) dominates everything.** One heart on the sidebar effectively locks that app into the top 3 for the rest of the wizard. This is probably intended (respect the couple's explicit signal) but it can also mask what the deterministic score would have produced on its own.
- **Insights and directions don't cross-check.** An "idea" invention card can fire alongside a top-3 direction that contradicts it (e.g. a reserved-warm insight flag warning against public performance while a public-performance app sits at #1). The two systems don't currently negotiate.
- **`guestFreeform` isn't scored.** Whatever the couple types in the freeform box on step 2 is stored, sent to the server, and included in the LLM's user prompt — but contributes zero to the deterministic ranking. This is a genuine gap: the specific detail we most want to reward (a real sentence from the couple) has less weight than a checkbox.
- **Rejects are hard deletes.** A rejected app is filtered out entirely (`scores.delete(appId)`) before results appear; the LLM never even sees it. The couple can't "undo" a reject except by re-opening the moodboard and starting over.
- **The 30-day localStorage TTL** means the exact same wizard state can silently resurrect a month later with new commentary if the couple returns. Autosave happens on every keystroke.

---

## Where `kids-running` currently sits (worth flagging separately)

The `kids-running` guest option (id in `GUESTS`, `config.js:91`) is a first-class Guest archetype worth the same +3 as any other. Picking it:

1. Boosts `wedding-bingo` and `home-the-room-built` in the direction ranking.
2. Fires a dedicated insight idea ("The Bedtime Broadcast"), a fit ("Short rounds children can join without owning a phone"), a flag ("Anything saved exclusively for after the kids leave"), and step-2 commentary ("Kids present changes the shape…").

So a single tap on "Lots of kids" causes measurable movement in what the couple sees for the rest of the wizard. Whether children *should* be a co-equal design signal at this weight — versus a modifier or ignored entirely — is a product question raised in the accompanying conversation and not a bug of the current logic.

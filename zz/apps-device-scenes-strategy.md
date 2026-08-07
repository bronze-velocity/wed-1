# /apps/[slug] device scenes — a low-effort uniqueness strategy

## The problem, precisely

Two visuals on every `/apps/[slug]` page are currently generic:

1. **`AppHero.js` — the phone in the hero.** Right now (`components/app-page/AppHero.js:114-162`) every app renders the same tiny "phone" that shows: a vibe pill, the app title, the app description, and a **Scan to join** button. Nothing about the phone screen actually reflects what the app *does*. A visitor landing on `/apps/couple-trivia` sees the same phone as a visitor on `/apps/love-letter-machine`.
2. **`AppBigScreen.js` — "What the room sees".** Currently (`components/app-page/AppBigScreen.js:78-149`) it's a single stock reception photo (`/images/dinner/bigscreen-1.jpg`) with a dark scrim, the vibe label, and the app title layered on top. Every app gets the same background image and the same overlay treatment. The prose above it changes per app (`extended.bigScreen`), but the picture doesn't.

Both are the two most visually load-bearing moments on the page — the hero, and the section that promises "here's what this looks like in the room." Making them believable per-app is the highest-leverage visual work left on the app pages.

## Guiding constraints

- **20+ apps.** Any strategy that requires bespoke design or bespoke code per app dies on effort.
- **The apps don't actually exist yet.** These are marketing mocks, not screenshots. We're designing the *implication* of the app, not documenting the real one.
- **Believability > fidelity.** A visitor doesn't need a working prototype; they need to look at the phone and think "yes, that's what this app would look like." One well-chosen key screen does that.
- **Coherence sells a product line.** All 20 apps need to feel like they came from the same studio. That means one shared visual vocabulary, not 20 free-hand designs.

## The strategy in one sentence

Build **one wedding-app design system** (tokens + ~8 reusable primitives) and **two small dispatchers** (`PhoneScene`, `BigScreenScene`) that render **one key screen per app** based on a tiny per-app data spec. Every app gets its own screen; almost none of them require new components.

## Part 1 — the shared "wedding-app" design system

This is the visual language of the *simulated guest app*, distinct from the marketing site chrome. Think of it as the design system a real Wepho guest app would use.

Reuse what already exists:

- `components/demo/PhoneShell.js` — real iPhone silhouette (already used by `WhoSaidItPhone`, `LoveLetterDemo`). Reuse verbatim in the hero.
- `components/demo/BigScreenFrame.js` — 16:9 dark stage with soft gold glow, "Wepho" watermark, petals animation. Generalize slightly (see Part 3).
- CSS tokens in `app/globals.css` — colors, radii, type. Already the source of truth.

Add a small **wedding UI kit** (`components/appui/`) with these primitives. Each is ~30–80 lines. Together they cover 20 apps.

| Primitive | What it looks like | Where it's used |
|---|---|---|
| `CoupleHeader` | Photo strip w/ "Simone & Jack · Aug 16" — same as `WhoSaidItPhone:31-62` | Top of every phone screen. Extract from `WhoSaidItPhone`. |
| `PromptCard` | White card, bold prompt, optional subtitle, optional small photo | Trivia question, vote prompt, quiz question |
| `VoteButtons` | 2–4 tap targets, token-styled, stateful | Vote-style apps |
| `SubmitField` | Textarea + character count + submit button | Write-a-thing apps |
| `CountdownRing` | SVG ring with 20 → 0 label in the middle | Any timed apps |
| `LeaderboardRow` | Rank · Name · Score, with a token-based accent bar | Any ranked-outcome screen |
| `ChapterCard` | Big photo + title + first line of body, subtle "chapter N/M" | Story/exhibit apps |
| `PickerGrid` | 2×3 or 3×3 grid of tap targets w/ selected state | Bingo, home-map, cocktail pick |
| `LiveFeedItem` | Attributed short quote, gold divider, small photo option | Roast/advice/love-letter feeds |
| `PulseSlider` | Emoji + horizontal drag/tap track | Emotion pulse, agree/disagree |

Roughly 10 primitives covering the entire product line. Once these exist, every per-app screen is a 15–40 line composition of them.

## Part 2 — the per-app data spec

Add a `deviceScenes` field to each app's entry in `data/apps.js`. It's declarative, one small block of data, no JSX:

```js
// data/apps.js — extendedContent['couple-trivia']
deviceScenes: {
  phone: {
    layout: 'vote',            // dispatch key
    prompt: "What did Simone say when Jack proposed?",
    options: [                 // exactly what the room would tap
      "Are you kidding me?",
      "Wait, is this real?",
      "Yes. Obviously.",
      "You're on one knee — get up!",
    ],
    countdown: 12,             // seconds remaining shown on the ring
    questionIndex: 4,          // "Question 4 of 15"
    questionTotal: 15,
  },
  bigScreen: {
    layout: 'leaderboard',
    title: 'Round 4 · Live standings',
    rows: [
      { rank: 1, name: 'Table 6 · Aunt Rae',     score: 41 },
      { rank: 2, name: 'Table 3 · Devon',        score: 39 },
      { rank: 3, name: 'Table 2 · Priya',        score: 37 },
      { rank: 4, name: 'Table 6 · Marcus',       score: 34 },
    ],
    footer: '15 questions · 8 minutes · winner gives the next toast',
  },
},
```

Two constraints on the content:

1. **Named guests, real specifics.** "Aunt Rae" not "Guest 1". Follows the brand-voice rule from `CLAUDE.md` — specificity creates believability.
2. **Numbers should be plausible.** Not "999 votes" — the kinds of numbers a 120-person wedding actually produces.

Writing 20 of these takes ~15 minutes each = ~5 hours of copy. It's not a design task, it's a copy task.

## Part 3 — the two dispatchers

Replace the current phone chunk in `AppHero.js` and the current big-screen chunk in `AppBigScreen.js` with a single dispatcher each.

```jsx
// components/appui/PhoneScene.js
import PhoneShell from '@/components/demo/PhoneShell'
import CoupleHeader from './CoupleHeader'
import VoteScene from './scenes/VoteScene'
import SubmitScene from './scenes/SubmitScene'
import ChapterScene from './scenes/ChapterScene'
import PickerScene from './scenes/PickerScene'
import PulseScene from './scenes/PulseScene'
import FeedScene from './scenes/FeedScene'
import RecordScene from './scenes/RecordScene'

const REGISTRY = {
  vote: VoteScene,
  submit: SubmitScene,
  chapter: ChapterScene,
  picker: PickerScene,
  pulse: PulseScene,
  feed: FeedScene,
  record: RecordScene,
}

export default function PhoneScene({ scene, couple }) {
  const Scene = REGISTRY[scene.layout] || SubmitScene
  return (
    <PhoneShell>
      <CoupleHeader couple={couple} />
      <Scene {...scene} />
    </PhoneShell>
  )
}
```

`BigScreenScene` follows the exact same pattern with its own registry (`leaderboard`, `feed`, `aggregator`, `map`, `gallery`, `moment`) — reusing `BigScreenFrame`'s outer stage but swapping the inner composition.

Then `AppHero.js` becomes:

```jsx
<PhoneScene scene={app.extended.deviceScenes.phone} couple={COUPLE_DEFAULT} />
```

and `AppBigScreen.js` becomes:

```jsx
<BigScreenScene scene={app.extended.deviceScenes.bigScreen} couple={COUPLE_DEFAULT} />
```

Fallback: if `deviceScenes` isn't defined for an app yet, dispatchers render a "coming soon" version of the current generic phone — nothing breaks during rollout.

## Part 4 — the layout catalog (covers all 20+ apps)

### 7 phone layouts

Every app in the catalog fits one of these. If a new app ever needs an 8th, add it — but the set below is deliberately kept small.

| Layout | Shape | Apps it serves |
|---|---|---|
| `vote` | Prompt card + 2–4 tap buttons + countdown ring | couple-trivia, first-dance-ballot, who-said-it, cocktail-quiz, unpopular-opinions, parallel-universe |
| `submit` | Textarea + optional "to" selector + send | love-letter-machine, advice-oracle, live-roast-board, bucket-list-builder, ask-us-anything, story-chain, anniversary-time-capsule, prediction-vault |
| `chapter` | Big photo + title + body paragraph + "Next chapter →" | venue-scavenger-hunt, relationship-exhibit, conversation-starters |
| `picker` | Grid of tappable tiles (photos or labels) with selection state | wedding-bingo, where-next-map, home-the-room-built, collaborative-soundtrack |
| `pulse` | Emoji options + horizontal slider or single big tap | emotion-pulse |
| `feed` | Scroll of received items with reply button (guest sees others' contributions) | secret-relay, guest-memory-map (submission view is `submit`, browse view is `feed`) |
| `record` | Big circular record button + timer + framing rectangle | video-guestbook |

### 6 big-screen layouts

| Layout | Shape | Apps it serves |
|---|---|---|
| `leaderboard` | Ranked rows, top row highlighted, table subplot | couple-trivia, first-dance-ballot, cocktail-quiz, who-said-it, wedding-bingo |
| `feed` | Rotating attributed quote with couple photo behind | love-letter-machine, advice-oracle, live-roast-board, ask-us-anything, story-chain |
| `aggregator` | Big number, sentiment bars, breakdowns ("62% think you'll have 2 kids") | unpopular-opinions, emotion-pulse, parallel-universe, prediction-vault, anniversary-time-capsule |
| `map` | Venue floorplan or relationship-graph with pins/lines lighting up | venue-scavenger-hunt, guest-memory-map, secret-relay, where-next-map, home-the-room-built |
| `gallery` | 3×3 photo grid or slow slideshow of contributions | relationship-exhibit, bucket-list-builder, collaborative-soundtrack (now-playing tile) |
| `moment` | One quiet focal element — a phrase, a "recording…" indicator, a QR | video-guestbook, conversation-starters (used sparingly / optional) |

**13 layout components total** to build once. After that, every new app is a data entry, not a code change.

## Part 5 — app-by-app assignment

The full mapping, ready to seed `data/apps.js`.

| App | Phone layout | Big-screen layout | Key content angle |
|---|---|---|---|
| couple-trivia | `vote` | `leaderboard` | "What did Simone say when Jack proposed?" / Table 6 leads |
| venue-scavenger-hunt | `chapter` | `map` | "Chapter 3 · The trip to Lisbon" / venue floorplan lighting up |
| anniversary-time-capsule | `submit` | `aggregator` | "Write Simone & Jack a note for their 5th" / "84 notes sealed" |
| bucket-list-builder | `submit` | `gallery` | "One thing they should do before 40" / wall of guest submissions |
| conversation-starters | `chapter` | `moment` | "Table 4 · What's the boldest thing you've done for love?" / no big screen or a soft rotating prompt |
| prediction-vault | `submit` | `aggregator` | "In 5 years, they will…" / "72% of guests predicted kids by 2028" |
| guest-memory-map | `submit` → `feed` | `map` | "Drop your favorite memory at the moment it happened" / map of memories |
| live-roast-board | `submit` | `feed` | "Roast Jack in 20 words" / live moderated feed |
| unpopular-opinions | `pulse` | `aggregator` | "Cats are better than dogs — agree?" / 68% disagree |
| first-dance-ballot | `vote` | `leaderboard` | 4 song options + countdown / live tally |
| wedding-bingo | `picker` | `leaderboard` | Bingo grid w/ some tapped / "BINGO — Aunt Rae, Table 6" |
| advice-oracle | `submit` | `feed` | "Best advice for the first year" / rotating gold-framed quotes |
| relationship-exhibit | `chapter` | `gallery` | "Room 2 · The Lisbon trip" / photo grid slideshow |
| where-next-map | `picker` | `map` | Tap a place they should go / world map filling with pins |
| home-the-room-built | `picker` | `map` | Tap the couch/dog/plants you'd add / composite house illustration filling in |
| collaborative-soundtrack | `picker` | `gallery` | Song grid w/ heart taps / now-playing tile + queue |
| love-letter-machine | `submit` | `feed` | Write + approve / letter revealed with gold frame (already built) |
| emotion-pulse | `pulse` | `aggregator` | Emoji slider "how are you feeling right now" / heat graph over the night |
| secret-relay | `submit` → `feed` | `map` | "A secret arrived from Table 3" / web of relay lines |
| cocktail-quiz | `vote` | `leaderboard` | Quiz Q → "You're a Negroni" / most-ordered cocktail by table |
| parallel-universe | `vote` | `aggregator` | "In another life you'd be…" / distribution of alternate lives |
| who-said-it | `vote` | `leaderboard` | Quote + Jack/Simone tap / live leaderboard (reuse existing demo assets) |
| story-chain | `submit` | `feed` | "Add the next sentence: …" / scrolling growing story |
| ask-us-anything | `submit` | `feed` | Question form + upvote / current question + upvote count |
| video-guestbook | `record` | `moment` | Big record button + timer / "Table 6 · Devon is recording…" |

## Part 6 — implementation plan

Build in this order. Each phase is independently useful.

**Phase 1 — foundations (½ day)**

1. Create `components/appui/` folder.
2. Extract `CoupleHeader` from `WhoSaidItPhone.js:31-62` as a shared primitive.
3. Build the ~10 primitives listed in Part 1. Small, token-only, no logic.
4. Add `COUPLE_DEFAULT = { name: 'Simone & Jack', date: 'Aug 16', photo: '/images/…' }` to `lib/` so every scene uses the same fake couple across the site.

**Phase 2 — dispatchers + first three layouts (½ day)**

5. `components/appui/PhoneScene.js` (dispatcher with fallback).
6. `components/appui/BigScreenScene.js` (dispatcher with fallback).
7. Build `VoteScene`, `SubmitScene`, `LeaderboardScene`. These three alone cover ~half the catalog.
8. Wire into `AppHero.js` (replace lines 114-162) and `AppBigScreen.js` (replace lines 78-149).

**Phase 3 — remaining layouts (1 day)**

9. Build the other 4 phone layouts (`chapter`, `picker`, `pulse`, `feed`, `record`) and other 5 big-screen layouts (`feed`, `aggregator`, `map`, `gallery`, `moment`). Each is a small composition of the primitives from Phase 1.

**Phase 4 — data (½–1 day of copywriting)**

10. Fill `deviceScenes` for all 20+ apps in `data/apps.js` using the mapping in Part 5. This is content work, not code.

**Phase 5 — polish**

11. Rotation: because the hero phone is static, add a subtle rotate + shadow (already there) and a small realistic status bar. Optional per-app hue in `CoupleHeader` background using the vibe color.
12. Big screen: reuse `BigScreenFrame`'s petals only for `moment` and `feed` layouts (feels right for keepsake apps); leave others clean.

Total: **~3 days of build + 1 day of copy** for 20+ pages to each get a genuinely distinct hero phone and distinct "what the room sees" moment.

## Part 7 — why this holds up

- **Coherent product line.** Every phone shares the `CoupleHeader`, the same shell, the same button style, the same color tokens. A visitor clicking between 5 different app pages sees "different apps by the same studio," not "five inconsistent mockups."
- **Distinct where it matters.** The prompt is different, the vote options are different, the leaderboard names and numbers are different. Every page has its own thumbprint.
- **Cheap to add app #21.** Pick a layout, write a data block. No new components.
- **Cheap to redesign.** Change a token, every app scene updates. Change one primitive (e.g. `LeaderboardRow`), every leaderboard app updates together.
- **Fits the codebase.** Reuses `PhoneShell`, `BigScreenFrame`, tokens from `app/globals.css`, and the `extended` data pattern already used in `data/apps.js`. No new architectural concept.

## Open questions worth deciding before build

1. **One fake couple across all 20 pages, or a different couple per app?** Recommendation: one couple ("Simone & Jack"). It reinforces the studio-feel; the visitor's brain stops re-parsing "who are these people" and focuses on the app differences.
2. **Should the hero phone animate?** Recommendation: no. Static screens read faster and hold up above-the-fold. Save motion for the actual homepage demos (`LoveLetterDemo`, `WhoSaidItDemo`).
3. **Big screen as image vs pure DOM composition?** Recommendation: DOM composition using the same primitives. It's crisper, responds to token changes, and works at any size. The current stock photo can move down the page as an "in the room" ambient shot rather than *the* representation.

# Homepage StoryBeat Highlight — Alternatives

The two "brief highlight" sections on the homepage are the `StoryBeat` components
(`components/sections/StoryBeat1.js` and `StoryBeat2.js`). Each renders one vivid,
present-tense scene spotlighting a single app, then links to that app's page.

## Current state

| Slot | Component | App featured | Vibe |
|---|---|---|---|
| 1 | `StoryBeat1.js` | Live Roast Board (#8) | laugh / energy |
| 2 | `StoryBeat2.js` | Anniversary Time Capsule (#3) | cry / keepsake |

**Problem:** StoryBeat1 spotlights **Live Roast Board (#8), a `skip: true` (retired) app.**
Both beats should draw from the chosen set.

**Chosen apps** (non-`skip` in `zz/info/20-apps.json`): **#1 Couple Trivia, #2 Venue
Scavenger Hunt, #3 Anniversary Time Capsule, #9 Unpopular Opinions, #11 Wedding Bingo,
#14 Future Home Map, #21 Who Said It.**

The two homepage **demos** already cover Love Letter Machine (#16, emotional) and
Who Said It (#21, funny) — so StoryBeats should pull from the chosen apps *not* already
demoed: **#1, #2, #3, #9, #11, #14.**

---

## Slot 1 — energetic / "make them laugh" beat (replaces Live Roast Board)

### Option A — Custom Wedding Bingo (#11) — *recommended for this slot*
> **The DJ plays ABBA and your aunt gasps — she's one square from bingo.**
>
> Every guest got a different card. The couple wrote the squares themselves, knowing
> exactly who'd cry and when the best man would lose his place in the speech.
>
> *Custom Wedding Bingo — App #11*

- `href`: `/apps/wedding-bingo`
- label: `Custom Wedding Bingo — App #11`

### Option B — Unpopular Opinions (#9)
> **Two strangers at table six are arguing about pineapple on pizza before the welcome
> drinks run out.**
>
> The couple loaded twenty of their realest takes. The bar between "his side" and
> "her side" fills in live — and the room just found out it sides with the bride on ranch.
>
> *The Unpopular Opinions Icebreaker — App #9*

- `href`: `/apps/unpopular-opinions`
- label: `The Unpopular Opinions Icebreaker — App #9`

### Option C — Couple Trivia (#1)
> **Fifteen questions in, grandma is beating the college roommates at a game about the
> couple.**
>
> Every question is how they actually met, who said "I love you" first, what she said
> when he proposed. Real names on the leaderboard — and the winner just earned a live
> toast at the mic.
>
> *Live "How Well Do You Know Us?" Trivia — App #1*

- `href`: `/apps/couple-trivia`
- label: `Live "How Well Do You Know Us?" Trivia — App #1`

---

## Slot 2 — emotional / keepsake beat (current: Anniversary Time Capsule)

### Option D — Anniversary Time Capsule (#3), tightened — *recommended: keep, reworked*
> **Your sister films forty-five seconds of your grandmother's advice. It stays sealed
> until your tenth anniversary.**
>
> You'll open it together, years from now. Grandma might not be there when you do — and
> every guest recording tonight knows it.
>
> *Anniversary Time Capsule — App #3*

- `href`: `/apps/anniversary-time-capsule`
- label: `Anniversary Time Capsule — App #3`

### Option E — Future Home Map (#14) — *more "get them talking," less tears*
> **Lisbon has twelve pins now, and two tables are arguing about whether the couple
> should actually move there.**
>
> Everyone marks the places that matter — where to visit, where to retire, the ramen
> shop they have to try. Half these pins end up starred in the couple's real map by
> morning.
>
> *Design Our Future Home Map — App #14*

- `href`: `/apps/future-home-map`
- label: `Design Our Future Home Map — App #14`

### Option F — Venue Scavenger Hunt (#2) — *romantic / story*
> **The QR code by the garden just told your cousin exactly where he proposed — and why
> he waited three years.**
>
> Every code around the venue unlocks a chapter of the real story, in the couple's own
> voice. Finish them all and a private thank-you video unlocks.
>
> *Venue Scavenger Hunt — App #2*

- `href`: `/apps/venue-scavenger-hunt`
- label: `Venue Scavenger Hunt — App #2`

---

## Recommended pairing

**A (Wedding Bingo) + D (reworked Anniversary Time Capsule)** — keeps the laugh/cry
contrast the page is built around, and both are chosen apps.

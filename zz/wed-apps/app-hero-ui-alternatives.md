# App Hero UI — Alternative Visualizations

For every app on `/apps/[slug]`, the hero currently renders a phone mock with a fixed layout (vote / leaderboard / submit / feed / pulse / picker / chapter / map / gallery / aggregator / moment / record). Below are **two better alternatives per app** — each is a distinct visual composition, not a color reskin. Every alternative is meant to read at a glance from a scrolling hero, so they lean on: one dominant element, a real quote or number, and a single moment of motion.

At the end is a proposed **Wedding Editorial** design system for the phone/big-screen mocks — mostly black-and-white, serif-forward, with one accent — designed to feel like a wedding invitation rather than a SaaS product.

---

## Global principles for the new hero mocks

1. **One hero element, not a full app screen.** The mock should crop into the single most interesting piece of UI (a card, a stack, a single row, a rising bar) at ~1.4× the size it would be in the real app. Full screens read as "generic phone."
2. **Show state, not chrome.** Drop the status bar, the app header, the nav. Keep the notch/dynamic island only if it's the focal frame.
3. **Real names, real numbers, real quotes.** "Aunt Rae · 41 pts · +3" beats "User · 41."
4. **One moment of implied motion.** A partial bar, a countdown mid-tick, a card mid-flip, a pin dropping. Frozen still-frames feel dead.
5. **Wedding, not app.** Serif display type for the couple's names and single-line prompts; sans only for numeric UI. See the design-system section.

---

## 1. Live Couple Trivia — `couple-trivia`

**Currently:** phone vote screen with 4 options + countdown; big-screen leaderboard.

**Alt A — "The Question Card, mid-countdown."**
A single black card floats center-frame at a slight 3° tilt. Top: `Q4 / 15` in tiny serif caps. Middle: a single big serif line — *"What did Simone say when Jack got down on one knee?"* Bottom: four thin option pills, one already filled in ivory (the guest's pick). A hairline circular timer wraps the card corner, drawn at 63%. No leaderboard, no phone chrome — just the card and a soft drop-shadow on cream paper. Reads like a wedding place-card that happens to be a question.

**Alt B — "The Leaderboard as Seating Chart."**
Instead of a ranked list, render the top 5 as a mini seating-chart: five round table icons in ivory, each labelled with the top scorer at that table (*Table 6 · Aunt Rae · 41*). One table is enlarged and outlined in gold — the current leader. A thin ribbon along the bottom reads *"Round 4 of 15 — winner gives the next toast."* Communicates the table-vs-table subplot instantly, which the current bar-chart leaderboard buries.

---

## 2. Venue Scavenger Hunt — `venue-scavenger-hunt`

**Currently:** phone chapter card with a photo; big-screen venue map with pins.

**Alt A — "Chapter tab, half-open."**
A stack of 8 thin manila-tab cards, staggered like a Rolodex. The 3rd tab is pulled forward and reads *"Chapter 3 · The Lisbon spring — the trip where things stopped being casual."* Behind it, chapters 1–2 are dog-eared (found); 4–8 are sealed with a tiny wax-seal glyph. Communicates progression and mystery without a map.

**Alt B — "Venue blueprint with a torn corner."**
A hand-drawn, ivory-on-black venue floorplan takes the whole mock. Five gold pins are placed at real-feeling spots (bar, garden, photo-wall). The current pin pulses. In the torn upper-right corner, a peeled-back layer reveals the miniature chapter card underneath — the story that just unlocked. Marries the "map" and "chapter" moments into one visual.

---

## 3. Anniversary Time Capsule — `anniversary-time-capsule`

**Currently:** phone record/submit; big-screen "sealed tonight" aggregator.

**Alt A — "The sealed envelope stack."**
Three cream envelopes stacked with staggered wax seals. The top envelope is stamped *"OPEN AUG 16, 2036"* in serif caps. A tiny handwritten line peeks from the second — *"For your 10th."* Under the stack a thin caption: *"84 messages sealed tonight — none can be opened early."* Feels like a keepsake box, not a form.

**Alt B — "Countdown wall clock."**
A round analog clock face, but the numerals are replaced with years: 1, 5, 10, 25, 50. A single ivory hand rests on 10. Along the outer rim: *"Grandma Marion's message unlocks in 3,647 days."* Sells the emotional payoff — the delivery, not the recording.

---

## 4. Guest Bucket List Builder — `bucket-list-builder`

**Currently:** phone submit; big-screen gallery.

**Alt A — "The single dare, framed."**
One typed dare card, centered, in typewriter mono on cream: *"Learn to swing dance before your 5th anniversary. — Marcus, Table 3."* A hairline "+ add yours" button hangs beneath, half-faded. Simpler and more provocative than a wall of cards.

**Alt B — "The list scroll."**
A vertical, torn-edge scroll running the full height of the mock, ivory on black, with 12 numbered dares in serif. Number 7 is highlighted with a soft gold underline: *"Take the parents to Kyoto once."* Feels like an actual list from a real friend, not a Notion export.

---

## 5. Conversation Starter Cards — `conversation-starters`

**Currently:** phone chapter card; big-screen moment.

**Alt A — "A hand of cards, fanned."**
Three cards fanned like a poker hand, each with a different serif prompt (*"Tell the table how you met the couple"*, *"Trade the worst dating story at your table"*, *"Who at this table has the best proposal story?"*). The middle card is lifted slightly. Reads instantly as an intimate table game.

**Alt B — "Table 7 tent-card."**
A single tri-fold table tent standing on cream linen, printed with *"Table 7 · The college crew"* and one prompt below. A tiny QR at the corner. This one is closest to the physical object it replaces — which is the whole point of the app.

---

## 6. The Prediction Vault — `prediction-vault`

**Currently:** phone submit; big-screen "vault sealed" aggregator.

**Alt A — "The safe dial."**
A cropped brass-style dial (rendered flat, ivory + charcoal, no skeuomorphic gradients) mid-turn, with three numbers ticking. Overhead caption in serif: *"Sealed until their 5th anniversary."* Behind the dial, a faint outline of a folded prediction slip.

**Alt B — "The ballot slip, mid-slot."**
A single folded paper ballot dropping into a slit at the top of a matte-black box. Half the slip is still visible, showing one handwritten prediction: *"They'll have named their first kid after a city."* Motion is implied by a soft shadow trailing the slip.

---

## 7. Guest Memory Map — `guest-memory-map`

**Currently:** phone submit; big-screen map with pins for first-date locations.

**Alt A — "The globe, half-turned."**
A stripped-down monochrome globe (ivory landmasses on black), tilted mid-rotation. Three gold pins with hairline connector lines that lead to tiny handwritten notes at the frame edge — *"Cape Town — where I met Simone in 2016."* Wedding-atlas feel.

**Alt B — "The pin-and-note pair."**
Extreme close-up of a single ivory push-pin stuck through a folded paper note pinned to cork-textured cream. Note reads: *"Kyoto, 2019 — the trip that convinced us."* The rest of the map is implied but off-frame. More intimate than the full-map view.

---

## 8. The Live Roast Board — `live-roast-board`

**Currently:** phone submit; big-screen live feed.

**Alt A — "The single roast, spotlit."**
One roast card, dark background, spotlight vignette, in bold serif: *"Jack once ironed a shirt while wearing it."* Attribution below in small caps: *— Anonymous · Table 4.* A tiny queue counter in the corner: *"3 more waiting moderation."* Sells the punch, not the queue.

**Alt B — "The moderation split."**
A vertical split-frame: left half (dark) shows the roast being typed live with a blinking cursor; right half (cream) shows the couple's phone with a big *Approve* / *Reject* pair. Communicates the "you approve before it hits the wall" safety net that couples care about most.

---

## 9. Unpopular Opinions — `unpopular-opinions`

**Currently:** phone pulse slider; big-screen aggregator.

**Alt A — "The scale, tipped."**
A minimal balance-scale illustration with two plates: *"Overrated"* and *"Sacred."* A single serif statement floats above — *"A first dance to a song neither of you picked."* The scale tips 62% toward *Overrated*, with a subtle ivory tick mark showing where the guest just landed.

**Alt B — "Room dot-plot."**
A horizontal strip across the mock, ivory dashes on black, with ~40 tiny dots scattered by opinion. One dot glows gold — *"You"*. Below: *"Live · opinion 4 of 12."* Feels like a New York Times chart, not a Likert form.

---

## 10. First Dance Reveal Ballot — `first-dance-ballot`

**Currently:** phone vote; big-screen leaderboard.

**Alt A — "The vinyl stack."**
Three vinyl records stacked at 3° offsets, each labelled with a song and a live vote-count. The top record has a hair-thin gold ring around its label: the leader. Turntable-arm hovers, implying the reveal is imminent.

**Alt B — "The setlist card."**
A cream index card with three song lines in typewriter font, each with a tally of marks (‖‖‖‖) beside it. One song is circled in gold pencil. Bottom caption: *"The room picks. They pick the moment."* Reads as a bandleader's setlist — perfectly wedding-appropriate.

---

## 11. Custom Wedding Bingo — `wedding-bingo`

**Currently:** phone picker (bingo card); big-screen leaderboard.

**Alt A — "The bingo card, one square from winning."**
A 5×5 grid, cream on black. Four squares in a row already stamped with a gold ✕. The fifth square is mid-stamp with a partial mark — *"Cousin Ellie cries during vows."* Communicates the *almost-there* tension that makes bingo work.

**Alt B — "BINGO! moment."**
The full card is faded to 20% opacity, and a single serif word — *BINGO* — is stamped across it in gold, at a 6° tilt. Below in small caps: *"Aunt Rae, Table 6."* The reveal frame, not the setup.

---

## 12. Guest Advice Oracle — `advice-oracle`

**Currently:** phone submit; big-screen live feed.

**Alt A — "The fortune, unfolded."**
A cream fortune-cookie slip, unfurled, held between implied fingertips (soft cast shadow only). Serif text: *"Fight in the kitchen, not the bedroom. — Grandpa Ari."* Bottom caption: *"84 more pieces of advice waiting tonight."*

**Alt B — "The scrolling ticker."**
A three-line ticker in the middle of the mock, ivory text on black, the middle line brightest, the top and bottom lines fading toward the edges — implying vertical scroll. Each line is one piece of advice. Feels like the departures board at a good train station.

---

## 13. Relationship Origin Story Exhibit — `relationship-exhibit`

**Currently:** phone chapter; big-screen gallery.

**Alt A — "The museum placard."**
A cream placard beside a framed photo. Placard header: *"Room Two · Lisbon, spring 2022."* Below, a serif paragraph — the exhibit note. Bottom-right corner has a QR glyph. The photo is only partially visible off the frame edge, keeping the placard as hero.

**Alt B — "The gallery hallway."**
A perspective vanishing-point view down a black gallery hallway. Six ivory-matted frames recede along one wall. The nearest frame is legible: a single date and one line. A tiny gold *"You are here"* dot marks the guest's current room.

---

## 14. Where To Next — `where-next-map`

**Currently:** phone picker; big-screen map.

**Alt A — "The postcard rack."**
Six postcards fanned like a shop-front rack, each with a hand-drawn destination sketch (Reykjavík, Lisbon, Kyoto). One postcard is pulled out and turned to show its back: *"Go here for your 5-year. — Priya."*

**Alt B — "Pin on the wall."**
A large ivory push-pin dead-center on a black world map, dropping a soft shadow. A single serif line beside it: *"Ulaanbaatar — because Devon dared you."* Feels definitive, not indecisive.

---

## 15. Collaborative Soundtrack — `collaborative-soundtrack`

**Currently:** phone picker; big-screen gallery ("Now spinning").

**Alt A — "The queue, top-3."**
Three horizontal rows: album-art thumbnail, song, hearts count. The top row is glowing gold and marked *"Now spinning."* Rows 2 and 3 are queued with subtle up-arrows. Fewer rows than a real Spotify list — the point is the top of the queue, not the full library.

**Alt B — "The needle drop."**
Close-up of a turntable needle hovering ~2mm above vinyl, spotlit. Overlay caption in serif: *"'Murder on the Dancefloor' — picked by the room."* Ultra-cinematic, sells the *moment* the DJ commits.

---

## 16. Unprompted Love Letter Machine — `love-letter-machine`

**Currently:** phone submit; big-screen feed ("To: Simone").

**Alt A — "The typewriter page, mid-line."**
A cream page in a typewriter carriage, one line already typed and the cursor blinking at the next: *"Dear Simone — the thing I never told you at your bachelorette is—"* The unfinished sentence is the hook.

**Alt B — "The envelope on the plate."**
A single ivory envelope propped against a wine glass on a linen tabletop, addressed *"To Simone"* in serif. Wax seal, gold. Almost still-life photography. Communicates "left at your seat" perfectly, no UI required.

---

## 17. Wedding Day Emotion Pulse — `emotion-pulse`

**Currently:** phone pulse slider; big-screen aggregator.

**Alt A — "The ECG line."**
A single ivory heart-rate line drawn across the mock left-to-right, with subtle peaks marked *Ceremony*, *First Dance*, *Speeches*. A gold vertical marker sits on *First Dance* — the current tallest peak. Serif label above: *"The room · right now."*

**Alt B — "The dial, at 87."**
A big minimalist gauge, ivory arc on black, needle pointing at 87 (out of 100). Caption in small caps: *"Room joy · averaged across 84 phones."* Simpler and more legible than a scatter of dots.

---

## 18. Table-to-Table Secret Relay — `secret-relay`

**Currently:** phone feed; big-screen map with tables.

**Alt A — "The note being passed."**
A folded cream note mid-flight between two table icons, drawn on a soft blueprint of the venue. Motion trail behind the note. Caption: *"Table 3 → Table 7 · in flight."* Tells the whole game in one image.

**Alt B — "The whisper stack."**
A vertical stack of ~6 folded notes, each labelled with a table number. The top note is half-open, showing the first line of a whispered message. Reads as an accumulating game, not a one-off.

---

## 19. Personalized Cocktail Quiz — `cocktail-quiz`

**Currently:** phone vote; big-screen leaderboard ("Bar top 5").

**Alt A — "The cocktail card, verdict-style."**
A single cream card with a hand-illustrated cocktail glass in gold linework at the top, and the drink name in serif: *"The Priya · gin, elderflower, grapefruit."* Below: *"Because you picked 'brunch' and 'summer' and 'sharp not sweet.'"* Feels like a bar menu, not a quiz.

**Alt B — "The bar-top top 5."**
A vertical menu with 5 rows: rank, cocktail name, count of guests who got matched to it. Rank 1 is in gold. Column of tiny glass icons for each match. Communicates the "top 5 the bar actually pours tonight" outcome.

---

## 20. Parallel Universe Game — `parallel-universe`

**Currently:** phone vote; big-screen aggregator.

**Alt A — "The forked road."**
A single Y-shaped path splitting the mock. Each branch has a serif label: *"They met at the coffee shop."* / *"They met on the flight to Rome."* Percentages hover over each branch (54% / 46%), and a small gold star marks *"What actually happened."*

**Alt B — "The dossier folder."**
A manila folder cracked open a few inches, revealing a stamped page — *"CLASSIFIED · UNIVERSE 4B."* One paragraph visible: *"In this timeline, Simone said yes on the second date."* Sells the game's playful *"what-if"* premise.

---

## 21. Who Said It? — `who-said-it`

**Currently:** phone vote (text with blurred sender); big-screen leaderboard.

**Alt A — "The chat bubble, sender-blurred."**
A single serif chat bubble filling most of the mock, tail pointing off-frame to a heavily blurred avatar circle. Text: *"I would literally sell a kidney for a bagel right now."* Two vote pills beneath: *Simone* / *Jack*, one tapped.

**Alt B — "The polaroid with taped-over caption."**
A cream polaroid frame, photo half-visible. The white bottom strip has masking tape across the caption — the sender's name. Below the polaroid: two vote pills. Physical, playful.

---

## 22. The Story Chain — `story-chain`

**Currently:** phone submit; big-screen feed ("The Story · sentence 47").

**Alt A — "The scroll, unfurling."**
A vertical ivory scroll rendered at 3° tilt, with the last three sentences visible in serif, the newest one glowing gold: *"And then Simone looked at him and said…"* Cursor waits at the end.

**Alt B — "The relay baton."**
Two hands (silhouetted, minimal) passing a folded note. Above: *"You add sentence 48."* Below: *"46 already written."* Sells the collaborative-turn mechanic in one image.

---

## 23. Ask Us Anything — `ask-us-anything`

**Currently:** phone submit; big-screen feed with top question.

**Alt A — "The upvoted question."**
One question card, cream on black. Big serif text: *"What's the first fight you ever had?"* Below in small caps: *"↑ 34 · asked by 6 tables."* A tiny ivory mic icon in the corner marks *"Answered live at midnight."*

**Alt B — "The mic and the card."**
A wedding-mic silhouette in gold at the left edge, and a floating question card at the right. A hairline arrow from card to mic. Communicates: *the top question ends up on the actual mic.*

---

## 24. Two-Minute Video Guestbook — `video-guestbook`

**Currently:** phone record; big-screen moment ("watched later, together").

**Alt A — "The record button, ready."**
A large ivory concentric-ring record button dead center, with a serif line above — *"Two minutes. Only they will ever watch."* Timer at 0:00. The privacy promise IS the hero.

**Alt B — "The reel of thumbnails, blurred."**
A horizontal strip of ~8 video thumbnails, all deliberately blurred/frosted to signal privacy. Below each thumbnail, only a first name: *Aunt Rae · Devon · Priya…* Caption: *"84 messages recorded tonight. None public."*

---

## 25. The Home Your Room Built — `home-the-room-built`

**Currently:** phone picker; big-screen map ("the house · built by the room").

**Alt A — "The blueprint, being drawn."**
An ivory-on-black architectural floorplan of a house, mid-draft. Some rooms are labelled with guest contributions (*"a reading nook — from Devon"*, *"a piano corner — from Aunt Rae"*), one room is dashed and marked *"+ yours."*

**Alt B — "The furniture-piece pick."**
Three minimalist line-drawings — a lamp, a rug, a chair — arranged in a row on cream. The middle one is lifted and haloed in gold: *"You added: the reading chair."* Simpler than the full house; better as a hero card.

---

# Proposed Design System — *Wedding Editorial*

A visual system for the phone/big-screen mocks specifically (not necessarily the marketing site itself, though it could migrate there). The goal: make the in-device UI look like an *invitation suite* rather than a *SaaS dashboard.*

## Palette

Two neutrals do 95% of the work. One accent, used sparingly, replaces the site's current purple/amber gradient buttons inside the mocks.

| Token | Value | Use |
|---|---|---|
| `--ui-ink` | `#0B0B0C` | primary text, big-screen background |
| `--ui-cream` | `#F6F1E8` | primary phone background, big-screen text |
| `--ui-ink-70` | `rgba(11,11,12,0.7)` | secondary text on cream |
| `--ui-cream-70` | `rgba(246,241,232,0.7)` | secondary text on ink |
| `--ui-hairline` | `rgba(11,11,12,0.14)` | 1px dividers, card borders on cream |
| `--ui-hairline-inv` | `rgba(246,241,232,0.18)` | dividers on ink |
| `--ui-accent-gold` | `#B08A3E` | single accent — used for the *one* moment of emphasis per screen |
| `--ui-accent-gold-soft` | `rgba(176,138,62,0.14)` | accent fills |

Rules:
- **No gradients.** Anywhere. Flat fills only. The site's `--gradient-accent` and `--gradient-hero` never appear inside a phone/big-screen mock.
- **One accent per composition.** If the timer ring is gold, the CTA is not. Discipline creates elegance.
- **No colored dots for vibes** *inside* the mocks. Vibe colour lives on the surrounding site chrome (the eyebrow pill), never inside the UI itself.

## Type

| Role | Family | Notes |
|---|---|---|
| Display / prompts / quotes | **Serif** — `Fraunces`, `Cormorant Garamond`, or `PP Editorial New` | ~500 weight, slight optical size at 24–48px; letter-spacing `-0.01em` |
| Body / captions | **Serif** at small sizes, tracked `+0.01em` | Retains editorial feel |
| Numerics, timers, tallies, small caps labels | **Sans** — `Inter` or `Söhne` | Uppercase, `+0.12em` tracking, weight 600 |
| Handwritten touches (signatures, notes) | **Script** — `Reenie Beanie`, `Caveat`, or a real handwriting scan | Used **once** per composition, never for UI |

Serif for content, small-caps sans for meta, script for one handwritten grace-note. Never sans for a full sentence inside a mock.

## Grid, shape, elevation

- **Radii:** cards `12px` (subtle, editorial), pills `8px`, avatars `full`, media frames `4px` (like matting on a picture). No 20px+ card radii — they read as consumer app.
- **Shadows:** replaced by a single **hairline border + one soft shadow** (`0 24px 60px rgba(11,11,12,0.18)`) on the focal card only. Everything else sits flat.
- **Rotation:** the hero card tilts `-3°` or `+3°`. Nothing else in the composition tilts. One tilt reads as intentional; two reads as messy.
- **Spacing:** 8px base, with generous vertical rhythm (24 / 32 / 48) — the phone mock should feel *airy*, not packed. Think wedding stationery whitespace.

## Component recipes

**"Wedding card" (replaces PromptCard, VoteCard, ChapterCard):**
- Cream fill, 1px `--ui-hairline` border, 12px radius, 32/28px padding.
- Header: small-caps sans label (`ROUND 4 · Q4`) at 11px tracked.
- Body: serif at 24–32px, `-0.01em`, line-height 1.15.
- One divider `--ui-hairline` below the body.
- Footer meta in serif italic at 13px.

**"Vote pill" (replaces VoteButtons):**
- Cream fill, ink border, 8px radius, 12/16px padding.
- Serif text, 15px.
- Selected state: fill becomes `--ui-ink`, text becomes `--ui-cream`. **No gold** on the pill itself — gold is reserved for outcomes, not choices.

**"Countdown" (replaces CountdownRing):**
- 1.5px stroke, `--ui-ink` on cream (or `--ui-cream` on ink).
- Progress arc in `--ui-accent-gold`.
- Center number in sans small-caps.

**"Leaderboard row" (replaces LeaderboardRow):**
- Two-column: rank+name (serif) / score (sans small-caps).
- No filled bars. A hairline underline whose length scales with score.
- Rank 1 gets a gold `01` in serif at 32px, doubling as position marker.

**"Chapter tab" (replaces ChapterCard):**
- Folded-corner rectangle (top-left corner clipped 24px on the diagonal).
- Serif chapter title + serif italic subtitle.
- Wax-seal glyph (a single filled circle in `--ui-accent-gold`, ~10px) for sealed items.

**"Big-screen"**:
- Background always `--ui-ink`.
- Type inverted (`--ui-cream`).
- Same components as phone, scaled ~2×.
- One large serif headline, and *at most* one gold element on-screen at a time.

## What this replaces / removes

- The current gradient CTAs inside the mocks (`var(--gradient-accent)`) — gone. Buttons in the mocks are flat ink/cream. Site-level CTAs (outside the mocks) can keep their gradient for now.
- Colored vibe dots inside phone/big-screen mocks — gone. Vibe live on the site chrome, not inside the product visual.
- Emoji icons in mocks (currently used in some Feed/Aggregator scenes) — replaced by thin line-icons in `--ui-ink` at 1.25px stroke.
- Filled progress bars — replaced by hairline underlines whose length carries the value.

## Why this fits Wepho

Weddings are the last domain that still trusts print typography. The invitation, the menu, the place-card, the program — all of it is serif, ivory, hairline-ruled. The current in-device mocks look like Slack channels; the alternatives above and this system make them look like the paper the guests are already holding at the table. Same emotional register as the venue, not the same visual register as an app store.

## Migration path (if we adopt this)

1. Add the tokens above to a new `app/globals.css` scope, e.g. `.ui-editorial { … }` — apply the scope only inside `components/appui/**` so nothing on the marketing site breaks.
2. Rewrite the six phone `Scene` components and six big-screen `Scene` components to use the new components (Wedding Card, Vote Pill, Chapter Tab, etc.) — the `deviceScenes` data in `data/apps.js` needs no changes; it's the renderer that changes.
3. Per-app hero mocks (the alternatives above) get built as **hand-crafted compositions**, not as generic `PhoneScene` renders. Each app slug gets its own `HeroMock.js` under `components/app-page/hero-mocks/` that composes editorial primitives. The generic `PhoneScene` stays as the *inside-the-app* preview, but no longer serves the hero.
4. Retire `FallbackPhone` in `AppHero.js` — every app should have a bespoke hero mock, not a fallback.

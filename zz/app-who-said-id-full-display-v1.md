---
name: Who Said It? — Display Plan v1
description: How to show every question and data point of the "Who Said It?" app across the LP (briefly) and its own /apps/who-said-it page (fully). Includes improvement suggestions vs the user's original thoughts.
---

# Who Said It? — Full Display Plan (v1)

Companion doc to `zz/app-who-said-id.md` (user's raw thoughts) and `zz/lp-v3-suggestions.md` (LP context — Who Said It? is already the recommended second interactive demo on the homepage, `DemoSectionTwo`).

The app has more data points than one demo can show at once. This doc lays out *what* those data points are, then splits them into a **compressed LP demo** (nothing over ~40s of visitor attention) and a **standalone `/apps/who-said-it` page** that can show all of it in depth.

---

## 1. Full inventory: every question type & data point

Pulled from `app-who-said-id.md` plus the mechanics implied by the sign-up flow.

### 1a. Sign-up data (per guest)
| Field | Purpose on the night | Purpose in aggregate |
|---|---|---|
| Name | Personal scoreboard row | Named callouts on the big screen |
| Side (his / hers / both) | Team scoring | Family-vs-family leaderboard |
| Relationship to couple (mother, college roommate, coworker, etc.) | Fine-grained brag rights | Sub-leaderboards ("the college crew got 8/10"), post-wedding stats |

### 1b. Question / content types
| Type | Format | Notes |
|---|---|---|
| Text-message screenshot | Blurred sender bubble, two-tap vote | Core mechanic |
| Photo (poorly cooked meal, whiteboard note, etc.) | Same two-tap vote — "who took / made / owns this?" | Extends the joke beyond texts |
| Statement as chat bubble | Typed-up quote in iMessage-style UI | For things said out loud, not texted |
| Bonus: "Guess the year" | Slider or 4-option tap | Chronology comedy |
| Bonus: "Guess the context" | 3-option multiple choice | Optional layer per item |
| Spicy round (passkey-gated) | Same UI, different content | Requires a code shared at friends' tables only |
| MC/host inter-round comments | Injected screens between rounds | Not user input — hosted color commentary |

### 1c. Live data points (updating in real time)
- Per-question: **% who guessed correctly**, split by side
- **Running scoreboard** — his side vs her side vs mutual friends
- **Individual leaderboard** (top 5 shown on screen, full list on phone)
- **Streaks** ("Sarah has 6 correct in a row")
- **"Room agrees"** stat — how often the crowd converged on the right answer
- **Reaction taps** (♥ / 😂) per revealed message — optional lightweight layer

### 1d. Post-wedding / keepsake data points
- **Digital archive URL** the couple keeps forever — every message, every vote, every score. This is the default keepsake and it's basically free to produce.
- **Family-vs-family final score** as a printed A5 card, mailed with the thank-you notes. Cheap, memorable, doubles as a fridge magnet story.
- **"Who knew you best"** award — top scorer per side. Named on the big screen at the end, printed on the card.
- **Optional add-on: printed chapbook.** See § 5.2 below — recommended only for couples who explicitly ask for it. Not a default output.

---

## 2. On the landing page (brief)

Placement is already fixed by `lp-v3-suggestions.md` § 3b: `DemoSectionTwo`, between `DemoSection` (Love Letter Machine) and `AppGalleryTeaser`. The goal here is *feel*, not *feature coverage*. **Show 3 things. Imply the rest.**

### 2a. What to show in the interactive demo (≤ 40 seconds)
1. **Four hardcoded messages**, alternating senders — mix of one photo (e.g. burnt toast) and three texts, to preview the format range without explaining it.
2. **A running score in the corner** — visitor sees points animate up/down.
3. **One reveal that shows aggregate data:** *"It was Simone — 78% of the room got this one wrong."* This single line implies real-time aggregation without requiring a fake histogram.

Everything else stays offscreen.

### 2b. What to imply, not show
| Data point | How to imply it in one glance |
|---|---|
| Family-vs-family leaderboard | Final flourish card: mocked-up big-screen leaderboard split into *His Side · Her Side · Mutual*. One frame, no interaction. |
| Spicy round | A single locked tile at the end: *"🔒 Spicy round · code required"* — no click needed, just visible. |
| Guess-the-year bonus | Skip on LP. Save for `/apps/who-said-it`. |
| Chronological arc | One micro-caption under the demo: *"20 messages, first date to last week."* |
| Keepsake chapbook | Handled by the shared homepage keepsake language, not repeated here. |

### 2c. Suggested LP copy for `DemoSectionTwo`
Already drafted in `lp-v3-suggestions.md` § 3b — keep the heading (*"Guess the sender. Loser buys the next round."*) and subhead. Add one line under the demo, after the final reveal card:

> *On the night: 20 messages, chronological. Side-vs-side scoring on the big screen. One passkey-locked round the parents don't get to see.*

That single sentence covers **volume, structure, big-screen mechanic, and the spicy round** — every data category from § 1 above, without expanding the demo footprint.

### 2d. Rule-of-thumb: what NOT to put on the LP
- No sign-up form preview (belongs on the app page).
- No leaderboard interactions (static mock only).
- No MC inter-round commentary (too meta for a first-time visitor).
- No reaction taps (♥ / 😂) — cognitive cost > payoff at this length.

---

## 3. On its own `/apps/who-said-it` page

Follows the section skeleton in `zz/info/mkting-page-structure-shorter.md`. This is where every data point from § 1 gets its moment. Below is an app-specific expansion of each section.

### Section 1 — Hero
- **Headline suggestion:** *"The room votes. The couple squirms. Grandma wins."*
- **Subhead:** *"20 real texts and photos from your relationship. Blurred sender. Your guests guess — his side vs her side vs the people who introduced you."*
- **Visual:** phone mockup showing one blurred-sender screen + a peek of the two big vote buttons.
- **CTA:** *Book this app — $2,000*

### Section 2 — The Scene
Written as one wedding-day paragraph — dinner course, MC picks up the mic, screens light up, first message appears. End on the specific promise: *"Nobody looks at their phone for more than five seconds at a time. Everyone looks at everyone else."* Cover: setting (dinner, post-toasts), guest action (one tap), room-level effect (collective laugh).

### Section 3 — How It Works (three columns)
1. **You send us the material** *(90 min of couple time, ideally over a shared bottle of wine)*
   Screenshots, photos, memorable one-liners, plus a rough date on each. We handle the layout and chronology.
2. **Guests scan the QR at their seat**
   Enter name, tap **his side / her side / both**, add relationship (from a preset list — bridesmaid, groom's coworker, aunt, etc.). Done in 20 seconds.
3. **You keep the archive**
   A private URL of every message, every vote, every score — plus a printed A5 card with the family-vs-family final tally, mailed with your thank-you notes. Full chapbook available as an add-on if you want the physical version.

### Section 4 — What's on the Big Screen
The load-bearing section. Show a mock display frame with:
- The current message (blurred sender)
- Live vote tally bars filling in real time
- Corner leaderboard: *His Side 34 · Her Side 31 · Mutual 28*
- A "streak" callout: *"🔥 Aunt Denise: 5 in a row"*
Caption: *"The screen is the show. Phones are just the buzzer."*

### Section 5 — Every question type (new section, unique to this app)
This is where the full § 1b inventory finally gets to breathe. Suggested layout: **4 tiles, one per type**, each with a small phone-mockup and 1–2 sentences.

1. **Texts** — *"The 20 messages that got you here. Blurred sender. Two taps to guess."*
2. **Photos** — *"A blurry photo of a genuinely terrible lasagna. Whose kitchen? Vote."*
3. **Spoken quotes** — *"The line your dad said the first time he met her. Was it him — or was it her dad?"*
4. **Bonus layers** — *"After each vote, an optional 'guess the year' slider. Or the room votes on the context. Extra points for the brave."*
5. **The spicy round** *(distinct card, styled as locked)* — *"Six messages the parents don't get to see. Passkey shared at the friends' tables only. Fully skippable."*

### Section 6 — Family-vs-family scoreboard (new section)
One full-width visual: mocked-up leaderboard split three ways (His / Hers / Mutual), plus a smaller inset showing the **individual leaderboard**. One line of copy:

> *We built this app because "who knows the couple best" is the funniest ongoing question at every wedding. Now it has a scoreboard.*

Optional micro-detail: *"Sub-leaderboards for any group you name — the college crew, the coworkers, the neighbours who watched you fall in love from across the hall."*

### Section 7 — The chronology (new section)
A horizontal scroll or a stacked timeline mock: message 1 (first-week flirty) → message 20 (last week's grocery list). One sentence:

> *Chronological order matters. Guests hear your voice change across 4 years in 10 minutes. Nobody plans that arc — it just happens when you line the messages up.*

### Section 8 — Is This You?
Three bullets, self-select:
- You have a group chat, a screenshot habit, and at least one legendary text neither of you will ever live down.
- Half the room would say *"honestly, how are you two together"* — affectionately.
- The idea of your uncle reading your text messages doesn't make you flinch. *(If it does — see the spicy round setting.)*

### Section 9 — Why not paper? *(the § 6 pattern from `lp-v3-suggestions.md`)*
The honest verdict from `app-who-said-id.md`:
> *"A card-based reveal is very close to as fun."*
Say it plainly. Then say what the app adds: **the family-vs-family leaderboard, the real-time 'room agrees' stat, the streaks, and the digital archive.** Verdict: *"Worth the app if you want the live scoreboard and the family-vs-family bragging rights. Otherwise a good MOH with a deck of cards gets you 80% of the way."* This candor is on-brand (rule #6).

### Section 9b — Make it yours (new section — the "custom" pillar, load-bearing)
Everything on this page is a **starting point**, not a spec. Because Wepho builds each app from scratch, every element is negotiable:

- **Content:** don't like text screenshots? We can build the whole thing around voicemails, handwritten notes, or 20 photos of the same broken kitchen appliance you keep sending each other.
- **Flow:** don't want three-way scoring? Do individual only, or bride's-team-vs-groom's-team, or "everyone vs the couple." Don't want a spicy round? We remove it entirely.
- **Reveal mechanic:** the two-tap vote can become a slider, a ranking, or a "confidence bet" where points scale with how sure you were.
- **Big-screen output:** we design the display to match your venue — dark room with the screen as centerpiece, or ambient side-screens, or a projection on the dance floor.
- **Bring your own twist:** most couples do. One booked this app but replaced texts with lines from their favorite sitcom that either of them had quoted at each other in the wild. Another used only messages from their group chat with the wedding party — team-guess-team.

Small copy tag at the end: *"This app template exists because it works. Yours won't look exactly like it. That's the point."*

### Section 10 — Setup effort & content requirements (new section, app-specific)
Named early because it's the biggest hidden ask.
- **Time from you:** ~90 min curating messages, plus 15 min per bonus round.
- **We handle:** blurring sender bubbles, iMessage/Android styling consistency, chronology, spicy-round separation, the passkey UX.
- **Optional:** a 10-min call with the MC to draft the inter-round commentary.

### Section 11 — Book It · FAQ
Standard structure (from `mkting-page-structure-shorter.md`). App-specific FAQ items:
1. *What if a guest gets a message wrong that's obviously their own text?* — We flag it for you before the night; you can pull it or leave it in (comedy gold either way).
2. *Can we skip the spicy round entirely?* — Yes, one setting, no code exists.
3. *Can parents / grandparents opt into a lighter track?* — Yes; on sign-up, "over 65" gets a shorter set unless they toggle in.
4. *Do we get the raw vote data?* — Yes, part of the keepsake archive.

---

## 4. Data-point → placement matrix

Quick reference for the copywriter/designer.

| Data point | LP demo | LP micro-caption | App page section |
|---|---|---|---|
| Sign-up: name | — | — | § 3 col 2 |
| Sign-up: side | — | — | § 3 col 2, § 6 |
| Sign-up: relationship | — | — | § 3 col 2, § 6 (sub-leaderboards) |
| Texts | ✅ shown | — | § 5 tile 1 |
| Photos | ✅ 1 example | — | § 5 tile 2 |
| Spoken quotes | — | — | § 5 tile 3 |
| Guess the year | — | — | § 5 tile 4 |
| Guess the context | — | — | § 5 tile 4 |
| Spicy round | — (locked tile) | ✅ | § 5 spicy card, § 11 FAQ |
| MC inter-round comments | — | — | § 10 optional |
| Per-question % correct | ✅ 1 line reveal | — | § 4 |
| Family-vs-family scoreboard | ✅ static mock | ✅ | § 4, § 6 |
| Individual leaderboard | — | — | § 4, § 6 |
| Streaks | — | — | § 4 |
| "Room agrees" stat | — | — | § 9 (what the app adds) |
| Reaction taps | — | — | *(skip — kill this feature or defer)* |
| Chronological arc | — | ✅ | § 7 |
| A5 printed card (default) | — | — | § 3 col 3, § 9 |
| Chapbook (paid add-on only) | — | — | § 10 |
| Family-vs-family final card | — | — | § 3 col 3 |
| "Who knew you best" award | — | — | § 6 optional |
| Digital archive URL | — | — | § 3 col 3, § 11 FAQ 4 |

---

## 5. Improvement suggestions vs the original thoughts

The user's raw notes (`app-who-said-id.md`) are all solid. These are additions and one gentle pushback.

### 5.1 Keep exactly as-is
- **Sign-up: name + side + relationship.** The three-field combo is the whole reason the family-vs-family scoreboard has any texture — don't trim it. *Especially* keep "relationship to couple" — it unlocks the sub-leaderboards in § 6.
- **Mix of photos + statements, not just texts.** This is the most under-appreciated line in the notes. It quadruples the content variety with zero UX cost. Feature it as its own tile on the app page (§ 5 tile 2 and 3).
- **Admin app for page-switching.** Correct and non-negotiable. The couple (or MOH) needs a physical button to advance rounds, or the pacing dies.
- **Spicy round behind a passkey.** Elegant — inclusion via exclusion. Don't water it down to "everyone can see but it's marked spicy." The gate *is* the mechanic.
- **Running scoreboard on the big screen.** The single most load-bearing feature. Center the entire app page around it (§ 4 and § 6).

### 5.2 Add / expand
1. **Split the scoreboard three ways, not two.** The notes say "his family, her family, mutual friends" — perfect, keep it three-way. Do *not* let this collapse into "his side vs her side." Mutual friends being their own team is the diplomatic masterstroke — it means the group of people who *introduced* the couple can win, which is the emotionally right outcome as often as not.
2. **Add sub-leaderboards by relationship type.** Because sign-up already collects "relationship to couple," you get *"the college crew: 6/10"* almost for free. Cheap to build, high comedic value.
3. **Add an individual leaderboard and streak callouts.** The notes only mention the aggregate family scoreboard. Individual streaks (*"🔥 Aunt Denise, 5 in a row"*) are where the personal-brag moment lives.
4. **Order the messages chronologically** (already in notes) but **surface the arc explicitly** — one micro-caption on the LP, one section on the app page. Right now it's a hidden delight; it should be a named feature.
5. **A lightweight physical keepsake — not a book.** *(Revised after user feedback: the chapbook idea is oversold — the couple already has their texts, and a book of them isn't inherently fun to re-read.)* Instead default to an **A5 printed card** with the family-vs-family final score, the "who knew you best" award winner, and one signature line each from the winners' voting rounds. Cheap to produce, mailed with thank-you notes, and fills the "keepsake outlives the flowers" slot from `lp-v3-suggestions.md` § 7 rule #5 without pretending a book of your own texts is a book you'd open twice. Offer the full chapbook as a paid add-on for couples who explicitly want it — don't lead with it.
6. **A pre-wedding review flow.** The couple must be able to see every message in a single dashboard before the night — no surprises on the big screen. This is table stakes for the "You curate everything" rule (`lp-v3-suggestions.md` § 7 rule #3). The notes don't mention it; add it as a hard requirement.
7. ~~**A soft "over 65" toggle** on sign-up.~~ *(Withdrawn after user feedback: pacing is steered by the admin, not per-guest. Everyone sees the same message at the same time — a "shorter set for grandparents" doesn't fit the mechanic. If we want to make it grandma-friendly, do it at the UI level for everyone: big vote buttons, high-contrast text, no timers on the phone side. Grandma-proof is a design constraint, not a toggle.)*
8. **MC inter-round commentary as a tool, not a surprise.** The notes say "in between extra comments sometime" — vague. Sharpen it: give the MC a small script that Wepho drafts with the couple, so the between-round patter is actually funny and not just filler.

9. **Lead with the "anything is possible" framing.** *(Added after user feedback.)* Because Wepho is a custom studio, everything on the app page is a template, not a spec — content type, scoring model, reveal mechanic, big-screen design, spicy round, keepsake output. All of it is negotiable. Give this its own section on the app page (§ 9b above: *"Make it yours"*) with concrete swap examples ("replace texts with voicemails," "bride's-team vs groom's-team instead of three-way," "sitcom lines instead of your own messages"). This is arguably the most important section on the whole page — it's the entire reason Wepho exists rather than a SaaS product. Every other app page should get the same treatment.

### 5.3 Gentle pushback
1. **The "Non-app version" verdict in the notes is right — take it seriously on the page.** *"A card-based reveal is very close to as fun."* Don't hide this. Put it in the § 9 "Why not paper?" section. It makes the "we'll talk you out of an app" positioning (rule #6) real, and it *increases* the conversion rate of the couples who do book — because they're booking with clear eyes.
2. **Consider dropping reaction taps (♥ / 😂).** They add UI complexity, split guest attention between voting and reacting, and dilute the one-tap-and-look-up promise. The room's own laughter is the reaction layer. Don't build a screen version of it.
3. **Cap the message count at 20 (as noted) — resist scope creep to 30+.** 20 is roughly 10 minutes at 30 seconds per message. 30 is 15 minutes, which is where the "phone-in-phone-out" promise starts to strain. If the couple has more material, it goes in the chapbook, not on the night.
4. **"Guess the year" should be a bonus layer on some questions, not its own round.** The notes hint at this already ("Bonus rounds"), but be explicit — a separate "guess the year" round doubles the runtime for a one-note joke. Sprinkle it, don't stack it.
5. ~~**"Spicy round shared at friends' tables" — clarify the failure mode.**~~ *(Withdrawn after user feedback: overthinking it. The right framing is simply "enter on your own responsibility." If Uncle Bob wanders over and types in the code, that's his problem. The couple chose which messages go in the spicy round, and by putting a code on it they've already communicated the risk. No admin kill-switch needed — trust the guests.)*

---

## 6. Open questions for the copywriter / designer

1. Should the LP demo end with the family-vs-family mock, or with the *"you just used the app for 22 seconds and laughed twice"* stat card from `lp-v3-suggestions.md` § 3b? Recommend: **the stat card**, because it lands the meta-pitch. Save the leaderboard mock for the app page.
2. On the app page, should § 4 (big screen) or § 5 (question types) come first? Recommend: **§ 4 first.** The big-screen mock is the thing that makes the entire app make sense. Everything else is fuel for what happens on that screen.
3. How much of the chapbook keepsake should be shown on the app page vs. saved for a general "keepsakes" page? Recommend: **one paragraph and one photo here**, plus a link to the (future) keepsakes page. Don't build the whole story twice.

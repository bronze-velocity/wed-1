# "Moodboard Your Reception App" — Feature Brainstorm

## The Core Idea

A free tool on the Wepho site where a couple answers visual + freeform questions about themselves and their guests, and the tool matches them to app ideas — including ones they'd never have thought to ask for. Output is a styled, shareable "brief" they can send to us or their planner. The tool is the sales conversation.

---

## Input Side: Getting to Know Them

### Category 1 — The Couple's Vibe

**Visual tap-cards** (pick up to 3 — images or illustrated scenes, not words):
- Dinner party that got out of hand
- A film premiere with a red carpet
- A pub quiz at midnight
- A gallery opening with wine
- A bonfire with guitars
- A rooftop with city lights
- A Sunday brunch that stretched into evening
- A house party where everyone ended up in the kitchen

**Why cards, not sliders:** couples react to images faster than they answer abstract questions. The image carries tone, energy, age-of-guests, and venue vibe simultaneously.

---

### Category 2 — The Guests

**Visual tap-cards** (pick all that apply):
- "My grandmother will be there and she's the life of the party"
- "Half the room has never met the other half"
- "Our friends will do literally anything"
- "There are kids running around"
- "Everyone knows everyone already"
- "There's a whole table of coworkers who don't know us well"
- "Our families are from different countries"
- "The age range is 8 to 85"

**Freeform field:** "Describe your guest list in one sentence — who are these people to you?"
- Placeholder: *"My college friends, her enormous Italian family, and about 40 people I've never met"*

---

### Category 3 — The Moments They Care About

**Tap-cards for timing** (checkboxes, pick the moments they want to activate):
- Cocktail hour — people are loose, still mingling
- Dinner — everyone's at their table, something to do between courses
- First dance / speeches — emotional peak of the night
- After dinner — energy drop, people need a hook to stay
- Late night / dancing — wildcard crowd, anything goes

**Freeform field:** "Is there a specific moment you want guests to remember forever?"
- Placeholder: *"The moment after our first dance when the whole room cheers"*

---

### Category 4 — What the Couple Wants to Feel

**Tap-cards** (pick 2):
- "I want to cry (the good kind)"
- "I want everyone laughing at the same thing"
- "I want the room to feel like a show"
- "I want strangers to become friends"
- "I want a keepsake from every person there"
- "I want something nobody's ever seen at a wedding before"
- "I want our story to be the main character"
- "I want my guests to actually put their phones down and pay attention"

---

### Category 5 — The Couple Themselves

**Freeform fields** (short answers, shown one at a time — feels like a quiz):
- "How did you meet? One sentence."
- "What's a joke or reference that only your people would get?"
- "What's the most 'you' thing about your relationship?"
- "If your wedding had a movie genre, what would it be?"
- "What would make you say 'that was so us' the next morning?"

**Hidden signal these fields capture:** content fodder for Who Said It, Love Letters, Trivia, Oracle, etc. — these answers seed the actual custom app build.

---

### Category 6 — Wildcard / Energy Pulse

**Single visual question** — pick the image that feels like your reception:
- A slow pan across a candlelit table
- A phone screen lighting up a dark room
- A crowd going quiet all at once
- A room full of people pointing at the same screen
- Someone crying at a table trying to hold it together
- A flash mob nobody saw coming

---

## The Database Side

### The "Known" App Catalog
The 12+ Wepho apps, each tagged with:
- Vibe signals (funny, emotional, social, show-stopping, quiet)
- Moment fit (cocktail, dinner, post-dinner, late-night)
- Guest profile fit (large mixed crowd, close-knit, multigenerational, strangers)
- Couple-story dependency (low: Wedding Bingo / high: Who Said It)
- Energy requirement (passive: Love Letters / active: Trivia)
- Wow-factor type (collective: big-screen reveal / intimate: private message)

### The "Hidden" Idea Bank
Ideas that don't have a full product page yet — wilder, more niche, more experimental. Unlocked only when the moodboard signals something unusual. Examples:
- **The Parallel Universe** — guests submit what would have happened if the couple never met; revealed on the big screen with a vote
- **The Roast Draft** — guests nominate the couple's most embarrassing moments; the couple selects which ones survive to the big screen
- **The Table Treaty** — two tables who don't know each other get a shared challenge; the winner gets bragging rights on the wall
- **The Time Delay Message** — guests record a video for the couple to watch on their 10th anniversary, sealed live on the night
- **The Last Song Standing** — guests vote off songs from a playlist in real time until one survives; it becomes the actual final song of the night
- **The Venue Oracle** — based on the venue address, guests get a question about what happened there before ("What do you think this building used to be?")
- **The Confession Wall** — anonymous confessions from guests, moderated and revealed one at a time by the MC
- **The Guest Bracket** — bracket-style competition where guests vote on which memory of the couple is the most iconic

These are shown only when the moodboard score tips into "unusual," "adventurous," or "wants something nobody's seen before."

---

## The Matching Logic

### Signal Weighting
Each input card / freeform answer contributes signals:
- Energy level (low → high)
- Story-specificity required (generic → personal)
- Guest participation style (passive → active)
- Wow-moment type (individual → collective)
- Couple-centricity (couple is the show → guests are the show)

### Match Score Per App
Each app gets a running match score based on the couple's inputs. Above a threshold → shown. Far above → shown first with a "This sounds like you" badge.

### The Hidden Tier Unlock
If 3+ "wildcard" or "nobody's ever seen this" signals appear → unlock the hidden idea bank. Display as a separate section with different visual treatment — "Ideas we don't usually show people."

### Freeform Field Processing
Two options:
1. **Simple keyword matching** (no AI) — scan for keywords ("laugh," "cry," "grandma," "strangers," "roast," "surprise") and increment signal scores accordingly. Fast, free, deterministic.
2. **LLM matching** (Claude API) — send freeform answers to Claude with the app catalog as context; ask it to score fit and generate a one-sentence "why this feels like you" explanation per recommended app. Richer output, costs ~$0.01–0.05 per session.

Recommendation: ship with keyword matching, upgrade to Claude matching once traffic proves the tool.

---

## Output Side: The Visual Brief

### What They See After Completing the Moodboard

A styled results page (or inline reveal) with:

**Top section — "Your reception, in three words"**
- Auto-generated from their tap-card selections: "Funny. Surprising. Yours."
- Big, serif, centered. Screenshot-worthy.

**Middle section — "Apps that feel like you"**
- 2–3 cards, each with:
  - App name + one-line tagline
  - A "why this fits you" sentence (either templated or Claude-generated)
  - A mocked big-screen moment (what the room would actually see)
  - A link to the full app page + a "Tell us you want this" CTA

**Hidden tier section (if unlocked)**
- "We don't usually show people these." Dark background, different type treatment.
- 1–2 wild ideas with "This one's never been built before" framing
- CTA: "If this excites you, tell us. We'll figure it out together."

**Bottom section — "Your brief"**
- A sharable summary card: couple's freeform answers + their selected vibes + recommended apps
- "Download as PDF" or "Copy link to share with your planner"
- The brief is the lead — it goes to us when they hit "Book a call"

---

## Creative Interaction Ideas

### Progressive Reveal
- Don't show all categories at once — one card deck at a time, with a progress pulse ("3 of 6")
- After each section, flash a micro-preview of where their brief is heading ("Sounds like you might love something with a big reveal moment...")

### Swipe / Tap Micro-interactions
- Cards animate in like physical cards being dealt
- Selected cards get a colored ring and slide to a "your picks" tray at the bottom
- Rejected cards flip away

### Live Brief Preview (sidebar or bottom drawer on desktop)
- As they select, a styled brief builds in real time in a panel beside the cards
- Watching it populate creates investment — they want to finish

### "Add your own" Escape Hatch
- After every category: a freeform "none of these / something else entirely:" field
- Respects that some couples are genuinely outside the taxonomy

### Partner Mode
- "Doing this together? Share a link and compare your picks."
- Both partners complete independently; the output shows where they overlapped and where they diverged
- Divergence is a feature ("You both picked 'surprise the room' but disagree on energy level — here's what that tension could become")

---

## Sales Funnel Integration

- The tool is gated only at the output — anyone can complete the moodboard, but the shareable brief + "book a call" CTA require an email
- The brief they submit is the actual intake form — no separate questionnaire needed
- A completed brief in our inbox is a warm lead with context; we can open with "We looked at your brief — here's what we'd build"
- If they don't complete, we have partial signal from what they tapped (cookie/session) — retarget or follow up via email if captured

---

## Open Questions / Decisions

1. **One long-scroll flow vs. multi-step wizard?** Wizard feels more quiz-like and less overwhelming; scroll feels faster on mobile. Probably wizard.
2. **Images vs. illustrated cards?** Real photography creates instant aesthetic resonance but requires a shoot. Illustrations give more control but feel less premium. Consider illustrated cards with a photo background layer.
3. **Claude matching at launch or post-PMF?** Keyword matching is good enough to validate. Claude adds the "why this feels like you" copy that makes the output feel magical — worth adding early.
4. **How many apps in the hidden tier?** Start with 3–5. The scarcity is part of the value ("we don't show everyone these").
5. **Partner mode at launch?** Probably too complex for v1 — but design the data model so two sessions can be merged later.
6. **Where does the tool live?** `/moodboard` as its own route, linked from nav and homepage hero. Could also embed a teaser on the homepage that links there.

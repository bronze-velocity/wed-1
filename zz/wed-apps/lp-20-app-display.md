# 4 Alternatives: Displaying the 20 App Types

*Goal: Make 20 app types explorable, clear, and fun — both as a landing page section and a standalone gallery page.*

---

## Alternative 1 — "What Kind of Wedding Do You Want?"  
**Concept: Vibe-first filtering**

The couple doesn't think in terms of product features — they think in feelings. Start with the feeling they want to create, and let the apps reveal themselves.

### Landing Page Section

A bold prompt appears: **"What kind of wedding do you want?"**

Below it, 4–5 large clickable mood tiles:

| Tile | Icon | Apps it unlocks |
|------|------|-----------------|
| **Make them laugh** | 🎭 | Bingo, Roast Board, Parallel Universe, Unpopular Opinions, Cocktail Quiz |
| **Make them cry (in a good way)** | 💌 | Time Capsule, Unprompted Love Letters, Emotion Pulse, Origin Story Exhibit |
| **Get them talking to each other** | 🗣️ | Table Conversation Starters, Table Relay, Bucket List, Guest Memory Map |
| **Create a keepsake they'll actually keep** | 🗄️ | Prediction Vault, Collaborative Playlist, Future Home Map, Advice Oracle |
| **Make it a proper event** | 🎤 | Live Trivia, First Dance Ballot, Scavenger Hunt, Roast Board |

When a tile is clicked/hovered, a cluster of 4–5 small app cards fans out below it — each with a one-line pitch and a "learn more" link. One tile is pre-selected on load so the section isn't empty on arrival.

This section sits mid-page, after the hero and the "how it works" explainer. It's the moment the couple starts imagining their own wedding.

### Dedicated Gallery Page (`/apps`)

Same 5 mood tabs persist as a sticky top nav. Below: a **full card grid** (20 cards, 3-across on desktop, 2-across on mobile). Each card:

- App name + one-line pitch (above the fold of the card)
- A visual — either a custom illustration or a screenshot of the app in the phone mockup
- A "vibe tag" (one of the 5 mood labels, color-coded)
- Clicking opens a full-page drawer: pitch, "what makes it wow," what the keepsake is, and a mini phone mockup

Active filter highlights matching cards; non-matching cards desaturate (don't disappear — this way couples see the full 20 and aren't confused by items vanishing).

**Why it works:** The vibe metaphor maps directly to how couples make decisions. "We want a fun night, not a tearjerker" is a real choice. The filtering doesn't hide anything — it just prioritizes.

---

## Alternative 2 — "Pick Your Moment in the Day"  
**Concept: Wedding-day timeline as navigation**

Couples plan by moment, not by product. They think: "what happens during cocktail hour?" This layout meets them where they are.

### Landing Page Section

An **animated horizontal timeline** of the wedding day:

```
[Guests Arrive] → [Ceremony] → [Cocktail Hour] → [Dinner] → [Speeches] → [Dancing]
```

Each phase is a dot/node on the line. Hovering (or tapping) a node slides up a small tray showing 2–3 app cards relevant to that moment. For example:

- **Cocktail Hour** → Scavenger Hunt, Origin Story Exhibit, Conversation Starters, Cocktail Quiz
- **Dinner** → Parallel Universe, Bucket List, Advice Oracle, Memory Map
- **Speeches** → Roast Board, Love Letters, Prediction Vault reveal
- **Dancing** → Bingo, Emotion Pulse, Collaborative Playlist, First Dance Ballot

The tray shows just the app name + a one-sentence hook. "See all apps for this moment →" links to the full page.

On desktop: the timeline is wide and horizontal, cards slide up below. On mobile: the timeline collapses to a vertical step-list that users scroll through.

### Dedicated Gallery Page (`/apps`)

The timeline runs vertically down the page — a full-bleed wedding day narrative structure. Each phase is a **section heading** with a subtitle like *"Cocktail hour — when guests are mingling but the couple is still in photos."*

Under each heading, full app cards expand. The page reads like a timeline: scroll down and you travel through the day. Each card:

- Name + pitch
- What guests are doing at this moment (the context that makes this app make sense)
- Phone mockup or illustration
- What the couple gets to keep
- A "this sounds like us" save/bookmark button (saved to a shareable shortlist URL)

At the bottom: a **shortlist builder** — "You've saved 3 apps. Email yourself the list." This drives leads naturally.

**Why it works:** It reframes 20 options as a curated wedding-day schedule rather than a product menu. Couples stop asking "which one do I want?" and start asking "which moment do I want to enhance?" That's a much easier question to answer.

---

## Alternative 3 — "Try It in Your Hands"  
**Concept: Interactive phone demo for each app**

Most couples can't visualize a web app from a description. Show them. Let them actually tap through what their guests would experience.

### Landing Page Section

A **hero-level featured app demo** — one rotating app (e.g., Live Trivia) shown inside a phone mockup frame. Visitors can:

1. Tap through a 3-screen stripped demo (question → answers → leaderboard)
2. See their "guest name" already pre-filled as if they're at the wedding
3. Hit a real button and see a fake response

Below the phone: "20 apps like this, all fully custom for your wedding." A row of 5–6 small app name chips act as tabs — clicking one swaps the demo in the phone. This keeps the section compact while conveying the full range.

A subtle "Currently showing: Trivia — tap to explore others →" label prevents confusion.

### Dedicated Gallery Page (`/apps`)

A **split-screen layout**: left side is a scrollable list of all 20 apps (name + one-liner); right side is a persistent phone mockup frame. Clicking any app in the list loads its demo into the phone.

Each demo is:
- **3–5 screens deep** — enough to understand the flow, not enough to over-explain
- Pre-populated with fictional couple data (e.g., "Emma & James, June 2026")
- Interactive — buttons respond, votes tally, cards flip — but looped/canned (no backend needed)

At the end of each demo: "Would this be so you? → Book a call" CTA.

On mobile: the split screen collapses to a vertical list of app cards. Each card has a "try demo" button that opens a full-screen phone frame overlay.

A sticky top bar shows: "You just tried: Trivia, Bingo, Time Capsule. Want a custom build? →"

**Why it works:** A 30-second tap-through does more than 200 words of copy. Couples show the demo to their partner and say "look at this one." The phone mockup frame anchors the product: this is a phone app, accessed on the night, by real guests. Nothing else communicates that as clearly.

---

## Alternative 4 — "Let the Story Sell It"  
**Concept: Scenario-led narrative cards**

Each app is introduced not as a product but as a scene. "It's 7pm. Dinner's just been served. Your groom's college friends don't know anyone at their table..."

### Landing Page Section

A **full-width cinematic card** that autoplays through 3–4 scenes, one every 8 seconds (or on swipe/click). Each scene:

- A big ambient headline: *"It's cocktail hour. Half your guests don't know each other."*
- A one-sentence resolution: *"Your scavenger hunt gives them a reason to explore together — and each stop is a chapter of your love story."*
- A faint phone mockup visible in the background (not interactive — just visual texture)
- App name small at the bottom, like a caption

The transition between scenes is a dissolve or slide. Below the card: "20 experiences built for your wedding day. →"

This section is emotional and cinematic — it sells the *feeling* before the feature.

### Dedicated Gallery Page (`/apps`)

A **magazine-style editorial layout** — not a grid, not a table. Each app gets a "story card" that looks like an article spread:

- Left column: the scenario ("Picture this...") in a large editorial font
- Right column: app name, pitch, what guests do, what the couple keeps
- A thin color accent or illustration that varies per app type (funny apps get warmer colors; emotional apps get cooler, softer ones)
- Apps alternate left/right layout for rhythm

At the top: a **search/filter bar** with two controls:
1. A "feeling" filter: Funny / Emotional / Social / Romantic
2. A "when" filter: Arrival / Cocktail Hour / Dinner / Speeches / Dancing

Filtering animates — matching cards stay full-color, others fade to 20% opacity and collapse vertically.

A "this sounds like us" heart icon on each card adds to a shortlist. The shortlist is accessible via a floating drawer — "3 saved → see list."

**Why it works:** Narrative copy is Wepho's strongest asset — the product descriptions in `niche-custom-wedding-apps.md` are already written in this voice. This layout lets that copy do its job instead of flattening it into a spec table. The magazine format also signals premium and editorial, consistent with a $2,000 custom product.

---

## Recommendation

**Start with Alternative 3** (interactive phone demo) for the landing page hero — it's the fastest route from "I'm curious" to "I get it." Pair it with **Alternative 1** (vibe filtering) for the `/apps` gallery page, since couples browsing the full list need an emotional entry point more than a demo for all 20. The timeline (Alternative 2) can live as a secondary filter on the gallery page once that page is built.

Alternative 4 is strongest as the *between-sections* copy pattern throughout the landing page — short cinematic story beats between the hero, the social proof, and the CTA — rather than a standalone section.

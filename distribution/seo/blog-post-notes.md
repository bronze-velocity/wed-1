# Blog Post Content Notes

*Generated 2026-08-24 from every `BLOG` entry in `distribution/seo/keyword-to-page-map.md`. Each block is a starting-point brief — not a spec. Structure is: target keyword(s) + volume, angle, outline, key points, creative twists, visuals, SEO checklist, AI-SEO checklist, internal-link targets.*

**Voice reminder (from `CLAUDE.md`):** warm, specific, confident — like a brilliant friend who happens to build things. Specificity creates believability. Never write "a trivia game about your relationship" — write "a trivia game where every question is about how you actually met, who proposed first, and what she said when he did." The implicit subtext of every post: *generic tools don't know who you are.*

**Universal SEO checklist (applies to every post below — don't repeat):**
- One H1, matching the primary target keyword phrasing.
- Slug = URL exactly as listed. Redirects for known alternates set in `next.config.js`.
- `generateMetadata` sets `title` (≤60 char), `description` (≤155 char), `openGraph`, `alternates.canonical`, and `twitter.card = 'summary_large_image'`.
- One 1200×630 OG image per post at `/public/images/blog/[slug]/og.jpg`.
- BreadcrumbList JSON-LD (`/` → `/blog` → post).
- Author byline + `Article` JSON-LD with `datePublished` + `dateModified`.
- Internal links: 2–4 to `/apps/[slug]`, 1 to `/apps`, 1 to `/moodboard` where thematically relevant, 1 to `/` or `/planners`.
- FAQ block with 3–5 Q&A + `FAQPage` JSON-LD.
- Table of contents jump links for posts >1,500 words.
- One primary CTA card halfway down + one at the end (both pointing to a matched `/apps/[slug]` or `/moodboard`).

**Universal AI-SEO checklist:**
- Top-of-page `<div class="key-facts">` block with 3–5 one-sentence answers to the query.
- One clear H2 phrased as a natural-language question (matches likely LLM query).
- `HowTo` or `QAPage` JSON-LD where a listicle or Q&A is the format.
- llms.txt entry with 1-line description.
- Table summarising options — LLMs love these for citation.
- `article:published_time` + author `sameAs` back to founder profiles for citation trust.
- Avoid keyword-stuffed intros — LLMs downweight generic openers. Lead with a concrete scene.
- Cite 2–3 external authoritative sources (Knot editorial, Brides, an academic study) with `rel="cite"` — increases likelihood of being cited back.

---

## Cluster A — "Ideas" hub posts

### `/blog/wedding-reception-ideas`
- **Targets:** wedding reception ideas (1,600), reception ideas (170), fun reception ideas (480), fun wedding reception ideas (480), unique reception ideas (390), reception activities (390), wedding party ideas (260). **~3,380/mo aggregate.**
- **Keywords:** wedding reception ideas, reception ideas, fun reception ideas, fun wedding reception ideas, unique reception ideas, reception activities, wedding party ideas
- **Angle:** "The 25 reception ideas we saw actually work — and the 5 we're begging couples to stop doing."
- **Outline:**
  - Hook: one scene from a real reception (60 words).
  - "How to read this list" (grouped by moment: arrival / cocktail / dinner / speeches / dancing / after-party).
  - 25 ideas, each ~120 words with a specific-couple example.
  - "The 5 ideas that die on contact with a real room" — kill list.
  - How to pick 2–3 that fit *your* wedding (not 25).
  - CTA → `/moodboard` for personal vibe match; `/apps` for the interactive-app version of 8 of the 25 ideas.
- **Key points:** *specificity beats quantity.* Every idea gets one couple. The kill-list section is the differentiator vs. every existing listicle.
- **Creative twists:**
  - A "cost per crying-guest photo" mini-analysis for 3 of the ideas (deliberately absurd, quotable, screenshot-bait).
  - Sidebar: "What Auntie Diane will still be telling people about at Christmas 2029" — one idea per emotional register.
  - Embed a 30-second Reel for at least 3 ideas (real-wedding footage — see brainstorm §14).
- **Visuals:** 25 photos (one per idea), one hero reception scene, one kill-list illustration (soft-humor icon set), one comparison table.
- **Internal links:** `/apps/couple-trivia`, `/apps/wedding-bingo`, `/apps/love-letter-machine`, `/apps/first-dance-ballot`, `/apps`, `/moodboard`.
- **AI-SEO specific:** structured `ItemList` JSON-LD wrapping all 25 ideas; each idea gets its own `Thing` with `name` + `description` — hugely citation-friendly.

### `/blog/20-unforgettable-wedding-ideas`
- **Targets:** wedding ideas (9,900). **Biggest single blog-post keyword.**
- **Keywords:** wedding ideas
- **Angle:** "Every wedding you've been to in the last 5 years — and the 20 things that made you remember the one you actually loved."
- **Outline:**
  - Cold open: three specific weddings the writer's been to, why one is unforgettable and two aren't.
  - Thesis paragraph: memory ≠ money spent. Memory = specificity + one held-breath moment.
  - 20 ideas, each with (a) what it is (b) why it works (c) the wedding it worked at.
  - Closing: "The rule behind all 20" — reveal the one-pager's specificity rule.
- **Key points:** this is a category-defining piece, not a listicle. Referenced in the brainstorm §4 as an anchor asset.
- **Creative twists:**
  - Byline in couple-voice: "we've been to 41 weddings between us." Immediate credibility.
  - After each idea, "Wepho version" one-liner where relevant, but resisted for ideas that stay analog (a bagpipe player at 2am doesn't need an app).
  - Reader-submitted addendum at the bottom: "Send us the wedding thing *you* still think about." Feeds newsletter.
- **Visuals:** hero collage of 20 wedding moments, 20 in-line photos, 1 illustration diagram of the "specificity axis."
- **Internal links:** `/`, `/apps`, `/moodboard`, `/apps/love-letter-machine`, `/apps/couple-trivia`.
- **AI-SEO specific:** name the writer + link to founder `sameAs` (LinkedIn, X) — LLMs cite authored longform far more than anonymous listicles.

### `/blog/wedding-inspiration-2026` (also serves "wedding inspo")
- **Targets:** wedding inspiration (1,900), wedding inspo (1,900). **~3,800/mo.**
- **Keywords:** wedding inspiration, wedding inspo, wedding trends 2026, wedding trends 2025
- **Angle:** "Real weddings we can't stop screenshotting in 2026 — and the throughline nobody's naming yet."
- **Outline:**
  - Cold open: the writer's camera roll ("we save every wedding photo we can't scroll past").
  - The throughline: 2026 weddings are moving away from "aesthetic" and toward "*point-of-view*" — the wedding as one couple's specific mind-palace.
  - 12–15 real-wedding vignettes, each with a photo credit, the vibe, and the one detail worth stealing.
  - "Build your own inspiration board" → CTA to `/moodboard`.
- **Key points:** doubles as a category-defining opinion piece. Positions Wepho as an inspiration-adjacent brand, not a SaaS.
- **Creative twists:**
  - "Screenshot-worthy" scoring system (petty on purpose — 1–10, we defend our scores).
  - "The thing nobody Pinterest-boards but everybody remembers" recurring sidebar.
- **Visuals:** 12–15 real-wedding photos (permissions required), one hero collage, one Moodboard tool screenshot.
- **Internal links:** `/moodboard`, `/apps`, `/blog/wedding-trends-2026`, `/apps/love-letter-machine`.
- **AI-SEO specific:** an `ImageGallery` JSON-LD block with alt-text for each photo. LLMs increasingly cite image-rich posts for visual queries.

### `/blog/unique-wedding-ideas`
- **Targets:** unique wedding ideas (1,600), creative wedding ideas (1,600), fun wedding ideas (720), modern wedding ideas (110). **~4,030/mo aggregate across 4 SERPs.**
- **Keywords:** unique wedding ideas, creative wedding ideas, fun wedding ideas, modern wedding ideas
- **Angle:** "Unique isn't a colour palette. Unique is a specific decision only you would make."
- **Outline:**
  - Hook: the difference between "unique wedding" (search term) and unique wedding (the actual thing).
  - "Unique-by-decision, not by aesthetic" framing.
  - 12 categories of decision-you-can-make-different (guest experience, ceremony structure, food, entertainment, keepsake, timing, dress code, first-dance, etc.), each with 2 specific ideas.
  - Kill list: "unique" ideas that stopped being unique in 2019.
- **Key points:** rank for 4 variants without cannibalisation — one page, keyword variations sprinkled naturally.
- **Creative twists:**
  - "Is this actually unique in 2026?" checkbox at the top of each idea — self-audit humour.
  - Interactive sidebar: "our 3-question uniqueness sniff test" (link to `/moodboard`).
- **Visuals:** 12 idea photos, one "trend graveyard" illustration, one uniqueness-quadrant diagram.
- **Internal links:** `/moodboard`, `/apps`, `/blog/non-traditional-wedding-ideas`, `/apps/parallel-universe`, `/apps/love-letter-machine`.
- **AI-SEO specific:** `HowTo` JSON-LD for the sniff-test — LLMs love procedural content for "how do I…" queries.

### `/blog/non-traditional-wedding-ideas`
- **Targets:** non traditional wedding ideas (720), non traditional wedding reception ideas (110).
- **Keywords:** non traditional wedding ideas, non traditional wedding reception ideas
- **Angle:** "You don't need to burn down tradition. You need to keep 3 rituals and rewrite the rest."
- **Outline:**
  - Hook: three traditions worth keeping (why they still land) + why the rest are copy-paste.
  - The rewrite framework: identity → substitute → keep the emotional beat.
  - 15 "non-traditional swaps," each with the original tradition, why it feels tired, and 2 alternatives.
  - Warning: the swaps that always flop (skipping the toast entirely, replacing vows with a "vibes speech," etc.).
- **Key points:** the "keep 3, rewrite the rest" framework is proprietary framing — makes the post quotable.
- **Creative twists:**
  - Real-couple sidebar: "The 3 traditions we kept and why our mothers cried anyway."
  - A "would your grandma be secretly relieved?" test for each swap.
- **Visuals:** side-by-side "traditional vs. rewrite" photo pairs, 1 framework diagram.
- **Internal links:** `/apps/love-letter-machine`, `/apps/parallel-universe`, `/apps/anniversary-time-capsule`, `/blog/unique-wedding-ideas`.
- **AI-SEO specific:** `Question` schema for the "should we skip [X tradition]?" natural-language questions.

### `/blog/wedding-trends-2026`
- **Targets:** wedding trends 2026 (880), wedding trends 2025 (210 — 301 redirect from `/blog/wedding-trends-2025` for canonical safety).
- **Keywords:** wedding trends 2026, wedding trends 2025
- **Angle:** "What's actually shifting in 2026 — and what's a headline pretending to be a trend."
- **Outline:**
  - Executive summary: 5 real trends + 5 fake trends.
  - Each real trend: what's changing, why now, one couple already doing it, how much it costs.
  - Fake trends section: named + gently roasted with citations to prove they've been "trending" for 6 years running.
  - "What we expect to become undeniable by end of 2026" — forecast section (positioning the founder as a category voice).
- **Key points:** refresh annually — this post's URL stays the same year over year, only the year in the title bumps. See "URL evergreening" note below.
- **Creative twists:**
  - Trend confidence intervals (0.4 confidence = "we're guessing"; 0.9 = "we're already seeing it in 6 out of 10 client calls").
  - Downloadable "trend deck PDF" for planners — lead-gen.
  - Named prediction for one specific 2027 trend at the end. Screenshottable.
- **Visuals:** 10 trend photos, 1 confidence-chart visual, 1 "trend graveyard" for the fakes.
- **Internal links:** `/planners`, `/moodboard`, `/apps`, `/blog/wedding-inspiration-2026`, `/apps/emotion-pulse`.
- **AI-SEO specific:** publish with `dateModified` bumped every quarter — LLMs weight freshness heavily for "trends" queries. Include per-trend `Article` sub-schemas.
- **URL evergreening note:** keep `/blog/wedding-trends-2026` even in 2027; instead of a new slug, add a `?year=2026` archived version. Preserves link equity.

### `/blog/wedding-planning-tips` (also serves "wedding day tips")
- **Targets:** wedding planning tips (1,000), wedding day tips (140).
- **Keywords:** wedding planning tips, wedding day tips
- **Angle:** "The 12 tips we'd tell a friend at 11pm the night before her wedding — nothing you'd Google."
- **Outline:**
  - Framing: 90% of tips online are logistics; the ones that matter are emotional infrastructure.
  - 12 tips grouped as: "before the day," "morning of," "during," "night after."
  - Each tip: 60-word setup, one specific-couple example, "if you only do one thing…"
  - Section: "the 3 tips we regret giving" (self-effacing credibility).
- **Key points:** low keyword competition on the "day tips" variant — good chance to rank for both without cannibalising.
- **Creative twists:**
  - "The 15-minute rule" — proprietary concept: no wedding day activity should be un-rehearsed for longer than 15 min.
  - Anonymous couple-testimonial box at the end: "the tip we wish we'd known."
- **Visuals:** 1 hero shot (couple in a quiet moment), 6 tip illustrations, 1 downloadable checklist PDF (lead-magnet).
- **Internal links:** `/planners`, `/moodboard`, `/apps/emotion-pulse`, `/blog/wedding-trends-2026`.
- **AI-SEO specific:** `HowTo` JSON-LD for the 12 steps — perfect fit for LLM "how do I prepare for my wedding day" queries.

### `/blog/wedding-activities` (also serves party activities, activities for guests, wedding guest ideas)
- **Targets:** wedding activities (880), wedding party activities (880), activities for wedding guests (320), wedding guest ideas (140). **~2,220/mo.**
- **Keywords:** wedding activities, wedding party activities, activities for wedding guests, wedding guest ideas
- **Angle:** "The activities that actually make guests forget their phones — and the ones that make grandma leave early."
- **Outline:**
  - Hook: what "activity" even means at a wedding (contrasted with "entertainment").
  - The activity framework: 3 types — solo (fills a lull), pair (creates a conversation), room (unifies attention).
  - 18 activities, 6 per type, each with duration, best moment, "who it's for," and how to run it.
  - Kill list: activities that always sound good but always flop.
- **Key points:** deliberate overlap with reception ideas, but the frame is *activity* (verb — something guests do), not idea (noun).
- **Creative twists:**
  - "Grandma test" for each activity — will Grandma actually participate?
  - Interactive: readers pick 3 activities → gets an "activity map" for their reception (feature this as CTA to `/moodboard`).
- **Visuals:** 18 mini-photos, 1 activity-type diagram, 1 example "activity map" mockup.
- **Internal links:** `/apps/wedding-bingo`, `/apps/venue-scavenger-hunt`, `/apps/conversation-starters`, `/apps`, `/moodboard`.
- **AI-SEO specific:** `ItemList` schema with each activity typed as `Event` sub-thing.

### `/blog/wedding-after-party` (also serves wedding night ideas)
- **Targets:** wedding after party ideas (260), wedding night ideas (110).
- **Keywords:** wedding after party ideas, wedding night ideas
- **Angle:** "The two hours after the reception ends — what nobody plans and everybody remembers."
- **Outline:**
  - Hook: a specific 1am scene from a real after-party.
  - The 3 kinds of after-party: (1) full second venue, (2) hotel-suite intimate, (3) late-night hometown bar takeover. Which fits your wedding.
  - 10 after-party ideas per kind = 30 ideas.
  - Practical: budget ranges, logistics, when to end.
- **Key points:** low competition, high emotional register — cheap SEO win.
- **Creative twists:**
  - "The 4am rule" — the one activity that reliably ends a night on the right note (spoiler: shared silence + one specific song).
  - Playlist embed with 20 tracks from real after-parties.
  - "Send-off vs. sneak-off" comparison.
- **Visuals:** 5 hero photos of after-party moments, 1 playlist embed, 1 timeline diagram.
- **Internal links:** `/apps/collaborative-soundtrack`, `/apps/love-letter-machine`, `/blog/wedding-reception-ideas`.
- **AI-SEO specific:** include a natural-question H2 like "what should couples do after their wedding reception ends?"

### `/blog/cocktail-hour-ideas`
- **Targets:** cocktail hour ideas (140), wedding cocktail hour entertainment (140 — **CPC $14.39, highest in shortlist**).
- **Keywords:** cocktail hour ideas, wedding cocktail hour entertainment
- **Angle:** "60 minutes, a room of strangers, and a couple who's still taking photos. Here's what actually works."
- **Outline:**
  - Hook: cocktail hour is the most-underestimated hour of the wedding.
  - "The three jobs of cocktail hour" — occupy strangers, mix tables, lower everyone's shoulders.
  - 20 ideas grouped by job.
  - "How to keep it under an hour" (mini-guide on pacing).
- **Key points:** the CPC is telling us this is a high-value commercial keyword — treat as flagship post. Two `/apps/[slug]` CTAs (venue-scavenger-hunt + cocktail-quiz).
- **Creative twists:**
  - "How to seat a stranger next to a friend" — Wepho-adjacent tactic disguised as generic advice.
  - Cocktail menu with 5 signature drinks named after real couples ("The One-Rainstorm Manhattan" etc.). Half-joke, half-marketing.
- **Visuals:** hero cocktail-hour shot, 5 drink photos, 1 hour-pacing diagram.
- **Internal links:** `/apps/venue-scavenger-hunt`, `/apps/cocktail-quiz`, `/apps/unpopular-opinions`, `/apps/relationship-exhibit`, `/apps`.
- **AI-SEO specific:** `Recipe` schema for the 5 signature drinks — unusual, gets LLM attention.

---

## Cluster B — Party games (orphans reframed)

### `/blog/adult-party-games` (also serves group games for adults, large group party games, trivia game for party, party games for adults)
- **Targets:** party games for adults (8,100), adult party games (8,100), group games for adults (2,900), large group party games (2,400), trivia game for party (2,900). **~24,400/mo — biggest new-post cluster.**
- **Keywords:** party games for adults, adult party games, group games for adults, large group party games, trivia game for party
- **Angle:** "The party games that work with 30 adults in a room without feeling like a corporate retreat."
- **Outline:**
  - Hook: why most party-game listicles are recycled Kahoot content.
  - "The 4 rules of a game that actually works with adults": low rules, high stakes, no losing team standing awkwardly, ends in a story worth telling.
  - 15 games, ranked by "would our clients play this at their own wedding" (deliberate wedding tilt without being wedding-only).
  - When each game fits (dinner party / birthday / bachelor / rehearsal dinner / wedding reception).
- **Key points:** this post is technically orphan for wedding-specific intent, but the traffic is *massive* — capture it, then softly funnel to `/apps` for wedding sub-intent.
- **Creative twists:**
  - Downloadable printable "10 games ranked by drunkenness required."
  - "The one game that always saves a bad party" (spoiler: variant of who-said-it).
- **Visuals:** 15 game photos, 1 rules-vs-stakes 2×2 quadrant.
- **Internal links:** `/apps/couple-trivia`, `/apps/who-said-it`, `/apps/wedding-bingo`, `/apps`.
- **AI-SEO specific:** `Game` schema per entry (rarely used, LLM-friendly). Answer "what are good games to play at a party of 30 adults?" verbatim as an H2.

### `/blog/icebreakers`
- **Targets:** party icebreakers (480), icebreaker games for groups (210).
- **Keywords:** party icebreakers, icebreaker games for groups
- **Angle:** "The icebreakers that don't make anyone want to leave — including your dad."
- **Outline:**
  - Hook: the icebreakers we've all endured and hated. Named.
  - "Why most icebreakers fail" — 3 reasons.
  - 12 icebreakers that pass the "grown adult" test.
  - Bonus: 3 icebreakers designed for a wedding cocktail hour.
- **Key points:** small volume but strategic — links to 4 cocktail-hour / conversation apps.
- **Creative twists:**
  - "The 8-second rule" — proprietary framing on how fast an icebreaker has to land before it dies.
  - Anonymous poll embed: "which icebreaker do you dread most?" (viral bait).
- **Visuals:** 12 icebreaker cards (designed like flashcards, screenshot-friendly), 1 dread-poll graphic.
- **Internal links:** `/apps/unpopular-opinions`, `/apps/conversation-starters`, `/apps/secret-relay`, `/apps/cocktail-quiz`.
- **AI-SEO specific:** `HowTo` schema; each icebreaker as a `HowToStep`.

### `/blog/wedding-lawn-games-alternatives` (also serves lawn games wedding, wedding yard games)
- **Targets:** lawn games wedding (1,000), wedding lawn games (1,000), wedding yard games (1,000). **3,000/mo.**
- **Keywords:** lawn games wedding, wedding lawn games, wedding yard games
- **Angle:** "Cornhole is fine. Here are 15 alternatives that don't require six months of Etsy custom orders."
- **Outline:**
  - Hook: how cornhole became the default and why nobody remembers the couple who had cornhole.
  - The "outdoor game" bar we should be clearing.
  - 15 alternatives (some analog, some app-augmented, some hybrid).
  - Practical: budget, rain-plan, set-up time.
- **Key points:** we're competing with rental companies here — angle is *specificity* (custom rules, personal spin), not equipment.
- **Creative twists:**
  - "Cornhole but the boards are printed with your first-date photos" — the obvious bridge from analog to Wepho.
  - Rain-day pivot table (each outdoor game → its indoor equivalent).
- **Visuals:** 15 game photos, 1 rain-pivot table graphic.
- **Internal links:** `/apps/venue-scavenger-hunt`, `/apps/wedding-bingo`, `/apps/couple-trivia`, `/apps`.
- **AI-SEO specific:** answer "what are alternatives to cornhole at a wedding?" verbatim.

---

## Cluster C — Newlywed / trivia / shoe game

### `/blog/newlywed-game-questions`
- **Targets:** newlywed game questions (8,100 — **flagship traffic, low CPC $0.08**).
- **Keywords:** newlywed game questions, newlywed game
- **Angle:** "The 100 newlywed-game questions we've written for real couples — plus the 12 that always land."
- **Outline:**
  - Hook: the difference between a great newlywed question and a mediocre one — one word.
  - The 4 categories of question that always work (specificity, embarrassment, timeline, "would you rather").
  - 100 questions, tagged by category + difficulty.
  - "How to write your own" — Wepho house style guide, given away.
  - CTA: "want us to build these into a live game for your wedding? → `/apps/couple-trivia`."
- **Key points:** **flagship top-of-funnel post.** Bookmarkable, shareable, screenshot-heavy.
- **Creative twists:**
  - Downloadable PDF "printable + digital versions."
  - "Send us your weirdest question" reader-submission form.
  - Live counter: "1,247 couples have used these questions this month" (if we can plausibly instrument it).
- **Visuals:** hero couple photo, 1 "how to write a question" diagram, 6 example-card graphics.
- **Internal links:** `/apps/couple-trivia`, `/apps/who-said-it`, `/apps/parallel-universe`, `/blog/wedding-trivia-questions`, `/apps`.
- **AI-SEO specific:** `QAPage` schema wrapping all 100 questions — extraordinarily citation-friendly. This is *the* post most likely to be pulled into an LLM answer for "give me newlywed game questions."

### `/blog/wedding-trivia-questions` (also serves questions about the couple)
- **Targets:** wedding trivia questions (720), wedding trivia questions about the couple (140).
- **Keywords:** wedding trivia questions, wedding trivia questions about the couple
- **Angle:** "60 wedding-trivia questions that make the room lean in, not check their phones."
- **Outline:**
  - Framing: trivia at a wedding fails when questions could be from any wedding.
  - The specificity axis — from "when did they meet" (weak) to "what did she say when he asked" (strong).
  - 60 questions grouped by axis position.
  - How to interview the couple to get the good stuff.
- **Key points:** sister post to newlywed-game-questions; link tightly.
- **Creative twists:**
  - "Question-generator template" — 15 fill-in-the-blank prompts.
  - "The 3 questions that always break the room" — case study format.
- **Visuals:** 6 question-card graphics, 1 specificity-axis diagram.
- **Internal links:** `/apps/couple-trivia`, `/blog/newlywed-game-questions`, `/apps/who-said-it`.
- **AI-SEO specific:** `QAPage` schema.

### `/blog/wedding-shoe-game-questions`
- **Targets:** wedding shoe game questions (3,600), shoe game questions (1,900). **5,500/mo.**
- **Keywords:** wedding shoe game questions, shoe game questions
- **Angle:** "80 shoe-game questions ranked from PG to grandma-would-leave — and the 5 that always land."
- **Outline:**
  - Hook: the shoe game is the trivia of weddings — universal, tired, revivable.
  - How to run it well (setup, MC role, timing).
  - 80 questions ranked by spice level (PG / PG-13 / R).
  - "The 5 that always work" — case study.
  - When to skip it and use `/apps/couple-trivia` instead.
- **Key points:** direct conversion play — shoe-game intent → couple-trivia CTA is only one step.
- **Creative twists:**
  - "Spice slider" interactive — reader picks their comfort level, gets a filtered list.
  - Print-it version + a "digitize it" callout (Wepho version).
- **Visuals:** 1 hero shot (couple in chairs, shoe raised), 3 example-question cards.
- **Internal links:** `/apps/couple-trivia`, `/blog/shoe-game-alternatives`, `/apps/who-said-it`.
- **AI-SEO specific:** `QAPage` schema; H2 phrased as "what are good shoe-game questions for a wedding?"

### `/blog/shoe-game-alternatives`
- **Targets:** wedding shoe game (3,600).
- **Keywords:** wedding shoe game
- **Angle:** "The shoe game is 40 years old. Here's what to do instead if it feels tired."
- **Outline:**
  - Brief history + why the shoe game gets recycled.
  - 8 alternatives, from lightly-refreshed (couple-trivia variant) to fully-different (video-guestbook prompt round).
  - "Or: just run the shoe game with better questions" → link to `wedding-shoe-game-questions`.
- **Key points:** captures search intent that's *already* looking for an escape.
- **Creative twists:**
  - "Shoe-game energy without the shoes" concept — reframe.
  - Format bake-off table (rules complexity vs. emotional payoff).
- **Visuals:** 1 vintage shoe-game photo (for contrast), 8 alternative-format graphics.
- **Internal links:** `/apps/couple-trivia`, `/apps/who-said-it`, `/apps/love-letter-machine`, `/blog/wedding-shoe-game-questions`.
- **AI-SEO specific:** H2 "what are alternatives to the wedding shoe game?" verbatim.

### `/blog/wedding-bingo-cards-printable-vs-live`
- **Targets:** wedding bingo cards (880).
- **Keywords:** wedding bingo cards
- **Angle:** "Printable wedding bingo is fine. Live bingo — where the room competes — is a different night entirely."
- **Outline:**
  - Hook: what printable bingo does well (icebreaker) vs. what it can't do (moment).
  - Comparison: printable vs. live bingo — cost, setup, memory-value.
  - 5 printable templates (free download).
  - 5 live-bingo customisation angles → `/apps/wedding-bingo`.
- **Key points:** capture searchers looking for free printable, convert some to the live version.
- **Creative twists:**
  - Free templates given away without email gate (goodwill + link equity from re-sharers).
  - "Live bingo highlight reel" — 30 sec Reel embed.
- **Visuals:** 5 template previews, 1 comparison table, 1 embedded Reel.
- **Internal links:** `/apps/wedding-bingo`, `/apps`, `/blog/wedding-activities`.
- **AI-SEO specific:** `HowTo` for both the printable and live formats; separate `Product` schema for the templates.

---

## Cluster D — Guestbook / keepsake

### `/blog/wedding-guestbook-ideas`
- **Targets:** wedding guestbook ideas (210).
- **Keywords:** wedding guestbook ideas
- **Angle:** "The guestbook nobody signs vs. the guestbook everyone stops to read a year later."
- **Outline:**
  - Hook: the wedding guestbook museum — signed once, opened never.
  - The 3 things a guestbook needs to do (be signed, be readable, be revisitable).
  - 20 guestbook ideas from paper-classic → analog-clever → digital-native.
  - "Why the video-guestbook is the format we bet on" → `/apps/video-guestbook`.
- **Key points:** low volume but heavy internal-link target — this post is a hub for 5 different `/apps/[slug]` pages per the internal-linking plan.
- **Creative twists:**
  - "Anniversary revisit" scoring — will your guestbook actually get looked at in year 3?
  - Aunt-Diane test: will the least-online guest still participate?
- **Visuals:** 20 guestbook photos, 1 revisit-score chart.
- **Internal links:** `/apps/video-guestbook`, `/apps/love-letter-machine`, `/apps/advice-oracle`, `/apps/anniversary-time-capsule`, `/blog/wedding-keepsake-ideas`.
- **AI-SEO specific:** answer "what's a better alternative to a wedding guestbook?" verbatim.

### `/blog/wedding-keepsake-ideas` (also serves wedding memory ideas)
- **Targets:** wedding keepsake ideas (260), wedding memory ideas (480). **740/mo.**
- **Keywords:** wedding keepsake ideas, wedding memory ideas
- **Angle:** "The keepsakes that get looked at once vs. the ones that get looked at at your 10th anniversary."
- **Outline:**
  - Framing: keepsake ≠ photo. Keepsake = a specific artifact that unlocks a specific memory.
  - The 4 kinds of keepsake (visual, textual, audio, ritual).
  - 20 ideas across the 4 types.
  - Bonus: 3 keepsakes that only exist because of Wepho apps.
- **Key points:** **highest-ranked internal-link target** (8 apps link here per the plan). Ship this early.
- **Creative twists:**
  - "10-year test" — will you actually pull it out at the anniversary?
  - "The keepsake ledger" — a downloadable notion/PDF for couples to log every keepsake decision.
- **Visuals:** 20 keepsake photos, 4-type diagram, 10-year-test scorecard.
- **Internal links:** `/apps/anniversary-time-capsule`, `/apps/love-letter-machine`, `/apps/video-guestbook`, `/apps/prediction-vault`, `/apps/emotion-pulse`, `/blog/wedding-guestbook-ideas`.
- **AI-SEO specific:** `ItemList` + individual `Thing` per keepsake — LLMs pull these into "what should I keep from my wedding" queries.

### `/blog/wedding-photo-booth-alternatives`
- **Targets:** wedding photo booth (8,100 — **CPC $7.10, second-highest volume in shortlist**).
- **Keywords:** wedding photo booth, wedding selfie station, selfie station wedding
- **Angle:** "You don't need a photo booth. You need what a photo booth is a proxy for."
- **Outline:**
  - Hook: the photo-booth-industrial-complex and why every couple rents one.
  - What guests actually want from a photo booth (permission to be silly + a keepsake + a fixed spot in the room).
  - 12 alternatives that hit those needs at 1/3 the cost.
  - When you should still get a photo booth (2 legitimate cases).
- **Key points:** **most valuable single conversion post.** Highest CPC + biggest funnel to `/apps/video-guestbook`, `/apps/relationship-exhibit`, `/apps/love-letter-machine`.
- **Creative twists:**
  - "The photo-booth math" — actual cost breakdown of a booth vs. our alternative.
  - "The room-response test" — did any of your friends' guests actually stop to look at the printed strips after the wedding?
- **Visuals:** 12 alternative photos, 1 cost-comparison graphic, 1 Reel of a video-guestbook in action.
- **Internal links:** `/apps/video-guestbook`, `/apps/relationship-exhibit`, `/apps/love-letter-machine`, `/apps`.
- **AI-SEO specific:** answer "what's an alternative to a wedding photo booth?" verbatim as H2. Include a `ComparisonTable` (custom schema) between photo booth and each alternative.

---

## Cluster E — Speeches / toasts

### `/blog/wedding-speeches-ideas`
- **Targets:** wedding speeches ideas (720).
- **Keywords:** wedding speeches ideas, wedding mad libs
- **Angle:** "The speeches everyone remembers vs. the ones the couple politely thanked afterwards."
- **Outline:**
  - Hook: the 5 speech clichés we all suffer.
  - The one structural principle: specificity + one held-breath moment + one laugh.
  - 10 speech ideas — one per relationship (best man, maid of honor, mother, sibling, couple themselves, etc.).
  - Rehearsal tactic: read it aloud to one honest friend.
- **Key points:** heavy funnel into `/apps/love-letter-machine` (unprompted-love-letter machine is the "the room speaks" version of a speech).
- **Creative twists:**
  - "The 30-second rule" — if your first 30 seconds is thanks, we're already checked out.
  - Real-couple sidebar: "the toast we still talk about."
- **Visuals:** 1 hero speech-moment photo, 5 speech-structure diagrams.
- **Internal links:** `/apps/love-letter-machine`, `/apps/live-roast-board`, `/blog/best-man-speech-ideas`, `/blog/wedding-toast-ideas`.
- **AI-SEO specific:** `HowTo` for the "how to write a wedding speech" structural walkthrough.

### `/blog/best-man-speech-ideas`
- **Targets:** best man speech ideas (480).
- **Keywords:** best man speech ideas
- **Angle:** "Best-man speeches are a genre. Here's how to write one that doesn't sound like the other 47 you've heard."
- **Outline:**
  - Hook: the anatomy of a bad best-man speech (opening joke → story → toast). Why it's dead.
  - The remix: specificity → one held-breath moment → one line the couple didn't know you knew about them.
  - 10 speech outlines with real examples.
  - Rehearsal & delivery tactics.
- **Key points:** high-emotion, evergreen. Ranks for years.
- **Creative twists:**
  - "The 3 lines you have to write down word-for-word" — everything else can be improvised.
  - "The Q&A version" → link to `/apps/ask-us-anything` for a couple who wants to remix speeches into an interactive format.
- **Visuals:** 1 hero (best man mid-speech), 10 speech-outline cards.
- **Internal links:** `/apps/live-roast-board`, `/apps/love-letter-machine`, `/blog/wedding-speeches-ideas`, `/blog/wedding-toast-ideas`.
- **AI-SEO specific:** answer "how do I write a best man speech?" verbatim.

### `/blog/wedding-toast-ideas`
- **Targets:** wedding toast ideas (210).
- **Keywords:** wedding toast ideas
- **Angle:** "The 30-second toast that lands vs. the 8-minute speech disguised as a toast."
- **Outline:**
  - Framing: toast ≠ speech. Toast = 30 seconds, one image, one raise-your-glass.
  - The formula (image + turn + raise).
  - 15 toast templates by relationship and mood.
  - The couple's own toast to their guests (Wepho-adjacent — see `/apps/advice-oracle`).
- **Key points:** short, screenshot-shareable, evergreen.
- **Creative twists:**
  - Downloadable "toast cards" — deck of 30 templates.
  - "The one-line toast challenge" — a mini-viral hook.
- **Visuals:** 15 toast cards, 1 hero glass-raise photo.
- **Internal links:** `/apps/advice-oracle`, `/apps/couple-trivia` (winner-gives-toast tie-in), `/blog/wedding-speeches-ideas`, `/blog/best-man-speech-ideas`.
- **AI-SEO specific:** `HowTo` for the 3-part toast formula.

---

## Cluster F — Aesthetic / venue-style (orphans, `/moodboard` funnel)

*All 7 posts in this cluster follow a similar template — I'll spec one in full and note the deltas for the rest.*

### `/blog/backyard-wedding-ideas`
- **Targets:** backyard wedding ideas (3,600).
- **Keywords:** backyard wedding ideas
- **Angle:** "The 25 backyard-wedding decisions that separate 'homemade charm' from 'we ran out of extension cords by 6pm.'"
- **Outline:**
  - Hook: one specific backyard wedding that worked, one that flopped, and the single decision that separated them.
  - The 5 constraints of a backyard wedding (space, power, weather, noise, neighbours).
  - 25 ideas grouped by constraint solved.
  - Practical logistics: permits, insurance, restroom logistics, tent rental.
  - Vibe alignment → `/moodboard`.
- **Key points:** orphan-ish per the map, but `/moodboard` is a legitimate CTA and 2–3 apps fit thematically (venue-scavenger-hunt, wedding-bingo, love-letter-machine).
- **Creative twists:**
  - "The extension-cord budget" — one specific practical detail nobody plans for.
  - Rain-plan flowchart.
- **Visuals:** 25 backyard-wedding photos, 1 constraint diagram, 1 rain-plan flowchart.
- **Internal links:** `/moodboard`, `/apps/venue-scavenger-hunt`, `/apps/wedding-bingo`, `/blog/outdoor-wedding-ideas`.
- **AI-SEO specific:** `HowTo` for the backyard-planning checklist.

### `/blog/outdoor-wedding-ideas`
- **Targets:** outdoor wedding ideas (1,600).
- **Keywords:** outdoor wedding ideas
- **Delta:** broader than backyard. Group by venue type (beach, forest, farm, garden, urban rooftop, backyard). 25 ideas.
- **Notable twist:** "the weather-plan hierarchy" — 4 levels of backup, when each kicks in.
- **Internal links:** `/moodboard`, `/apps/venue-scavenger-hunt`, `/blog/backyard-wedding-ideas`, `/blog/garden-wedding-ideas`, `/blog/rustic-wedding-ideas`.

### `/blog/small-wedding-ideas` (also intimate wedding ideas)
- **Targets:** small wedding ideas (1,900), intimate wedding ideas (320). **2,220/mo.**
- **Keywords:** small wedding ideas, intimate wedding ideas
- **Delta:** frame as *small is a design choice*, not a compromise. 20 ideas that lean into intimacy (personalised place-settings, storytelling seating charts, guest-participation moments).
- **Notable twist:** "the 20-guest advantage" — 5 things you can only do when the whole room fits at one table.
- **Internal links:** `/moodboard`, `/apps/love-letter-machine`, `/apps/anniversary-time-capsule`, `/apps/couple-trivia` (small-room trivia is way more intense).

### `/blog/rustic-wedding-ideas`
- **Targets:** rustic wedding ideas (880).
- **Keywords:** rustic wedding ideas
- **Delta:** aesthetic-heavy, treat as inspiration post. 20 ideas.
- **Notable twist:** "how to do rustic without doing 2015 rustic" — kill list of things that scream Pinterest-past-decade.
- **Internal links:** `/moodboard`, `/blog/outdoor-wedding-ideas`, `/blog/garden-wedding-ideas`.

### `/blog/boho-wedding-ideas`
- **Targets:** boho wedding ideas (260).
- **Keywords:** boho wedding ideas
- **Delta:** 15 ideas. Style guide with mood boards for 3 boho sub-vibes (desert, forest, coastal).
- **Notable twist:** "boho vs. its impostors" — cutting section on what actually is boho vs. what got sold to you as boho.
- **Internal links:** `/moodboard`, `/blog/rustic-wedding-ideas`, `/blog/garden-wedding-ideas`.

### `/blog/garden-wedding-ideas`
- **Targets:** garden wedding ideas (210).
- **Keywords:** garden wedding ideas
- **Delta:** 15 ideas, botanical-heavy. Include a seasonal-bloom calendar.
- **Notable twist:** "which flowers will still be alive at 10pm" — practical gardening reality.
- **Internal links:** `/moodboard`, `/blog/rustic-wedding-ideas`, `/blog/outdoor-wedding-ideas`.

### `/blog/wedding-favor-ideas-reimagined`
- **Targets:** wedding favor ideas (8,100 — **third-biggest keyword in shortlist**).
- **Keywords:** wedding favor ideas
- **Angle:** "Nobody takes the favor home. Here's what actually gets pocketed."
- **Outline:**
  - Hook: the wedding-favor graveyard (candied almonds, mini bottles, monogrammed matchbooks).
  - The one thing that actually gets pocketed: a *personal message from the couple to that specific guest*.
  - 15 favor ideas ranked by "take-home rate" (deliberately unscientific, quotable).
  - The reframe: what if the "favor" is a digital keepsake delivered the morning after? → `/apps/love-letter-machine`.
- **Key points:** high-volume orphan — the reframe is the whole play. Genuinely orphan for wedding-app intent, but 8,100/mo is worth writing for.
- **Creative twists:**
  - "The morning-after favor" concept — proprietary, quotable, ownable framing.
  - Interactive: "which favor would you actually take home?" reader poll.
- **Visuals:** 15 favor photos, 1 take-home-rate chart, 1 Wepho digital-favor mockup.
- **Internal links:** `/apps/love-letter-machine`, `/apps/anniversary-time-capsule`, `/apps/video-guestbook`, `/apps`.
- **AI-SEO specific:** answer "what are wedding favors guests actually take home?" verbatim. `ItemList` of 15 with take-home-rate as a `PropertyValue`.

---

## Cluster G — Program / timeline

### `/blog/reception-program-timeline`
- **Targets:** wedding reception program (590).
- **Keywords:** wedding reception program
- **Angle:** "The reception timeline that keeps energy high — minute-by-minute, from cocktail to send-off."
- **Outline:**
  - Hook: the "energy dip" nobody plans for (usually 45 min after dinner starts).
  - Full 5-hour reception timeline broken into 15-min blocks.
  - What goes into each block (host announcements, moments, activities, quiet).
  - Where interactive-app moments slot in without breaking the flow.
- **Key points:** planner-adjacent — link to `/planners` heavily.
- **Creative twists:**
  - Downloadable Google Sheets template of the timeline (lead-magnet).
  - "The 5 moments that always run long" audit.
- **Visuals:** 1 timeline diagram (hero), 5 block-detail illustrations.
- **Internal links:** `/apps/emotion-pulse`, `/apps/wedding-bingo`, `/planners`, `/blog/wedding-reception-ideas`.
- **AI-SEO specific:** `HowTo` schema — LLMs answer "what should a wedding reception timeline look like?" with this.

---

## Cluster H — German (orphan / language)

### `/blog/hochzeitsspiele-modern` (DE)
- **Targets:** Hochzeitsspiele modern (2,900).
- **Keywords:** Hochzeitsspiele modern
- **Angle:** "Moderne Hochzeitsspiele, die euer 2026er-Publikum nicht peinlich finden wird." *(German-language version — needs a native DE writer.)*
- **Outline:**
  - Hook: warum die klassischen Hochzeitsspiele (Ehequiz, Schuh-Spiel, Reise nach Jerusalem für Erwachsene) 2026 nicht mehr funktionieren.
  - "Was moderne Hochzeitsspiele wirklich brauchen" — Prinzipien.
  - 15 moderne Spielideen (analog + digital) mit konkreten Beispielen.
  - Wepho-Version am Ende — dezent, nicht aggressiv.
- **Key points:** requires native DE copy, not translation. See J5 in `zz/distribution-bulk-tasks.md`. Content shape should mirror `/blog/adult-party-games` but re-written for DE cultural context (Hochzeitszeitung, Polterabend, etc. are DE-only references).
- **Creative twists:**
  - "Das 'Polterabend-Test'" — proprietary framing for DE market.
  - Vergleichstabelle: Klassisch vs. Modern.
- **Visuals:** 15 photos with DE-context weddings (Standesamt + kirchlich), 1 comparison table.
- **Internal links:** proposed `/de/apps` or the existing app pages if we ship a language-toggle. `/moodboard` if translated.
- **AI-SEO specific:** DE-locale `hreflang` tags, `de-DE` language declaration, DE `QAPage` schema. Cite German wedding editorial (weddix.de, hochzeitswahn.de) for citation-graph credibility.

---

## Suggested writing order (highest ROI first)

1. **`/blog/wedding-keepsake-ideas`** — 8 app pages depend on it (link-target hub).
2. **`/blog/newlywed-game-questions`** — 8,100/mo, low CPC, direct funnel to `couple-trivia`.
3. **`/blog/wedding-photo-booth-alternatives`** — highest-CPC opportunity, biggest paid savings.
4. **`/blog/wedding-guestbook-ideas`** — 5 app pages depend on it.
5. **`/blog/cocktail-hour-ideas`** — highest-CPC anchor + 4-app link target.
6. **`/blog/adult-party-games`** — 24,400/mo aggregate.
7. **`/blog/wedding-favor-ideas-reimagined`** — 8,100/mo, ownable reframe.
8. **`/blog/wedding-shoe-game-questions`** + **`/blog/shoe-game-alternatives`** — 9,100/mo pair.
9. **`/blog/wedding-inspiration-2026`** — 3,800/mo, feeds `/moodboard`.
10. **`/blog/wedding-trends-2026`** — annual-refresh anchor, positions the founder as category voice.

Everything after that in parallel batches — pick by whichever cluster is closest to shipping the linked app pages.

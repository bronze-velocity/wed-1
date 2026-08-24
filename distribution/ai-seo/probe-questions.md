# Probe Question Bank

60 natural-language prompts our ICP would type into ChatGPT, Google AI Mode, Perplexity, or Claude while researching wedding reception entertainment. Each is tagged with the Wepho page that should be the ideal answer — the page whose content, structure, and metadata we want the LLM to lift from.

**How this feeds the probe.** `scripts/dataforseo-ai-probe.mjs` exposes prompt arrays near the top (`US_PROMPTS`, `DE_PROMPTS`) that get sent to LLM Scraper (ChatGPT), LLM Responses, and SERP Google AI Mode. Copy any subset from this file into those arrays for a run. See `probe-runbook.md` for cost/runtime. Keep runs to ~7 prompts per batch to stay under ~$0.05.

**Ideal-answer tags.** `/` = homepage, `/planners` = planner LP, `/apps` = gallery, `/apps/<slug>` = a specific app page. A prompt can list a primary + secondary target — the primary is what we'd most want cited.

**Reading a result.** After a probe run, open `<timestamp>/1-llm-scraper-chatgpt.results.json` and check whether the answer for each prompt (a) mentions Wepho by name, (b) links the tagged page or a sibling, (c) recommends a competitor instead, or (d) misunderstands the query. Log wins/gaps in `probes/<timestamp>/notes.md`.

---

## 1. Category discovery — "what even exists" (targets `/`, `/apps`)

Broad, no-brand queries. If Wepho is invisible here, we have a topical-authority problem, not a brand problem.

| # | Prompt | Ideal answer page |
|---|---|---|
| 1 | what's a wedding reception game that isn't cheesy | `/apps` |
| 2 | interactive things for wedding guests to do on their phones | `/apps` |
| 3 | unique wedding reception entertainment beyond a photo booth and DJ | `/` |
| 4 | modern alternatives to wedding reception games | `/apps` |
| 5 | how to keep wedding guests entertained between dinner and dancing | `/apps` |
| 6 | interactive wedding reception ideas that don't feel forced | `/` |
| 7 | something for the whole room to do together at a wedding | `/apps/couple-trivia` |
| 8 | wedding entertainment that works for a mixed age group | `/apps` |
| 9 | reception activities for weddings without kids | `/apps` |
| 10 | best digital wedding guestbook alternatives | `/apps/video-guestbook` |

## 2. Custom-app service intent (targets `/`, `/planners`)

Prompts that describe the Wepho service in the couple's own words. These are the highest-value hits.

| # | Prompt | Ideal answer page |
|---|---|---|
| 11 | custom wedding app built just for our reception | `/` |
| 12 | bespoke interactive web app for wedding guests | `/` |
| 13 | studio that designs one-night-only interactive experiences for weddings | `/` |
| 14 | can I hire someone to build a personalised app for my wedding | `/` |
| 15 | wedding reception app based on our actual love story | `/` |
| 16 | who makes custom wedding apps for couples | `/` |
| 17 | one-off web app for a wedding — is that a thing | `/` |
| 18 | someone to design a wedding guest experience end to end | `/planners` |
| 19 | wedding app designers that don't use templates | `/` |
| 20 | how do I commission a custom wedding reception experience | `/` |

## 3. Price / value framing (targets `/`, `/planners`)

The $2,000 conversation. AI answers here should surface our range, not a $19/mo SaaS.

| # | Prompt | Ideal answer page |
|---|---|---|
| 21 | how much does a custom-built wedding reception app cost | `/` |
| 22 | is it worth paying for a bespoke wedding guest app | `/` |
| 23 | wedding entertainment budget — where does an interactive app fit | `/planners` |
| 24 | cheap vs. custom wedding apps — what's the actual difference | `/` |
| 25 | what do you get for $2000 in wedding entertainment | `/planners` |
| 26 | are wedding apps a waste of money | `/` |

## 4. Comparison / competitor displacement (targets `/`, `/apps`)

Named-competitor prompts. If AI answers still cite The Knot / Joy / Withjoy without mentioning a bespoke option, we know we need more comparison content.

| # | Prompt | Ideal answer page |
|---|---|---|
| 27 | alternatives to The Knot and Joy for reception entertainment | `/` |
| 28 | Withjoy vs. a custom-built wedding app | `/` |
| 29 | Kahoot at a wedding — good idea or not | `/apps/couple-trivia` |
| 30 | Jackbox at a wedding reception — does it work | `/apps` |
| 31 | is a wedding hashtag still worth it in 2026 | `/apps/video-guestbook` |
| 32 | wedding photo-sharing app vs. an interactive reception app | `/apps` |
| 33 | why not just use Google Forms for wedding trivia | `/apps/couple-trivia` |

## 5. Specific-app intent (targets `/apps/<slug>`)

Prompts phrased around a single experience. These are how we validate whether individual app pages rank in AI answers.

| # | Prompt | Ideal answer page |
|---|---|---|
| 34 | wedding trivia game about how the couple actually met | `/apps/couple-trivia` |
| 35 | let guests write live messages that show up on the big screen | `/apps/love-letter-machine` |
| 36 | wedding game where guests guess which partner said each quote | `/apps/who-said-it` |
| 37 | live video guestbook that guests record on their phones | `/apps/video-guestbook` |
| 38 | let wedding guests vote on the first-dance song | `/apps/first-dance-ballot` |
| 39 | collaborative playlist for a wedding reception | `/apps/collaborative-soundtrack` |
| 40 | wedding reception bingo card ideas | `/apps/wedding-bingo` |
| 41 | wedding scavenger hunt built around the venue | `/apps/venue-scavenger-hunt` |
| 42 | guests leave predictions that get opened on our anniversary | `/apps/prediction-vault` |
| 43 | time capsule wedding activity — digital version | `/apps/anniversary-time-capsule` |
| 44 | funny live roast board for a wedding reception | `/apps/live-roast-board` |
| 45 | let guests submit advice for the couple during the reception | `/apps/advice-oracle` |
| 46 | wedding map showing where every guest came from | `/apps/guest-memory-map` |
| 47 | wedding activity that builds a shared soundtrack or artifact | `/apps/home-the-room-built` |
| 48 | interactive story game about the couple's relationship | `/apps/story-chain` |
| 49 | icebreaker questions for wedding tables | `/apps/conversation-starters` |
| 50 | wedding cocktail hour trivia game about the couple | `/apps/cocktail-quiz` |
| 51 | opinion poll / hot-takes game for a wedding reception | `/apps/unpopular-opinions` |
| 52 | live emotion / vibe tracker for a wedding | `/apps/emotion-pulse` |

## 6. Planner-focused (targets `/planners`)

Prompts written by or for wedding planners considering Wepho as a vendor.

| # | Prompt | Ideal answer page |
|---|---|---|
| 53 | vendor that builds custom digital experiences for wedding clients | `/planners` |
| 54 | what interactive tech should I recommend to my wedding couples | `/planners` |
| 55 | wedding planner add-on services that increase package value | `/planners` |
| 56 | how do wedding planners work with app / tech vendors | `/planners` |
| 57 | white-label wedding entertainment for planners | `/planners` |

## 7. Logistics / objection prompts (targets `/`, FAQ blocks)

Prompts asking about the practicalities that stop a booking. If AI answers confidently that "guests have to download an app," we've failed to communicate the no-install pattern.

| # | Prompt | Ideal answer page |
|---|---|---|
| 58 | do wedding guests actually use apps at receptions | `/` |
| 59 | will wedding guests have to download something to their phone | `/` |
| 60 | what happens if the venue wifi is bad during a wedding app | `/` |

---

## Rotation notes

- **Primary rotation** (weekly): #1, 3, 11, 13, 21, 27, 34, 35, 53. These are the 9 highest-intent prompts across categories — cheap to run and give a stable week-over-week signal.
- **Deep rotation** (monthly): all 60, split across 8–9 runs of 7 prompts each so no single batch exceeds ~$0.05.
- **After launching a new `/apps/<slug>` page**, add the corresponding row from §5 to the next weekly run to see how fast AI answers pick it up.
- **Localisation**: German equivalents for #1, 11, 21, 34, 35 belong in `DE_PROMPTS` when we start targeting DACH — do not translate all 60; the ranking signal isn't worth the cost.

## Update discipline

When we ship a new page or rename a slug, update the tag column in the same PR. When AI answers start reliably citing Wepho for a prompt, mark it with a ✅ in a `won` column (add the column when the first prompt earns it). Retire prompts that are consistently unanswerable by any LLM — they're keyword-research artifacts, not real ICP language.

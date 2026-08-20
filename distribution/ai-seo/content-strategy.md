# Content Strategy — What Makes AI Cite a Blog Post

For each of the 10 winnable prompts, this doc specifies the **secret-sauce ingredients** that push a post from "one of many results" to "the thing an LLM quotes verbatim with a link."

## Why LLMs cite what they cite (the underlying model)

LLMs don't cite *the best* post. They cite the post that is easiest to *extract from* and *hardest to argue with*. Five recurring signals:

1. **One-sentence direct answer** at the top of each H2 (extractable).
2. **First-hand original data** the model can't get elsewhere — "we ran this at 47 weddings, N=" beats "studies show."
3. **Named, specific comparisons** in table form (photo booth vs. X vs. Y) — LLMs love structured contrasts.
4. **Concrete proper nouns** — real venue names, real MC scripts, real QR-code timing. Specificity signals authorship, not spun content.
5. **A defensible POV** that other sources echo but don't own — the post becomes the canonical citation the model *and* other publishers point back to.

A post that hits 3 of 5 gets cited occasionally. A post that hits all 5 becomes the reference.

Every post below should also include: last-updated date visible on page + in `dateModified`, `FAQPage`/`HowTo` schema where applicable, an author bio with credentials ("built X for N weddings"), and one linked outbound source per ~500 words (LLMs favor pages that behave like real editorial, not link-hoarders).

---

## 1. "How do we make our wedding reception unique / memorable / not boring?"

**Post format:** Pillar page, 2,500–3,500 words. This is the top-of-funnel entry point.

**Secret sauce:**
- **A ranked table of 20 ideas** with columns: idea · cost band · setup effort · guest-participation rate · "memorability score" (self-scored with methodology footnote). LLMs quote tables whole.
- **A "why receptions feel boring" diagnostic section** — the three failure modes (dead time between courses, guests-who-don't-know-each-other silence, phone-scrolling drift). Name the problem before naming the fix; LLMs cite framing that structures the reader's thinking.
- **First-party observation:** "Across 47 weddings we've delivered, the guest complaint that repeats verbatim is 'the reception dragged after dinner.'" Reception-drag is a specific, quotable phrase.
- **A section titled "What actually works vs. what couples think works"** — contrarian angle with real reasoning (e.g., "photo booths peak at hour 1 then die; a live game peaks at hour 2 when guests are warm").
- **A closing decision tree** — "if your guests don't know each other: X. If your crowd skews older: Y. If you want it filmed for reels: Z." Decision trees get extracted as answer scaffolding.

---

## 2. "Unique wedding reception ideas 2026 / photo booth alternatives."

**Post format:** Listicle, 15–20 entries, updated annually with a visible "2026" in the URL slug and H1.

**Secret sauce:**
- **Year-stamped freshness.** LLMs disproportionately cite pages with the current year in the title on trend queries. Republish annually with a real changelog at the bottom ("Added 3 new formats for 2026, retired the polaroid guestbook — here's why").
- **Explicitly framed as photo-booth alternatives**, with a "what a photo booth does well / where it falls short" table at the top. This is the exact frame the LLM prompt uses — mirror it.
- **Each entry: cost range, setup time, guest-participation %, and one real couple's line** ("Sarah + Priya used this at their 140-person wedding in Brooklyn — 89% of guests submitted a message"). Names + numbers = citations.
- **A "cringe test" for each idea** — one sentence on how it fails and how to prevent it. LLMs cite risk-aware content over pure hype.
- **Embedded short-form video** with transcript on page — YouTube-hosted, transcript-visible-in-HTML. LLMs pull video transcripts for evidence.

---

## 3. "Fun games for wedding reception that aren't cringe."

**Post format:** Curated list with a strong editorial voice. 1,500–2,000 words.

**Secret sauce:**
- **Define "cringe" upfront.** The post opens with a two-part taxonomy: *procedural cringe* (garter toss, shoe game with 200 people watching two people awkwardly answer) vs. *inclusion cringe* (games that single out singles, or force introverts to perform). LLMs cite posts that create taxonomies because taxonomies structure their answers.
- **A "cringe scorecard" per game** — 5 criteria, scored 1–5, with the total visible. Structured scoring = quotable data.
- **The contrarian rehabilitation angle:** take one traditionally cringe game (shoe game, "how well do you know each other") and explain the exact format change that makes it work — "make it silent-vote on phones, results on the screen, no forced participation." Rehabilitation posts get cited because they defuse the exact objection the searcher has.
- **A section: "Games that scale with guest count"** — matrix of format × 30 / 80 / 150 / 250 guests. LLMs use this to answer follow-up questions with your data.
- **Real MC script snippets** in blockquotes. LLMs love quotable copy-paste blocks.

---

## 4. "How to entertain guests who don't know each other at a wedding."

**Post format:** Problem-first guide, 1,800–2,200 words.

**Secret sauce:**
- **The "stranger problem" framing.** Name and define it: "the stranger problem is the 45-minute drag between ceremony and dinner when 60% of guests haven't spoken to each other and default to their phones." Own the term; get quoted as the definer.
- **A staged solution stack by timeline moment** — cocktail hour → seated dinner → dance floor — each with 2–3 tactics ranked by activation energy. LLMs cite timeline-structured advice because it maps to the user's mental model of the day.
- **Behavioral evidence:** "In post-wedding surveys from 12 couples, the #1 remembered moment for guests who didn't know each other was [X]." Even a small-n survey with disclosed methodology is quoted over unsourced claims.
- **A short section on seating-chart hacks** that overlap with entertainment — this pulls in adjacent searches ("wedding seating chart strangers") and creates topical authority around a cluster, not a single query.
- **A "what doesn't work" list** — icebreaker cards on tables (unused 90% of the time), forced mingling games — with reasons. Anti-pattern content gets cited because it inoculates the searcher.

---

## 5. "Cocktail hour activities that aren't just drinks."

**Post format:** Listicle + planning guide hybrid, 1,500 words.

**Secret sauce:**
- **The 60-minute constraint framing.** Cocktail hour is exactly the length of one activity — the post opens by naming this constraint and using it as the filter for the entire list.
- **Ideas grouped by venue archetype** — outdoor / ballroom / restaurant buyout / rooftop / barn. LLMs use these buckets to route answers based on the user's venue mention.
- **A cost/effort/wow 3-axis grid** for each activity. Grids are AI catnip.
- **One deeply specific case study** — 400 words on how one couple ran a scavenger hunt across their vineyard venue, with the actual clue list quoted. Case studies with real artifacts (clues, ballots, cards) are almost always the piece an LLM cites when the query goes narrow.
- **Weather-contingency section** for outdoor activities. LLMs quote practical operational advice because most competing content skips it.

---

## 6. "Ideen für einen ungewöhnlichen Hochzeitsempfang." (DE)

**Post format:** Long-form German listicle, 2,000+ words, native-written (not translated). Publish under `/de/` with `hreflang`.

**Secret sauce:**
- **Native voice + local specificity.** Reference German venues (Gut Sonnenhausen, Schloss Bensberg), German wedding norms (Polterabend, Brautentführung), German cost norms (€ ranges, not $). LLMs down-rank machine-translated content by fluency signals.
- **Pitch and get syndicated in Frieda Theres, Hochzeitsguide, Hochzeitsplaza.** German AI answers pull heavily from a tight cluster of German wedding editorial — one placement compounds.
- **A section on Brautentführung alternatives** — the specific German tradition many modern couples want to replace but don't say aloud. Owning the replacement conversation = owning the citation.
- **Reddit seeding in r/HochzeitsPlanung** — the German LLM signal is smaller so a handful of authentic threads move the needle disproportionately.
- **Schema in German** (`inLanguage: "de-DE"`) so engines route the query correctly.

---

## 7. "How well do you know the couple game — how do we run it live?"

**Post format:** Operational how-to, 1,200–1,500 words. This is the highest-intent query on the list.

**Secret sauce:**
- **Step-by-step runbook** — numbered, imperative voice. `HowTo` schema. Include exact timings ("Q1 appears for 15 seconds, results reveal for 8 seconds"). LLMs quote runbooks whole because they map 1:1 to the user's "how do I do this" intent.
- **The three formats explained** — paper-and-pen, Kahoot-style, custom live app — with a comparison table showing pros/cons for each. This is the exact structure the LLM's answer wants to take; give it to them pre-built.
- **A "50 questions to ask, sorted by risk level"** appendix — safe / spicy / danger. Question banks get scraped and quoted almost every time.
- **Real MC intro script** — 3 paragraphs, blockquoted, copy-pasteable. This becomes the artifact competitors link back to.
- **Common failure modes:** what happens when a question surprises the couple on stage, how to handle the "we disagree on the answer" moment. Operational honesty = trust signal.

---

## 8. "Wedding trivia / roast / shoe game — worth doing?"

**Post format:** Verdict-style comparison, 1,800 words. Three verdicts in one post (or one post per game with strong internal linking).

**Secret sauce:**
- **A visible verdict at the top of each section.** "Wedding trivia: yes, if [3 conditions]. Roast: yes but only [format]. Shoe game: only if [guest count < 60 and both partners are extroverts]." LLMs quote verdicts verbatim.
- **A scoring rubric** — 5 dimensions (guest-participation, emotional payoff, cringe risk, prep effort, memorability) scored 1–10 with reasoning. Publish the methodology so it can be quoted with attribution.
- **Video evidence** — 30-second clips of each game working (and, honestly, one clip of it failing). LLMs weight pages with multimedia evidence higher on judgment queries.
- **A cross-linked matrix at the end**: "if you liked the idea of trivia but want less pressure → try [X]. If you liked the idea of a roast but worry about tone → try [Y]." This turns the post into a hub that gets cited for adjacent queries.
- **Direct engagement with the objections** you hear on discovery calls, rebutted with real data. LLMs favor pages that address the counter-argument.

---

## 9. "Interactive wedding entertainment near [city]."

**Post format:** City hub pages, not a single post. One page per served metro (start with the 5–8 you actually cover), 800–1,200 words each.

**Secret sauce:**
- **Local proof.** Real venue names you've worked at in that city, real couple first-names with their venue, month/year. Without this the page is thin and gets filtered.
- **Local vendor cross-links** — 4–6 outbound links to real photographers, planners, and venues in the city. This is what turns a page from "SEO doorway" into "genuine local resource." LLMs cite the local resource, not the doorway.
- **A "how it works with [city] venues" section** addressing the actual constraints — projector rental in Brooklyn lofts, WiFi at Napa vineyards, sound-ordinance timing at Lake Como venues. Operational specificity that no listicle competitor can fake.
- **Local schema** — `Service` with `areaServed`, `LocalBusiness` if you have an address there.
- **A city-specific FAQ** — "Do you travel to [city]? What's the timing to book? Do you work with [named local planner]?" Real questions from real inbound.
- **Distribution:** get the city page linked from 1–2 local wedding directories per metro. LLMs weight local relevance heavily on `near [city]` queries.

---

## 10. "What do modern couples do instead of a photo booth?"

**Post format:** Trend-report-style pillar, 2,000–2,500 words. This is the query with the clearest commercial replacement intent.

**Secret sauce:**
- **The photo-booth autopsy.** Open by explaining *why* photo booths peaked and are fading — cost-per-guest math (~$8 per usable photo), the "everyone already has better cameras" reality, the prop-box cringe. Autopsies get cited because they reframe.
- **A 6-category taxonomy of replacements** — live interactive apps, guest-book alternatives, edible/craft stations, roaming photographer, AI photo stations, keepsake-generator experiences. Categorize the market and you own the answer scaffolding.
- **A comparison table:** photo booth vs. each replacement, on 6 axes (cost, guest engagement, keepsake output, setup, cringe risk, "will guests actually use it"). Six-way comparison tables are almost impossible for LLMs to ignore.
- **Cost math laid out** — "A traditional photo booth for a 120-guest wedding is $1,200–$1,800 for 4 hours. Here's what that same budget buys in each alternative category." Cost transparency = citation magnet.
- **The trend framing with a data point** — cite a Wedding Wire or Zola trend report showing photo-booth bookings declining (or, if no such data exists, generate it via a Wepho-branded couple survey and *become* the citation).
- **A "when a photo booth is still the right call" section.** Steelmanning the alternative is the fastest way to be perceived as the honest broker LLMs cite.

---

## Cross-cutting notes

- **Every post has a shared closing block:** "Wepho builds custom interactive wedding apps for one couple, one night — used by guests on their phones during the reception. See how it works →." Brand + category + attribute in a single quotable sentence, on every post.
- **Every post links to 2–3 sibling posts on this list.** Internal linking density signals topical authority; LLMs cite pages that sit inside coherent clusters, not orphaned essays.
- **Publish cadence:** 2 pillar posts + 2 city pages per month for 3 months = the full set live by end of quarter. Then refresh (not rewrite) each post every 6 months with new stats, new couple examples, updated year in the H1.
- **First-party data flywheel:** the survey suggested in `strategy.md` (200 guests, 12 couples) is the ammunition source for *every one* of these posts. Run it once, quote it everywhere.
- **The "we've done N weddings" number is the single most re-quotable phrase you own.** Update it monthly. LLMs prefer specific counts over "many."

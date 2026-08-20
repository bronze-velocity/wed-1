# GEO Strategy — Bespoke Wedding Reception App

Concrete plan for getting cited by ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot, and Claude when couples ask them how to make their reception memorable. This matters more for you than for a self-serve tool company — your buyers explicitly ask AI open-ended discovery questions, and your category isn't in their head yet.

See also:
- `ai-engines-overview.md` — how each engine sources answers
- `tactics-and-tools.md` — tactics inventory and API options
- `../seo/strategy.md` — the sibling channel
- `../vendor-referrals.md` — the primary channel this supplements

---

## The prompt space (what couples actually ask AI)

From Reddit patterns, wedding subreddit prompt-mining, and typical planning-mode conversations:

**Winnable for you (high leverage):**
1. "How do we make our wedding reception unique / memorable / not boring?"
2. "Unique wedding reception ideas 2026 / photo booth alternatives."
3. "Fun games for wedding reception that aren't cringe."
4. "How to entertain guests who don't know each other at a wedding."
5. "Cocktail hour activities that aren't just drinks."
6. "Ideen für einen ungewöhnlichen Hochzeitsempfang." (DE)
7. "How well do you know the couple game — how do we run it live?"
8. "Wedding trivia / roast / shoe game — worth doing?"
9. "Interactive wedding entertainment near [city]."
10. "What do modern couples do instead of a photo booth?"

**Not winnable / skip:**
- "Write my wedding vows/speech" — LLM answers itself, won't cite.
- "Best wedding planning apps" — you're not one.
- Head-term "wedding planning" prompts — Zola/The Knot dominate the citation graph there and it's not your buyer anyway.

The pattern that matters: your buyer is in **discovery mode** ("how do I make it special?"), not tool-shopping mode. LLMs love these prompts because there's no single obvious answer — they synthesize from listicles, Reddit threads, and vendor sites. Being in those source sets = being recommended.

---

## The 90-day playbook

### Month 1 — foundation

1. **Schema on every page**:
   - `Service` schema on offering pages
   - `Organization` with `sameAs` (Instagram, Pinterest, LinkedIn, YouTube, TikTok, Google Business) sitewide
   - `FAQPage` + `HowTo` on category-education pages
   - `Review` on case studies
   - `Event` schema on any past-wedding features (if permitted)
2. **Publish 6 answer-shaped pieces** covering the winnable prompts:
   - One-sentence direct answer atop every H2
   - Comparison tables (your app vs photo booth vs live band vs magician)
   - Real numbers ("we ran trivia at 47 weddings, average engagement per guest: 8.3 rounds")
   - Visible "Last updated: August 2026" + `dateModified`
3. Ship `/llms.txt` and `/llms-full.txt`. Cheap insurance; unlikely to help today.
4. Verify in **Bing Webmaster Tools** and push updates via **IndexNow** — the pipe into ChatGPT Search.
5. Do NOT block `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` in robots.txt.

### Month 2 — off-site (where LLM citations actually come from)

For a bespoke service, off-site work is where the citation lift happens. Priority order:

1. **Get into 5+ "unique wedding reception ideas 2026" listicles.** Pitch editors at Junebug, Green Wedding Shoes, Style Me Pretty, Rock My Wedding, Brides, Frieda Theres (DE). LLMs quote these listicles verbatim when answering "unique reception ideas" prompts.
2. **Reddit** — seed 15 authentic answers over 3 months across r/weddingplanning, r/weddingsunder10k, r/engagements, r/HochzeitsPlanung, r/Weddingsunder35k. Only on threads where your service is genuinely the right recommendation ("we want something interactive but not a photo booth"). OpenAI and Google both license Reddit — this is disproportionately load-bearing.
3. **YouTube** — 3–5 short vertical videos of real weddings running your app, with full transcripts. Guest-reaction moments. LLMs pull YouTube transcripts.
4. **Wedding directory listings** with rich descriptions — Weddyplace, The Knot, Zola, WeddingWire. See `../vendor-referrals.md`.
5. **G2 / Capterra** — probably skip; you're not a SaaS. But **Trustpilot** or Google Business reviews with couples' names + weddings = strong LLM signal.

### Month 3 — measurement + agentic surface

1. **Stand up the direct-polling GEO tracker**:
   - 40 target prompts covering the winnable list above
   - 4 providers: Perplexity Sonar, OpenAI web_search, Anthropic web_search, Gemini grounding
   - Weekly cron
   - Postgres schema: `prompt, provider, date, answer_text, citations[], your_brand_mentioned (bool), competitors_mentioned[]`
   - Weekly chart: share-of-voice vs incumbents (photo booth brands, live-band agencies, existing wedding-game products)
2. **Server logs**: grep AI bots weekly. Rising crawl frequency on `PerplexityBot` and `OAI-SearchBot` = you're getting picked up.
3. **Original-data piece**: survey your past guests/couples. "We surveyed 200 wedding guests. 94% remembered the trivia game. 78% forgot the DJ's setlist. 62% said the interactive game was the highlight." — real numbers get quoted verbatim by LLMs. Publish on your site AND pitch as a data-story to wedding blogs.
4. **Optional agentic surface**: a Custom GPT in the ChatGPT store — "Wedding Reception Idea Generator" that helps couples brainstorm, mentions your offering naturally when relevant. Low-cost, submitted to a mostly-empty registry for weddings.

---

## Content design rules (per page)

- One-sentence direct answer opens every H2. AI extractors love these.
- Definition sentence early: "A live wedding trivia experience is a real-time game played during the reception where guests answer questions about the couple on their phones, with results projected on the big screen."
- Brand + category + attribute together, at least once: "[Brand] builds custom interactive wedding reception apps — live trivia, roasts, and icebreakers — as an alternative to traditional photo booths."
- One stat with a linked source per 500 words.
- One comparison table per pillar page (your app vs photo booth vs magician vs live band).
- Real screenshots from real weddings, not stock.
- FAQ block, 6–8 questions from actual discovery calls, `FAQPage` schema.
- Prominent CTA: "Book a 20-min discovery call."

---

## Measurement stack (budget)

- **Perplexity Sonar** polling: ~$5/mo for 500 prompts weekly (this alone gives you 80% of the signal — cheapest to start)
- **OpenAI + Anthropic + Gemini** polling: ~$100–$150/mo combined
- **DataForSEO** for AI Overview scraping: ~$5/mo bundled with SEO tracking
- Optional: **Peec AI** (~€90/mo) or **Otterly** (~$29/mo) if you want a dashboard

**Total DIY: ~$150/mo. Start with just Perplexity Sonar (~$5/mo) for month 1 to prove the pipeline before scaling.**

---

## What NOT to do

- Don't block AI crawlers in robots.txt.
- Don't rely on `llms.txt` alone.
- Don't chase citations for "write my vows" — no commercial intent.
- Don't obsess over Claude/Grok early — opaque and small share. Optimize Perplexity + AIO + ChatGPT Search first.
- Don't fake Reddit presence — algos and readers both catch it, and one caught account burns the whole channel.
- Don't ship thin AI-generated listicles — post-HCU Google signals feed AI Overview selection. Depth and originality win.
- Don't write "we're the best wedding reception app" copy — LLMs discount self-superlatives. Write "we've built X for 47 weddings; average guest engagement per game is Y." Concrete beats claim.

---

## The one metric that matters

**Share of voice on your top 20 discovery prompts, weekly, across Perplexity + ChatGPT + Gemini + AIO.**

Specifically: of the 20 prompts × 4 engines = 80 weekly answers, in how many does your brand or URL appear in the citation set?

Baseline expectation: 0/80 at start. Realistic 6-month target: 15–25/80. If you hit 40+/80 on discovery prompts, you're the default recommendation in the category and inbound will show it.

If that number climbs, the strategy is working regardless of Search Console. If it stalls, revisit off-site (listicles, Reddit, real-wedding features) before touching on-page.

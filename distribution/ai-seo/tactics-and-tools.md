# GEO Tactics & Tools

Manual tactics that repeatedly move the needle in generative-engine citations, plus the API/tool landscape for measurement.

> **Product-fit note.** For a bespoke reception-app service, the highest-ROI tactics from this list are: (1) getting into wedding-blog listicles ("unique reception ideas 2026"), (2) authentic Reddit presence in wedding subs, (3) YouTube videos of real weddings running your app with full transcripts, (4) original-data pieces (survey your past couples/guests). Skip the Custom GPT / MCP server plays unless you have engineering slack — they're second-order.

> Field moves weekly. Vendor pricing below is training-based (early 2026). Verify at each vendor's pricing page before committing.

---

## Manual tactics that work

### Structure pages as answer machines

- Lead every section with a **one-sentence direct answer**, then evidence.
- Add a TL;DR box, a definition sentence ("X is a Y that does Z"), a comparison table, a numbered "How to" list.
- Use question-shaped H2s that mirror how people prompt AI ("What are photo booth alternatives for a wedding reception?").
- Include **statistics with linked sources** and **quoted expert lines** — the Princeton GEO paper (arXiv:2311.09735) found these two moves alone drove up to ~40% lift.

### Semantic clarity (entity SEO)

- Mention brand + category + attribute in the same sentence ("[Brand] is a **bespoke wedding reception app** service — live trivia, roasts, and icebreakers built custom for each couple").
- Use consistent entity naming; connect to Wikidata/Wikipedia if you become notable.
- Add `sameAs` links (Instagram, Pinterest, LinkedIn, YouTube, TikTok, Google Business) in `Organization` schema.

### Citation-worthiness

- **Original data or surveys** — "We surveyed 200 wedding guests. 94% remembered the trivia game; 62% called it the highlight." Gets quoted verbatim. Highest-ROI move for small players.
- **First-person experience** — photos, screenshots, "we built…" — favored by post-HCU Google and (anecdotally) by Perplexity.

### Structured data

`FAQPage`, `HowTo`, `Service`, `SoftwareApplication`, `Organization`, `LocalBusiness`, `Review`, `Event`. Google confirms schema helps AI Overviews eligibility; OpenAI/Anthropic don't confirm, but schema-rich pages tend to be cleaner for extractors.

### Off-site is more than half the game

LLMs disproportionately quote:
- **Reddit** (OpenAI + Google both have licensing deals)
- **Wikipedia**
- **YouTube** (transcripts)
- **GitHub** READMEs
- **G2 / Capterra / Product Hunt** listings (less relevant to you — you're not SaaS)
- **Substack** and industry editorial

Wedding-specific: r/weddingplanning, r/weddingsunder10k, r/engagements, r/HochzeitsPlanung. Listicles on Junebug, Green Wedding Shoes, Style Me Pretty, Rock My Wedding, Frieda Theres.

### Freshness signals

Visible "Last updated: August 2026" plus `dateModified` in schema. Perplexity and AI Overviews visibly prefer fresh dates for how-to and idea content.

### Prompt-space research

Real AI queries are longer and more conversational than Google queries ("how do we make our 80-guest wedding reception feel intimate but fun without a photo booth?"). Mine them from AlsoAsked, AnswerThePublic, wedding subreddits, and by prompting the LLMs yourself and logging follow-up questions.

### Brand co-occurrence

Get named next to category incumbents (photo booth brands, live-band agencies, existing wedding game products) in third-party articles. LLMs learn "alternatives to X" clusters; being in the cluster = being recommended.

---

## Purpose-built GEO tracking platforms

All launched or repositioned 2024–2025. Verify pricing live.

| Tool | What it does | API? | Rough price |
|---|---|---|---|
| **Profound** (tryprofound.com) | Enterprise citation tracking across ChatGPT/Perplexity/AIO/Copilot; Conversation Explorer | Yes (enterprise) | $500–$5k+/mo, sales-led |
| **Peec AI** (peec.ai) | Prompt tracking, share-of-voice, competitor citations | Yes | ~€90–€500/mo |
| **AthenaHQ** (athenahq.ai) | AI visibility + recommendations engine | Limited | ~$99–$999/mo |
| **Otterly.AI** (otterly.ai) | Prompt monitoring across SGE/ChatGPT/Perplexity | Beta API | from ~$29/mo |
| **Scrunch AI** | Enterprise AI search analytics | Yes | Sales-led |
| **Rankscale** | AI SERP + citation tracking | Yes | ~$49+/mo |
| **HubSpot AI Search Grader** | One-off free audit | No | Free |
| **Semrush AI Toolkit** | AI Overviews tracking bolted onto Semrush | Semrush API | Included in Business (~$500/mo) |
| **Ahrefs Brand Radar** | Brand mentions across AI answers | Ahrefs API | Enterprise |
| **SE Ranking AI Results Tracker** | AIO tracking | Yes | from ~$65/mo |
| **Writesonic GEO** | Content optimization + tracking | Yes | ~$79+/mo |
| **Surfer AI** | Content optimization for AI + Google | Yes | ~$89+/mo |
| **Goodie AI** | PR-flavored GEO | No public API | Sales-led |

For a bespoke wedding service at year one, **Otterly** (~$29/mo) or DIY Sonar polling (~$5/mo) is enough. Skip enterprise tools.

---

## SERP APIs with AI Overviews endpoints

- **DataForSEO** — explicit AI Mode / AI Overview endpoints inside Google SERP API. ~$0.002–$0.006/request. https://docs.dataforseo.com (see `../seo/dataforseo-api.md`)
- **SerpApi** — `google_ai_overview` engine returning the AIO block with sources. ~$50/mo starter, ~$0.01–$0.02/query at scale. https://serpapi.com/google-ai-overview
- **Serper.dev, ScrapingBee, Oxylabs** — all shipped AIO endpoints in 2025.

---

## Direct-polling approach (cheapest, most flexible)

Cron your ~40 target prompts against the model APIs. Log whether your domain/brand appears in the answer or citations. Store in Postgres. Chart share-of-voice vs incumbents (photo booth brands, live-entertainment agencies) over time.

- **Perplexity Sonar** — returns `citations[]`. ~$1/1k requests + tokens. **Best signal** — start here.
- **OpenAI** — `gpt-5` / `gpt-4.1` with `web_search` tool. Citations returned as annotations.
- **Anthropic** — `web_search_20250305` tool. `citations` in response.
- **Gemini** — Google Search grounding. `groundingMetadata` includes URIs.

Rough cost for **400 prompts/month × 4 providers = 1,600 calls**, ~2k input + 1k output tokens each, blended ~$10/M in + $30/M out: **~$80–$120/month all-in.**

---

## Server-log analysis

Grep access logs for AI-crawler user agents:

```
GPTBot | OAI-SearchBot | ChatGPT-User
PerplexityBot | Perplexity-User
ClaudeBot | Claude-Web | Claude-User | anthropic-ai
Google-Extended | Googlebot
Bytespider | Amazonbot | Applebot-Extended
Meta-ExternalAgent | Meta-ExternalFetcher
DuckAssistBot | cohere-ai | MistralAI-User
```

Cloudflare's **AI Audit** dashboard and Vercel's Bot Management surface this without regex work. Reference: https://darkvisitors.com/agents

Signal: crawl frequency correlates loosely with citation likelihood. If `PerplexityBot` is hitting your pillar guide weekly, you're on the radar.

---

## llms.txt — status check

Proposed by Jeremy Howard (Answer.AI) in Sept 2024: an `/llms.txt` (and `/llms-full.txt`) markdown summary for LLM consumption.

- **Adopted by**: Anthropic, Cloudflare, Stripe, Vercel, Perplexity docs, Zapier, Mintlify, Hugging Face, many dev-tool companies.
- **Officially honored by**: essentially **none** of the major engines. Google's John Mueller and OpenAI staff have publicly said it's not a signal.
- **Verdict**: aspirational standard. Ship as cheap insurance. Do not expect citation lift today.

Spec: https://llmstxt.org

---

## Sources

- GEO paper (Aggarwal et al., 2023): https://arxiv.org/abs/2311.09735
- Perplexity Sonar: https://docs.perplexity.ai
- Anthropic web search tool: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool
- OpenAI bots: https://platform.openai.com/docs/bots
- Dark Visitors: https://darkvisitors.com/agents
- llms.txt: https://llmstxt.org

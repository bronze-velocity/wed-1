# DataForSEO vs. OpenRouter — cost of probing LLMs for Wepho visibility

Companion to `dataforseo-ai.md` and `scripts/dataforseo-ai-probe.mjs`.

**TL;DR** — OpenRouter is 5–50× cheaper per prompt for raw model calls, but it doesn't answer the same question. DataForSEO tells you *what real users see when they actually search* (localised AI Overviews, ChatGPT web-search citations, AI keyword volume). OpenRouter just gives you the model's answer to a prompt you wrote. For **GEO monitoring** you need DataForSEO; for **content ideation and stress-testing your own copy against an LLM** OpenRouter is fine.

> All prices verified against public rate cards in early 2026 — re-verify before budgeting.
> - DataForSEO: https://dataforseo.com/pricing
> - OpenRouter: https://openrouter.ai/models

---

## What each service actually is

| | DataForSEO AI Optimization | OpenRouter |
|---|---|---|
| Type | SERP / search-data API | LLM inference gateway |
| Returns | The **result** a user sees in ChatGPT Search / Google AI Mode / etc. — including citations, ranked links, AI Overview HTML, brand mentions, per-locale variance | The model's raw completion for your prompt |
| Locale + geo | First-class (`location_code`, `language_code`, per-country AI Overview rendering) | None — you can only *ask* the model to pretend |
| Web-grounded | Yes (real live SERP / real ChatGPT-with-browsing) | Only on models with tool use, and it's a separate `:online` variant billed extra |
| Cites URLs | Yes, as returned by the actual product | Only if the model chose to and you asked for them |
| Bulk keyword volume | Yes (AI Keyword Data endpoint) | No |
| Rate limits | 2,000 req/min, 30 concurrent | Model-dependent, generally very generous |

They overlap in **one narrow spot**: asking a specific LLM a question and getting its answer. Everywhere else, they answer different questions.

---

## Price per unit (early 2026)

### DataForSEO — AI-specific endpoints

Task-based (POST → poll → GET) is standard and cheaper than `/live`.

| Endpoint | Task price | Live price |
|---|---|---|
| SERP Google Organic (returns AI Overview block) | $0.0006 | $0.002 (regular) / $0.003 (advanced) |
| SERP Google AI Mode | ~$0.002 | ~$0.005 |
| LLM Scraper (ChatGPT search) | ~$0.003 per prompt | ~$0.005 |
| LLM Responses (ChatGPT/Claude/Gemini/Perplexity) | model-passthrough + ~$0.002 fee. For gpt-4o-mini: **~$0.003 total per short prompt** | same + live premium |
| AI Keyword Data — search volume | $0.0001 per keyword, batched up to 1,000/req (~$0.10 per 1,000) | live-only endpoint |
| LLM Mentions | ~$0.002 per keyword/brand check | — |

### OpenRouter — raw model calls

Prices are USD per 1M tokens (input / output). A "probe" here means a ~200-token prompt + ~600-token answer (~0.0008M tokens in + ~0.0006M out).

| Model | Input | Output | Cost per probe |
|---|---|---|---|
| GPT-4o-mini | $0.15 | $0.60 | ~$0.0005 |
| GPT-4o | $2.50 | $10.00 | ~$0.008 |
| Claude Haiku 4.5 | $1.00 | $5.00 | ~$0.0038 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | ~$0.012 |
| Gemini 2.5 Flash | $0.30 | $2.50 | ~$0.0018 |
| Perplexity Sonar (small, online) | $1.00 | $1.00 | ~$0.0014 |
| Perplexity Sonar Pro (online) | $3.00 | $15.00 | ~$0.012 |

OpenRouter adds a **5% markup + $0.35 Stripe fee per credit top-up**; that's the whole overhead.

`:online` variants (Perplexity, `<model>:online`) add web search — closer in spirit to what DataForSEO returns — and cost roughly 2–3× the base model.

---

## Same-workload comparison

Scenario: run **20 wedding-market prompts per week** to monitor how AI surfaces answer questions like *"custom wedding app for reception"*.

| Approach | Weekly cost | Annual cost | What you actually get |
|---|---|---|---|
| **DataForSEO LLM Scraper (task)** — 20 prompts | 20 × $0.003 = **$0.06** | $3.12 | Real ChatGPT-search results with the exact links & snippets a user would see |
| **DataForSEO SERP AI Mode (task)** — 20 prompts, 2 locales | 40 × $0.002 = **$0.08** | $4.16 | Google AI Mode block per locale (US + DE) |
| **DataForSEO Google Organic (task)** — 20 prompts, checks AI Overview presence | 20 × $0.0006 = **$0.012** | $0.62 | Classic SERP + AIO detection |
| **DataForSEO LLM Responses (task, gpt-4o-mini)** — 20 prompts | 20 × $0.003 = **$0.06** | $3.12 | Model answer + citations, no need to manage your own OpenAI key |
| **OpenRouter (gpt-4o-mini)** — 20 prompts | 20 × $0.0005 = **$0.01** | $0.52 | Model answer only. No web grounding, no citations, no locale. |
| **OpenRouter (Perplexity Sonar :online)** — 20 prompts | 20 × $0.0014 = **$0.028** | $1.46 | Model answer + web citations, closer to real ChatGPT Search but from a different model |

At this workload, **both are pocket change**; the choice is purely about what data you need, not price.

Where the gap opens up: **bulk keyword volume**. DataForSEO's AI Keyword Data is $0.10 per 1,000 keywords in one batched call. OpenRouter can't do this at all — asking a model to *estimate* volumes is unreliable and each estimate is a full inference call ($0.01–$0.05 each). For **5,000 keywords**: DataForSEO $0.50, OpenRouter ~$50–$250 of hallucinated numbers.

---

## When to reach for which

**Use DataForSEO when:**
- You want to know if Wepho (or a competitor) is cited in AI answers for a given query.
- You need locale-specific results (US couples vs. German couples).
- You need SERP-adjacent data — AI Overview presence, People Also Ask, top-ranked pages — in one payload.
- You need bulk keyword volume / intent for AI search.
- You want a repeatable, dated audit trail (task IDs, ready timestamps).

**Use OpenRouter when:**
- You're generating or refining copy, meta descriptions, JSON-LD, alt text.
- You want to *stress-test* your own landing-page copy: "given only this HTML, would you recommend Wepho?"
- You're running many models against the same prompt to compare answers (Claude vs. GPT-4o vs. Gemini) — OpenRouter's uniform API makes this trivial.
- You need long-context work (summarising all 20 app pages at once) where token pricing beats per-request pricing.
- You need a chatbot / agent backend for internal tooling.

**Use both together (the actual recommended stack for Wepho):**
1. **DataForSEO** monthly cron: 50–100 prompt + AI-Mode probes across US/DE → track brand mention rate, citation URLs, per-locale variance. **~$0.50/mo.**
2. **OpenRouter** for content work: generate & audit JSON-LD, `/llms.txt`, per-app FAQ blocks, answer-shape H2s. Pay-as-you-generate, likely **<$5/mo** at Wepho's scale.

Total AI-visibility tooling: **under $10/month**, either way. The pricing is not the constraint; the endpoint semantics are.

---

## Caveats

- DataForSEO's `llm_responses` endpoint is essentially a **reseller** for OpenAI/Anthropic/Google/Perplexity model calls — you pay the model's underlying cost + a small platform fee. If you already have an OpenAI key it's cheaper to hit that directly (or via OpenRouter). The value-add is only that DataForSEO bundles it with their other endpoints under one bill.
- Perplexity's own API (or Perplexity via OpenRouter's `:online` variants) is the closest cheap analog to "what does a search-grounded LLM say about this," but it doesn't tell you what *ChatGPT* says or what *Google AI Mode* returns. Only DataForSEO's scraper endpoints give you those.
- Prices change quarterly. The AI Optimization suite in particular is still evolving — check https://docs.dataforseo.com/v3/changelog/ before locking in a monthly budget.

# How AI Engines Source Answers (2025–2026)

Being cited by an LLM answer ≠ ranking on Google. Each engine has its own retrieval stack, crawler set, and citation logic. This is the map.

> **Product-fit note.** For a bespoke reception-app service, the highest-value engines to target are (1) Perplexity — most measurable via Sonar citations and heavily used by discovery-mode planners, (2) Google AI Overviews — captures the "unique reception ideas" query at scale, (3) ChatGPT Search — via Bing index. Meta AI and Grok are low priority. Claude is opaque but benefits from the same signals.

> Compiled from public bot docs and vendor statements through early 2026. Bot names and behaviors change fast — cross-check at https://darkvisitors.com/agents before writing crawler rules.

---

## ChatGPT / ChatGPT Search (OpenAI)

Two answer paths:
- **Training data** — Common Crawl + licensed deals (AP, Axel Springer, FT, News Corp, Reddit, Stack Overflow, Vox, Condé Nast).
- **Live retrieval via SearchGPT** — uses Microsoft **Bing's index** plus OpenAI's own crawlers.

Crawlers:
- `GPTBot` — training corpus.
- `OAI-SearchBot` — index building for SearchGPT.
- `ChatGPT-User` — on-demand fetches triggered by a live user prompt.

Citations shown in ChatGPT come from the **retrieval** layer, not from training.

Implication: rank in **Bing** and get crawled by `OAI-SearchBot` — those two together dictate whether you show up in ChatGPT Search answers.

Docs: https://platform.openai.com/docs/bots

---

## Perplexity

- Real-time retrieval via `PerplexityBot` and `Perplexity-User`.
- Mix of Google/Bing SERPs plus Perplexity's own index.
- Leans heavily on **Reddit, Wikipedia, academic, and news** domains.
- Citations are inline at sentence granularity — the most transparent of any engine.
- Ships the **Sonar API** (`sonar`, `sonar-pro`, `sonar-reasoning`) that returns a `citations[]` array — this is the single most useful primitive for GEO measurement across engines.

Docs: https://docs.perplexity.ai · https://sonar.perplexity.ai

---

## Google AI Overviews / Gemini / AI Mode

- Pulls from the standard **Google index** — classical ranking signals (E-E-A-T, Helpful Content, structured data) still matter as a floor.
- Selection into an Overview seems to favor pages with clear passage-level answers, `FAQPage` / `HowTo` schema, strong entity/topical authority.
- Gemini in the Google app uses the same retrieval stack.
- **`Google-Extended`** is the opt-out token for Gemini / Vertex training. Does NOT affect indexing or AI Overviews eligibility.
- AI Overviews are fetched by standard `Googlebot` — no separate crawler.

Docs: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers

---

## Claude (Anthropic)

- Web search is a **tool** (`web_search_20250305`) available in the API and inside Claude.ai / Claude Code.
- Crawlers:
  - `ClaudeBot` — training.
  - `Claude-Web`, `Claude-User` — user-triggered fetches.
  - `Claude-SearchBot` — search index.
- Anthropic has NOT publicly documented citation/selection logic.
- Cited URLs come back to the API as a `citations` field.

Docs: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool · https://darkvisitors.com/agents/claudebot

---

## Bing Copilot (Microsoft Copilot)

- Bing index + `bingbot`.
- Copilot answers are generated over Bing SERP by the Prometheus orchestrator.
- Table stakes: verified in **Bing Webmaster Tools** and pushing updates via **IndexNow**.

---

## Meta AI

- Crawlers: `Meta-ExternalAgent`, `Meta-ExternalFetcher`.
- Retrieval quality trails peers.
- Heavily weights **Facebook / Instagram public content**, Wikipedia, news partners.

Docs: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers

---

## Grok (xAI)

- Live retrieval from **X/Twitter** plus general web.
- Crawler seen in logs as `xAI`; no public bot doc as of early 2026.
- Being talked about on X is disproportionately impactful for Grok citations.

---

## Other bots worth watching in logs

`Bytespider` (ByteDance / Doubao), `Amazonbot`, `Applebot-Extended`, `DuckAssistBot`, `cohere-ai`, `MistralAI-User`, `anthropic-ai`.

Reference list: https://darkvisitors.com/agents

---

## Key takeaways

- **Bing matters again.** ChatGPT Search rides Bing's index. Verify in Bing Webmaster Tools, push IndexNow.
- **Reddit + Wikipedia + YouTube are LLM-favorite sources.** Off-site presence there outweighs an extra blog post on your own domain.
- **`Google-Extended` doesn't help you rank in AI Overviews** — it only controls Gemini training. Don't confuse the two.
- **Perplexity is the most measurable engine** (Sonar API returns citations). Use it as your canary.
- **Claude and Grok are opaque.** Optimize for the transparent engines; Claude/Grok benefit downstream from the same signals.

---

## Sources

- Princeton/Georgia Tech GEO paper (Aggarwal et al., 2023): https://arxiv.org/abs/2311.09735
- OpenAI bot docs: https://platform.openai.com/docs/bots
- Google crawler docs: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Anthropic web search tool: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool
- Perplexity Sonar: https://docs.perplexity.ai
- Meta crawlers: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
- Dark Visitors bot registry: https://darkvisitors.com/agents

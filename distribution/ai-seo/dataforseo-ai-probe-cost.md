# DataForSEO AI probe — cost of one run

Companion to `scripts/dataforseo-ai-probe.mjs`. Numbers use the task-based
(POST → poll → GET) rate card documented in `dataforseo-vs-openrouter-cost.md`;
re-verify against https://dataforseo.com/pricing before budgeting.

Current script config: **7 US prompts, 0 DE prompts (commented out), 2 LLM
Responses prompts, 5 AI-keyword-volume keywords.**

## Per endpoint

| # | Endpoint | Mode | Calls | Unit price | Subtotal |
|---|---|---|---:|---:|---:|
| 1 | `chat_gpt/llm_scraper/task_post` | task | 7 (US prompts) | $0.003 | **$0.0210** |
| 2 | `chat_gpt/llm_responses/task_post` (gpt-4o-mini + web_search) | task | 2 | ~$0.003 | **$0.0060** |
| 3 | `serp/google/ai_mode/task_post` | task | 7 (US) + 0 (DE) | $0.002 | **$0.0140** |
| 4 | `ai_optimization/ai_keyword_data/keywords_search_volume/live` | live, batched | 1 request / 5 keywords | $0.0001 / keyword | **$0.0005** |

**Total per run: ~$0.0415** (call it ~4¢).

Polling `tasks_ready` and per-id `task_get` fetches are free — only the
`task_post` and `/live` calls are billed.

## If you uncomment the 3 DE prompts

Adds 3 × $0.002 = **$0.006** to step 3, bringing the run to **~$0.0475**.

## Scaling notes

- Weekly cadence (52 runs/yr, US only): ~$2.16/yr.
- Weekly cadence with DE: ~$2.47/yr.
- Doubling to 14 US prompts across all three prompt-driven endpoints: ~$0.076
  per run (~$3.95/yr weekly).
- The AI Keyword Data step is essentially free at this scale ($0.10 buys 1,000
  keywords in one batched call), so expand that list liberally before worrying
  about cost.

The dominant cost drivers are steps 1 and 3 (both scale linearly with prompt
count). Trim `US_PROMPTS` or leave `DE_PROMPTS` commented to keep runs at
sub-nickel.

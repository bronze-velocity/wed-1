# DataForSEO AI Probe — Runbook

Operational notes for `scripts/dataforseo-ai-probe.mjs`. See `dataforseo-ai.md` for strategy and `dataforseo-vs-openrouter-cost.md` for why we use this vs. raw LLM calls.

---

## First run

```
node scripts/dataforseo-ai-probe.mjs
```

Requires `DATAFORSEO_LOGIN` + `DATAFORSEO_API_PASSWORD` in `.env.local` (same creds as `enrich-keywords-volume.mjs`). Set `SANDBOX=1` to smoke-test against `sandbox.dataforseo.com` for free — sandbox returns dummy payloads but the request/response shapes are real.

Writes to `distribution/ai-seo/probes/<UTC-timestamp>/`. Print that path when it exits — you'll need it to resume or diff.

---

## Output files

For each of the three task-based probes:

| File | Contents |
|---|---|
| `<label>.post.json` | Raw POST response — authoritative list of task IDs, cost, per-task status. **Do not delete** — resume mode reads it. |
| `<label>.results.json` | Array of `{ id, tag, result | error }`. This is the file you actually consume. Rewritten in place by resume mode. |

Plus one live-call file:

| File | Contents |
|---|---|
| `4-ai-keyword-data-volume.json` | Live response with AI-search volume per keyword. One-shot, no resume needed. |

---

## Cost and runtime per full run

Current prompt set (7 US prompts, DE prompts commented out, 2 LLM Responses prompts, 5 keyword-volume rows):

- LLM Scraper: 7 × ~$0.003 = ~$0.02
- LLM Responses: 2 × ~$0.003 = ~$0.01
- SERP AI Mode: 7 × ~$0.002 = ~$0.02
- AI Keyword Data (live): ~$0.001

**Total: ~$0.05 per run.** Uncommenting the German prompts adds ~$0.01.

Wall-clock: usually **1–3 minutes**. LLM Scraper is the slowest — DataForSEO is running a real headless ChatGPT session per prompt. Occasionally spikes to 5–10 min under load.

---

## When a run times out

The script waits `timeoutMs` (default 5 min per probe batch) then writes any un-fetched tasks as `{ error: "timeout before ready" }` in `*.results.json`. Nothing is lost — the task IDs are still in `*.post.json` and DataForSEO keeps results server-side for ~30 days.

**Two ways to recover:**

1. **Resume** (preferred, always free of extra cost):
   ```
   node scripts/dataforseo-ai-probe.mjs --resume distribution/ai-seo/probes/<timestamp>/
   ```
   Re-fetches any task whose results entry is missing or has an `error`. Idempotent — run again if some tasks are still queued. No new POSTs are made.

2. **Bump the timeout** on a fresh run:
   ```js
   await runTaskBatch({ …, timeoutMs: 15 * 60 * 1000 });
   ```
   Use this if timeouts are consistent — usually means DataForSEO is under load or your prompts hit ChatGPT rate-throttling.

Rule of thumb: if half your tasks completed, use `--resume`. If nothing completed, something is wrong (bad endpoint path, dead creds, DataForSEO outage) — check the error message, don't just retry.

---

## Editing prompts

All prompt arrays are at the top of the script (~lines 90–120):

- `US_PROMPTS` — feeds LLM Scraper (ChatGPT search) and SERP AI Mode (US locale).
- `DE_PROMPTS` — feeds SERP AI Mode (DE locale). Commented out by default to keep runs cheap and US-focused; uncomment individual lines to enable.
- `KEYWORDS_FOR_AI_VOLUME` — feeds the live AI Keyword Data call.
- The LLM Responses prompts (~line 200) are inline — two prompts asking the model to recommend a custom-wedding-app service. Edit in place.

Keep prompts **search-shaped** ("how much does…", "custom wedding app for…"), not chat-shaped ("hey, do you know any…"). LLM Scraper and AI Mode both simulate real search, not conversation.

---

## Monthly cadence

Suggested cron (via `/schedule` skill or the platform of your choice):

- First of the month, 08:00 UTC — run the script.
- The next day, 08:00 UTC — run `--resume` on yesterday's dir to sweep up anything that timed out.
- Diff `results.json` files month-over-month to track brand-mention drift.

At ~$0.05/run this is ~$0.60/year of DataForSEO spend for a full GEO monitoring loop.

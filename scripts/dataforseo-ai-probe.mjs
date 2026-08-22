#!/usr/bin/env node
// Probe DataForSEO's AI Optimization + SERP AI Overview endpoints with a
// handful of Wepho-relevant prompts, using the standard task-based pattern
// (POST → poll tasks_ready → GET task_get) rather than the pricier /live
// variants. One live call is included at the end for the AI Keyword Data
// endpoint (which has no task-based variant at the time of writing).
//
// Usage:
//   node scripts/dataforseo-ai-probe.mjs [outdir]
//   node scripts/dataforseo-ai-probe.mjs --resume <existing-outdir>
//
// Reads DATAFORSEO_LOGIN and DATAFORSEO_API_PASSWORD from `.env.local`.
// Set SANDBOX=1 to hit sandbox.dataforseo.com instead of api.dataforseo.com.
//
// Default output dir: distribution/ai-seo/probes/<UTC-timestamp>/
//
// Resume mode: re-fetches any task IDs from `<outdir>/*.post.json` whose
// entry in the sibling `*.results.json` is missing or has an `error` field.
// DataForSEO retains task results server-side for ~30 days, so a run that
// timed out (or was ctrl-c'd) can be finished later without re-posting.
//
// Endpoints exercised (see https://docs.dataforseo.com/v3/):
//   - /v3/ai_optimization/chat_gpt/llm_scraper/task_post
//     /v3/ai_optimization/chat_gpt/llm_scraper/tasks_ready
//     /v3/ai_optimization/chat_gpt/llm_scraper/task_get/advanced/{id}
//   - /v3/ai_optimization/chat_gpt/llm_responses/task_post
//     /v3/ai_optimization/chat_gpt/llm_responses/task_get/{id}
//   - /v3/serp/google/ai_mode/task_post
//     /v3/serp/google/ai_mode/task_get/advanced/{id}
//   - /v3/ai_optimization/ai_keyword_data/keywords_search_volume/live
//
// The task-based endpoints charge less per call than /live, and DataForSEO
// completes most tasks within seconds to a couple of minutes. We poll
// tasks_ready then fall back to a per-id timeout.

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv(resolve('.env.local'));

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_API_PASSWORD ?? process.env.DATAFORSEO_PASSWORD;
if (!LOGIN || !PASSWORD) {
  console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_API_PASSWORD in .env.local (or env).');
  process.exit(1);
}

const HOST = process.env.SANDBOX === '1' ? 'https://sandbox.dataforseo.com' : 'https://api.dataforseo.com';
const AUTH = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

const args = process.argv.slice(2);
const resumeIdx = args.indexOf('--resume');
const RESUME_DIR = resumeIdx !== -1 ? resolve(args[resumeIdx + 1] ?? '') : null;
if (RESUME_DIR && !existsSync(RESUME_DIR)) {
  console.error(`--resume dir does not exist: ${RESUME_DIR}`);
  process.exit(1);
}

const STAMP = new Date().toISOString().replace(/[:.]/g, '-');
const OUTDIR = RESUME_DIR ?? resolve(args[0] ?? join('distribution/ai-seo/probes', STAMP));
await mkdir(OUTDIR, { recursive: true });

// Registry so both fresh mode and resume mode share the task_get URL shape.
// Label → function that produces the task_get path for a given task id.
const TASK_GET_PATHS = {
  '1-llm-scraper-chatgpt': (id) => `/v3/ai_optimization/chat_gpt/llm_scraper/task_get/advanced/${id}`,
  '2-llm-responses-chatgpt': (id) => `/v3/ai_optimization/chat_gpt/llm_responses/task_get/${id}`,
  '3-serp-google-ai-mode': (id) => `/v3/serp/google/ai_mode/task_get/advanced/${id}`,
};

// ---------- prompts / keywords -------------------------------------------

// Prompts a couple might paste into ChatGPT / AI Mode when researching a
// bespoke wedding-app service like Wepho. Location + language matter for
// AI Mode and LLM Scraper — Google localises AI Overviews per market.
// Search-shaped queries a couple or planner would actually type when
// researching a bespoke, guest-facing wedding-reception app. Tuned to
// Wepho's positioning (custom / one-night / interactive / phone-first)
// so we can see whether Wepho or any real competitor gets cited.
const US_PROMPTS = [
  'custom wedding app built just for our reception',
  'bespoke interactive web app for wedding guests to use on their phones',
  'how much does a custom-built wedding reception app cost',
  'wedding guest messages displayed live on a big screen during reception',
  'alternatives to The Knot and Joy — something personalised to our love story',
  'unique interactive wedding reception entertainment beyond photo booth and DJ',
  'studio that designs one-night-only interactive experiences for weddings',
];

// German prompts — commented out by default to keep runs cheap and US-focused.
// Uncomment entries to include them in the SERP Google AI Mode batch below.
const DE_PROMPTS = [
  // 'individuelle Hochzeits-App für die Hochzeitsfeier',
  // 'interaktive Spiele für die Hochzeitsfeier für Gäste',
  // 'Was kostet eine eigene Hochzeits-Web-App',
];

const KEYWORDS_FOR_AI_VOLUME = [
  'custom wedding app',
  'interactive wedding games',
  'wedding reception app',
  'wedding guest app',
  'wedding trivia game',
];

// ---------- helpers -------------------------------------------------------

async function postJson(path, body) {
  const res = await fetch(`${HOST}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`POST ${path} → HTTP ${res.status} ${res.statusText}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

async function getJson(path) {
  const res = await fetch(`${HOST}${path}`, { headers: { Authorization: AUTH } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`GET ${path} → HTTP ${res.status} ${res.statusText}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Post a batch of tasks, poll tasks_ready for up to `timeoutMs`, then fetch
// each result via task_get. Returns [{ id, tag, result | error }].
async function runTaskBatch({ label, taskPostPath, tasksReadyPath, taskGetPathFor, tasks, timeoutMs = 5 * 60 * 1000, pollMs = 5000 }) {
  console.error(`\n▶ ${label}: posting ${tasks.length} task(s) → ${taskPostPath}`);
  const posted = await postJson(taskPostPath, tasks);
  await writeFile(join(OUTDIR, `${label}.post.json`), JSON.stringify(posted, null, 2));

  const taskEntries = (posted.tasks ?? []).map((t, i) => ({
    id: t.id,
    tag: tasks[i]?.tag ?? t.data?.tag ?? String(i),
    post_status_code: t.status_code,
    post_status_message: t.status_message,
  }));
  const pending = new Map(taskEntries.filter((e) => e.id).map((e) => [e.id, e]));
  console.error(`  posted ${pending.size}/${tasks.length} ok — cost so far $${posted.cost ?? 0}`);

  const started = Date.now();
  const results = [];

  while (pending.size && Date.now() - started < timeoutMs) {
    await sleep(pollMs);
    let ready;
    try {
      ready = await getJson(tasksReadyPath);
    } catch (err) {
      console.error(`  tasks_ready poll failed: ${err.message}`);
      continue;
    }
    const readyIds = new Set(
      (ready.tasks ?? [])
        .flatMap((t) => t.result ?? [])
        .map((r) => r.id)
        .filter(Boolean),
    );
    const toFetch = [...pending.keys()].filter((id) => readyIds.has(id));
    if (!toFetch.length) {
      console.error(`  waiting… ${pending.size} task(s) still pending (${Math.round((Date.now() - started) / 1000)}s elapsed)`);
      continue;
    }
    for (const id of toFetch) {
      try {
        const got = await getJson(taskGetPathFor(id));
        results.push({ ...pending.get(id), result: got });
      } catch (err) {
        results.push({ ...pending.get(id), error: err.message });
      }
      pending.delete(id);
    }
  }
  for (const [id, entry] of pending) {
    results.push({ ...entry, error: 'timeout before ready' });
  }
  await writeFile(join(OUTDIR, `${label}.results.json`), JSON.stringify(results, null, 2));
  console.error(`  ${label}: done, ${results.length} result(s) written`);
  return results;
}

// ---------- resume mode ---------------------------------------------------
// Re-fetch pending tasks from an existing outdir and stop. Nothing new is
// posted, so this is idempotent and safe to run repeatedly until every task
// has a non-error result.

if (RESUME_DIR) {
  const { readdir, readFile } = await import('node:fs/promises');
  const files = (await readdir(RESUME_DIR)).filter((f) => f.endsWith('.post.json'));
  if (!files.length) {
    console.error(`No *.post.json files in ${RESUME_DIR} — nothing to resume.`);
    process.exit(1);
  }
  for (const postFile of files) {
    const label = postFile.replace(/\.post\.json$/, '');
    const taskGetPathFor = TASK_GET_PATHS[label];
    if (!taskGetPathFor) {
      console.error(`▶ ${label}: no task_get path registered — skipping`);
      continue;
    }
    const posted = JSON.parse(await readFile(join(RESUME_DIR, postFile), 'utf8'));
    const postedEntries = (posted.tasks ?? [])
      .map((t) => ({ id: t.id, tag: t.data?.tag ?? null }))
      .filter((e) => e.id);

    const resultsPath = join(RESUME_DIR, `${label}.results.json`);
    let existing = [];
    try {
      existing = JSON.parse(await readFile(resultsPath, 'utf8'));
    } catch {}
    const byId = new Map(existing.map((r) => [r.id, r]));

    const pending = postedEntries.filter((e) => {
      const prev = byId.get(e.id);
      return !prev || prev.error;
    });
    console.error(`\n▶ ${label}: ${pending.size ?? pending.length} pending / ${postedEntries.length} total`);
    if (!pending.length) continue;

    for (const entry of pending) {
      try {
        const got = await getJson(taskGetPathFor(entry.id));
        const taskStatus = got.tasks?.[0]?.status_code;
        // Status 40602 = "Task In Queue"; 40601 = "Task Handed"; anything
        // other than 20000 means the task isn't finished yet.
        if (taskStatus !== 20000) {
          byId.set(entry.id, { ...entry, error: `still pending (status ${taskStatus}: ${got.tasks?.[0]?.status_message})` });
          console.error(`  ${entry.id} → still pending (${taskStatus})`);
        } else {
          byId.set(entry.id, { ...entry, result: got });
          console.error(`  ${entry.id} → ok`);
        }
      } catch (err) {
        byId.set(entry.id, { ...entry, error: err.message });
        console.error(`  ${entry.id} → ${err.message}`);
      }
    }
    await writeFile(resultsPath, JSON.stringify([...byId.values()], null, 2));
  }
  console.error(`\nResume complete. Re-run this command if any tasks are still pending.`);
  process.exit(0);
}

// ---------- 1. LLM Scraper (ChatGPT) — task-based -----------------------
// Simulates a ChatGPT search for each prompt with a browser-like scrape.
// Docs: https://docs.dataforseo.com/v3/ai_optimization/chat_gpt/llm_scraper

const llmScraperTasks = US_PROMPTS.map((keyword) => ({
  keyword,
  language_name: 'English',
  location_name: 'United States',
  tag: `llm-scraper-us:${keyword}`,
}));

await runTaskBatch({
  label: '1-llm-scraper-chatgpt',
  taskPostPath: '/v3/ai_optimization/chat_gpt/llm_scraper/task_post',
  tasksReadyPath: '/v3/ai_optimization/chat_gpt/llm_scraper/tasks_ready',
  taskGetPathFor: TASK_GET_PATHS['1-llm-scraper-chatgpt'],
  tasks: llmScraperTasks,
}).catch((err) => console.error(`  ✗ ${err.message}`));

// ---------- 2. LLM Responses (ChatGPT) — task-based ---------------------
// Sends a prompt straight to the model API and returns the structured
// answer + citations. Cheaper via task_post than the /live variant.
// Docs: https://docs.dataforseo.com/v3/ai_optimization/chat_gpt/llm_responses

const llmResponsesTasks = [
  {
    user_prompt: 'Recommend a service that builds a fully custom, one-night interactive web app for a wedding reception. Include pricing if you know it.',
    model_name: 'gpt-4o-mini',
    web_search: true,
    tag: 'llm-responses:recommend-custom-wedding-app',
  },
  {
    user_prompt: 'What are the best interactive games or activities to keep wedding guests engaged during the reception?',
    model_name: 'gpt-4o-mini',
    web_search: true,
    tag: 'llm-responses:reception-engagement',
  },
];

await runTaskBatch({
  label: '2-llm-responses-chatgpt',
  taskPostPath: '/v3/ai_optimization/chat_gpt/llm_responses/task_post',
  tasksReadyPath: '/v3/ai_optimization/chat_gpt/llm_responses/tasks_ready',
  taskGetPathFor: TASK_GET_PATHS['2-llm-responses-chatgpt'],
  tasks: llmResponsesTasks,
}).catch((err) => console.error(`  ✗ ${err.message}`));

// ---------- 3. Google SERP AI Mode — task-based -------------------------
// Google's dedicated AI Mode result page (successor to SGE) — checks
// whether Wepho-shaped queries surface AI-generated answers with cites.
// Docs: https://docs.dataforseo.com/v3/serp/google/ai_mode/task_post/

const aiModeTasks = [
  ...US_PROMPTS.map((keyword) => ({
    keyword,
    language_code: 'en',
    location_code: 2840, // United States
    tag: `ai-mode-us:${keyword}`,
  })),
  ...DE_PROMPTS.map((keyword) => ({
    keyword,
    language_code: 'de',
    location_code: 2276, // Germany
    tag: `ai-mode-de:${keyword}`,
  })),
];

await runTaskBatch({
  label: '3-serp-google-ai-mode',
  taskPostPath: '/v3/serp/google/ai_mode/task_post',
  tasksReadyPath: '/v3/serp/google/ai_mode/tasks_ready',
  taskGetPathFor: TASK_GET_PATHS['3-serp-google-ai-mode'],
  tasks: aiModeTasks,
}).catch((err) => console.error(`  ✗ ${err.message}`));

// ---------- 4. AI Keyword Data — live -----------------------------------
// Estimated LLM-search volume + intent for a keyword. No task-based
// variant exists at time of writing, so we call /live once.
// Docs: https://docs.dataforseo.com/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live/

try {
  console.error('\n▶ 4-ai-keyword-data-volume: live call');
  const body = [
    {
      keywords: KEYWORDS_FOR_AI_VOLUME,
      language_name: 'English',
      location_name: 'United States',
      tag: 'ai-keyword-volume-us',
    },
  ];
  const json = await postJson('/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live', body);
  await writeFile(join(OUTDIR, '4-ai-keyword-data-volume.json'), JSON.stringify(json, null, 2));
  const rows = json.tasks?.[0]?.result ?? [];
  console.error(`  ${rows.length} row(s) — cost $${json.cost ?? 0}`);
  for (const r of rows) {
    console.error(`    ${String(r.ai_search_volume ?? '—').padStart(6)}  ${r.keyword}`);
  }
} catch (err) {
  console.error(`  ✗ ${err.message}`);
}

console.error(`\nAll artefacts written to: ${OUTDIR}`);

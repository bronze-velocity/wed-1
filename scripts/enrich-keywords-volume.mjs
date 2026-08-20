#!/usr/bin/env node
// Phase 3 of the keyword research plan: enrich a keyword list with monthly
// search volume, CPC, and competition from DataForSEO's Google Ads Search
// Volume endpoint (live).
//
// Usage:
//   node scripts/enrich-keywords-volume.mjs [input.json] [output.json]
//
// Reads DATAFORSEO_LOGIN and DATAFORSEO_API_PASSWORD from `.env.local` at
// the repo root (real env vars override). Set SANDBOX=1 to hit the free
// DataForSEO sandbox instead of the paid live endpoint.
//
// Defaults:
//   input  = distribution/seo/keyword-seeds.json
//   output = distribution/seo/keyword-seeds.enriched.json
//
// Input shape (canonical for this project — matches keyword-seeds.json):
//   [
//     {
//       "keyword": "wedding reception games",
//       "category": "reception_entertainment",
//       "tail": "head",
//       "intent": "informational",
//       "seed": true
//     },
//     ...
//   ]
// Bare strings are also accepted. Any extra fields on each row are preserved
// verbatim on the output so the file stays pipelineable.
//
// Behavior:
// - Splits keywords into two location groups: German (category === "german") →
//   German/Germany; everything else → English/United States.
// - Batches up to 1000 keywords per API call.
// - Merges volume/cpc/competition back onto each row.
// - Writes a plain array with the same shape as the input (input fields +
//   enrichment fields). Also writes a `.shortlist.json` sibling with the
//   Phase 3 filter applied (100 ≤ search_volume ≤ 30000, sorted desc).

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  const src = readFileSync(path, 'utf8');
  for (const raw of src.split('\n')) {
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

const inputPath = resolve(process.argv[2] ?? 'distribution/seo/keyword-seeds.json');
const outputPath = resolve(process.argv[3] ?? 'distribution/seo/keyword-seeds.enriched.json');

const HOST = process.env.SANDBOX === '1' ? 'https://sandbox.dataforseo.com' : 'https://api.dataforseo.com';
const ENDPOINT = `${HOST}/v3/keywords_data/google_ads/search_volume/live`;
const AUTH = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');
const BATCH_SIZE = 1000;

const MIN_VOLUME = 100;
const MAX_VOLUME = 30000;

const raw = JSON.parse(await readFile(inputPath, 'utf8'));
const rows = raw.map((r) => (typeof r === 'string' ? { keyword: r } : { ...r }));

const groups = {
  en_us: { language_name: 'English', location_name: 'United States', rows: [] },
  de_de: { language_name: 'German', location_name: 'Germany', rows: [] },
};
for (const r of rows) {
  if (r.category === 'german') groups.de_de.rows.push(r);
  else groups.en_us.rows.push(r);
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function fetchVolume({ language_name, location_name, keywords }) {
  const body = [{ language_name, location_name, keywords }];
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO error ${json.status_code}: ${json.status_message}`);
  }
  const task = json.tasks?.[0];
  if (task?.status_code !== 20000) {
    throw new Error(`Task error ${task?.status_code}: ${task?.status_message}`);
  }
  return task.result ?? [];
}

const enriched = [];
let totalCost = 0;

for (const [tag, g] of Object.entries(groups)) {
  if (!g.rows.length) continue;
  const byKeyword = new Map(g.rows.map((r) => [r.keyword.toLowerCase(), r]));
  const batches = chunk(g.rows.map((r) => r.keyword), BATCH_SIZE);
  console.error(`[${tag}] ${g.rows.length} keywords → ${batches.length} batch(es)`);
  for (const [i, batch] of batches.entries()) {
    console.error(`  batch ${i + 1}/${batches.length} (${batch.length} kw)`);
    const results = await fetchVolume({
      language_name: g.language_name,
      location_name: g.location_name,
      keywords: batch,
    });
    for (const row of results) {
      const meta = byKeyword.get(row.keyword.toLowerCase()) ?? { keyword: row.keyword };
      enriched.push({
        ...meta,
        location: g.location_name,
        language: g.language_name,
        search_volume: row.search_volume,
        cpc: row.cpc,
        competition: row.competition,
        competition_index: row.competition_index,
        low_top_of_page_bid: row.low_top_of_page_bid,
        high_top_of_page_bid: row.high_top_of_page_bid,
        monthly_searches: row.monthly_searches,
      });
    }
  }
}

const shortlist = enriched
  .filter((r) => typeof r.search_volume === 'number' && r.search_volume >= MIN_VOLUME && r.search_volume <= MAX_VOLUME)
  .sort((a, b) => (b.search_volume ?? 0) - (a.search_volume ?? 0));

const shortlistPath = outputPath.replace(/\.json$/, '.shortlist.json');

await writeFile(outputPath, JSON.stringify(enriched, null, 2));
await writeFile(shortlistPath, JSON.stringify(shortlist, null, 2));

console.error('');
console.error(`Wrote ${outputPath}  (${enriched.length}/${rows.length} enriched)`);
console.error(`Wrote ${shortlistPath}  (${shortlist.length} in ${MIN_VOLUME}–${MAX_VOLUME} vol)`);
console.error('');
console.error('Top 20 by volume:');
for (const r of shortlist.slice(0, 20)) {
  const cpc = r.cpc != null ? `$${r.cpc.toFixed(2)}` : '—';
  console.error(`  ${String(r.search_volume).padStart(6)}  ${cpc.padStart(6)}  ${r.competition ?? '—'.padEnd(6)}  ${r.keyword}`);
}

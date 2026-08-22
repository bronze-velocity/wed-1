#!/usr/bin/env node
/**
 * Search ZoomInfo for wedding-planning firms and dump matches to CSV.
 *
 * Uses the credit-free Search Companies endpoint only (no enrichment).
 * See distribution/cold/zoominfo-api.md for context and access caveats.
 *
 * Env:
 *   ZI_CLIENT_ID      OAuth client id (client-credentials app)
 *   ZI_CLIENT_SECRET  OAuth client secret
 *
 * Usage:
 *   node scripts/zoominfo-wedding-planners.mjs
 *   node scripts/zoominfo-wedding-planners.mjs --metro usa.newyork.newyork
 *   node scripts/zoominfo-wedding-planners.mjs --keywords "wedding planner OR wedding coordinator"
 *   node scripts/zoominfo-wedding-planners.mjs --max-employees 15 --out ./out.csv
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const TOKEN_URL = 'https://okta-login.zoominfo.com/oauth2/default/v1/token';
const SEARCH_URL = 'https://api.zoominfo.com/gtm/data/v1/companies/search';
const SCOPE = 'api:data:company';
const PAGE_SIZE = 100;

function parseArgs(argv) {
  const args = {
    keywords: 'wedding planner',
    country: 'USA',
    metro: null,
    state: null,
    maxEmployees: 20,
    maxPages: 20,
    out: `distribution/cold/zoominfo-wedding-planners-${new Date().toISOString().slice(0, 10)}.csv`,
  };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    switch (k) {
      case '--keywords': args.keywords = v; i++; break;
      case '--country': args.country = v; i++; break;
      case '--metro': args.metro = v; i++; break;
      case '--state': args.state = v; i++; break;
      case '--max-employees': args.maxEmployees = Number(v); i++; break;
      case '--max-pages': args.maxPages = Number(v); i++; break;
      case '--out': args.out = v; i++; break;
      case '--help':
      case '-h':
        console.log('See header of this file for options.');
        process.exit(0);
      default:
        console.error(`Unknown arg: ${k}`);
        process.exit(1);
    }
  }
  return args;
}

async function getToken(clientId, clientSecret) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials', scope: SCOPE }),
  });
  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.access_token;
}

async function searchPage(token, attributes, page) {
  const url = `${SEARCH_URL}?page[number]=${page}&page[size]=${PAGE_SIZE}&sort=name`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
    body: JSON.stringify({ data: { type: 'CompanySearch', attributes } }),
  });
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after') || 5);
    console.error(`  429 — sleeping ${retry}s`);
    await new Promise((r) => setTimeout(r, retry * 1000));
    return searchPage(token, attributes, page);
  }
  if (!res.ok) {
    throw new Error(`Search failed p${page}: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function toCsvRow(fields) {
  return fields
    .map((f) => {
      const s = f == null ? '' : String(f);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    })
    .join(',');
}

function parseEmployeeCount(v) {
  if (v == null) return null;
  const n = Number(String(v).replace(/[^0-9]/g, ''));
  return Number.isFinite(n) ? n : null;
}

async function main() {
  const args = parseArgs(process.argv);
  const clientId = process.env.ZI_CLIENT_ID;
  const clientSecret = process.env.ZI_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('Missing ZI_CLIENT_ID / ZI_CLIENT_SECRET env vars.');
    console.error('ZoomInfo API access requires an enterprise contract — no free tier.');
    console.error('See distribution/cold/zoominfo-api.md.');
    process.exit(1);
  }

  const attributes = {
    industryKeywords: args.keywords,
    country: args.country,
    ...(args.metro ? { metroRegion: args.metro } : {}),
    ...(args.state ? { state: args.state } : {}),
  };

  console.log('Requesting token…');
  const token = await getToken(clientId, clientSecret);

  const kept = [];
  let dropped = 0;
  let total = null;

  for (let page = 1; page <= args.maxPages; page++) {
    console.log(`Page ${page}…`);
    const json = await searchPage(token, attributes, page);
    if (total == null) total = json.meta?.totalResults ?? 0;
    const rows = json.data || [];
    if (!rows.length) break;

    for (const row of rows) {
      const a = row.attributes || {};
      const emp = parseEmployeeCount(a.employeeCount);
      if (emp != null && emp > args.maxEmployees) { dropped++; continue; }
      kept.push({
        id: row.id,
        name: a.name,
        website: a.website,
        employeeCount: a.employeeCount,
        revenue: a.revenue,
        city: a.city,
        state: a.state,
        country: a.country,
      });
    }

    const totalPages = json.meta?.page?.total ?? 1;
    if (page >= totalPages) break;
  }

  const outPath = resolve(args.out);
  mkdirSync(dirname(outPath), { recursive: true });
  const header = toCsvRow(['id', 'name', 'website', 'employeeCount', 'revenue', 'city', 'state', 'country']);
  const body = kept.map((r) =>
    toCsvRow([r.id, r.name, r.website, r.employeeCount, r.revenue, r.city, r.state, r.country]),
  );
  writeFileSync(outPath, [header, ...body].join('\n') + '\n');

  console.log('');
  console.log(`Total matching in ZoomInfo: ${total}`);
  console.log(`Kept (≤ ${args.maxEmployees} employees): ${kept.length}`);
  console.log(`Dropped (too large): ${dropped}`);
  console.log(`Wrote ${outPath}`);
  console.log('');
  console.log('Next step: pick IDs from the CSV and call the Enrich endpoint');
  console.log('to get contacts (that step consumes credits).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

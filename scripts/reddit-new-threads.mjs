#!/usr/bin/env node
// Fetch newest threads from a subreddit via Reddit's public JSON endpoint.
// Usage: node scripts/reddit-new-threads.mjs [subreddit] [limit] [host]
// Example: node scripts/reddit-new-threads.mjs weddingplanning 10
//          node scripts/reddit-new-threads.mjs weddingplanning 10 www.reddit.com

const subreddit = process.argv[2] ?? 'weddingplanning';
const limit = process.argv[3] ?? '10';
const host = process.argv[4] ?? 'old.reddit.com';

const url = `https://${host}/r/${subreddit}/new.json?limit=${limit}&raw_json=1`;

const headers = {
    'User-Agent': 'testing-the-api (by /u/AliceMorgon)',
  Accept: 'application/json',
};

console.log('--- request ---');
console.log('GET', url);
console.log('headers:', headers);

const started = Date.now();
const res = await fetch(url, { headers, redirect: 'manual' });
const ms = Date.now() - started;

console.log('\n--- response ---');
console.log(`status: ${res.status} ${res.statusText}  (${ms}ms)`);
console.log('final url:', res.url);
console.log('response headers:');
for (const [k, v] of res.headers.entries()) console.log(`  ${k}: ${v}`);

const bodyText = await res.text();
console.log(`\nbody length: ${bodyText.length} bytes`);
console.log('body preview (first 500 chars):');
console.log(bodyText.slice(0, 500));

if (res.status >= 300 && res.status < 400) {
  console.error(`\nRedirect (${res.status}) to: ${res.headers.get('location')}`);
  console.error('Reddit often redirects unauth JSON requests to a login page. Try OAuth.');
  process.exit(1);
}

if (!res.ok) {
  console.error(`\nRequest failed (HTTP ${res.status}).`);
  if (res.status === 403) console.error('Hint: likely a UA or IP block. Try a different network or switch to OAuth.');
  if (res.status === 404) console.error(`Hint: check subreddit name "${subreddit}" (case-insensitive but must exist and be public).`);
  if (res.status === 429) console.error('Hint: rate-limited. Wait a minute or authenticate.');
  process.exit(1);
}

let json;
try {
  json = JSON.parse(bodyText);
} catch (e) {
  console.error('\nResponse was not JSON. Body was likely HTML (Reddit login/block page).');
  process.exit(1);
}

const posts = json?.data?.children?.map((c) => c.data) ?? [];

console.log(`\n--- r/${subreddit}: ${posts.length} newest posts ---\n`);
for (const p of posts) {
  const age = Math.round((Date.now() / 1000 - p.created_utc) / 60);
  console.log(`[${age}m ago] ${p.title}`);
  console.log(`  u/${p.author}  ↑${p.score}  💬${p.num_comments}`);
  console.log(`  https://reddit.com${p.permalink}\n`);
}

#!/usr/bin/env node
// Fetch newest threads from a subreddit via Reddit's public JSON endpoint.
// Usage: node scripts/reddit-new-threads.mjs [subreddit] [limit]
// Example: node scripts/reddit-new-threads.mjs weddingplanning 100

const subreddit = process.argv[2] ?? 'weddingplanning';
const limit = process.argv[3] ?? '10';

const url = `https://old.reddit.com/r/${subreddit}/new.json?limit=${limit}&raw_json=1`;

const res = await fetch(url, {
  headers: {
    'User-Agent': 'node:wepho-monitor:0.1 (by /u/wepho_studio)',
    Accept: 'application/json',
  },
});

if (!res.ok) {
  console.error(`HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}

const json = await res.json();
const posts = json.data.children.map((c) => c.data);

console.log(`\nr/${subreddit} — ${posts.length} newest posts\n`);
for (const p of posts) {
  const age = Math.round((Date.now() / 1000 - p.created_utc) / 60);
  console.log(`[${age}m ago] ${p.title}`);
  console.log(`  u/${p.author}  ↑${p.score}  💬${p.num_comments}`);
  console.log(`  https://reddit.com${p.permalink}\n`);
}

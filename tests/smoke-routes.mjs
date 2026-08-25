// Route + metadata smoke test.
// Fetches every URL in /sitemap.xml against a running server and asserts:
//   - HTTP 200
//   - non-empty <title>
//   - non-empty <meta name="description">
//
// Usage: node tests/smoke-routes.mjs [--base=http://127.0.0.1:3999]

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)

const BASE = args.base || process.env.SMOKE_BASE || 'http://127.0.0.1:3999'

function extract(html, re) {
  const m = html.match(re)
  return m ? m[1].trim() : ''
}

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml responded ${res.status}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (urls.length === 0) throw new Error('sitemap.xml returned zero URLs')
  return urls
}

async function checkOne(url) {
  const path = new URL(url).pathname || '/'
  const target = `${BASE}${path}`
  const res = await fetch(target, { redirect: 'manual' })
  const problems = []
  if (res.status !== 200) problems.push(`status ${res.status}`)
  const html = await res.text()
  const title = extract(html, /<title>([^<]*)<\/title>/i)
  if (!title) problems.push('missing/empty <title>')
  const desc = extract(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)
  if (!desc) problems.push('missing/empty <meta name="description">')
  return { path, problems }
}

async function main() {
  console.log(`[smoke-routes] fetching sitemap from ${BASE}`)
  const urls = await fetchSitemapUrls()
  console.log(`[smoke-routes] checking ${urls.length} routes`)

  const results = []
  const CONCURRENCY = 6
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY)
    const batchResults = await Promise.all(batch.map(checkOne))
    results.push(...batchResults)
  }

  const failures = results.filter((r) => r.problems.length > 0)
  for (const f of failures) {
    console.error(`  FAIL  ${f.path}  —  ${f.problems.join('; ')}`)
  }
  const passed = results.length - failures.length
  console.log(`[smoke-routes] ${passed}/${results.length} passed`)
  if (failures.length > 0) process.exit(1)
}

main().catch((err) => {
  console.error('[smoke-routes] fatal:', err.message)
  process.exit(1)
})

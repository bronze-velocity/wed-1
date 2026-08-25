// Contact API contract test.
// Requires the server to be running with CONTACT_TEST_MODE=1 (rate limiter off)
// and NODE_ENV != 'production' (so mailer uses the dev fallback and does not
// actually try to send SMTP).
//
// Usage: node tests/contact-api.mjs [--base=http://127.0.0.1:3999]

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)

const BASE = args.base || process.env.SMOKE_BASE || 'http://127.0.0.1:3999'
const URL = `${BASE}/api/contact`

// formLoadedAt must be > MIN_SUBMIT_MS (3s) and < MAX_FORM_AGE_MS (6h) old.
const validFormAge = () => Date.now() - 4000

const validPayload = () => ({
  name: 'Test Couple',
  email: 'test@example.com',
  weddingDate: '2026-09-15',
  appInterest: 'Love Letter Machine',
  message: 'Hi, we would love to book this for our wedding.',
  formLoadedAt: validFormAge(),
})

async function post(body) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  let json = null
  try { json = await res.json() } catch {}
  return { status: res.status, json }
}

const cases = [
  {
    name: 'valid payload → 200 { ok: true }',
    run: async () => {
      const r = await post(validPayload())
      if (r.status !== 200) return `expected 200, got ${r.status}`
      if (!r.json?.ok) return `expected { ok: true }, got ${JSON.stringify(r.json)}`
      return null
    },
  },
  {
    name: 'missing required fields → 400',
    run: async () => {
      const r = await post({ email: 'a@b.com', formLoadedAt: validFormAge() })
      if (r.status !== 400) return `expected 400, got ${r.status}`
      return null
    },
  },
  {
    name: 'invalid email → 400',
    run: async () => {
      const r = await post({ ...validPayload(), email: 'not-an-email' })
      if (r.status !== 400) return `expected 400, got ${r.status}`
      return null
    },
  },
  {
    name: 'invalid JSON body → 400',
    run: async () => {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{not json',
      })
      if (res.status !== 400) return `expected 400, got ${res.status}`
      return null
    },
  },
  {
    name: 'honeypot filled → 200 (silently accepted)',
    run: async () => {
      const r = await post({ ...validPayload(), website: 'http://spam.example' })
      if (r.status !== 200) return `expected 200, got ${r.status}`
      if (!r.json?.ok) return `expected { ok: true }, got ${JSON.stringify(r.json)}`
      return null
    },
  },
]

async function main() {
  console.log(`[contact-api] hitting ${URL}`)
  let failed = 0
  for (const c of cases) {
    try {
      const err = await c.run()
      if (err) {
        failed++
        console.error(`  FAIL  ${c.name}  —  ${err}`)
      } else {
        console.log(`  PASS  ${c.name}`)
      }
    } catch (e) {
      failed++
      console.error(`  FAIL  ${c.name}  —  threw: ${e.message}`)
    }
  }
  console.log(`[contact-api] ${cases.length - failed}/${cases.length} passed`)
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error('[contact-api] fatal:', err.message)
  process.exit(1)
})

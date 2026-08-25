import { sendMail } from '../../../lib/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 120,
  email: 200,
  weddingDate: 40,
  appInterest: 300,
  message: 4000,
}

const MIN_SUBMIT_MS = 3000
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 6

const RATE_WINDOW_MS = 60 * 60 * 1000
const RATE_MAX = 5
const ipHits = new Map()

function checkRate(ip) {
  const now = Date.now()
  const arr = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_MAX) {
    ipHits.set(ip, arr)
    return false
  }
  arr.push(now)
  ipHits.set(ip, arr)
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.length === 0 || now - v[v.length - 1] > RATE_WINDOW_MS) ipHits.delete(k)
    }
  }
  return true
}

function getClientIp(request) {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const TEST_MODE = process.env.CONTACT_TEST_MODE === '1'

export async function POST(request) {
  const ip = getClientIp(request)
  if (!TEST_MODE && !checkRate(ip)) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, weddingDate, appInterest, message, website, formLoadedAt } = body

  if (website && String(website).trim() !== '') {
    return Response.json({ ok: true })
  }

  const loadedAt = Number(formLoadedAt)
  if (Number.isFinite(loadedAt)) {
    const age = Date.now() - loadedAt
    if (age < MIN_SUBMIT_MS || age > MAX_FORM_AGE_MS) {
      return Response.json({ ok: true })
    }
  }

  if (!name || !email || !appInterest || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  for (const [k, max] of Object.entries(LIMITS)) {
    const v = body[k]
    if (v && String(v).length > max) {
      return Response.json({ error: `${k} is too long` }, { status: 400 })
    }
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const subject = `New Wepho inquiry — ${escapeHtml(appInterest)} — ${escapeHtml(weddingDate || 'date not set')}`

  const html = `
    <h2>New inquiry from Wepho</h2>
    <table cellpadding="6">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Wedding date</strong></td><td>${escapeHtml(weddingDate || '—')}</td></tr>
      <tr><td><strong>App interest</strong></td><td>${escapeHtml(appInterest)}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
    </table>
  `

  try {
    await sendMail({ to: process.env.CONTACT_EMAIL_TO, subject, html })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

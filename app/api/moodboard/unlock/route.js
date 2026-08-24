import { cookies } from 'next/headers'
import { getBrief } from '@/lib/moodboard/briefStore'
import { slugify } from '@/lib/moodboard/slug'
import { cookieNameFor, verifyPassword } from '@/lib/moodboard/passwords'

const attemptMap = new Map()
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function checkRateLimit(key) {
  const now = Date.now()
  const entry = attemptMap.get(key)
  if (!entry || now > entry.resetAt) {
    attemptMap.set(key, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count += 1
  return true
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { slug: rawSlug, password } = body ?? {}
  const slug = slugify(rawSlug)

  if (!slug || typeof password !== 'string' || !password) {
    return Response.json({ error: 'Missing slug or password.' }, { status: 400 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(`${ip}:${slug}`)) {
    return Response.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 }
    )
  }

  const brief = await getBrief(slug)
  if (!brief || !brief.auth) {
    return Response.json({ ok: false }, { status: 401 })
  }

  const ok = verifyPassword(password, brief.auth.passwordHash, brief.auth.salt)
  if (!ok) {
    return Response.json({ ok: false }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: cookieNameFor(slug),
    value: brief.auth.passwordHash,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.json({ ok: true })
}

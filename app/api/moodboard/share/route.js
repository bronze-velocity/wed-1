import { cookies } from 'next/headers'
import { getBrief, saveBrief } from '@/lib/moodboard/briefStore'
import { resolveSlug, slugify } from '@/lib/moodboard/slug'
import {
  cookieMatchesHash,
  cookieNameFor,
  hashPassword,
} from '@/lib/moodboard/passwords'

const rateMap = new Map()
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const MIN_PASSWORD_LEN = 4

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count += 1
  return true
}

function siteUrl() {
  return (process.env.SITE_URL || 'https://wepho.com').replace(/\/$/, '')
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many requests. Please try again in an hour.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { answers, results, desiredSlug, lockedSlug, password, meta } = body ?? {}

  if (!results?.matches?.length) {
    return Response.json({ error: 'Results missing' }, { status: 400 })
  }
  if (!answers || typeof answers !== 'object') {
    return Response.json({ error: 'Answers missing' }, { status: 400 })
  }

  const cookieStore = await cookies()

  // ── Edit path: locked to an existing slug, preserve auth ──────────────────
  if (lockedSlug) {
    const cleaned = slugify(lockedSlug)
    if (!cleaned) {
      return Response.json({ error: 'Invalid slug.' }, { status: 400 })
    }
    const existing = await getBrief(cleaned)
    if (!existing) {
      return Response.json({ error: 'Brief not found.' }, { status: 404 })
    }
    const cookieValue = cookieStore.get(cookieNameFor(cleaned))?.value
    if (!cookieMatchesHash(cookieValue, existing.auth?.passwordHash)) {
      return Response.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const updated = {
      ...existing,
      answers,
      results,
      updatedAt: new Date().toISOString(),
      meta: {
        ...existing.meta,
        coupleName:
          typeof meta?.coupleName === 'string' && meta.coupleName.trim()
            ? meta.coupleName.slice(0, 120)
            : existing.meta?.coupleName ?? null,
        role: meta?.role === 'planner' ? 'planner' : existing.meta?.role ?? 'couple',
      },
    }

    try {
      await saveBrief(updated)
    } catch (err) {
      console.error('[api/moodboard/share] update failed:', err)
      return Response.json({ error: 'Could not save brief' }, { status: 500 })
    }

    return Response.json({
      slug: cleaned,
      url: `${siteUrl()}/moodboard/${cleaned}`,
    })
  }

  // ── Create path: requires password ────────────────────────────────────────
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LEN) {
    return Response.json(
      { error: `Password must be at least ${MIN_PASSWORD_LEN} characters.` },
      { status: 400 }
    )
  }

  const slug = resolveSlug(desiredSlug)
  const auth = hashPassword(password)

  const brief = {
    slug,
    createdAt: new Date().toISOString(),
    answers,
    results,
    auth,
    meta: {
      coupleName: typeof meta?.coupleName === 'string' ? meta.coupleName.slice(0, 120) : null,
      role: meta?.role === 'planner' ? 'planner' : 'couple',
    },
  }

  try {
    await saveBrief(brief)
  } catch (err) {
    console.error('[api/moodboard/share] save failed:', err)
    return Response.json({ error: 'Could not save brief' }, { status: 500 })
  }

  cookieStore.set({
    name: cookieNameFor(slug),
    value: auth.passwordHash,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.json({
    slug,
    url: `${siteUrl()}/moodboard/${slug}`,
  })
}

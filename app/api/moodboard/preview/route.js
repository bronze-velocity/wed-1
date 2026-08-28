import { cookies } from 'next/headers'
import { getBrief, saveBrief } from '@/lib/moodboard/briefStore'
import { slugify } from '@/lib/moodboard/slug'
import { cookieMatchesHash, cookieNameFor } from '@/lib/moodboard/passwords'

function siteUrl() {
  return (process.env.SITE_URL || 'https://wepho.com').replace(/\/$/, '')
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { slug: rawSlug, enabled } = body ?? {}
  const slug = slugify(rawSlug || '')
  if (!slug) {
    return Response.json({ error: 'Invalid slug.' }, { status: 400 })
  }

  const brief = await getBrief(slug)
  if (!brief) {
    return Response.json({ error: 'Brief not found.' }, { status: 404 })
  }

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(cookieNameFor(slug))?.value
  if (!cookieMatchesHash(cookieValue, brief.auth?.passwordHash)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const now = new Date().toISOString()
  const nextEnabled = Boolean(enabled)
  const updated = {
    ...brief,
    updatedAt: now,
    meta: {
      ...brief.meta,
      socialPreviewEnabled: nextEnabled,
      socialPreviewCreatedAt: nextEnabled
        ? brief.meta?.socialPreviewCreatedAt || now
        : brief.meta?.socialPreviewCreatedAt || null,
      socialPreviewDisabledAt: nextEnabled ? null : now,
    },
  }

  try {
    await saveBrief(updated)
  } catch (err) {
    console.error('[api/moodboard/preview] save failed:', err)
    return Response.json({ error: 'Could not save.' }, { status: 500 })
  }

  return Response.json({
    slug,
    socialPreviewEnabled: nextEnabled,
    socialUrl: nextEnabled ? `${siteUrl()}/moodboard/${slug}/preview` : null,
  })
}

import Redis from 'ioredis'

const KEY_PREFIX = 'moodboard:brief:'

let client = null
const memoryStore = new Map()

function getClient() {
  if (!process.env.REDIS_URL) return null
  if (!client) {
    client = new Redis(process.env.REDIS_URL, {
      lazyConnect: false,
      maxRetriesPerRequest: 2,
    })
    client.on('error', (err) => {
      console.error('[briefStore] redis error:', err.message)
    })
  }
  return client
}

export async function briefExists(slug) {
  const key = KEY_PREFIX + slug
  const c = getClient()
  if (c) {
    const n = await c.exists(key)
    return n > 0
  }
  return memoryStore.has(key)
}

export async function saveBrief(brief) {
  const key = KEY_PREFIX + brief.slug
  const payload = JSON.stringify(brief)
  const c = getClient()
  if (c) {
    await c.set(key, payload)
  } else {
    memoryStore.set(key, payload)
  }
}

export async function getBrief(slug) {
  const key = KEY_PREFIX + slug
  const c = getClient()
  const raw = c ? await c.get(key) : memoryStore.get(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function recordView(slug) {
  const c = getClient()
  if (!c) return
  const key = `${KEY_PREFIX}${slug}:stats`
  try {
    await c
      .multi()
      .hincrby(key, 'views', 1)
      .hset(key, 'lastViewedAt', Date.now())
      .exec()
  } catch (err) {
    console.error('[briefStore] recordView failed:', err.message)
  }
}

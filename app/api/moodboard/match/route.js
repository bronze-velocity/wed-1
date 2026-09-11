import OpenAI from 'openai'
import { buildSystemPrompt, buildUserPrompt } from '@/lib/moodboard/prompts.js'
import { scoreMoodboardApps } from '@/lib/moodboard/scoring.js'
import { sanitizeAnswers, requestTooLarge } from '@/lib/moodboard/validateAnswers.js'

const LLM_TIMEOUT_MS = 15_000

const OUTPUT_LIMITS = {
  threeWords: 40,
  rationale: 400,
  personalReason: 300,
  inventedTitle: 60,
  inventedDescription: 200,
  inventedWhy: 300,
  inventedQuote: 200,
}

function computeHasOwnWords(answers) {
  if (!answers) return false
  if (answers.guestFreeform?.trim()) return true
  const custom = answers.customEntries ?? {}
  for (const key of Object.keys(custom)) {
    const list = custom[key]
    if (Array.isArray(list) && list.some((entry) => (entry?.text ?? '').trim())) return true
  }
  return false
}

// Concatenated normalized corpus of everything the couple actually wrote,
// used to verify LLM-attributed sourceQuotes are not fabricated.
function buildUserCorpus(answers) {
  const parts = []
  if (answers.guestFreeform) parts.push(answers.guestFreeform)
  for (const list of Object.values(answers.customEntries ?? {})) {
    if (!Array.isArray(list)) continue
    for (const entry of list) if (entry?.text) parts.push(entry.text)
  }
  return parts.join('\n').toLowerCase()
}

function cap(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function filterInventedApps(invented, matches, userCorpus) {
  if (!Array.isArray(invented)) return []
  const shortlistTitles = new Set(matches.map((m) => m.title.toLowerCase()))
  const shortlistIds = new Set(matches.map((m) => m.id.toLowerCase()))
  return invented
    .filter((entry) => entry && typeof entry.title === 'string' && entry.title.trim())
    .filter((entry) => {
      const t = entry.title.toLowerCase().trim()
      if (shortlistTitles.has(t)) return false
      if (shortlistIds.has(t.replace(/\s+/g, '-'))) return false
      return true
    })
    .slice(0, 2)
    .map((entry) => {
      const rawQuote = cap(entry.sourceQuote, OUTPUT_LIMITS.inventedQuote)
      const quote = rawQuote && userCorpus.includes(rawQuote.toLowerCase()) ? rawQuote : null
      return {
        title: cap(entry.title, OUTPUT_LIMITS.inventedTitle),
        description: cap(entry.description, OUTPUT_LIMITS.inventedDescription),
        whyItFitsYou: cap(entry.whyItFitsYou, OUTPUT_LIMITS.inventedWhy),
        sourceQuote: quote,
      }
    })
    .filter((entry) => entry.title && entry.whyItFitsYou)
}

const MODEL = process.env.OPENROUTER_MODEL ?? 'anthropic/claude-haiku-4-5-20251001'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://wepho.com',
    'X-Title': 'Wepho',
  },
})

const rateMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return true
  }
  if (entry.count >= 10) return false
  entry.count++
  return true
}

function fallbackResult(matches, hasOwnWords, hiddenByVenue) {
  return {
    threeWords: 'Warm. Shared. Yours.',
    hasOwnWords,
    matches: matches.map(({ fallbackRationale, ...match }) => ({
      ...match,
      whyItFitsYou: fallbackRationale,
      personalReason: null,
    })),
    hiddenMatches: [],
    hiddenByVenue,
    inventedApps: [],
  }
}

function validNarration(data, matches) {
  return data &&
    typeof data.threeWords === 'string' &&
    data.rationales &&
    matches.every((match) => typeof data.rationales[match.id] === 'string')
}

function stitchResult(matches, narration, hasOwnWords, userCorpus, hiddenByVenue) {
  const personalReasons = narration.personalReasons ?? {}
  return {
    threeWords: cap(narration.threeWords, OUTPUT_LIMITS.threeWords),
    hasOwnWords,
    matches: matches.map(({ fallbackRationale, ...match }) => {
      const reason = personalReasons[match.id]
      const capped = cap(narration.rationales[match.id], OUTPUT_LIMITS.rationale) || fallbackRationale
      const personal = hasOwnWords && typeof reason === 'string' && reason.trim()
        ? cap(reason, OUTPUT_LIMITS.personalReason)
        : null
      return {
        ...match,
        whyItFitsYou: capped,
        personalReason: personal || null,
      }
    }),
    hiddenMatches: [],
    hiddenByVenue,
    inventedApps: hasOwnWords ? filterInventedApps(narration.inventedApps, matches, userCorpus) : [],
  }
}

async function callOpenRouter(systemPrompt, userPrompt) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS)
  try {
    const response = await client.chat.completions.create(
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
          },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 900,
        temperature: 0.6,
        response_format: { type: 'json_object' },
      },
      { signal: controller.signal }
    )
    const text = response.choices[0]?.message?.content ?? ''
    const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
    return JSON.parse(cleaned)
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Too many requests. Please try again in an hour.' }, { status: 429 })
  }

  if (requestTooLarge(request)) {
    return Response.json({ error: 'Request too large.' }, { status: 413 })
  }

  let answers
  try {
    const body = await request.json()
    answers = sanitizeAnswers(body.answers)
    if (!answers) throw new Error('missing answers')
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { matches, hiddenByVenue } = scoreMoodboardApps(answers)
  const hasOwnWords = computeHasOwnWords(answers)
  const fallback = fallbackResult(matches, hasOwnWords, hiddenByVenue)
  const isDevMock = process.env.NODE_ENV !== 'production' &&
    (process.env.MOODBOARD_MOCK === '1' || !process.env.OPENROUTER_API_KEY)

  if (isDevMock || !process.env.OPENROUTER_API_KEY) return Response.json(fallback)

  const systemPrompt = buildSystemPrompt(matches, { hasOwnWords })
  const userPrompt = buildUserPrompt(answers, matches)
  const userCorpus = buildUserCorpus(answers)

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const narration = await callOpenRouter(systemPrompt, userPrompt)
      if (validNarration(narration, matches)) return Response.json(stitchResult(matches, narration, hasOwnWords, userCorpus, hiddenByVenue))
    } catch {
      // Retry once, then preserve the deterministic shortlist.
    }
  }

  return Response.json(fallback)
}

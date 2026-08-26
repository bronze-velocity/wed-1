import OpenAI from 'openai'
import { buildSystemPrompt, buildUserPrompt } from '@/lib/moodboard/prompts.js'
import { scoreMoodboardApps } from '@/lib/moodboard/scoring.js'

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

function fallbackResult(matches) {
  return {
    threeWords: 'Warm. Shared. Yours.',
    matches: matches.map(({ fallbackRationale, ...match }) => ({
      ...match,
      whyItFitsYou: fallbackRationale,
    })),
    hiddenMatches: [],
  }
}

function validNarration(data, matches) {
  return data &&
    typeof data.threeWords === 'string' &&
    data.rationales &&
    matches.every((match) => typeof data.rationales[match.id] === 'string')
}

function stitchResult(matches, narration) {
  return {
    threeWords: narration.threeWords,
    matches: matches.map(({ fallbackRationale, ...match }) => ({
      ...match,
      whyItFitsYou: narration.rationales[match.id],
    })),
    hiddenMatches: [],
  }
}

async function callOpenRouter(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
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
  })

  const text = response.choices[0]?.message?.content ?? ''
  const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
  return JSON.parse(cleaned)
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Too many requests. Please try again in an hour.' }, { status: 429 })
  }

  let answers
  try {
    const body = await request.json()
    answers = body.answers
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) throw new Error('missing answers')
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const matches = scoreMoodboardApps(answers)
  const fallback = fallbackResult(matches)
  const isDevMock = process.env.NODE_ENV !== 'production' &&
    (process.env.MOODBOARD_MOCK === '1' || !process.env.OPENROUTER_API_KEY)

  if (isDevMock || !process.env.OPENROUTER_API_KEY) return Response.json(fallback)

  const systemPrompt = buildSystemPrompt(matches)
  const userPrompt = buildUserPrompt(answers, matches)

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const narration = await callOpenRouter(systemPrompt, userPrompt)
      if (validNarration(narration, matches)) return Response.json(stitchResult(matches, narration))
    } catch {
      // Retry once, then preserve the deterministic shortlist.
    }
  }

  return Response.json(fallback)
}

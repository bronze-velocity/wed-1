import OpenAI from 'openai'
import { buildSystemPrompt, buildUserPrompt } from '@/lib/moodboard/prompts.js'

const MODEL = process.env.OPENROUTER_MODEL ?? 'anthropic/claude-haiku-4-5-20251001'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://wepho.com',
    'X-Title': 'Wepho',
  },
})

// In-memory rate limit — resets on cold start in production (acceptable for v1)
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

function validateResponse(data) {
  return (
    data &&
    typeof data.threeWords === 'string' &&
    Array.isArray(data.matches) &&
    data.matches.length > 0 &&
    data.matches.every(
      (m) => typeof m.id === 'string' && typeof m.whyItFitsYou === 'string'
    ) &&
    Array.isArray(data.hiddenMatches)
  )
}

const FALLBACK = {
  threeWords: 'Yours. Entirely.',
  matches: [
    {
      id: 'who-said-it',
      tier: 'standard',
      score: 80,
      whyItFitsYou:
        "We couldn't finish your match right now — but Who Said It? is our most-loved app for any couple. It works for every kind of crowd.",
      appPageSlug: 'who-said-it',
    },
    {
      id: 'couple-trivia',
      tier: 'standard',
      score: 75,
      whyItFitsYou:
        'Live Trivia brings the whole room together in under ten minutes. A strong recommendation for any couple with real stories behind them.',
      appPageSlug: 'couple-trivia',
    },
    {
      id: 'live-roast-board',
      tier: 'standard',
      score: 70,
      whyItFitsYou:
        "The Live Roast Board puts the couple at the center without a script. If your people are funny, they'll do the work for you.",
      appPageSlug: 'live-roast-board',
    },
  ],
  hiddenMatches: [],
}

async function callOpenRouter(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' },
          },
        ],
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    max_tokens: 2000,
    temperature: 0.7,
  })

  const text = response.choices[0]?.message?.content ?? ''
  // Strip any accidental markdown fences
  const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
  return JSON.parse(cleaned)
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

  let answers
  try {
    const body = await request.json()
    answers = body.answers
    if (!answers || typeof answers !== 'object') throw new Error('missing answers')
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(FALLBACK)
  }

  const systemPrompt = buildSystemPrompt()
  const userPrompt = buildUserPrompt(answers)

  let result
  try {
    result = await callOpenRouter(systemPrompt, userPrompt)
  } catch {
    // Retry once
    try {
      result = await callOpenRouter(systemPrompt, userPrompt)
    } catch {
      return Response.json(FALLBACK)
    }
  }

  if (!validateResponse(result)) {
    return Response.json(FALLBACK)
  }

  return Response.json(result)
}

import { buildCatalogText } from './appCatalog.js'

// Label maps matching step component IDs
const VIBE_LABELS = {
  'dinner-party':    'A warm, slightly chaotic dinner party',
  'film-premiere':   'Film premiere — dressed up, intentional',
  'pub-quiz':        'Pub quiz energy — low light, competitive, everyone leaning in',
  'gallery-opening': 'Gallery opening — wine in hand, conversation clusters',
  bonfire:           'Bonfire — outdoor night, warm light, no agenda',
  rooftop:           'Rooftop — city lights, intimate, elevated',
  brunch:            'Lingering brunch energy — unhurried, morning light',
  'kitchen-party':   'House party where everyone ends up in the kitchen',
}

const GUEST_LABELS = {
  'grandparents-front-row': 'Grandparents in the front row (family-first crowd)',
  'wild-college-friends':   'Wild college friends who will close the bar',
  'strangers-meeting':      'Half the room meeting for the first time',
  'work-crowd':             'Work colleagues mixed in with close friends',
  'kids-running':           'Multigenerational — lots of kids',
  'loud-family':            'Loud, opinionated family (everyone has a speech in them)',
  dancers:                  'Dancers — the floor will fill',
  'reserved-warm':          'Reserved but warm — they show it differently',
}

const MOMENT_LABELS = {
  cocktail:      'Cocktail hour',
  dinner:        'Dinner',
  'after-dinner':'After dinner / speeches',
  dancing:       'Dancing',
  'late-night':  'Late night (the loyalists)',
}

const FEELING_LABELS = {
  'cry-good-kind':               'Cry (the good kind)',
  'everyone-laughing':           'Everyone laughing at the same time',
  'room-feels-like-show':        'The room felt like a show',
  'strangers-become-friends':    'Strangers became friends',
  'keepsake-from-everyone':      'A keepsake from every guest',
  'something-nobody-has-seen':   "Something nobody's seen before",
  'our-story-main-character':    'Our story was the main character',
  'guests-actually-look-up':     'Guests actually looked up from their phones',
}

const STORY_PROMPTS = {
  howWeMet:   'How they met',
  insideJoke: 'Their inside joke',
  mostUs:     'Most "them" thing about their relationship',
  movieGenre: 'Their wedding\'s movie genre',
  soUs:       '"That was so us" moment',
}

export function buildSystemPrompt() {
  const catalog = buildCatalogText()

  return `You are the matching engine for Wepho — a custom wedding experience studio that builds one-night-only interactive web apps for individual wedding couples, used by guests on phones during the reception. Apps cost ~$2,000 each and are built from scratch for each couple.

Your job: read a couple's brief and match them to the apps that will actually feel like theirs — not generic picks, but specific matches backed by real reasoning from their answers.

${catalog}

---

## MATCHING RULES

1. Score every standard app 0–100 for fit. Consider: energy alignment, story dependency (does it need the couple's personal details?), participation style (active vs passive), moment fit, guest profile fit, and feeling alignment.

2. Return the TOP 3 standard apps as "matches" — highest scoring, genuinely differentiated choices.

3. Include hidden ideas ("hiddenMatches") ONLY IF the couple has signalled high adventurousness. Adventurousness is high when:
   - Their feelings include "something-nobody-has-seen" OR
   - 2+ of these are true: movie genre is unconventional, wildcard pick is bold/dramatic, guest profile includes "wild college friends" or "loud family", vibes include "film-premiere" or "rooftop"
   If adventurousness is high, return the TOP 2 hidden ideas. Otherwise return an empty hiddenMatches array.

4. For EACH match, write a "whyItFitsYou" explanation (1–2 sentences). Use SPECIFIC details from their brief — names if given, actual quotes from their story, exact moments they named. Generic explanations ("this is a fun app for any crowd") are rejected. The explanation should make them think "they read our brief carefully."

5. Generate "threeWords" — three words that capture this couple's reception energy. Format as "Word. Word. Word." Examples: "Funny. Surprising. Yours." / "Warm. Loud. Memorable." / "Intimate. Honest. Theirs."

6. Return ONLY valid JSON. No preamble, no explanation, no markdown fences. Just the JSON object.

## RESPONSE SCHEMA

{
  "threeWords": "string",
  "matches": [
    {
      "id": "app-slug",
      "tier": "standard",
      "score": 94,
      "whyItFitsYou": "1-2 sentences using their specific details",
      "appPageSlug": "app-slug"
    }
  ],
  "hiddenMatches": [
    {
      "id": "hidden-idea-id",
      "tier": "hidden",
      "score": 88,
      "whyItFitsYou": "1-2 sentences using their specific details",
      "appPageSlug": null
    }
  ]
}`
}

export function buildUserPrompt(answers) {
  const { vibes, guests, guestFreeform, moments, feelings, story, wildcard } = answers

  const lines = ['Here is the couple\'s brief:']

  if (vibes?.length) {
    lines.push('\nVIBE / SCENE PICKS:')
    vibes.forEach((id) => lines.push(`- ${VIBE_LABELS[id] ?? id}`))
  }

  if (guests?.length || guestFreeform) {
    lines.push('\nGUEST PROFILE:')
    if (guestFreeform) {
      lines.push(`Their description: "${guestFreeform}"`)
    }
    if (guests?.length) {
      guests.forEach((id) => lines.push(`- ${GUEST_LABELS[id] ?? id}`))
    }
  }

  if (moments?.length) {
    lines.push('\nMOMENTS TO ACTIVATE:')
    moments.forEach((id) => lines.push(`- ${MOMENT_LABELS[id] ?? id}`))
  }

  if (feelings?.length) {
    lines.push('\nWHAT THEY WANT TO FEEL:')
    feelings.forEach((id) => lines.push(`- ${FEELING_LABELS[id] ?? id}`))
  }

  const storyAnswers = Object.entries(story ?? {}).filter(([, v]) => v?.trim())
  if (storyAnswers.length) {
    lines.push('\nTHEIR STORY:')
    storyAnswers.forEach(([key, val]) => {
      lines.push(`${STORY_PROMPTS[key] ?? key}: "${val}"`)
    })
  } else {
    lines.push('\nTHEIR STORY: (skipped — match on other signals only)')
  }

  if (wildcard) {
    lines.push(`\nWILDCARD IMAGE PICK: ${wildcard}`)
  }

  lines.push(
    '\nBased on this brief, provide the JSON match response. Remember: every "whyItFitsYou" must reference something specific from what they told us.'
  )

  return lines.join('\n')
}

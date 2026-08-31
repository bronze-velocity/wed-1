// Venue Reality Check — Step 6 of the moodboard flow.
//
// Five practical questions about the couple's reception. Every question shares
// the same three-answer shape: `yes` / `maybe` / `no`. Answers apply
// multipliers to the raw app scores from scoring.js. See
// zz/moodboard/step-6-venue-reality-check.md for the full rationale.

export const VENUE_ANSWER_VALUES = ['yes', 'maybe', 'no']

export const VENUE_QUESTIONS = [
  {
    id: 'bigScreen',
    label: 'Is there a projector, TV, or screen everyone can see?',
    detail: 'A wall the whole room looks at together during the reception.',
    why: "Some apps live on the projector. If yours doesn't, we'll swap in a phone-first version.",
    answers: {
      yes: "Yes, we've got that",
      maybe: 'Maybe',
      no: 'Definitely not',
    },
  },
  {
    id: 'mic',
    label: 'Is there a host or MC running the room?',
    detail: 'Someone comfortable reading things aloud and holding the room for a few minutes.',
    why: "A couple of our apps are hosted from the mic — no MC and they lose the shape.",
    answers: {
      yes: 'Yes, we have someone',
      maybe: 'Maybe',
      no: 'Definitely not',
    },
  },
  {
    id: 'wifi',
    label: 'Will the wifi (or cell signal) at the venue actually hold up for 100+ phones?',
    detail: "Outdoor tents, basements, and old barns often can't.",
    why: "If bandwidth is shaky we'll ship a load-once version that syncs when it can.",
    answers: {
      yes: "Yes, it's solid",
      maybe: 'Maybe',
      no: 'Definitely not',
    },
  },
  {
    id: 'roomToRoam',
    label: 'Is the venue the kind of place guests can wander through?',
    detail: 'Multiple rooms, gardens, a courtyard — not one tight banquet hall.',
    why: 'Only matters for apps that use the venue itself as the playing field.',
    answers: {
      yes: 'Yes, there is space',
      maybe: 'Maybe',
      no: 'Definitely not',
    },
  },
  {
    id: 'quietCorners',
    label: 'Are there spots where a guest could step away and record a short voice or video message?',
    detail: "Doesn't need to be a booth — just somewhere not right next to the speakers.",
    why: 'Affects the quality of anything guests record for the couple.',
    answers: {
      yes: 'Yes, there is somewhere',
      maybe: 'Maybe',
      no: 'Definitely not',
    },
  },
]

// Constraint → affected apps. Hard-dependent apps get filtered out on a "no";
// soft-dependent apps get demoted but stay visible with a modification note.
const CONSTRAINT_IMPACT = {
  bigScreen: {
    hard: ['story-chain', 'advice-oracle'],
    soft: [
      'couple-trivia',
      'unpopular-opinions',
      'where-next-map',
      'who-said-it',
      'home-the-room-built',
    ],
  },
  mic: {
    hard: ['couple-trivia', 'ask-us-anything'],
    soft: ['story-chain', 'who-said-it', 'unpopular-opinions'],
  },
  wifi: {
    hard: [],
    soft: [
      'couple-trivia',
      'unpopular-opinions',
      'who-said-it',
      'where-next-map',
      'story-chain',
      'home-the-room-built',
      'anniversary-time-capsule',
      'video-guestbook',
      'first-look-voice-letter',
    ],
  },
  roomToRoam: {
    hard: ['venue-scavenger-hunt'],
    soft: [],
  },
  quietCorners: {
    hard: [],
    soft: [
      'anniversary-time-capsule',
      'video-guestbook',
      'first-look-voice-letter',
    ],
  },
}

// Per (app × constraint) modification copy — one or two sentences describing
// exactly how the app is reshaped when the couple's reception can't fully
// support the default version. Only pairs that need a note are listed.
const MODIFICATION_NOTES = {
  bigScreen: {
    'couple-trivia':
      "No big screen — we'll move the leaderboard onto each guest's phone. The MC still runs the game from the mic.",
    'unpopular-opinions':
      "Without a projector, the split shows on each phone after every vote and the MC calls out the widest gaps aloud.",
    'where-next-map':
      "The live map lives on guest phones instead of the wall. You get the finished map (and a printed poster keepsake) after.",
    'who-said-it':
      "Runs as a phone-only game — scoring on each device, MC narrates reveals from the mic.",
    'home-the-room-built':
      "Skip the live reveal. The composite illustration renders on your phones at the end of the night and arrives framed as a poster.",
    'story-chain':
      "The chain still grows — but the MC reads each new sentence aloud from a tablet, since there is no shared screen.",
    'advice-oracle':
      "Without a scrolling wall we swap in a printed keepsake book of everything guests wrote.",
  },
  mic: {
    'couple-trivia':
      "No MC — we'll auto-advance questions on a timer instead of a host-read pace.",
    'ask-us-anything':
      "The couple reads the top questions off a tablet at their table instead of taking the mic.",
    'story-chain':
      "Skips the live read-alouds. New sentences appear on the screen (or on phones) and guests read them as they land.",
    'who-said-it':
      "No mic-led reveals. Each round auto-progresses; the answer flips on-screen and on every phone at the same beat.",
    'unpopular-opinions':
      "The reveal is silent — the split appears on screen, and there is no host to spike the loudest gaps.",
  },
  wifi: {
    'couple-trivia':
      "Ships as a load-once game — guests download it at check-in and results sync between rounds.",
    'unpopular-opinions':
      "Votes queue on-device and sync when the network catches up; the reveal delays a beat but nothing is lost.",
    'who-said-it':
      "Load-once cards on every phone; scores upload in the background.",
    'where-next-map':
      "Pins queue on-device and merge into the map when the wifi allows.",
    'story-chain':
      "Sentences queue locally and appear on the screen in short bursts instead of live one-by-one.",
    'home-the-room-built':
      "Choices queue locally; the composite renders once submissions come in, not live as guests tap.",
    'anniversary-time-capsule':
      "Videos record locally first, then upload when the network is reachable — nothing is lost if the wifi drops.",
    'video-guestbook':
      "Same pattern — clips record locally and upload later.",
    'first-look-voice-letter':
      "Voice memos save on-device and upload when the network allows.",
  },
  quietCorners: {
    'anniversary-time-capsule':
      "Expect more background noise on the recordings — we'll gently prompt guests to step away from the speakers.",
    'video-guestbook':
      "Same — guests will get a nudge to find a quieter spot, but audio quality will vary.",
    'first-look-voice-letter':
      "Voice memos will read as more 'reception buzz' than 'private letter.' Some couples love that — worth flagging.",
  },
}

const MULTIPLIER = {
  yes: 1.0,
  maybe: 0.7,
  no_soft: 0.5,
  no_hard: 0.0,
  unanswered: 0.85, // treated the same as "maybe-ish" — slight de-risk
}

function answerFor(venue, questionId) {
  const raw = venue?.[questionId]
  if (raw === 'yes' || raw === 'maybe' || raw === 'no') return raw
  return null
}

// Given an app slug, returns { multiplier, notes: [] } after applying every
// venue constraint. `notes` collects human-readable modification sentences for
// the constraints that reshape the app.
export function evaluateAppAgainstVenue(appSlug, venue) {
  let multiplier = 1
  const notes = []
  let filteredBy = null

  for (const question of VENUE_QUESTIONS) {
    const impact = CONSTRAINT_IMPACT[question.id]
    if (!impact) continue
    const isHard = impact.hard.includes(appSlug)
    const isSoft = impact.soft.includes(appSlug)
    if (!isHard && !isSoft) continue

    const answer = answerFor(venue, question.id)
    if (answer === 'yes') continue
    if (answer === null) {
      multiplier *= MULTIPLIER.unanswered
      continue
    }
    if (answer === 'maybe') {
      multiplier *= MULTIPLIER.maybe
      const note = MODIFICATION_NOTES[question.id]?.[appSlug]
      if (note) notes.push({ constraint: question.id, note, severity: 'maybe' })
      continue
    }
    // answer === 'no'
    if (isHard) {
      multiplier = 0
      filteredBy = question.id
      // still capture the note so we can explain the filter
      const note = MODIFICATION_NOTES[question.id]?.[appSlug]
      if (note) notes.push({ constraint: question.id, note, severity: 'blocked' })
      break
    }
    multiplier *= MULTIPLIER.no_soft
    const note = MODIFICATION_NOTES[question.id]?.[appSlug]
    if (note) notes.push({ constraint: question.id, note, severity: 'required' })
  }

  return { multiplier, notes, filteredBy }
}

// Chip label + tone shown on each results card.
export function fitBadgeFor({ multiplier, notes }) {
  if (multiplier <= 0) return { tone: 'blocked', label: 'Not a fit for your setup' }
  const worst = notes.reduce((acc, n) => {
    if (n.severity === 'required') return 'required'
    if (acc === 'required') return acc
    if (n.severity === 'maybe') return 'maybe'
    return acc
  }, null)
  if (worst === 'required') return { tone: 'modified', label: 'Modified version' }
  if (worst === 'maybe') return { tone: 'tweak', label: 'Small tweak needed' }
  return { tone: 'clean', label: 'Runs as designed' }
}

// True if the couple actually answered at least one question — used to
// decide whether to render the fit chips at all.
export function hasVenueAnswers(venue) {
  if (!venue || typeof venue !== 'object') return false
  return VENUE_QUESTIONS.some((q) => answerFor(venue, q.id) !== null)
}

// Sanitize + validate a raw venue answer object from the client.
export function sanitizeVenueAnswers(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}
  const out = {}
  for (const q of VENUE_QUESTIONS) {
    const val = input[q.id]
    if (val === 'yes' || val === 'maybe' || val === 'no') out[q.id] = val
  }
  return out
}

export const VENUE_CONSTRAINT_IMPACT = CONSTRAINT_IMPACT
export const VENUE_MODIFICATION_NOTES = MODIFICATION_NOTES

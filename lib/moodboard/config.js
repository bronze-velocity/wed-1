export const MOODBOARD_STEPS = [
  { id: 'scene', label: 'Scene', answerKeys: ['vibes'], customKey: 'vibes' },
  { id: 'guests', label: 'Guests', answerKeys: ['guests', 'guestFreeform'], customKey: 'guests' },
  { id: 'moment', label: 'Moment', answerKeys: ['moments'], customKey: 'moments' },
  { id: 'feeling', label: 'Feeling', answerKeys: ['feelings'], customKey: 'feelings' },
  { id: 'story', label: 'Your story', answerKeys: ['story'] },
  { id: 'energy', label: 'Energy', answerKeys: ['wildcard'] },
  { id: 'review', label: 'Review', answerKeys: [] },
]

export const APP_DIRECTIONS = {
  'couple-trivia': {
    title: 'Live Trivia',
    description: 'Guests answer together; the room sees results.',
  },
  'who-said-it': {
    title: 'Who Said It?',
    description: 'Guess the speaker, then reveal the message.',
  },
  'unpopular-opinions': {
    title: 'Unpopular Opinions',
    description: 'Take a side and watch the room split.',
  },
  'story-chain': {
    title: 'The Story Chain',
    description: 'Add one line; build a story together.',
  },
  'wedding-bingo': {
    title: 'Custom Wedding Bingo',
    description: 'Spot real moments throughout the reception.',
  },
  'prediction-vault': {
    title: 'The Prediction Vault',
    description: 'Leave predictions to unlock years later.',
  },
  'advice-oracle': {
    title: 'The Guest Advice Oracle',
    description: "Ask once; receive everyone's advice.",
  },
  'where-next-map': {
    title: 'Where To Next',
    description: 'Guests build your shared future map.',
  },
  'home-the-room-built': {
    title: 'The Home Your Room Built',
    description: 'Build your future home together.',
  },
  'venue-scavenger-hunt': {
    title: 'Venue Scavenger Hunt',
    description: 'Explore the venue; unlock your story.',
  },
  'anniversary-time-capsule': {
    title: 'Anniversary Time Capsule',
    description: 'Seal messages for future anniversaries.',
  },
  'video-guestbook': {
    title: 'Two-Minute Video Guestbook',
    description: 'Record short messages you can replay.',
  },
  'ask-us-anything': {
    title: 'Ask Us Anything',
    description: 'Guests choose what they want answered.',
  },
  'love-letter-machine': {
    title: 'The Unprompted Love Letter Machine',
    description: 'Guests write one message; you read them live.',
  },
  'first-look-voice-letter': {
    title: 'The First-Look Voice Letter',
    description: 'Guests leave voice memos; you hear the room again on the drive home.',
  },
}

export const VIBES = [
  { id: 'dinner-party', src: '/images/moodboard/vibes/dinner-party.jpg', label: 'Dinner that got out of hand', guestAction: 'Guests answer together between courses.', appIds: ['couple-trivia', 'who-said-it'] },
  { id: 'film-premiere', src: '/images/moodboard/vibes/film-premiere.jpg', label: 'Film premiere energy', guestAction: 'Guests watch your real story unfold.', appIds: ['who-said-it', 'story-chain'] },
  { id: 'pub-quiz', src: '/images/moodboard/vibes/pub-quiz.jpg', label: 'Pub quiz, best table wins', guestAction: 'Tables compete in one short game.', appIds: ['couple-trivia'] },
  { id: 'gallery-opening', src: '/images/moodboard/vibes/gallery-opening.jpg', label: 'Gallery opening, wine in hand', guestAction: 'Guests explore stories at their pace.', appIds: ['venue-scavenger-hunt', 'advice-oracle'] },
  { id: 'bonfire', src: '/images/moodboard/vibes/bonfire.jpg', label: 'Bonfire at the end of the night', guestAction: 'Guests leave something for much later.', appIds: ['anniversary-time-capsule', 'video-guestbook'] },
  { id: 'rooftop', src: '/images/moodboard/vibes/rooftop.jpg', label: 'Rooftop, city below', guestAction: 'Guests map your next chapter together.', appIds: ['where-next-map'] },
  { id: 'brunch', src: '/images/moodboard/vibes/brunch.jpg', label: 'Brunch that never ended', guestAction: 'Guests notice moments all day long.', appIds: ['wedding-bingo', 'advice-oracle'] },
  { id: 'kitchen-party', src: '/images/moodboard/vibes/kitchen-party.jpg', label: 'Everyone ended up in the kitchen', guestAction: 'Everyone adds to one shared result.', appIds: ['home-the-room-built', 'story-chain'] },
  { id: 'candlelit-slow', src: '/images/moodboard/vibes/candlelit-slow.jpg', label: 'Candlelit and slow', guestAction: 'Guests leave something tender for the couple to keep.', appIds: ['love-letter-machine', 'anniversary-time-capsule', 'first-look-voice-letter', 'video-guestbook'] },
  { id: 'first-dance-night', src: '/images/moodboard/vibes/first-dance-night.jpg', label: 'A first-dance kind of night', guestAction: 'Guests contribute to a keepsake the couple takes home.', appIds: ['love-letter-machine', 'first-look-voice-letter', 'advice-oracle', 'where-next-map'] },
]

export const GUESTS = [
  { id: 'grandparents-front-row', emoji: '👵', label: 'Grandparents in the front row', description: 'Simple prompts with an assisted option.', appIds: ['video-guestbook', 'anniversary-time-capsule', 'first-look-voice-letter'] },
  { id: 'wild-college-friends', emoji: '🎉', label: 'Wild college friends', description: 'A bounded game keeps the chaos useful.', appIds: ['couple-trivia', 'who-said-it', 'story-chain'] },
  { id: 'strangers-meeting', emoji: '🤝', label: 'Half the room never met', description: 'Low-pressure reasons to compare answers.', appIds: ['unpopular-opinions', 'venue-scavenger-hunt'] },
  { id: 'work-crowd', emoji: '💼', label: 'Work crowd mixed in', description: "Give newer guests a way into your story.", appIds: ['who-said-it', 'couple-trivia'] },
  { id: 'kids-running', emoji: '🧒', label: 'Lots of kids', description: 'Short observable actions work best.', appIds: ['wedding-bingo', 'home-the-room-built'] },
  { id: 'loud-family', emoji: '📣', label: 'Loud, opinionated family', description: 'Structure strong opinions into a reveal.', appIds: ['unpopular-opinions', 'ask-us-anything'] },
  { id: 'dancers', emoji: '💃', label: 'Dancers', description: 'Use one quick tap, then phones away.', appIds: ['wedding-bingo', 'prediction-vault'] },
  { id: 'reserved-warm', emoji: '🌙', label: 'Reserved but warm', description: 'Private or anonymous contributions work best.', appIds: ['advice-oracle', 'video-guestbook', 'first-look-voice-letter'] },
]

export const MOMENTS = [
  { id: 'cocktail', emoji: '🍸', label: 'Cocktail hour', description: 'Unlock a story while guests explore.', appIds: ['venue-scavenger-hunt', 'unpopular-opinions', 'first-look-voice-letter'] },
  { id: 'dinner', emoji: '🍽️', label: 'Dinner', description: 'One question appears between courses.', appIds: ['couple-trivia', 'who-said-it', 'story-chain'] },
  { id: 'after-dinner', emoji: '✨', label: 'After dinner', description: 'The room watches the final reveal.', appIds: ['couple-trivia', 'who-said-it'] },
  { id: 'dancing', emoji: '🎵', label: 'Dancing', description: 'One quick tap, then phones away.', appIds: ['wedding-bingo'] },
  { id: 'late-night', emoji: '🌙', label: 'Late night', description: 'Leave predictions to open later.', appIds: ['prediction-vault', 'anniversary-time-capsule'] },
]

export const FEELINGS = [
  { id: 'cry-good-kind', emoji: '🥹', label: 'Cry (the good kind)', description: 'Real voices become a private keepsake.', appIds: ['video-guestbook', 'anniversary-time-capsule', 'first-look-voice-letter'] },
  { id: 'everyone-laughing', emoji: '😂', label: 'Everyone laughing at the same time', description: 'A short game with a shared reveal.', appIds: ['couple-trivia', 'who-said-it'] },
  { id: 'room-feels-like-show', emoji: '🎭', label: 'The room felt like a show', description: 'A clear opening, twist, and finale.', appIds: ['who-said-it', 'story-chain'] },
  { id: 'strangers-become-friends', emoji: '🤝', label: 'Strangers became friends', description: 'A prompt gives people permission to compare.', appIds: ['unpopular-opinions', 'venue-scavenger-hunt'] },
  { id: 'keepsake-from-everyone', emoji: '🎁', label: 'A keepsake from everyone', description: 'Small contributions become something worth keeping.', appIds: ['advice-oracle', 'video-guestbook', 'first-look-voice-letter', 'where-next-map'] },
  { id: 'something-nobody-has-seen', emoji: '✨', label: "Something nobody's seen before", description: 'A proven shape gets one personal twist.', appIds: ['home-the-room-built', 'story-chain'] },
  { id: 'our-story-main-character', emoji: '💌', label: 'Our story was the main character', description: 'Real messages and places drive every round.', appIds: ['who-said-it', 'venue-scavenger-hunt'] },
  { id: 'guests-actually-look-up', emoji: '🙌', label: 'Guests actually looked up', description: 'Brief phone actions create a room payoff.', appIds: ['couple-trivia', 'wedding-bingo', 'story-chain'] },
]

export const WILDCARDS = [
  { id: 'candlelit-pan', src: '/images/moodboard/wildcard/candlelit-pan.jpg', label: 'Quiet and cinematic', appIds: ['anniversary-time-capsule', 'video-guestbook', 'first-look-voice-letter'] },
  { id: 'phone-in-dark', src: '/images/moodboard/wildcard/phone-in-dark.jpg', label: 'Private in, public out', appIds: ['advice-oracle', 'home-the-room-built'] },
  { id: 'crowd-goes-quiet', src: '/images/moodboard/wildcard/crowd-goes-quiet.jpg', label: 'One earned hush', appIds: ['who-said-it', 'venue-scavenger-hunt'] },
  { id: 'everyone-points-at-screen', src: '/images/moodboard/wildcard/everyone-points-at-screen.jpg', label: 'The whole room reacts', appIds: ['couple-trivia', 'unpopular-opinions'] },
  { id: 'someone-crying-at-table', src: '/images/moodboard/wildcard/someone-crying-at-table.jpg', label: 'One true story lands', appIds: ['video-guestbook', 'anniversary-time-capsule'] },
  { id: 'flash-mob', src: '/images/moodboard/wildcard/flash-mob.jpg', label: 'The room joins in', appIds: ['story-chain', 'home-the-room-built'] },
]

export const STORY_QUESTIONS = [
  { key: 'howWeMet', chip: 'How you met', label: 'How did you meet?', hint: 'She sat next to me at a conference and corrected my wrong answer out loud', appIds: ['venue-scavenger-hunt', 'who-said-it'] },
  { key: 'insideJoke', chip: 'An inside joke', label: "What's a joke only your people would get?", hint: 'We call the third floor of our building "the vortex"', appIds: ['couple-trivia', 'who-said-it'] },
  { key: 'soUs', chip: '"That was so us"', label: 'What would make you say "that was so us" the next morning?', hint: 'One of her aunts saying she knew from the first time she saw us together', appIds: ['video-guestbook', 'advice-oracle'] },
  { key: 'runningDebate', chip: 'A debate you never resolve', label: "What's a running debate you two never resolve?", hint: 'Whether a hot dog is a sandwich. It has been four years.', appIds: ['unpopular-opinions', 'couple-trivia'] },
  { key: 'shockGuests', chip: "Something guests don't know", label: "What's something your guests would be shocked to learn?", hint: 'We met on a dating app neither of us admits to using anymore', appIds: ['who-said-it', 'couple-trivia'] },
  { key: 'ritual', chip: 'A tradition only you two have', label: "What's a ritual or tradition only you share?", hint: 'Sunday morning we read horoscopes aloud in bad accents', appIds: ['anniversary-time-capsule', 'advice-oracle'] },
  { key: 'anthem', chip: 'A thing that means "us"', label: 'What song, place, or object instantly means "us"?', hint: "The corner booth at Rae's. We were there the night everything changed.", appIds: ['where-next-map', 'venue-scavenger-hunt'] },
  { key: 'bestStoryteller', chip: 'Who has the best story', label: 'Who has the best story about you two, and what is it?', hint: 'His brother Sam. Ask him about the flat tire in Portugal.', appIds: ['video-guestbook', 'story-chain'] },
]

export const OPTION_GROUPS = {
  vibes: VIBES,
  guests: GUESTS,
  moments: MOMENTS,
  feelings: FEELINGS,
  wildcard: WILDCARDS,
}

export function appTitles(appIds) {
  return appIds.map((id) => APP_DIRECTIONS[id]?.title).filter(Boolean).join(' or ')
}

export function hasStepAnswer(answers, stepIndex) {
  const step = MOODBOARD_STEPS[stepIndex]
  if (!step) return false
  if (step.customKey && (answers?.customEntries?.[step.customKey]?.length ?? 0) > 0) {
    return true
  }
  return step.answerKeys.some((key) => {
    const value = answers?.[key]
    if (Array.isArray(value)) return value.length > 0
    if (value && typeof value === 'object') return Object.values(value).some((item) => item?.trim?.())
    return typeof value === 'string' ? value.trim().length > 0 : Boolean(value)
  })
}

export function customEntriesFor(answers, customKey) {
  const list = answers?.customEntries?.[customKey]
  return Array.isArray(list) ? list : []
}

export function allCustomEntries(answers) {
  const bucket = answers?.customEntries ?? {}
  const groups = []
  for (const step of MOODBOARD_STEPS) {
    if (!step.customKey) continue
    const entries = Array.isArray(bucket[step.customKey]) ? bucket[step.customKey] : []
    if (entries.length) groups.push({ stepId: step.id, label: step.label, entries })
  }
  const finalNotes = Array.isArray(bucket.finalNotes) ? bucket.finalNotes : []
  if (finalNotes.length) groups.push({ stepId: 'finalNotes', label: 'Anything else', entries: finalNotes })
  return groups
}

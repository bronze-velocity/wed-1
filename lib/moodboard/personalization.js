import { VIBES, GUESTS, MOMENTS, FEELINGS } from './config'

const ROOM_PAYOFFS = {
  'couple-trivia': 'The whole room locks in on the same question at the same second.',
  'who-said-it': 'One line at a time — the room guesses, then the truth lands.',
  'unpopular-opinions': 'The room splits, then everyone looks around to see who agreed.',
  'story-chain': 'One line each — the story reads back as a shared surprise.',
  'wedding-bingo': 'Real moments get flagged the second they happen.',
  'prediction-vault': 'A sealed guess now, unlocked years later at the same table.',
  'advice-oracle': 'One question. Every voice. Answered forever.',
  'where-next-map': 'A shared map, pinned by the people who love you.',
  'home-the-room-built': 'A place made from everyone contributing one thing.',
  'venue-scavenger-hunt': 'The venue becomes a story only your guests can unlock.',
  'anniversary-time-capsule': 'A message you open exactly one year later.',
  'video-guestbook': 'Short, real voices you can replay whenever you want.',
  'ask-us-anything': 'Guests choose which question the two of you answer.',
  'love-letter-machine': 'Guests write one message; you read them live from the big screen.',
  'first-look-voice-letter': 'A private audio letter of the room, stitched for the drive home.',
}

export function roomPayoffFor(appId) {
  return ROOM_PAYOFFS[appId] ?? null
}

export function personalReasonFor(appId, answers) {
  if (!appId || !answers) return null

  const groups = [
    { list: VIBES, ids: answers.vibes, label: 'scene' },
    { list: FEELINGS, ids: answers.feelings, label: 'feeling' },
    { list: GUESTS, ids: answers.guests, label: 'crowd' },
    { list: MOMENTS, ids: answers.moments, label: 'moment' },
  ]

  for (const { list, ids, label } of groups) {
    for (const id of ids ?? []) {
      const item = list.find((entry) => entry.id === id)
      if (item?.appIds?.includes(appId)) {
        return { kind: label, label: item.label }
      }
    }
  }
  return null
}

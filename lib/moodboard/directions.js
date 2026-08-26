import {
  APP_DIRECTIONS,
  OPTION_GROUPS,
  STORY_QUESTIONS,
} from './config'

function addScores(scores, options, selectedIds, weight) {
  for (const id of selectedIds ?? []) {
    const option = options.find((item) => item.id === id)
    for (const appId of option?.appIds ?? []) {
      scores.set(appId, (scores.get(appId) ?? 0) + weight)
    }
  }
}

export function scoreDirectionIds(answers) {
  const scores = new Map()
  addScores(scores, OPTION_GROUPS.vibes, answers?.vibes, 3)
  addScores(scores, OPTION_GROUPS.guests, answers?.guests, 3)
  addScores(scores, OPTION_GROUPS.moments, answers?.moments, 4)
  addScores(scores, OPTION_GROUPS.feelings, answers?.feelings, 4)
  addScores(scores, OPTION_GROUPS.wildcard, answers?.wildcard ? [answers.wildcard] : [], 5)

  for (const question of STORY_QUESTIONS) {
    if (!answers?.story?.[question.key]?.trim()) continue
    for (const appId of question.appIds) {
      scores.set(appId, (scores.get(appId) ?? 0) + 2)
    }
  }

  if (answers?.seededApp && APP_DIRECTIONS[answers.seededApp]) {
    scores.set(answers.seededApp, (scores.get(answers.seededApp) ?? 0) + 12)
  }

  const saved = answers?.directionPreferences?.saved ?? []
  const rejected = new Set(answers?.directionPreferences?.rejected ?? [])
  for (const appId of saved) {
    if (APP_DIRECTIONS[appId]) scores.set(appId, (scores.get(appId) ?? 0) + 20)
  }
  for (const appId of rejected) scores.delete(appId)

  return [...scores.entries()]
    .filter(([appId]) => APP_DIRECTIONS[appId] && !rejected.has(appId))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

export function buildMoodboardDirections(answers, limit = 3) {
  const saved = new Set(answers?.directionPreferences?.saved ?? [])
  return scoreDirectionIds(answers)
    .slice(0, limit)
    .map(([appId, score]) => ({
      id: appId,
      ...APP_DIRECTIONS[appId],
      score,
      saved: saved.has(appId),
    }))
    .sort((a, b) => Number(b.saved) - Number(a.saved) || b.score - a.score)
}

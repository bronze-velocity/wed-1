import {
  APP_DIRECTIONS,
  OPTION_GROUPS,
} from './config'

function addContribs(contribs, options, selectedIds, weight, group) {
  for (const id of selectedIds ?? []) {
    const option = options.find((item) => item.id === id)
    if (!option) continue
    for (const appId of option.appIds ?? []) {
      const list = contribs.get(appId) ?? []
      list.push({ label: option.label, weight, group, emoji: option.emoji ?? null })
      contribs.set(appId, list)
    }
  }
}

export function scoreDirections(answers) {
  const contribs = new Map()
  addContribs(contribs, OPTION_GROUPS.vibes, answers?.vibes, 3, 'vibe')
  addContribs(contribs, OPTION_GROUPS.guests, answers?.guests, 3, 'guests')
  addContribs(contribs, OPTION_GROUPS.moments, answers?.moments, 4, 'moment')
  addContribs(contribs, OPTION_GROUPS.feelings, answers?.feelings, 4, 'feeling')

  if (answers?.seededApp && APP_DIRECTIONS[answers.seededApp]) {
    const appId = answers.seededApp
    const list = contribs.get(appId) ?? []
    list.push({ label: 'Suggested for you', weight: 12, group: 'seed' })
    contribs.set(appId, list)
  }

  const saved = answers?.directionPreferences?.saved ?? []
  const rejected = new Set(answers?.directionPreferences?.rejected ?? [])
  for (const appId of saved) {
    if (!APP_DIRECTIONS[appId]) continue
    const list = contribs.get(appId) ?? []
    list.push({ label: 'Saved', weight: 20, group: 'saved' })
    contribs.set(appId, list)
  }
  for (const appId of rejected) contribs.delete(appId)

  const entries = []
  for (const [appId, list] of contribs.entries()) {
    if (!APP_DIRECTIONS[appId] || rejected.has(appId)) continue
    const score = list.reduce((sum, c) => sum + c.weight, 0)
    const contributors = [...list].sort((a, b) => b.weight - a.weight)
    entries.push({ appId, score, contributors })
  }
  return entries.sort((a, b) => b.score - a.score || a.appId.localeCompare(b.appId))
}

export function scoreDirectionIds(answers) {
  return scoreDirections(answers).map(({ appId, score }) => [appId, score])
}

export function buildMoodboardDirections(answers, limit = 3) {
  const saved = new Set(answers?.directionPreferences?.saved ?? [])
  return scoreDirections(answers)
    .slice(0, limit)
    .map(({ appId, score, contributors }) => ({
      id: appId,
      ...APP_DIRECTIONS[appId],
      score,
      contributors,
      saved: saved.has(appId),
    }))
    .sort((a, b) => Number(b.saved) - Number(a.saved) || b.score - a.score)
}

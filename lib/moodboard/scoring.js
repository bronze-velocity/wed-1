import { apps } from '@/data/apps'
import { scoreDirectionIds } from './directions'

export function scoreMoodboardApps(answers, limit = 3) {
  const scoreMap = new Map(scoreDirectionIds(answers))
  const rejected = new Set(answers?.directionPreferences?.rejected ?? [])

  return apps
    .filter((app) => !rejected.has(app.slug))
    .map((app) => ({ app, score: scoreMap.get(app.slug) ?? 0 }))
    .sort((a, b) => b.score - a.score || a.app.title.localeCompare(b.app.title))
    .slice(0, limit)
    .map(({ app, score }, index) => ({
      id: app.slug,
      tier: index === 0 ? 'hero' : 'standard',
      score: Math.min(98, 72 + score * 2),
      appPageSlug: app.slug,
      title: app.title,
      fallbackRationale: app.description,
    }))
}

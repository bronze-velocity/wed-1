import { apps } from '@/data/apps'
import { scoreDirectionIds } from './directions'

export function scoreMoodboardApps(answers, limit = 3) {
  const scoreMap = new Map(scoreDirectionIds(answers))
  const rejected = new Set(answers?.directionPreferences?.rejected ?? [])

  const ranked = apps
    .filter((app) => !rejected.has(app.slug))
    .map((app) => ({ app, rawScore: scoreMap.get(app.slug) ?? 0 }))
    .sort((a, b) => b.rawScore - a.rawScore || a.app.title.localeCompare(b.app.title))
    .slice(0, limit)

  const topRaw = ranked[0]?.rawScore ?? 0
  const cutoff = Math.max(5, topRaw * 0.4)
  const kept = ranked.filter((entry, i) => i === 0 || entry.rawScore >= cutoff)

  return kept.map(({ app, rawScore }, index) => ({
    id: app.slug,
    tier: index === 0 ? 'hero' : 'standard',
    rawScore,
    score: Math.min(98, 72 + rawScore * 2),
    appPageSlug: app.slug,
    title: app.title,
    fallbackRationale: app.description,
  }))
}

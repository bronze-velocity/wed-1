import { apps } from '@/data/apps'
import { scoreDirectionIds } from './directions'
import { evaluateAppAgainstVenue, fitBadgeFor, hasVenueAnswers } from './venueConstraints'

export function scoreMoodboardApps(answers, limit = 3) {
  const scoreMap = new Map(scoreDirectionIds(answers))
  const rejected = new Set(answers?.directionPreferences?.rejected ?? [])
  const venue = answers?.venue ?? null
  const venueAnswered = hasVenueAnswers(venue)

  const ranked = apps
    .filter((app) => !rejected.has(app.slug))
    .map((app) => {
      const rawScore = scoreMap.get(app.slug) ?? 0
      const evaluation = venueAnswered
        ? evaluateAppAgainstVenue(app.slug, venue)
        : { multiplier: 1, notes: [], filteredBy: null }
      const adjustedScore = rawScore * evaluation.multiplier
      return { app, rawScore, adjustedScore, evaluation }
    })

  const filteredOut = ranked
    .filter((entry) => entry.evaluation.multiplier <= 0 && entry.rawScore > 0)
    .sort((a, b) => b.rawScore - a.rawScore)

  const eligible = ranked.filter((entry) => entry.evaluation.multiplier > 0)
  eligible.sort(
    (a, b) => b.adjustedScore - a.adjustedScore || a.app.title.localeCompare(b.app.title)
  )

  const shortlist = eligible.slice(0, limit)
  const topAdjusted = shortlist[0]?.adjustedScore ?? 0
  const cutoff = Math.max(4, topAdjusted * 0.4)
  const kept = shortlist.filter((entry, i) => i === 0 || entry.adjustedScore >= cutoff)

  const matches = kept.map(({ app, rawScore, adjustedScore, evaluation }, index) => {
    const badge = venueAnswered ? fitBadgeFor(evaluation) : null
    return {
      id: app.slug,
      tier: index === 0 ? 'hero' : 'standard',
      rawScore,
      adjustedScore,
      score: Math.min(98, 72 + adjustedScore * 2),
      appPageSlug: app.slug,
      title: app.title,
      fallbackRationale: app.description,
      venueFit: badge
        ? {
            tone: badge.tone,
            label: badge.label,
            notes: evaluation.notes.map((n) => n.note),
          }
        : null,
    }
  })

  const hiddenByVenue = filteredOut.map(({ app, rawScore, evaluation }) => ({
    id: app.slug,
    appPageSlug: app.slug,
    title: app.title,
    rawScore,
    reason: evaluation.notes.find((n) => n.severity === 'blocked')?.note
      ?? 'Your reception setup rules this one out.',
    filteredBy: evaluation.filteredBy,
  }))

  return { matches, hiddenByVenue }
}

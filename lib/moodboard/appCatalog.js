import rawApps from '../../zz/wed-apps/20-apps.json' with { type: 'json' }
import { hiddenIdeas } from '../../data/hidden-ideas.js'

function formatStandardApp(app) {
  return [
    `### ${app.slug} — ${app.title}`,
    `Vibes: ${app.alt1_vibe.join(', ')} | Moments: ${app.alt2_moment.join(', ')} | Feelings: ${app.alt4_feeling.join(', ')}`,
    app.description,
    `App page: /apps/${app.slug}`,
  ].join('\n')
}

function formatHiddenIdea(idea) {
  return [
    `### ${idea.id} — ${idea.title} [HIDDEN TIER]`,
    `Vibes: ${idea.vibes.join(', ')} | Moments: ${idea.moments.join(', ')} | Feelings: ${idea.feelings.join(', ')}`,
    `Energy note: ${idea.energyNote}`,
    idea.description,
    `App page: none (never built before)`,
  ].join('\n')
}

export function buildCatalogText() {
  const standardSection = [
    '## STANDARD APPS (25 available)',
    rawApps.apps.map(formatStandardApp).join('\n\n'),
  ].join('\n\n')

  const hiddenSection = [
    '## HIDDEN IDEAS (never built — only surface when adventurousness signals are high)',
    hiddenIdeas.map(formatHiddenIdea).join('\n\n'),
  ].join('\n\n')

  return [standardSection, hiddenSection].join('\n\n---\n\n')
}

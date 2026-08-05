import { apps } from '../data/apps.js'

export function getApps() {
  return apps
}

export function getAppBySlug(slug) {
  return apps.find((app) => app.slug === slug) ?? null
}

export function getAppSlugs() {
  return apps.map((app) => app.slug)
}

export function getAdjacentApps(slug) {
  const i = apps.findIndex((app) => app.slug === slug)
  if (i === -1) return { prev: null, next: null }
  const prev = apps[(i - 1 + apps.length) % apps.length]
  const next = apps[(i + 1) % apps.length]
  return { prev, next }
}

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

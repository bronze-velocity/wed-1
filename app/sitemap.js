import { getAppSlugs } from '../lib/getApps.js'

const BASE_URL = 'https://wepho.com'

export default function sitemap() {
  const appSlugs = getAppSlugs()
  const now = new Date()

  const staticRoutes = ['', '/planners', '/apps'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }))

  const moodboardRoute = {
    url: `${BASE_URL}/moodboard`,
    lastModified: now,
    priority: 0.8,
  }

  const appRoutes = appSlugs.map((slug) => ({
    url: `${BASE_URL}/apps/${slug}`,
    lastModified: now,
  }))

  return [...staticRoutes, moodboardRoute, ...appRoutes]
}

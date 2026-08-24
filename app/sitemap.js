import { getAppSlugs } from '../lib/getApps.js'
import { getPosts } from '../lib/getPosts.js'

const BASE_URL = 'https://wepho.com'

export default function sitemap() {
  const appSlugs = getAppSlugs()
  const posts = getPosts()
  const now = new Date()

  const staticRoutes = ['', '/planners', '/apps', '/blog'].map((path) => ({
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

  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
  }))

  return [...staticRoutes, moodboardRoute, ...appRoutes, ...postRoutes]
}

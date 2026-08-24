import { posts } from '../data/posts.js'

export function getPosts() {
  return [...posts].sort((a, b) => {
    const ad = a.date ? new Date(a.date).getTime() : 0
    const bd = b.date ? new Date(b.date).getTime() : 0
    return bd - ad
  })
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}

export function getPostSlugs() {
  return posts.map((post) => post.slug)
}

export function formatPostDate(date) {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

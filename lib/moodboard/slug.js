import { customAlphabet } from 'nanoid'

const RESERVED = new Set([
  'new',
  'edit',
  'api',
  'admin',
  'share',
  'brief',
  'match',
  'results',
])

const MAX_LEN = 60

export function slugify(raw) {
  if (!raw || typeof raw !== 'string') return ''
  return raw
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_LEN)
}

const nano = customAlphabet('23456789abcdefghjkmnpqrstuvwxyz', 7)

export function newSlug() {
  return nano()
}

export function resolveSlug(desired) {
  const cleaned = slugify(desired)
  if (!cleaned || RESERVED.has(cleaned)) return newSlug()
  return cleaned
}

export function isReserved(slug) {
  return RESERVED.has(slug)
}

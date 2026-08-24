import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const KEYLEN = 32
const SALT_BYTES = 16

export function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES).toString('hex')
  const hash = scryptSync(password, salt, KEYLEN).toString('hex')
  return { passwordHash: hash, salt }
}

export function verifyPassword(password, storedHashHex, saltHex) {
  if (!password || !storedHashHex || !saltHex) return false
  const stored = Buffer.from(storedHashHex, 'hex')
  let candidate
  try {
    candidate = scryptSync(password, saltHex, stored.length)
  } catch {
    return false
  }
  if (candidate.length !== stored.length) return false
  return timingSafeEqual(candidate, stored)
}

export function cookieNameFor(slug) {
  return `wepho_unlock_${slug}`
}

export function cookieMatchesHash(cookieValue, storedHashHex) {
  if (!cookieValue || !storedHashHex) return false
  const a = Buffer.from(cookieValue, 'hex')
  const b = Buffer.from(storedHashHex, 'hex')
  if (a.length === 0 || a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

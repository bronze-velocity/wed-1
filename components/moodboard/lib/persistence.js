const KEY = 'wepho.moodboard.v1'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

function hasAnyAnswer(answers) {
  if (!answers || typeof answers !== 'object') return false
  return Object.values(answers).some((v) => {
    if (v == null) return false
    if (typeof v === 'string') return v.trim().length > 0
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === 'object') return Object.values(v).some((x) => (typeof x === 'string' ? x.trim().length > 0 : Boolean(x)))
    return Boolean(v)
  })
}

export function loadProgress() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const { answers, step, savedAt } = parsed
    if (typeof savedAt !== 'number' || Date.now() - savedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY)
      return null
    }
    if (!hasAnyAnswer(answers)) return null
    return { answers, step: typeof step === 'number' ? step : 0, savedAt }
  } catch {
    return null
  }
}

export function saveProgress(answers, step) {
  if (typeof window === 'undefined') return
  if (!hasAnyAnswer(answers)) return
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ answers, step, savedAt: Date.now() })
    )
  } catch {
    // storage may be full or blocked — ignore
  }
}

export function clearProgress() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

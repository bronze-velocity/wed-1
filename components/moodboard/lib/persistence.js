const KEY = 'wepho.moodboard.v1'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

function hasAnyAnswer(answers) {
  function meaningful(value) {
    if (value == null) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.some(meaningful)
    if (typeof value === 'object') return Object.values(value).some(meaningful)
    return Boolean(value)
  }
  return meaningful(answers)
}

export function loadProgress() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const { answers, step, furthestVisitedStep, savedAt } = parsed
    if (typeof savedAt !== 'number' || Date.now() - savedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY)
      return null
    }
    if (!hasAnyAnswer(answers)) return null
    return {
      answers,
      step: typeof step === 'number' ? step : 0,
      furthestVisitedStep: typeof furthestVisitedStep === 'number' ? furthestVisitedStep : step,
      savedAt,
    }
  } catch {
    return null
  }
}

export function saveProgress(answers, step, furthestVisitedStep = step) {
  if (typeof window === 'undefined') return
  if (!hasAnyAnswer(answers)) return
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ answers, step, furthestVisitedStep, savedAt: Date.now() })
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

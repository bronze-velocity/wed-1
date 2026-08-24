'use client'

const STORAGE_KEY = 'wepho-cookie-consent'
const CATEGORIES = { ESSENTIAL: 'essential', ANALYTICS: 'analytics', MARKETING: 'marketing' }

const DEFAULT_STATE = {
  region: null,
  consentGiven: false,
  consentTimestamp: null,
  bannerDismissed: false,
  preferences: {
    [CATEGORIES.ESSENTIAL]: true,
    [CATEGORIES.ANALYTICS]: false,
    [CATEGORIES.MARKETING]: false,
  },
}

function read() {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_STATE, ...parsed, preferences: { ...DEFAULT_STATE.preferences, ...(parsed.preferences || {}) } }
  } catch {
    return DEFAULT_STATE
  }
}

function write(next) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {}
}

const listeners = new Set()
let state = typeof window === 'undefined' ? DEFAULT_STATE : read()

function setState(patch) {
  state = typeof patch === 'function' ? patch(state) : { ...state, ...patch }
  write(state)
  listeners.forEach((fn) => fn(state))
}

export const consentCategories = CATEGORIES

export function getConsentState() {
  return state
}

export function subscribeConsent(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function hydrateConsent() {
  if (typeof window === 'undefined') return
  state = read()
  listeners.forEach((fn) => fn(state))
}

export function setRegion(region) {
  setState({ region })
}

export function acceptAll() {
  setState({
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    bannerDismissed: true,
    preferences: { [CATEGORIES.ESSENTIAL]: true, [CATEGORIES.ANALYTICS]: true, [CATEGORIES.MARKETING]: true },
  })
}

export function rejectAll() {
  setState({
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    bannerDismissed: true,
    preferences: { [CATEGORIES.ESSENTIAL]: true, [CATEGORIES.ANALYTICS]: false, [CATEGORIES.MARKETING]: false },
  })
}

export function setPreferences(prefs) {
  setState({
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    bannerDismissed: true,
    preferences: { ...prefs, [CATEGORIES.ESSENTIAL]: true },
  })
}

export function reopenBanner() {
  setState({ bannerDismissed: false })
}

export function withdrawConsent() {
  setState({
    consentGiven: false,
    consentTimestamp: null,
    bannerDismissed: false,
    preferences: { [CATEGORIES.ESSENTIAL]: true, [CATEGORIES.ANALYTICS]: false, [CATEGORIES.MARKETING]: false },
  })
}

export function hasAnalyticsConsent() {
  return state.preferences[CATEGORIES.ANALYTICS] === true
}

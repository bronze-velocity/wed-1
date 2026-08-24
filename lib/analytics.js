export function trackEvent(name, props) {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.va === 'function') {
      window.va('event', { name, ...(props || {}) })
      return
    }
    if (window.va && typeof window.va.track === 'function') {
      window.va.track(name, props || {})
      return
    }
  } catch {
    // never let analytics break UX
  }
}

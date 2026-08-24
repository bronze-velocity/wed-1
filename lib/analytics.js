'use client'

import posthog from 'posthog-js'
import { hasAnalyticsConsent } from './consentStore'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

let initialized = false

export function initAnalytics() {
  if (typeof window === 'undefined') return
  if (initialized || !POSTHOG_KEY) return
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      autocapture: false,
      disable_session_recording: true,
      loaded: (ph) => {
        if (!hasAnalyticsConsent()) ph.opt_out_capturing()
      },
    })
    initialized = true
  } catch {
    // never let analytics break UX
  }
}

export function setAnalyticsConsent(granted) {
  if (typeof window === 'undefined' || !POSTHOG_KEY) return
  try {
    if (granted) {
      if (!initialized) initAnalytics()
      posthog.opt_in_capturing()
    } else if (initialized) {
      posthog.opt_out_capturing()
    }
  } catch {}
}

export function trackPageview(url) {
  if (typeof window === 'undefined' || !initialized) return
  try {
    posthog.capture('$pageview', url ? { $current_url: url } : undefined)
  } catch {}
}

export function trackEvent(name, props) {
  if (typeof window === 'undefined' || !initialized) return
  try {
    posthog.capture(name, props || {})
  } catch {
    // never let analytics break UX
  }
}

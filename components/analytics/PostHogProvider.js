'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getConsentState, subscribeConsent } from '@/lib/consentStore'
import { initAnalytics, setAnalyticsConsent, trackPageview } from '@/lib/analytics'

function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsentState, getConsentState)
}

export default function PostHogProvider() {
  const state = useConsent()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const analyticsGranted = state.preferences?.analytics === true

  useEffect(() => {
    if (analyticsGranted) {
      initAnalytics()
      setAnalyticsConsent(true)
    } else {
      setAnalyticsConsent(false)
    }
  }, [analyticsGranted])

  useEffect(() => {
    if (!analyticsGranted || !pathname) return
    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    trackPageview(url)
  }, [analyticsGranted, pathname, searchParams])

  return null
}

'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function BriefViewBeacon({ slug, threeWords, coupleName }) {
  useEffect(() => {
    trackEvent('moodboard_brief_viewed', {
      slug,
      threeWords: threeWords ?? null,
      coupleName: coupleName ?? null,
    })
  }, [slug, threeWords, coupleName])

  return null
}

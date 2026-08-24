'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { subscribeConsent, getConsentState, hydrateConsent, acceptAll, rejectAll, setRegion } from '@/lib/consentStore'
import { detectRegion, getComplianceRules } from '@/lib/consentRegion'
import CookieSettings from './CookieSettings'

function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsentState, getConsentState)
}

export default function CookieBanner() {
  const state = useConsent()
  const [rules, setRules] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    hydrateConsent()
    const region = detectRegion()
    setRegion(region)
    setRules(getComplianceRules(region))
    setMounted(true)
  }, [])

  if (!mounted || !rules) return null
  if (state.bannerDismissed && !showSettings) return null

  if (showSettings) {
    return <CookieSettings onClose={() => setShowSettings(false)} />
  }

  const bannerStyle = {
    position: 'fixed',
    bottom: 'var(--space-4)',
    right: 'var(--space-4)',
    left: 'var(--space-4)',
    maxWidth: 380,
    marginLeft: 'auto',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    padding: 'var(--space-5)',
    zIndex: 50,
  }
  const btnRow = { display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', flexWrap: 'wrap' }
  const body = { fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', margin: `0 0 var(--space-4)`, lineHeight: 1.5 }
  const secondary = {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--text-body-sm)',
    color: 'var(--color-text-primary)',
    background: 'transparent',
    border: '1px solid var(--color-border-strong)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 500,
  }
  const primary = {
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--text-body-sm)',
    color: 'var(--color-text-inverse)',
    background: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
  }
  const link = { color: 'var(--color-accent)', textDecoration: 'underline', fontWeight: 500 }

  if (rules.bannerType === 'simple') {
    return (
      <div style={bannerStyle} role="dialog" aria-label="Cookie notice">
        <p style={body}>
          We use cookies to improve the site and understand which pages help couples decide.{' '}
          <Link href="/privacy" style={link}>Learn more</Link>
        </p>
        <div style={btnRow}>
          <button type="button" onClick={acceptAll} style={primary}>Got it</button>
        </div>
      </div>
    )
  }

  if (rules.bannerType === 'simple-ccpa') {
    return (
      <div style={bannerStyle} role="dialog" aria-label="Cookie notice">
        <p style={body}>
          We use cookies for analytics and to improve your experience. We don't sell your data.{' '}
          <Link href="/privacy" style={link}>Privacy policy</Link>
        </p>
        <div style={btnRow}>
          <button type="button" onClick={() => setShowSettings(true)} style={secondary}>Preferences</button>
          <button type="button" onClick={acceptAll} style={primary}>Accept</button>
        </div>
      </div>
    )
  }

  return (
    <div style={bannerStyle} role="dialog" aria-label="Cookie notice">
      <h3 style={{ margin: `0 0 var(--space-2)`, fontSize: 'var(--text-body)', fontWeight: 600 }}>
        We value your privacy
      </h3>
      <p style={body}>
        We'd like to use analytics cookies to understand which pages help couples find the right app.{' '}
        <Link href="/privacy" style={link}>Privacy policy</Link>
      </p>
      <div style={btnRow}>
        <button type="button" onClick={rejectAll} style={secondary}>Reject</button>
        <button type="button" onClick={() => setShowSettings(true)} style={secondary}>Customize</button>
        <button type="button" onClick={acceptAll} style={primary}>Accept</button>
      </div>
    </div>
  )
}

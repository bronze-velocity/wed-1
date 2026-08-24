'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const DISMISS_KEY = 'wepho.moodboardPill.dismissedAt'
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000
const SCROLL_TRIGGER = 600

function isDismissed() {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const at = Number(raw)
    if (!Number.isFinite(at)) return false
    return Date.now() - at < DISMISS_MS
  } catch {
    return false
  }
}

export default function MoodboardPill() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [collides, setCollides] = useState(false)

  const optedOut =
    pathname?.startsWith('/moodboard') ||
    pathname === '/privacy' ||
    pathname === '/terms'

  useEffect(() => {
    setReady(true)
    setDismissed(isDismissed())
  }, [])

  useEffect(() => {
    if (optedOut) return
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_TRIGGER)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [optedOut])

  useEffect(() => {
    if (optedOut) return
    const targets = document.querySelectorAll('[data-moodboard-cta]')
    if (!targets.length || typeof IntersectionObserver === 'undefined') return
    let visible = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible += entry.isIntersecting ? 1 : -1
        }
        setCollides(visible > 0)
      },
      { threshold: 0.15 }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname, optedOut])

  useEffect(() => {
    function onClick(e) {
      const link = e.target.closest?.('[data-moodboard-cta]')
      if (!link) return
      const surface = link.getAttribute('data-moodboard-cta') || 'unknown'
      trackEvent('moodboard_cta_click', { surface })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (optedOut) return null
  if (!ready) return null
  if (dismissed) return null
  if (!scrolled) return null
  if (collides) return null

  function handleDismiss(e) {
    e.preventDefault()
    e.stopPropagation()
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      // ignore
    }
    setDismissed(true)
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 'var(--space-4)',
        bottom: 'var(--space-4)',
        zIndex: 45,
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        background: 'var(--color-text-primary)',
        color: 'var(--color-text-inverse)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        animation: 'fadeInUp 240ms ease-out both',
      }}
    >
      <Link
        href="/moodboard"
        data-moodboard-cta="pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: '12px 16px',
          color: 'inherit',
          textDecoration: 'none',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        <span>Start your moodboard</span>
        <span
          style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 600,
            opacity: 0.7,
            letterSpacing: '0.04em',
          }}
        >
          · 3 min
        </span>
      </Link>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{
          background: 'transparent',
          border: 'none',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          color: 'inherit',
          padding: '0 12px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 18,
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        ×
      </button>
    </div>
  )
}

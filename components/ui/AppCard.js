'use client'

import Link from 'next/link'
import { useState } from 'react'

const clampStyle = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export default function AppCard({ app }) {
  const [hover, setHover] = useState(false)
  const vibes = app.alt1_vibe ?? []
  const moments = app.alt2_moment ?? []
  const eyebrow = [...vibes, ...moments].slice(0, 2).join(' · ')

  return (
    <Link
      href={`/apps/${app.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-6) 0',
        borderTop: '1px solid var(--color-border)',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        transition: 'color var(--duration-normal) var(--ease-out)',
      }}
    >
      <p
        className="eyebrow"
        style={{
          color: app.isDemo ? 'var(--color-slate)' : 'var(--color-mist)',
        }}
      >
        {app.isDemo ? 'Featured demo' : (eyebrow || 'Wedding app')}
      </p>

      <h3
        className="display-serif"
        style={{
          fontSize: 'var(--text-h2)',
          color: 'var(--color-ink)',
          fontStyle: 'italic',
          fontWeight: 400,
          margin: 0,
          ...clampStyle(2),
        }}
      >
        {app.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-body)',
          lineHeight: 1.65,
          color: 'var(--color-ink-soft)',
          margin: 0,
          ...clampStyle(3),
        }}
      >
        {app.description}
      </p>

      <span
        style={{
          marginTop: 'auto',
          fontSize: 'var(--text-eyebrow)',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-slate)',
          opacity: hover ? 1 : 0.75,
          transition: 'opacity var(--duration-fast) var(--ease-out)',
        }}
      >
        See how it works →
      </span>
    </Link>
  )
}

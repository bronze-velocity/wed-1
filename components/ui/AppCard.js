'use client'

import Link from 'next/link'
import { useState } from 'react'

const vibeConfig = {
  'Make them laugh':   { color: 'var(--color-amber)',  bg: 'var(--color-amber-light)' },
  'Make them cry':     { color: 'var(--color-rose)',   bg: 'var(--color-rose-light)' },
  'Get them talking':  { color: 'var(--color-teal)',   bg: 'var(--color-teal-light)' },
  'Create a keepsake': { color: 'var(--color-green)',  bg: 'var(--color-green-light)' },
  'Stop the room':     { color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
}

const clampStyle = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export default function AppCard({ app }) {
  const [hover, setHover] = useState(false)
  const primaryVibe = app.alt1_vibe?.[0]
  const primaryMoment = app.alt2_moment?.[0]
  const vibe = vibeConfig[primaryVibe]

  return (
    <Link
      href={`/apps/${app.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        border: '1px solid',
        borderColor: hover ? 'var(--color-border-strong)' : 'var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition:
          'transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {primaryVibe && vibe && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: vibe.bg,
              color: vibe.color,
              borderRadius: 'var(--radius-full)',
              padding: '3px 10px',
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {primaryVibe}
          </span>
        )}
        {primaryMoment && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-bg-subtle)',
              color: 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-full)',
              padding: '3px 10px',
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {primaryMoment}
          </span>
        )}
        {app.isDemo && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              borderRadius: 'var(--radius-full)',
              padding: '3px 10px',
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Featured demo
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
          ...clampStyle(2),
        }}
      >
        {app.title}
      </h3>

      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
          ...clampStyle(3),
        }}
      >
        {app.description}
      </p>

      <span
        style={{
          marginTop: 'auto',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 600,
          color: 'var(--color-accent)',
          textDecoration: hover ? 'underline' : 'none',
        }}
      >
        See how it works →
      </span>
    </Link>
  )
}

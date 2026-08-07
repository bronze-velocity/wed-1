'use client'

import Link from 'next/link'
import { useState } from 'react'

const vibeConfig = {
  'Make them laugh':   { color: 'var(--color-amber)' },
  'Make them cry':     { color: 'var(--color-rose)' },
  'Get them talking':  { color: 'var(--color-teal)' },
  'Create a keepsake': { color: 'var(--color-green)' },
  'Stop the room':     { color: 'var(--color-accent)' },
}

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
        {vibes.map((v) => {
          const vibe = vibeConfig[v]
          if (!vibe) return null
          return (
            <span
              key={`vibe-${v}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '3px 10px 3px 8px',
                fontSize: 'var(--text-tiny)',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 'var(--radius-full)',
                  background: vibe.color,
                  display: 'inline-block',
                }}
              />
              {v}
            </span>
          )
        })}
        {moments.map((m) => (
          <span
            key={`moment-${m}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-bg)',
              color: 'var(--color-text-muted)',
              border: '1px dashed var(--color-border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '3px 10px',
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {m}
          </span>
        ))}
        {app.isDemo && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-bg)',
              color: 'var(--color-accent-dark)',
              border: '1px solid var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              padding: '3px 10px 3px 8px',
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-accent)',
                display: 'inline-block',
              }}
            />
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

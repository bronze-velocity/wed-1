'use client'

import { useState, useEffect } from 'react'
import AppCard from '../ui/AppCard'

const VIBES = [
  'All',
  'Make them laugh',
  'Make them cry',
  'Get them talking',
  'Create a keepsake',
  'Stop the room',
]

const MOMENTS = [
  'All',
  'Arrival',
  'Cocktail Hour',
  'Dinner',
  'Speeches',
  'Dancing',
  'All Day',
]

function pillStyle(isActive, activeBg) {
  return {
    background: isActive ? activeBg : 'var(--color-bg)',
    color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
    border: '1.5px solid',
    borderColor: isActive ? activeBg : 'var(--color-border-strong)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 600,
    fontSize: 'var(--text-body-sm)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'all var(--duration-fast) var(--ease-out)',
  }
}

export default function AppGalleryFull({ apps }) {
  const [activeVibe, setActiveVibe] = useState('All')
  const [activeMoment, setActiveMoment] = useState('All')
  const [revealed, setRevealed] = useState(false)
  const [entranceDone, setEntranceDone] = useState(false)

  useEffect(() => {
    setRevealed(true)
    const timer = setTimeout(() => setEntranceDone(true), 1100)
    return () => clearTimeout(timer)
  }, [])

  function matchesFilters(app) {
    const vibeMatch = activeVibe === 'All' || app.alt1_vibe?.includes(activeVibe)
    const momentMatch = activeMoment === 'All' || app.alt2_moment?.includes(activeMoment)
    return vibeMatch && momentMatch
  }

  const activeCount = apps.filter(matchesFilters).length

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {VIBES.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setActiveVibe(vibe)}
            style={pillStyle(activeVibe === vibe, 'var(--color-text-primary)')}
          >
            {vibe}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {MOMENTS.map((moment) => (
          <button
            key={moment}
            onClick={() => setActiveMoment(moment)}
            style={pillStyle(activeMoment === moment, 'var(--color-accent)')}
          >
            {moment}
          </button>
        ))}
      </div>

      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-8)',
        }}
      >
        Showing {activeCount} of {apps.length}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {apps.map((app, i) => {
          const active = matchesFilters(app)
          return (
            <div
              key={app.slug}
              style={{
                opacity: !revealed ? 0 : active ? 1 : 0.3,
                transform: !revealed ? 'translateY(16px)' : 'none',
                transition: 'opacity 300ms ease-out, transform 300ms ease-out',
                transitionDelay: entranceDone ? '0ms' : `${Math.min(i * 45, 650)}ms`,
                pointerEvents: active ? 'auto' : 'none',
              }}
            >
              <AppCard app={app} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

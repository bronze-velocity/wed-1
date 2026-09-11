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

function filterLabelStyle(isActive) {
  return {
    background: 'transparent',
    color: isActive ? 'var(--color-ink)' : 'var(--color-mist)',
    border: 'none',
    padding: '6px 0',
    marginRight: 'var(--space-6)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-eyebrow)',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    borderBottom: isActive ? '1px solid var(--color-ink)' : '1px solid transparent',
    transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
  }
}

export default function AppGalleryFull({ apps }) {
  const [activeVibe, setActiveVibe] = useState('All')
  const [activeMoment, setActiveMoment] = useState('All')
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setRevealed(true)
  }, [])

  function matchesFilters(app) {
    const vibeMatch = activeVibe === 'All' || app.alt1_vibe?.includes(activeVibe)
    const momentMatch = activeMoment === 'All' || app.alt2_moment?.includes(activeMoment)
    return vibeMatch && momentMatch
  }

  const activeCount = apps.filter(matchesFilters).length

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--color-mist)', marginBottom: 'var(--space-3)' }}>
            Filter by vibe
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 'var(--space-2)' }}>
            {VIBES.map((vibe) => (
              <button key={vibe} onClick={() => setActiveVibe(vibe)} style={filterLabelStyle(activeVibe === vibe)}>
                {vibe}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow" style={{ color: 'var(--color-mist)', marginBottom: 'var(--space-3)' }}>
            Filter by moment
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 'var(--space-2)' }}>
            {MOMENTS.map((moment) => (
              <button key={moment} onClick={() => setActiveMoment(moment)} style={filterLabelStyle(activeMoment === moment)}>
                {moment}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p
        className="eyebrow"
        style={{ color: 'var(--color-mist)', marginBottom: 'var(--space-8)' }}
      >
        {activeCount} of {apps.length}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
          columnGap: 'var(--space-10)',
          rowGap: 'var(--space-4)',
        }}
      >
        {apps.map((app, i) => {
          const active = matchesFilters(app)
          return (
            <div
              key={app.slug}
              style={{
                opacity: !revealed ? 0 : active ? 1 : 0.25,
                transform: !revealed ? 'translateY(12px)' : 'none',
                transition: 'opacity 500ms ease-out, transform 500ms ease-out',
                transitionDelay: `${Math.min(i * 40, 500)}ms`,
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

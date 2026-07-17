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
      <div className="flex flex-wrap gap-2 mb-3">
        {VIBES.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setActiveVibe(vibe)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              activeVibe === vibe
                ? 'bg-bg-dark text-text-inverse border-bg-dark'
                : 'bg-bg text-text-secondary border-border hover:border-border-strong hover:text-text-primary'
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {MOMENTS.map((moment) => (
          <button
            key={moment}
            onClick={() => setActiveMoment(moment)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              activeMoment === moment
                ? 'bg-accent text-text-inverse border-accent'
                : 'bg-bg text-text-secondary border-border hover:border-border-strong hover:text-text-primary'
            }`}
          >
            {moment}
          </button>
        ))}
      </div>

      <p className="text-sm text-text-muted mb-8">
        Showing {activeCount} of {apps.length}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

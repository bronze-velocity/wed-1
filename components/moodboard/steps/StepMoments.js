'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'

const MOMENTS = [
  { id: 'cocktail',     label: 'Cocktail hour',    sublabel: 'The room is warming up, everyone arriving' },
  { id: 'dinner',       label: 'Dinner',            sublabel: 'Tables settled, conversation flowing' },
  { id: 'after-dinner', label: 'After dinner',      sublabel: 'Full, relaxed, ready to be surprised' },
  { id: 'dancing',      label: 'Dancing',            sublabel: 'Floor is open, energy is high' },
  { id: 'late-night',   label: 'Late night',         sublabel: 'The loyalists are still here' },
]

export default function StepMoments({ onNext, onBack, initialValues }) {
  const [selected, setSelected] = useState(new Set(initialValues?.moments ?? []))

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-24)',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        maxWidth: 540,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}
    >
      <div>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            fontWeight: 600,
            marginBottom: 'var(--space-2)',
          }}
        >
          Step 3 of 6
        </p>
        <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2 }}>
          Which moments do you want to activate?
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-2)',
          }}
        >
          Select any that fit your timeline
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {MOMENTS.map((m) => (
          <TapCard
            key={m.id}
            type="illustrated"
            label={m.label}
            sublabel={m.sublabel}
            selected={selected.has(m.id)}
            onClick={() => toggle(m.id)}
          />
        ))}
      </div>

      <div className="moodboard-cta">
        {onBack && (
          <button onClick={onBack} className="btn" style={{ flex: '0 0 auto' }}>
            ←
          </button>
        )}
        <button
          onClick={() => onNext({ moments: Array.from(selected) })}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          Those are our moments →
        </button>
      </div>
    </div>
  )
}

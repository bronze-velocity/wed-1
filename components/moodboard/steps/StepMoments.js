'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'

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
    <StepShell
      stepLabel="Step 3 of 6"
      title="Which moments do you want to activate?"
      subtitle="Select any that fit your timeline"
      cta={
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
      }
    >
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
    </StepShell>
  )
}

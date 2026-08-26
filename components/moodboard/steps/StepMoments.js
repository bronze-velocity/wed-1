'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import { MOMENTS } from '@/lib/moodboard/config'

export default function StepMoments({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.moments ?? []))

  function toggle(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    onDraftChange?.({ moments: Array.from(next) })
  }

  return (
    <StepShell
      stepLabel="Step 3 of 6"
      title="When should this experience earn its place?"
      subtitle="Select any that fit your timeline"
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
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
      <div role="group" aria-label="Reception moments" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {MOMENTS.map((m) => (
          <TapCard
            key={m.id}
            type="illustrated"
            label={m.label}
            detail={m.description}
            selected={selected.has(m.id)}
            onClick={() => toggle(m.id)}
          />
        ))}
      </div>
    </StepShell>
  )
}

'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import { WILDCARDS } from '@/lib/moodboard/config'

export default function StepWildcard({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(initialValues?.wildcard ?? null)

  return (
    <StepShell
      stepLabel="Step 6 of 7"
      title="Which final image has the right energy?"
      subtitle="Pick one final instinct, then review your brief."
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() => onNext({ wildcard: selected })}
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={!selected}
          >
            Review our brief →
          </button>
        </div>
      }
    >
      <div
        className="moodboard-photo-grid"
        role="radiogroup"
        aria-label="Final reception energy"
        style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}
      >
        {WILDCARDS.map((w) => (
          <TapCard
            key={w.id}
            type="photo"
            src={w.src}
            alt={w.label}
            label={w.label}
            selected={selected === w.id}
            onClick={() => {
              setSelected(w.id)
              onDraftChange?.({ wildcard: w.id })
            }}
            maxSelect={1}
          />
        ))}
      </div>
    </StepShell>
  )
}

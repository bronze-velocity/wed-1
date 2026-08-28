'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import { VIBES } from '@/lib/moodboard/config'

const MAX = 3

export default function StepVibes({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.vibes ?? []))

  function toggle(id) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else if (next.size < MAX) {
      next.add(id)
    }
    setSelected(next)
    onDraftChange?.({ vibes: Array.from(next) })
  }

  return (
    <StepShell
      stepLabel="Step 1 of 6"
      title="Which scene feels like the reception you want?"
      subtitle={`Pick up to ${MAX}`}
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() => onNext({ vibes: Array.from(selected) })}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            These feel like us →
          </button>
        </div>
      }
    >
      <div
        className="moodboard-photo-grid"
        role="group"
        aria-label={`Reception scenes. Choose up to ${MAX}.`}
        style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}
      >
        {VIBES.map((v, i) => (
          <TapCard
            key={v.id}
            type="photo"
            src={v.src}
            alt={v.label}
            label={v.label}
            detail={v.guestAction}
            selected={selected.has(v.id)}
            onClick={() => toggle(v.id)}
            maxSelect={MAX}
            disabled={!selected.has(v.id) && selected.size >= MAX}
            priority={i < 2}
          />
        ))}
      </div>
    </StepShell>
  )
}

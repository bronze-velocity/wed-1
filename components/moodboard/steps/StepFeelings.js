'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import { FEELINGS, appTitles } from '@/lib/moodboard/config'

const MAX = 2

const bigLabel = { fontSize: 'var(--text-body)', fontWeight: 700 }

export default function StepFeelings({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.feelings ?? []))

  function toggle(id) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else if (next.size < MAX) {
      next.add(id)
    }
    setSelected(next)
    onDraftChange?.({ feelings: Array.from(next) })
  }

  return (
    <StepShell
      stepLabel="Step 4 of 6"
      title="What should the room feel like?"
      subtitle={`Pick up to ${MAX}`}
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() => onNext({ feelings: Array.from(selected) })}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            That's what we want →
          </button>
        </div>
      }
    >
      <div
        className="moodboard-option-grid"
        role="group"
        aria-label={`Desired room feelings. Choose up to ${MAX}.`}
        style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}
      >
        {FEELINGS.map((f) => (
          <TapCard
            key={f.id}
            type="illustrated"
            label={f.label}
            detail={f.description}
            appLabel={appTitles(f.appIds)}
            selected={selected.has(f.id)}
            onClick={() => toggle(f.id)}
            maxSelect={MAX}
            disabled={!selected.has(f.id) && selected.size >= MAX}
            labelStyle={bigLabel}
          />
        ))}
      </div>
    </StepShell>
  )
}

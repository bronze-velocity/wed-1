'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import OptionalFreeform from '../ui/OptionalFreeform'
import StepShell from '../ui/StepShell'
import { GUESTS, appTitles } from '@/lib/moodboard/config'

export default function StepGuests({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.guests ?? []))
  const [freeform, setFreeform] = useState(initialValues?.guestFreeform ?? '')

  function toggle(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    onDraftChange?.({ guests: Array.from(next), guestFreeform: freeform })
  }

  return (
    <StepShell
      stepLabel="Step 2 of 6"
      title="Which description sounds most like your guests?"
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() =>
              onNext({ guests: Array.from(selected), guestFreeform: freeform })
            }
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            That's our crowd →
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div
          className="moodboard-option-grid"
          role="group"
          aria-label="Guest descriptions"
          style={{
            display: 'grid',
            gap: 'var(--space-3)',
          }}
        >
          {GUESTS.map((g) => (
            <TapCard
              key={g.id}
              type="illustrated"
              label={g.label}
              detail={g.description}
              appLabel={appTitles(g.appIds)}
              selected={selected.has(g.id)}
              onClick={() => toggle(g.id)}
            />
          ))}
        </div>

        <OptionalFreeform
          triggerLabel="Describe your guest list in one sentence"
          label="Describe your guest list in one sentence"
          hint="My college friends, her enormous Italian family, and 40 people I've never met"
          value={freeform}
          onChange={(value) => {
            setFreeform(value)
            onDraftChange?.({ guests: Array.from(selected), guestFreeform: value })
          }}
        />
      </div>
    </StepShell>
  )
}

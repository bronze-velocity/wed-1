'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import CustomEntryPills from '../ui/CustomEntryPills'
import { GUESTS, customEntriesFor } from '@/lib/moodboard/config'

const CUSTOM_MAX = 2

function initialCustomEntries(initialValues) {
  const existing = customEntriesFor(initialValues, 'guests')
  if (existing.length) return existing
  const legacy = initialValues?.guestFreeform?.trim()
  if (legacy) return [{ id: 'custom-guest-1', text: legacy.slice(0, 120) }]
  return []
}

export default function StepGuests({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.guests ?? []))
  const [customEntries, setCustomEntries] = useState(() => initialCustomEntries(initialValues))

  function toggle(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    onDraftChange?.({ guests: Array.from(next) })
  }

  function handleCustomChange(entries) {
    const trimmed = entries.slice(0, CUSTOM_MAX)
    setCustomEntries(trimmed)
    onDraftChange?.({ customEntries: { guests: trimmed }, guestFreeform: '' })
  }

  return (
    <StepShell
      stepLabel="Step 2 of 6"
      title="Which description sounds most like your guests?"
      subtitle="Pick what fits — or add your own"
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() =>
              onNext({
                guests: Array.from(selected),
                customEntries: { guests: customEntries },
                guestFreeform: '',
              })
            }
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            That's our crowd →
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
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
              icon={g.emoji}
              label={g.label}
              detail={g.description}
              selected={selected.has(g.id)}
              onClick={() => toggle(g.id)}
            />
          ))}
        </div>

        <CustomEntryPills
          entries={customEntries}
          onChange={handleCustomChange}
          placeholder="Something specific — e.g. 'four generations dancing'"
          idPrefix="custom-guest"
          max={CUSTOM_MAX}
          charCap={120}
        />
      </div>
    </StepShell>
  )
}

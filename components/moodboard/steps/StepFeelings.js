'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import CustomEntryPills from '../ui/CustomEntryPills'
import { FEELINGS, customEntriesFor } from '@/lib/moodboard/config'

const MAX = 2
const CUSTOM_MAX = 2

const bigLabel = { fontSize: 'var(--text-body)', fontWeight: 700 }

export default function StepFeelings({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.feelings ?? []))
  const [customEntries, setCustomEntries] = useState(customEntriesFor(initialValues, 'feelings'))

  const totalSelected = selected.size + customEntries.length

  function toggle(id) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else if (totalSelected < MAX) {
      next.add(id)
    }
    setSelected(next)
    onDraftChange?.({ feelings: Array.from(next) })
  }

  function handleCustomChange(entries) {
    const trimmed = entries.slice(0, CUSTOM_MAX)
    setCustomEntries(trimmed)
    onDraftChange?.({ customEntries: { feelings: trimmed } })
  }

  return (
    <StepShell
      stepLabel="Step 4 of 7"
      title="What should the room feel like?"
      subtitle={`Pick up to ${MAX} — or say it in your words`}
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
                feelings: Array.from(selected),
                customEntries: { feelings: customEntries },
              })
            }
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            That's what we want →
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          className="moodboard-option-grid"
          role="group"
          aria-label={`Desired room feelings. Choose up to ${MAX}.`}
          style={{
            display: 'grid',
            gap: 'var(--space-3)',
          }}
        >
          {FEELINGS.map((f) => {
            return (
              <TapCard
                key={f.id}
                type="illustrated"
                icon={f.emoji}
                label={f.label}
                detail={f.description}
                selected={selected.has(f.id)}
                onClick={() => toggle(f.id)}
                maxSelect={MAX}
                disabled={!selected.has(f.id) && totalSelected >= MAX}
                labelStyle={bigLabel}
              />
            )
          })}
        </div>
        <CustomEntryPills
          entries={customEntries}
          onChange={handleCustomChange}
          placeholder="A feeling we didn't list — e.g. 'quietly proud'"
          idPrefix="custom-feeling"
          max={CUSTOM_MAX}
          charCap={120}
          addCapReached={totalSelected >= MAX}
        />
      </div>
    </StepShell>
  )
}

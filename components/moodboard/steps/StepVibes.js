'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import CustomEntryPills from '../ui/CustomEntryPills'
import { VIBES, customEntriesFor } from '@/lib/moodboard/config'

const MAX = 3
const CUSTOM_MAX = 2

export default function StepVibes({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.vibes ?? []))
  const [customEntries, setCustomEntries] = useState(customEntriesFor(initialValues, 'vibes'))

  const totalSelected = selected.size + customEntries.length

  function toggle(id) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else if (totalSelected < MAX) {
      next.add(id)
    }
    setSelected(next)
    onDraftChange?.({ vibes: Array.from(next) })
  }

  function handleCustomChange(entries) {
    const trimmed = entries.slice(0, CUSTOM_MAX)
    setCustomEntries(trimmed)
    onDraftChange?.({ customEntries: { vibes: trimmed } })
  }

  return (
    <StepShell
      stepLabel="Step 1 of 6"
      title="Which scene feels like the reception you want?"
      subtitle={`Pick up to ${MAX} — add your own if we missed it`}
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
                vibes: Array.from(selected),
                customEntries: { vibes: customEntries },
              })
            }
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            These feel like us →
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
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
              disabled={!selected.has(v.id) && totalSelected >= MAX}
              priority={i < 2}
            />
          ))}
        </div>
        <CustomEntryPills
          entries={customEntries}
          onChange={handleCustomChange}
          placeholder="Say it in your words — e.g. 'a Nora Ephron scene'"
          idPrefix="custom-vibe"
          max={CUSTOM_MAX}
          addCapReached={totalSelected >= MAX}
        />
      </div>
    </StepShell>
  )
}

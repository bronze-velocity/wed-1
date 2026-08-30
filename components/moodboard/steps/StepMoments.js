'use client'

import { useState } from 'react'
import { Martini, Utensils, Sparkles, Music, Moon } from 'lucide-react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'
import CustomEntryPills from '../ui/CustomEntryPills'
import { MOMENTS, customEntriesFor } from '@/lib/moodboard/config'

const CUSTOM_MAX = 2

const MOMENT_ICONS = {
  cocktail: Martini,
  dinner: Utensils,
  'after-dinner': Sparkles,
  dancing: Music,
  'late-night': Moon,
}

export default function StepMoments({ onNext, onBack, initialValues, onDraftChange }) {
  const [selected, setSelected] = useState(new Set(initialValues?.moments ?? []))
  const [customEntries, setCustomEntries] = useState(customEntriesFor(initialValues, 'moments'))

  function toggle(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    onDraftChange?.({ moments: Array.from(next) })
  }

  function handleCustomChange(entries) {
    const trimmed = entries.slice(0, CUSTOM_MAX)
    setCustomEntries(trimmed)
    onDraftChange?.({ customEntries: { moments: trimmed } })
  }

  return (
    <StepShell
      stepLabel="Step 3 of 6"
      title="When should this experience earn its place?"
      subtitle="Select any that fit your timeline — or add a moment we missed"
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
                moments: Array.from(selected),
                customEntries: { moments: customEntries },
              })
            }
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Those are our moments →
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div role="group" aria-label="Reception moments" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {MOMENTS.map((m) => {
            const Icon = MOMENT_ICONS[m.id]
            return (
              <TapCard
                key={m.id}
                type="illustrated"
                icon={Icon ? <Icon size={24} strokeWidth={2} /> : undefined}
                label={m.label}
                detail={m.description}
                selected={selected.has(m.id)}
                onClick={() => toggle(m.id)}
              />
            )
          })}
        </div>
        <CustomEntryPills
          entries={customEntries}
          onChange={handleCustomChange}
          placeholder="A moment we didn't list — e.g. 'walk from ceremony to reception'"
          idPrefix="custom-moment"
          max={CUSTOM_MAX}
        />
      </div>
    </StepShell>
  )
}

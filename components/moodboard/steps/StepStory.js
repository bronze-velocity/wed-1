'use client'

import { useState } from 'react'
import FreeformField from '../ui/FreeformField'
import StepShell from '../ui/StepShell'
import { STORY_QUESTIONS } from '@/lib/moodboard/config'

function preview(text) {
  const trimmed = text.trim()
  if (trimmed.length <= 60) return trimmed
  return trimmed.slice(0, 57).trimEnd() + '…'
}

export default function StepStory({ onNext, onBack, initialValues, onDraftChange, directionIds = [] }) {
  const [story, setStory] = useState(initialValues?.story ?? {})
  const [openKey, setOpenKey] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [questions] = useState(() => [...STORY_QUESTIONS].sort((a, b) => {
    const aAnswered = initialValues?.story?.[a.key]?.trim() ? 1 : 0
    const bAnswered = initialValues?.story?.[b.key]?.trim() ? 1 : 0
    if (aAnswered !== bAnswered) return bAnswered - aAnswered
    const aFit = a.appIds.some((id) => directionIds.includes(id)) ? 1 : 0
    const bFit = b.appIds.some((id) => directionIds.includes(id)) ? 1 : 0
    return bFit - aFit
  }))

  const answeredCount = Object.values(story).filter((v) => v?.trim()).length
  const visibleQuestions = showAll ? questions : questions.slice(0, 3)

  function toggle(key) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  function submit() {
    onNext({ story })
  }

  return (
    <StepShell
      stepLabel="Step 5 of 6"
      title="What could make this unmistakably yours?"
      subtitle="We picked the prompts most useful for your directions. Even one answer helps."
      cta={
        <div className="moodboard-cta">
          <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
            ←
          </button>
          <button onClick={submit} className="btn btn-primary" style={{ flex: 1 }}>
            {answeredCount > 0
              ? `Almost there → (${answeredCount})`
              : 'Skip this step →'}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {visibleQuestions.map((q) => {
          const value = story[q.key] ?? ''
          const isOpen = openKey === q.key
          const isAnswered = value.trim().length > 0
          return (
            <div
              key={q.key}
              style={{
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: `1.5px solid ${
                  isOpen
                    ? 'var(--color-accent)'
                    : isAnswered
                    ? 'var(--color-accent-light)'
                    : 'transparent'
                }`,
                transition: 'border-color 200ms ease',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(q.key)}
                aria-expanded={isOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  width: '100%',
                  padding: 'var(--space-4)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {q.chip}
                  </span>
                  {isAnswered && !isOpen && (
                    <span
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--color-text-secondary)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      &ldquo;{preview(value)}&rdquo;
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isAnswered
                      ? 'var(--color-accent)'
                      : 'transparent',
                    color: isAnswered ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'background 200ms ease',
                  }}
                >
                  {isAnswered ? '✓' : isOpen ? '–' : '+'}
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '0 var(--space-4) var(--space-4)',
                    animation: 'briefEntryIn 220ms ease-out',
                  }}
                >
                  <FreeformField
                    label={q.label}
                    hint={q.hint}
                    value={value}
                    onChange={(val) => {
                      const next = { ...story, [q.key]: val }
                      setStory(next)
                      onDraftChange?.({ story: next })
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
        {!showAll && (
          <button type="button" className="moodboard-more-prompts" onClick={() => setShowAll(true)}>
            More prompts
          </button>
        )}
      </div>
    </StepShell>
  )
}

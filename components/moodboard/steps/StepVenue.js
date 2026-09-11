'use client'

import { useMemo, useState } from 'react'
import StepShell from '../ui/StepShell'
import { VENUE_QUESTIONS } from '@/lib/moodboard/venueConstraints'

const TONE = {
  yes: {
    border: 'var(--color-green)',
    bg: 'color-mix(in srgb, var(--color-green) 12%, transparent)',
    color: 'var(--color-text-primary)',
  },
  maybe: {
    border: 'var(--color-amber)',
    bg: 'color-mix(in srgb, var(--color-amber) 14%, transparent)',
    color: 'var(--color-text-primary)',
  },
  ambient: {
    border: 'var(--color-amber)',
    bg: 'color-mix(in srgb, var(--color-amber) 14%, transparent)',
    color: 'var(--color-text-primary)',
  },
  no: {
    border: 'var(--color-border-strong)',
    bg: 'var(--color-bg-subtle)',
    color: 'var(--color-text-secondary)',
  },
}

function VenueRow({ question, value, onChange }) {
  const [showWhy, setShowWhy] = useState(false)

  return (
    <section
      style={{
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-subtle)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        border: value ? '1.5px solid var(--color-accent-light)' : '1.5px solid transparent',
        transition: 'border-color 200ms ease',
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3
            style={{
              fontSize: 'var(--text-body-lg)',
              fontWeight: 700,
              lineHeight: 1.3,
              margin: 0,
              color: 'var(--color-text-primary)',
            }}
          >
            {question.label}
          </h3>
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            aria-expanded={showWhy}
            aria-label={showWhy ? 'Hide reason' : 'Why we ask'}
            style={{
              flexShrink: 0,
              width: 22,
              height: 22,
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border-strong)',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              lineHeight: 1,
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            ?
          </button>
        </div>
        <p style={{ margin: 0, fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {question.detail}
        </p>
        {showWhy && (
          <p
            style={{
              margin: 'var(--space-2) 0 0',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              padding: 'var(--space-3)',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {question.why}
          </p>
        )}
      </header>
      <div
        role="radiogroup"
        aria-label={question.label}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-2)',
        }}
      >
        {question.answerKeys.map((key) => {
          const selected = value === key
          const tone = selected ? TONE[key] : null
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(question.id, key)}
              style={{
                padding: 'var(--space-3) var(--space-2)',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${tone?.border ?? 'var(--color-border)'}`,
                background: tone?.bg ?? 'var(--color-bg)',
                color: tone?.color ?? 'var(--color-text-primary)',
                fontFamily: 'inherit',
                fontSize: 'var(--text-body-sm)',
                fontWeight: selected ? 700 : 600,
                cursor: 'pointer',
                textAlign: 'center',
                lineHeight: 1.3,
                minHeight: 44,
                transition: 'background 160ms ease, border-color 160ms ease',
              }}
            >
              {question.answers[key]}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default function StepVenue({ onNext, onBack, initialValues, onDraftChange }) {
  const [venue, setVenue] = useState(initialValues?.venue ?? {})

  function handleChange(id, value) {
    const next = { ...venue }
    if (next[id] === value) {
      delete next[id]
    } else {
      next[id] = value
    }
    setVenue(next)
    onDraftChange?.({ venue: next })
  }

  const answered = useMemo(
    () => VENUE_QUESTIONS.filter((q) => venue[q.id]).length,
    [venue]
  )
  const total = VENUE_QUESTIONS.length
  const summary = answered === 0
    ? "Skip anything you don't know yet."
    : answered < total
    ? `${answered} of ${total} answered.`
    : "All set."

  return (
    <StepShell
      stepLabel="Step 6 of 7 · Reality check"
      title="Your room."
      subtitle="So we only show you apps that'll actually work at your reception."
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: '0 0 auto' }}>
              ←
            </button>
          )}
          <button
            type="button"
            onClick={() => onNext({ venue })}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {answered === 0 ? 'Skip this →' : 'Continue →'}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {summary}
        </p>
        {VENUE_QUESTIONS.map((question) => (
          <VenueRow
            key={question.id}
            question={question}
            value={venue[question.id] ?? null}
            onChange={handleChange}
          />
        ))}
      </div>
    </StepShell>
  )
}

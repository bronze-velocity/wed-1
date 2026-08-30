'use client'

import { useState } from 'react'
import StepShell from '../ui/StepShell'
import CustomEntryPills from '../ui/CustomEntryPills'
import {
  VIBES,
  GUESTS,
  MOMENTS,
  FEELINGS,
  STORY_QUESTIONS,
  customEntriesFor,
} from '@/lib/moodboard/config'

const FINAL_NOTES_MAX = 3
const FINAL_NOTES_CAP = 200

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function CannedPill({ label, detail, icon, onRemove }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: '8px 6px 8px 12px',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid var(--color-border)',
        background: 'var(--color-bg-subtle)',
        color: 'var(--color-text-primary)',
        fontSize: 'var(--text-body-sm)',
        fontWeight: 600,
        lineHeight: 1.3,
        maxWidth: '100%',
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
        {detail && (
          <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)', marginLeft: 6 }}>
            · {detail}
          </span>
        )}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove "${label}"`}
          title="Remove"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            padding: 0,
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-full)',
          }}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  )
}

function GroupPanel({ title, stepIndex, onJumpTo, isEmpty, emptyLabel, children }) {
  return (
    <section
      style={{
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-subtle)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 'var(--space-3)',
        }}
      >
        <h3 style={{ fontSize: 'var(--text-body-lg)', fontWeight: 700, margin: 0 }}>{title}</h3>
        <button
          type="button"
          onClick={() => onJumpTo(stepIndex)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: 'inherit',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            color: 'var(--color-accent)',
            cursor: 'pointer',
          }}
        >
          {isEmpty ? 'Fill it in ↗' : 'Edit in step ↗'}
        </button>
      </header>
      {isEmpty ? (
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-body-sm)' }}>
          {emptyLabel ?? 'You skipped this step.'}
        </p>
      ) : (
        children
      )}
    </section>
  )
}

export default function StepReview({
  onNext,
  onBack,
  initialValues,
  onDraftChange,
  onJumpTo,
}) {
  const answers = initialValues ?? {}
  const [vibes, setVibes] = useState(new Set(answers.vibes ?? []))
  const [guests, setGuests] = useState(new Set(answers.guests ?? []))
  const [moments, setMoments] = useState(new Set(answers.moments ?? []))
  const [feelings, setFeelings] = useState(new Set(answers.feelings ?? []))
  const [story, setStory] = useState(answers.story ?? {})

  const [customVibes, setCustomVibes] = useState(customEntriesFor(answers, 'vibes'))
  const [customGuests, setCustomGuests] = useState(customEntriesFor(answers, 'guests'))
  const [customMoments, setCustomMoments] = useState(customEntriesFor(answers, 'moments'))
  const [customFeelings, setCustomFeelings] = useState(customEntriesFor(answers, 'feelings'))
  const [finalNotes, setFinalNotes] = useState(customEntriesFor(answers, 'finalNotes'))

  const [expandedStoryKey, setExpandedStoryKey] = useState(null)
  const [showSkippedStory, setShowSkippedStory] = useState(false)

  function pushDraft(patch) {
    onDraftChange?.(patch)
  }

  function updateCustom(bucket, next, setter) {
    setter(next)
    pushDraft({
      customEntries: {
        vibes: bucket === 'vibes' ? next : customVibes,
        guests: bucket === 'guests' ? next : customGuests,
        moments: bucket === 'moments' ? next : customMoments,
        feelings: bucket === 'feelings' ? next : customFeelings,
        finalNotes: bucket === 'finalNotes' ? next : finalNotes,
      },
    })
  }

  function removeCanned(bucket, id) {
    if (bucket === 'vibes') {
      const next = new Set(vibes)
      next.delete(id)
      setVibes(next)
      pushDraft({ vibes: [...next] })
    } else if (bucket === 'guests') {
      const next = new Set(guests)
      next.delete(id)
      setGuests(next)
      pushDraft({ guests: [...next] })
    } else if (bucket === 'moments') {
      const next = new Set(moments)
      next.delete(id)
      setMoments(next)
      pushDraft({ moments: [...next] })
    } else if (bucket === 'feelings') {
      const next = new Set(feelings)
      next.delete(id)
      setFeelings(next)
      pushDraft({ feelings: [...next] })
    }
  }

  function editStory(key, value) {
    const next = { ...story, [key]: value }
    setStory(next)
    pushDraft({ story: next })
  }

  function removeStory(key) {
    const next = { ...story }
    delete next[key]
    setStory(next)
    pushDraft({ story: next })
    if (expandedStoryKey === key) setExpandedStoryKey(null)
  }

  const answeredStory = STORY_QUESTIONS.filter((q) => story?.[q.key]?.trim())
  const skippedStory = STORY_QUESTIONS.filter((q) => !story?.[q.key]?.trim())

  const totalSignal =
    vibes.size + guests.size + moments.size + feelings.size +
    answeredStory.length +
    customVibes.length + customGuests.length + customMoments.length +
    customFeelings.length + finalNotes.length

  function submit() {
    onNext({
      vibes: [...vibes],
      guests: [...guests],
      moments: [...moments],
      feelings: [...feelings],
      story,
      customEntries: {
        vibes: customVibes,
        guests: customGuests,
        moments: customMoments,
        feelings: customFeelings,
        finalNotes,
      },
    })
  }

  return (
    <StepShell
      stepLabel="Step 6 of 6 · Your brief"
      title="Everything you told us."
      subtitle="This is what we're about to read. Edit anything in place, or jump back to a step. When you're ready, we'll find your apps."
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: '0 0 auto' }}>
              ←
            </button>
          )}
          <button
            onClick={submit}
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={totalSignal === 0}
          >
            {totalSignal === 0 ? 'Add at least one thing' : 'Find our apps →'}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <GroupPanel
          title="Scene"
          stepIndex={0}
          onJumpTo={onJumpTo}
          isEmpty={vibes.size === 0 && customVibes.length === 0}
          emptyLabel="You didn't pick a scene."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {[...vibes].map((id) => {
              const item = VIBES.find((v) => v.id === id)
              if (!item) return null
              return <CannedPill key={id} label={item.label} onRemove={() => removeCanned('vibes', id)} />
            })}
          </div>
          <CustomEntryPills
            entries={customVibes}
            onChange={(next) => updateCustom('vibes', next.slice(0, 2), setCustomVibes)}
            placeholder="Say it in your words"
            idPrefix="custom-vibe"
            max={2}
          />
        </GroupPanel>

        <GroupPanel
          title="Guests"
          stepIndex={1}
          onJumpTo={onJumpTo}
          isEmpty={guests.size === 0 && customGuests.length === 0}
          emptyLabel="You didn't describe your crowd."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {[...guests].map((id) => {
              const item = GUESTS.find((g) => g.id === id)
              if (!item) return null
              return (
                <CannedPill
                  key={id}
                  icon={item.emoji}
                  label={item.label}
                  onRemove={() => removeCanned('guests', id)}
                />
              )
            })}
          </div>
          <CustomEntryPills
            entries={customGuests}
            onChange={(next) => updateCustom('guests', next.slice(0, 2), setCustomGuests)}
            placeholder="Something specific about your people"
            idPrefix="custom-guest"
            max={2}
            charCap={120}
          />
        </GroupPanel>

        <GroupPanel
          title="Moments"
          stepIndex={2}
          onJumpTo={onJumpTo}
          isEmpty={moments.size === 0 && customMoments.length === 0}
          emptyLabel="You didn't pick a moment."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {[...moments].map((id) => {
              const item = MOMENTS.find((m) => m.id === id)
              if (!item) return null
              return <CannedPill key={id} label={item.label} onRemove={() => removeCanned('moments', id)} />
            })}
          </div>
          <CustomEntryPills
            entries={customMoments}
            onChange={(next) => updateCustom('moments', next.slice(0, 2), setCustomMoments)}
            placeholder="A moment we didn't list"
            idPrefix="custom-moment"
            max={2}
          />
        </GroupPanel>

        <GroupPanel
          title="Feeling"
          stepIndex={3}
          onJumpTo={onJumpTo}
          isEmpty={feelings.size === 0 && customFeelings.length === 0}
          emptyLabel="You didn't pick a feeling."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {[...feelings].map((id) => {
              const item = FEELINGS.find((f) => f.id === id)
              if (!item) return null
              return <CannedPill key={id} label={item.label} onRemove={() => removeCanned('feelings', id)} />
            })}
          </div>
          <CustomEntryPills
            entries={customFeelings}
            onChange={(next) => updateCustom('feelings', next.slice(0, 2), setCustomFeelings)}
            placeholder="A feeling we didn't list"
            idPrefix="custom-feeling"
            max={2}
            charCap={120}
          />
        </GroupPanel>

        <GroupPanel
          title="Your story"
          stepIndex={4}
          onJumpTo={onJumpTo}
          isEmpty={answeredStory.length === 0}
          emptyLabel="You didn't leave any story details."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {answeredStory.map((q) => {
              const value = story[q.key] ?? ''
              const isExpanded = expandedStoryKey === q.key
              return (
                <div
                  key={q.key}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg)',
                    padding: 'var(--space-3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700 }}>{q.chip}</span>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        type="button"
                        onClick={() => setExpandedStoryKey(isExpanded ? null : q.key)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontFamily: 'inherit',
                          fontSize: 'var(--text-tiny)',
                          fontWeight: 700,
                          color: 'var(--color-accent)',
                          cursor: 'pointer',
                        }}
                      >
                        {isExpanded ? 'Done' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStory(q.key)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontFamily: 'inherit',
                          fontSize: 'var(--text-tiny)',
                          fontWeight: 700,
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {isExpanded ? (
                    <textarea
                      value={value}
                      onChange={(e) => editStory(q.key, e.target.value.slice(0, 500))}
                      autoFocus
                      rows={3}
                      maxLength={500}
                      style={{
                        width: '100%',
                        fontFamily: 'inherit',
                        fontSize: 'var(--text-body-sm)',
                        padding: 'var(--space-2)',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--color-accent)',
                        background: 'var(--color-bg-subtle)',
                        color: 'var(--color-text-primary)',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>
                      &ldquo;{value}&rdquo;
                    </p>
                  )}
                </div>
              )
            })}
            {skippedStory.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSkippedStory((v) => !v)}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: 'inherit',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  cursor: 'pointer',
                }}
              >
                {showSkippedStory ? 'Hide' : 'Show'} {skippedStory.length} skipped story prompt{skippedStory.length === 1 ? '' : 's'}
              </button>
            )}
            {showSkippedStory && skippedStory.length > 0 && (
              <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', color: 'var(--color-text-muted)', fontSize: 'var(--text-body-sm)' }}>
                {skippedStory.map((q) => (
                  <li key={q.key}>{q.chip}</li>
                ))}
              </ul>
            )}
          </div>
        </GroupPanel>

        <section
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-subtle)',
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <header>
            <h3 style={{ fontSize: 'var(--text-body-lg)', fontWeight: 700, margin: 0 }}>Anything else</h3>
            <p style={{ margin: 'var(--space-1) 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>
              Anything else you want to add to see your suitable apps?
            </p>
          </header>
          <CustomEntryPills
            entries={finalNotes}
            onChange={(next) => updateCustom('finalNotes', next.slice(0, FINAL_NOTES_MAX), setFinalNotes)}
            placeholder="e.g. 'her grandfather is 96 — likely his last big trip'"
            idPrefix="custom-note"
            max={FINAL_NOTES_MAX}
            charCap={FINAL_NOTES_CAP}
            addLabel="Add a note"
          />
        </section>

        <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', textAlign: 'center', margin: 'var(--space-2) 0 0' }}>
          We'll read everything you wrote — your picks, your own words, and your story — and come back with a shortlist in a few seconds.
        </p>
      </div>
    </StepShell>
  )
}

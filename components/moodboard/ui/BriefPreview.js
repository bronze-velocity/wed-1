'use client'

import { useState } from 'react'
import { buildMoodboardDirections } from '@/lib/moodboard/directions'
import { APP_DIRECTIONS, MOMENTS } from '@/lib/moodboard/config'
import { buildMoodboardInsights } from '../lib/insights'

function DirectionRow({ direction, onSave, onReject }) {
  return (
    <article className="moodboard-direction" data-saved={direction.saved || undefined}>
      <div>
        <p className="moodboard-direction-title">{direction.title}</p>
        <p className="moodboard-direction-description">{direction.description}</p>
      </div>
      <div className="moodboard-direction-actions">
        <button type="button" aria-pressed={direction.saved} onClick={() => onSave(direction.id)}>
          {direction.saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" onClick={() => onReject(direction.id)}>Not for us</button>
      </div>
    </article>
  )
}

function DirectionContent({ answers, step, directions, onSave, onReject, onRestore }) {
  const { commentary, fits, flags } = buildMoodboardInsights(answers, step)
  const momentTags = (answers.moments ?? [])
    .map((id) => MOMENTS.find((item) => item.id === id)?.label)
    .filter(Boolean)
  const rejected = (answers.directionPreferences?.rejected ?? [])
    .map((id) => ({ id, ...APP_DIRECTIONS[id] }))
    .filter((item) => item.title)

  if (!directions.length) {
    return (
      <div className="moodboard-directions-content">
        <p className="moodboard-directions-empty">
          Pick a first instinct. Plausible app directions will appear here.
        </p>
        {rejected.length > 0 && (
          <div className="moodboard-rejected-list">
            {rejected.map((item) => (
              <button type="button" key={item.id} onClick={() => onRestore(item.id)}>
                Restore {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="moodboard-directions-content">
      {momentTags.length > 0 && (
        <div className="moodboard-direction-tags" aria-label="Selected moments">
          {momentTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      )}
      <div className="moodboard-direction-list">
        {directions.map((direction) => (
          <DirectionRow
            key={direction.id}
            direction={direction}
            onSave={onSave}
            onReject={onReject}
          />
        ))}
      </div>
      {(commentary || fits.length > 0 || flags.length > 0) && (
        <details className="moodboard-direction-details">
          <summary>Why these directions</summary>
          {commentary && <p>{commentary}</p>}
          {fits.length > 0 && <p><strong>Green light:</strong> {fits[0]}</p>}
          {flags.length > 0 && <p><strong>We would avoid:</strong> {flags[0]}</p>}
        </details>
      )}
      {rejected.length > 0 && (
        <details className="moodboard-direction-details">
          <summary>Ruled out ({rejected.length})</summary>
          <div className="moodboard-rejected-list">
            {rejected.map((item) => (
              <button type="button" key={item.id} onClick={() => onRestore(item.id)}>
                Restore {item.title}
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

export default function BriefPreview({ answers, step, onPreferencesChange }) {
  const [expanded, setExpanded] = useState(false)
  const directions = buildMoodboardDirections(answers)
  const strongest = directions[0]

  function updatePreference(id, kind) {
    const current = answers.directionPreferences ?? { saved: [], rejected: [] }
    const saved = new Set(current.saved ?? [])
    const rejected = new Set(current.rejected ?? [])

    if (kind === 'saved') {
      saved.has(id) ? saved.delete(id) : saved.add(id)
      rejected.delete(id)
    } else {
      kind === 'rejected' ? rejected.add(id) : rejected.delete(id)
      saved.delete(id)
    }

    onPreferencesChange({ saved: [...saved], rejected: [...rejected] })
  }

  const content = (
    <DirectionContent
      answers={answers}
      step={step}
      directions={directions}
      onSave={(id) => updatePreference(id, 'saved')}
      onReject={(id) => updatePreference(id, 'rejected')}
      onRestore={(id) => updatePreference(id, 'restore')}
    />
  )

  return (
    <>
      <div className="moodboard-directions-mobile lg:hidden">
        <button
          type="button"
          className="moodboard-directions-trigger"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls="moodboard-directions-sheet"
        >
          <span>
            <strong>Directions{directions.length ? ` · ${directions.length}` : ''}</strong>
            {strongest && <small>{strongest.title}</small>}
          </span>
          <span aria-hidden="true">{expanded ? '\u2193' : '\u2191'}</span>
        </button>
        {expanded && (
          <div id="moodboard-directions-sheet" className="moodboard-directions-sheet">
            {content}
          </div>
        )}
      </div>

      <aside className="moodboard-directions-desktop hidden lg:block" aria-label="Directions so far">
        <p className="moodboard-directions-eyebrow">Directions so far</p>
        <h2>What fits your room</h2>
        {content}
      </aside>
    </>
  )
}

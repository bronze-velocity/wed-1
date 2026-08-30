'use client'

import { useState } from 'react'
import { buildMoodboardDirections } from '@/lib/moodboard/directions'
import { APP_DIRECTIONS, allCustomEntries } from '@/lib/moodboard/config'

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  )
}

function DirectionRow({ direction, onSave, onReject }) {
  const [showAllPills, setShowAllPills] = useState(false)
  const pills = (direction.contributors ?? []).filter((c) => c.group !== 'saved')
  const visiblePills = showAllPills ? pills : pills.slice(0, 5)
  const hiddenCount = pills.length - 5
  return (
    <article className="moodboard-direction" data-saved={direction.saved || undefined}>
      <div className="moodboard-direction-icons">
        <button
          type="button"
          className="moodboard-direction-icon"
          data-active={direction.saved || undefined}
          aria-pressed={direction.saved}
          aria-label={direction.saved ? 'Remove from saved' : 'Save'}
          title={direction.saved ? 'Remove from saved' : 'Save'}
          onClick={() => onSave(direction.id)}
        >
          <HeartIcon filled={direction.saved} />
        </button>
        <button
          type="button"
          className="moodboard-direction-icon"
          aria-label="Not for us"
          title="Not for us"
          onClick={() => onReject(direction.id)}
        >
          <TrashIcon />
        </button>
        <a
          className="moodboard-direction-icon"
          href={`/apps/${direction.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${direction.title} page in a new tab`}
          title="Open app page in new tab"
        >
          <ExternalLinkIcon />
        </a>
      </div>
      <div>
        <p className="moodboard-direction-title">{direction.title}</p>
        <p className="moodboard-direction-description">{direction.description}</p>
      </div>
      {pills.length > 0 && (
        <ul className="moodboard-direction-pills" aria-label="Why this appears">
          {visiblePills.map((c, i) => (
            <li key={`${c.group}-${c.label}-${i}`} data-group={c.group}>
              {c.emoji && <span className="moodboard-direction-pill-emoji" aria-hidden="true">{c.emoji}</span>}
              {c.label}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="moodboard-direction-pill-more">
              <button
                type="button"
                onClick={() => setShowAllPills((v) => !v)}
                aria-expanded={showAllPills}
                aria-label={showAllPills ? 'Show fewer' : `Show ${hiddenCount} more`}
              >
                {showAllPills ? 'Show less' : `+${hiddenCount} more`}
              </button>
            </li>
          )}
        </ul>
      )}
    </article>
  )
}

function YourWordsHeld({ answers }) {
  const groups = allCustomEntries(answers)
  const totalCount = groups.reduce((sum, g) => sum + g.entries.length, 0)
  const hasWords = totalCount > 0
  return (
    <div
      aria-label={hasWords ? `In your words (${totalCount})` : 'Preview note'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginBottom: 'var(--space-4)',
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <span
        style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
        }}
      >
        {hasWords
          ? `Your words, saved (${totalCount}) — they'll shape the final brief on the last step.`
          : "Draft — your own words shape the final brief on the last step."}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
      {groups.flatMap((g) =>
        g.entries.slice(0, 6).map((entry) => (
          <span
            key={entry.id}
            title={`${g.label}: ${entry.text}`}
            style={{
              fontSize: 'var(--text-tiny)',
              color: 'var(--color-text-secondary)',
              maxWidth: 240,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{g.label}:</span>{' '}
            <span style={{ fontStyle: 'italic' }}>“{entry.text}”</span>
          </span>
        ))
      )}
        {totalCount > 6 && (
          <span style={{ fontSize: 'var(--text-tiny)', color: 'var(--color-text-muted)' }}>
            +{totalCount - 6} more
          </span>
        )}
      </div>
    </div>
  )
}

function DirectionContent({ answers, directions, onSave, onReject, onRestore }) {
  const rejected = (answers.directionPreferences?.rejected ?? [])
    .map((id) => ({ id, ...APP_DIRECTIONS[id] }))
    .filter((item) => item.title)

  if (!directions.length) {
    return (
      <div className="moodboard-directions-content">
      <YourWordsHeld answers={answers} />
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
      
      <YourWordsHeld answers={answers} />
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
        <h2>Directions so far</h2>
        {content}
      </aside>
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import PhoneScene from '@/components/appui/PhoneScene'
import { getAppBySlug } from '@/lib/getApps'
import { COUPLE_DEFAULT } from '@/lib/couple'
import { roomPayoffFor, personalReasonFor } from '@/lib/moodboard/personalization'

function firstSentence(value) {
  const match = value?.match(/^.*?[.!?](?:\s|$)/)
  return match?.[0]?.trim() ?? value
}

function rankLabel(index, total) {
  if (total <= 1) return 'Your fit'
  if (index === 0) return 'Best fit'
  if (index === 1) return 'Strong fit'
  return 'Worth a look'
}

const FIT_CHIP_STYLES = {
  clean: {
    background: 'color-mix(in srgb, var(--color-green) 15%, transparent)',
    color: 'var(--color-text-primary)',
    border: 'color-mix(in srgb, var(--color-green) 50%, transparent)',
  },
  tweak: {
    background: 'color-mix(in srgb, var(--color-amber) 18%, transparent)',
    color: 'var(--color-text-primary)',
    border: 'color-mix(in srgb, var(--color-amber) 55%, transparent)',
  },
  modified: {
    background: 'var(--color-bg-subtle)',
    color: 'var(--color-text-primary)',
    border: 'var(--color-border-strong)',
  },
}

function VenueFitChip({ fit }) {
  const [open, setOpen] = useState(false)
  if (!fit) return null
  const style = FIT_CHIP_STYLES[fit.tone] ?? FIT_CHIP_STYLES.clean
  const hasNotes = fit.notes?.length > 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
      <button
        type="button"
        onClick={() => hasNotes && setOpen((v) => !v)}
        aria-expanded={hasNotes ? open : undefined}
        disabled={!hasNotes}
        style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${style.border}`,
          background: style.background,
          color: style.color,
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          cursor: hasNotes ? 'pointer' : 'default',
          fontFamily: 'inherit',
          lineHeight: 1.2,
        }}
      >
        <span>{fit.label}</span>
        {hasNotes && <span aria-hidden="true">{open ? '−' : '+'}</span>}
      </button>
      {open && hasNotes && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: style.background,
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${style.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-secondary)',
            }}
          >
            Adapted for your reception
          </p>
          {fit.notes.map((note, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1.5,
                color: 'var(--color-text-primary)',
              }}
            >
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function FitMeter({ rawScore }) {
  const strong = Math.max(1, Math.min(3, Math.ceil((rawScore ?? 0) / 6)))
  return (
    <span aria-hidden="true" className="moodboard-fit-meter">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="moodboard-fit-meter-dot"
          data-active={i < strong || undefined}
        />
      ))}
    </span>
  )
}

export default function ResultCard({ match, index, total = 3, answers, onWantThis }) {
  const [expanded, setExpanded] = useState(false)
  const app = getAppBySlug(match.appPageSlug)
  const phoneScene = app?.extended?.deviceScenes?.phone
  const roomPayoff = roomPayoffFor(match.id)
  const personal = personalReasonFor(match.id, answers)
  const aiRationale = match.personalReason?.trim() || null
  const hasStoryContent = Boolean(
    answers?.customEntries && Object.values(answers.customEntries).some((list) => Array.isArray(list) && list.length)
  )
  const showReceipt = Boolean(personal)
  const showEmptyPersonal = !personal && !aiRationale && !hasStoryContent

  return (
    <article className="moodboard-result-card" data-expanded={expanded || undefined}>
      {phoneScene && (
        <div className="moodboard-result-hero-phone">
          <div><PhoneScene scene={phoneScene} couple={COUPLE_DEFAULT} /></div>
        </div>
      )}
      <div className="moodboard-result-summary">
        <div className="moodboard-result-rank-row">
          <span className="moodboard-result-rank-pill">
            <FitMeter rawScore={match.rawScore} />
            <span>{rankLabel(index, total)}</span>
          </span>
        </div>
        <h3>{app?.title ?? match.title}</h3>
        <VenueFitChip fit={match.venueFit} />
        {aiRationale ? (
          <p className="moodboard-result-personal">{aiRationale}</p>
        ) : personal ? (
          <p className="moodboard-result-personal">
            <span>Because you picked</span> <strong>{personal.label}</strong>
          </p>
        ) : null}
        {aiRationale && showReceipt && (
          <p className="moodboard-result-receipt">
            Matched on: <strong>{personal.label}</strong>
          </p>
        )}
        {roomPayoff && !showEmptyPersonal && (
          <p className="moodboard-result-payoff">{roomPayoff}</p>
        )}
        <p>{expanded ? match.whyItFitsYou : firstSentence(match.whyItFitsYou)}</p>
        <button
          type="button"
          className="moodboard-result-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? 'Close details' : 'See how it plays'}
        </button>
      </div>

      {expanded && (
        <div className="moodboard-result-detail">
          {app?.description && (
            <div>
              <p className="moodboard-result-label">What guests do</p>
              <p>{app.description}</p>
            </div>
          )}
          <div className="moodboard-result-actions">
            <Link href={`/apps/${match.appPageSlug}`} className="btn btn-secondary">See the full page</Link>
          </div>
        </div>
      )}

      <div className="moodboard-result-cta">
        <button type="button" onClick={onWantThis} className="btn btn-primary">
          Tell us you want this
        </button>
      </div>
    </article>
  )
}

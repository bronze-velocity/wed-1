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
    (answers?.story && Object.values(answers.story).some((v) => v?.trim())) ||
    (answers?.customEntries && Object.values(answers.customEntries).some((list) => Array.isArray(list) && list.length))
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

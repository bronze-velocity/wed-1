'use client'

import { useState } from 'react'
import Link from 'next/link'
import PhoneScene from '@/components/appui/PhoneScene'
import { getAppBySlug } from '@/lib/getApps'
import { COUPLE_DEFAULT } from '@/lib/couple'

function firstSentence(value) {
  const match = value?.match(/^.*?[.!?](?:\s|$)/)
  return match?.[0]?.trim() ?? value
}

export default function ResultCard({ match, index, onWantThis }) {
  const [expanded, setExpanded] = useState(false)
  const app = getAppBySlug(match.appPageSlug)
  const phoneScene = app?.extended?.deviceScenes?.phone

  return (
    <article className="moodboard-result-card" data-expanded={expanded || undefined}>
      <div className="moodboard-result-summary">
        <p className="moodboard-result-rank">{index === 0 ? 'Best fit' : index === 1 ? 'Strong fit' : 'Worth a look'}</p>
        <h3>{app?.title ?? match.title}</h3>
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
          {phoneScene && (
            <div className="moodboard-result-phone">
              <div><PhoneScene scene={phoneScene} couple={COUPLE_DEFAULT} /></div>
            </div>
          )}
          <div className="moodboard-result-actions">
            <Link href={`/apps/${match.appPageSlug}`} className="btn btn-secondary">See the full page</Link>
            <button type="button" onClick={onWantThis} className="btn btn-primary">Tell us you want this</button>
          </div>
        </div>
      )}
    </article>
  )
}

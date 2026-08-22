'use client'

import Link from 'next/link'
import PhoneScene from '@/components/appui/PhoneScene'
import { getAppBySlug } from '@/lib/getApps'
import { COUPLE_DEFAULT } from '@/lib/couple'

export default function ResultCard({ match, index, onWantThis }) {
  const app = match.appPageSlug ? getAppBySlug(match.appPageSlug) : null
  const phoneScene = app?.extended?.deviceScenes?.phone
  const headline = app?.extended?.hero?.headline

  return (
    <div
      style={{
        background: 'var(--color-bg)',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        animation: `resultCardIn 480ms ease-out ${index * 150}ms both`,
      }}
    >
      <div
        style={{
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
        }}
      >
        {/* App name + tagline */}
        <div>
          <h3
            style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 800,
              marginBottom: 'var(--space-2)',
              lineHeight: 1.2,
            }}
          >
            {app?.title ?? match.id}
          </h3>
          {headline && (
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
              }}
            >
              {headline}
            </p>
          )}
        </div>

        {/* The magic piece — Claude's personalised explanation */}
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.65,
            color: 'var(--color-text-primary)',
            borderLeft: '3px solid var(--color-accent)',
            paddingLeft: 'var(--space-4)',
            marginLeft: 0,
          }}
        >
          {match.whyItFitsYou}
        </p>

        {/* Phone scene preview */}
        {phoneScene && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 'var(--space-4) 0',
            }}
          >
            <div style={{ width: 240 }}>
              <PhoneScene scene={phoneScene} couple={COUPLE_DEFAULT} />
            </div>
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {match.appPageSlug && (
            <Link
              href={`/apps/${match.appPageSlug}`}
              className="btn"
              style={{ fontSize: 'var(--text-body-sm)' }}
            >
              See the full page →
            </Link>
          )}
          <button
            onClick={onWantThis}
            className="btn btn-primary"
            style={{ fontSize: 'var(--text-body-sm)' }}
          >
            Tell us you want this
          </button>
        </div>
      </div>
    </div>
  )
}

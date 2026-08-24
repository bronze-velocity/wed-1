'use client'

import { useState } from 'react'
import { consentCategories, setPreferences, getConsentState } from '@/lib/consentStore'

const rowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 'var(--space-6)',
  paddingTop: 'var(--space-5)',
  paddingBottom: 'var(--space-5)',
  borderTop: '1px solid var(--color-border)',
}

function Toggle({ on, disabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={on}
      style={{
        flexShrink: 0,
        width: 44,
        height: 24,
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: on ? 'var(--color-accent)' : 'var(--color-border-strong)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        transition: `background var(--duration-fast) var(--ease-out)`,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: 'var(--radius-full)',
          background: '#fff',
          boxShadow: 'var(--shadow-xs)',
          transition: `left var(--duration-fast) var(--ease-out)`,
        }}
      />
    </button>
  )
}

export default function CookieSettings({ onClose }) {
  const [local, setLocal] = useState(getConsentState().preferences)

  const toggle = (cat) => {
    if (cat === consentCategories.ESSENTIAL) return
    setLocal((p) => ({ ...p, [cat]: !p[cat] }))
  }

  const save = () => {
    setPreferences(local)
    onClose()
  }
  const acceptAllLocal = () => {
    setPreferences({ [consentCategories.ESSENTIAL]: true, [consentCategories.ANALYTICS]: true, [consentCategories.MARKETING]: true })
    onClose()
  }
  const rejectAllLocal = () => {
    setPreferences({ [consentCategories.ESSENTIAL]: true, [consentCategories.ANALYTICS]: false, [consentCategories.MARKETING]: false })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        zIndex: 60,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: 'var(--color-bg)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: 640,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 id="cookie-settings-title" style={{ margin: 0, fontSize: 'var(--text-h4)', fontWeight: 700 }}>
            Cookie preferences
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-secondary)',
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: 'var(--space-6)' }}>
          <div style={{ ...rowStyle, borderTop: 'none', paddingTop: 0 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-body)', fontWeight: 600 }}>Essential</h3>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
                Required for the site to work — page routing, contact-form submission, and remembering your cookie choice. Always on.
              </p>
            </div>
            <Toggle on disabled label="Essential cookies always on" />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-body)', fontWeight: 600 }}>Analytics</h3>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
                Helps us see which pages and apps people actually look at so we can improve the site. Anonymous — no names, no email, no ads.
              </p>
            </div>
            <Toggle
              on={!!local[consentCategories.ANALYTICS]}
              onClick={() => toggle(consentCategories.ANALYTICS)}
              label="Toggle analytics cookies"
            />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-body)', fontWeight: 600 }}>Marketing</h3>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
                Reserved for future use. We don't run ads or retargeting today.
              </p>
            </div>
            <Toggle
              on={!!local[consentCategories.MARKETING]}
              onClick={() => toggle(consentCategories.MARKETING)}
              label="Toggle marketing cookies"
            />
          </div>
        </div>

        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'var(--color-bg-subtle)',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-5) var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            justifyContent: 'flex-end',
          }}
        >
          <button type="button" onClick={rejectAllLocal} style={secondaryBtn}>Reject all</button>
          <button type="button" onClick={acceptAllLocal} style={secondaryBtn}>Accept all</button>
          <button type="button" onClick={save} style={primaryBtn}>Save preferences</button>
        </div>
      </div>
    </div>
  )
}

const secondaryBtn = {
  padding: 'var(--space-2) var(--space-4)',
  fontSize: 'var(--text-body-sm)',
  color: 'var(--color-text-primary)',
  background: 'var(--color-bg)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontWeight: 500,
}

const primaryBtn = {
  padding: 'var(--space-2) var(--space-5)',
  fontSize: 'var(--text-body-sm)',
  color: 'var(--color-text-inverse)',
  background: 'var(--color-accent)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontWeight: 600,
}

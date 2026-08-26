'use client'

import { useEffect, useRef } from 'react'

export default function StepShell({ stepLabel, title, subtitle, children, cta }) {
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <section
      className="moodboard-shell"
    >
      <div>
        {stepLabel && (
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              fontWeight: 600,
              marginBottom: 'var(--space-2)',
            }}
          >
            {stepLabel}
          </p>
        )}
        <h1 ref={titleRef} tabIndex={-1} style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2, outline: 'none' }}>
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--space-2)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div
        className="moodboard-shell-scroll"
      >
        {children}
      </div>

      <div className="moodboard-shell-footer">{cta}</div>
    </section>
  )
}

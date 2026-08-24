'use client'

export default function StepShell({ stepLabel, title, subtitle, children, cta }) {
  return (
    <div
      style={{
        height: '100dvh',
        maxWidth: 540,
        margin: '0 auto',
        paddingTop: 'calc(var(--nav-height) + var(--space-8))',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        display: 'grid',
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
        rowGap: 'var(--space-5)',
      }}
    >
      <div>
        {stepLabel && (
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              marginBottom: 'var(--space-2)',
            }}
          >
            {stepLabel}
          </p>
        )}
        <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-2)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          minHeight: 0,
          overflowY: 'auto',
          marginInline: 'calc(var(--space-6) * -1)',
          paddingInline: 'var(--space-6)',
          paddingBottom: 'var(--space-2)',
        }}
      >
        {children}
      </div>

      <div className="moodboard-shell-footer">{cta}</div>
    </div>
  )
}

'use client'

export default function MomentBigScreen({ title, headline, subtitle, statusPill }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      textAlign: 'center',
      maxWidth: 640,
    }}>
      {title && (
        <p style={{
          fontSize: 'var(--text-label)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          margin: 0,
        }}>
          {title}
        </p>
      )}

      {statusPill && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(242,78,120,0.15)',
          border: '1px solid var(--color-rose)',
        }}>
          <span className="pulse-dot" style={{
            width: 8,
            height: 8,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-rose)',
          }} />
          <span style={{
            fontSize: 'var(--text-label)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-inverse)',
          }}>
            {statusPill}
          </span>
        </div>
      )}

      <p style={{
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontSize: 'var(--text-h2)',
        lineHeight: 1.25,
        color: 'var(--color-text-inverse)',
        margin: 0,
      }}>
        {headline}
      </p>

      {subtitle && (
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-inverse-secondary)',
          margin: 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

'use client'

export default function FeedBigScreen({ title, quote, attribution, subtitle, footer }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      textAlign: 'center',
      maxWidth: 720,
    }}>
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

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        maxWidth: 240,
      }}>
        <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        <span aria-hidden="true" style={{ color: 'var(--color-gold)', fontSize: 16 }}>❦</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
      </div>

      <p style={{
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontSize: 'var(--text-h2)',
        lineHeight: 1.3,
        color: 'var(--color-text-inverse)',
        margin: 0,
        letterSpacing: '-0.01em',
      }}>
        “{quote}”
      </p>

      {attribution && (
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-inverse-secondary)',
          margin: 0,
        }}>
          — {attribution}
        </p>
      )}

      {subtitle && (
        <p style={{
          marginTop: 4,
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-inverse-secondary)',
        }}>
          {subtitle}
        </p>
      )}

      {footer && (
        <p style={{
          marginTop: 8,
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-inverse-secondary)',
        }}>
          {footer}
        </p>
      )}
    </div>
  )
}

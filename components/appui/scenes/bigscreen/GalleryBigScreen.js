'use client'

export default function GalleryBigScreen({ title, subtitle, items, footer }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18,
      width: '100%',
      maxWidth: 780,
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
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-h3)',
          color: 'var(--color-text-inverse)',
          margin: 0,
          textAlign: 'center',
        }}>
          {subtitle}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 10,
        width: '100%',
      }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '4 / 3',
              padding: 12,
              borderRadius: 'var(--radius-md)',
              background: it.highlight
                ? 'linear-gradient(160deg, rgba(107,92,231,0.35), rgba(173,138,62,0.15))'
                : 'rgba(255,255,255,0.05)',
              border: `1px solid ${it.highlight ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)'}`,
              display: 'flex',
              alignItems: 'flex-end',
              color: 'var(--color-text-inverse)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              lineHeight: 1.3,
              textAlign: 'left',
            }}
          >
            {it.label}
          </div>
        ))}
      </div>
      {footer && (
        <p style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-inverse-secondary)',
          margin: 0,
          textAlign: 'center',
        }}>
          {footer}
        </p>
      )}
    </div>
  )
}

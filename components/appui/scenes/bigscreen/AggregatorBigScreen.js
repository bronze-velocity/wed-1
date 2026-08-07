'use client'

export default function AggregatorBigScreen({ title, headline, subtitle, bars, footer }) {
  const maxCount = bars?.reduce((m, b) => Math.max(m, b.count ?? b.pct ?? 0), 0) || 1
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: '100%',
      maxWidth: 680,
      alignItems: 'center',
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

      {headline && (
        <p style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-h2)',
          lineHeight: 1.2,
          color: 'var(--color-text-inverse)',
          textAlign: 'center',
          margin: 0,
        }}>
          {headline}
        </p>
      )}

      {subtitle && (
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-inverse-secondary)',
          textAlign: 'center',
          margin: 0,
        }}>
          {subtitle}
        </p>
      )}

      {bars && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
        }}>
          {bars.map((b, i) => {
            const value = b.count ?? b.pct ?? 0
            const pct = value / maxCount
            const displayed = b.pct != null ? `${b.pct}%` : b.count
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-inverse)',
                }}>
                  <span style={{ fontWeight: 700 }}>{b.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>{displayed}</span>
                </div>
                <div style={{
                  height: 8,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${Math.max(4, pct * 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-gold) 100%)',
                    borderRadius: 'var(--radius-full)',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {footer && (
        <p style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-inverse-secondary)',
          textAlign: 'center',
          margin: 0,
        }}>
          {footer}
        </p>
      )}
    </div>
  )
}

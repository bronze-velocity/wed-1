'use client'

// A schematic "map / graph" — decorative pins on a soft grid. Positions are
// percentages of the container (0–100) so callers can suggest a shape without
// needing real coordinates.
export default function MapBigScreen({ title, subtitle, pins = [], footer, shape = 'map' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
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
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 7',
        borderRadius: 'var(--radius-lg)',
        background:
          shape === 'web'
            ? 'radial-gradient(ellipse at center, rgba(107,92,231,0.15) 0%, rgba(17,17,17,0) 70%)'
            : `
              linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: shape === 'web' ? 'auto' : '32px 32px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        {shape === 'web' && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 44"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0 }}
          >
            {pins.slice(1).map((p, i) => (
              <line
                key={i}
                x1={pins[0].x}
                y1={pins[0].y * 0.44}
                x2={p.x}
                y2={p.y * 0.44}
                stroke="rgba(173,138,62,0.35)"
                strokeWidth="0.25"
              />
            ))}
          </svg>
        )}

        {pins.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span className="pulse-dot" style={{
              width: p.big ? 14 : 10,
              height: p.big ? 14 : 10,
              borderRadius: 'var(--radius-full)',
              background: p.big ? 'var(--color-gold)' : 'var(--color-accent)',
              boxShadow: `0 0 12px ${p.big ? 'var(--color-gold)' : 'var(--color-accent)'}`,
            }} />
            {p.label && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--color-text-inverse)',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
              }}>
                {p.label}
              </span>
            )}
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

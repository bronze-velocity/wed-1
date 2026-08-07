'use client'

export default function PulseSlider({ leftLabel, rightLabel, position = 0.65, emoji }) {
  const pct = Math.max(0, Math.min(1, position))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {emoji && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 40,
          lineHeight: 1,
        }}>
          <span aria-hidden="true">{emoji}</span>
        </div>
      )}
      <div style={{ position: 'relative', height: 34 }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 6,
          transform: 'translateY(-50%)',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(90deg, var(--color-rose) 0%, var(--color-accent) 50%, var(--color-green) 100%)',
          opacity: 0.85,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `calc(${pct * 100}% - 14px)`,
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          borderRadius: 'var(--radius-full)',
          background: '#fff',
          border: '2px solid var(--color-text-primary)',
          boxShadow: 'var(--shadow-md)',
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.04em',
      }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

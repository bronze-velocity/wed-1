'use client'

export default function LeaderboardRow({ rank, name, score, highlight, dark, maxScore }) {
  const pct = maxScore ? Math.max(0.05, score / maxScore) : 1
  return (
    <div style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '40px 1fr auto',
      alignItems: 'center',
      gap: 16,
      padding: dark ? '14px 18px' : '10px 12px',
      borderRadius: 'var(--radius-md)',
      background: dark
        ? (highlight ? 'rgba(107,92,231,0.22)' : 'rgba(255,255,255,0.05)')
        : (highlight ? 'var(--color-accent-light)' : 'var(--color-bg-subtle)'),
      border: dark
        ? `1px solid ${highlight ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)'}`
        : `1px solid ${highlight ? 'var(--color-accent)' : 'var(--color-border)'}`,
      overflow: 'hidden',
    }}>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: `${pct * 100}%`,
        background: dark
          ? (highlight ? 'linear-gradient(90deg, rgba(107,92,231,0.35), rgba(107,92,231,0))'
                        : 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0))')
          : (highlight ? 'linear-gradient(90deg, rgba(107,92,231,0.18), rgba(107,92,231,0))'
                        : 'linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0))'),
        pointerEvents: 'none',
      }} />
      <span style={{
        position: 'relative',
        fontSize: dark ? 'var(--text-body-lg)' : 'var(--text-body-sm)',
        fontWeight: 800,
        color: highlight
          ? 'var(--color-accent)'
          : (dark ? 'var(--color-text-inverse-secondary)' : 'var(--color-text-muted)'),
        letterSpacing: '-0.01em',
      }}>
        {String(rank).padStart(2, '0')}
      </span>
      <span style={{
        position: 'relative',
        fontSize: dark ? 'var(--text-body)' : 'var(--text-body-sm)',
        fontWeight: 700,
        color: dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
      <span style={{
        position: 'relative',
        fontSize: dark ? 'var(--text-body-lg)' : 'var(--text-body-sm)',
        fontWeight: 800,
        color: dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
        letterSpacing: '-0.01em',
      }}>
        {score}
      </span>
    </div>
  )
}

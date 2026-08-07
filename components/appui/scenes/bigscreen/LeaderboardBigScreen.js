'use client'

import LeaderboardRow from '../../primitives/LeaderboardRow'

export default function LeaderboardBigScreen({ title, subtitle, rows, footer, highlightRank = 1 }) {
  const maxScore = rows.reduce((m, r) => Math.max(m, r.score), 0)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: '100%',
      maxWidth: 640,
    }}>
      <div style={{ textAlign: 'center' }}>
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
            marginTop: 8,
            fontFamily: 'var(--font-serif-accent)',
            fontStyle: 'italic',
            fontSize: 'var(--text-h3)',
            color: 'var(--color-text-inverse)',
            margin: '8px 0 0',
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r, i) => (
          <LeaderboardRow
            key={i}
            rank={r.rank}
            name={r.name}
            score={r.score}
            highlight={r.rank === highlightRank}
            dark
            maxScore={maxScore}
          />
        ))}
      </div>
      {footer && (
        <p style={{
          textAlign: 'center',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-inverse-secondary)',
          margin: 0,
        }}>
          {footer}
        </p>
      )}
    </div>
  )
}

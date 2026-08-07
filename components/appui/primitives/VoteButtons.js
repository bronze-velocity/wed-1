'use client'

export default function VoteButtons({ options, selectedIndex, columns }) {
  const cols = columns ?? (options.length <= 2 ? 2 : 1)
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 8,
    }}>
      {options.map((opt, i) => {
        const selected = selectedIndex === i
        return (
          <div
            key={i}
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: `1.5px solid ${selected ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
              background: selected ? 'var(--color-accent)' : 'var(--color-bg)',
              color: selected ? '#fff' : 'var(--color-text-primary)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {opt}
          </div>
        )
      })}
    </div>
  )
}

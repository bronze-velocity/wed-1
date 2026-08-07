'use client'

export default function PickerGrid({ items, columns = 3 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 6,
    }}>
      {items.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label
        const selected = typeof item === 'object' && item.selected
        return (
          <div
            key={i}
            style={{
              aspectRatio: '1 / 1',
              padding: 8,
              borderRadius: 'var(--radius-md)',
              border: `1.5px solid ${selected ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
              background: selected ? 'var(--color-accent)' : 'var(--color-bg)',
              color: selected ? '#fff' : 'var(--color-text-primary)',
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

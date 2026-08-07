'use client'

export default function LiveFeedItem({ text, attribution, kind = 'plain' }) {
  const goldFrame = kind === 'gold'
  return (
    <div style={{
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: goldFrame ? 'var(--color-gold-light)' : 'var(--color-bg-subtle)',
      border: `1px solid ${goldFrame ? 'var(--color-gold)' : 'var(--color-border)'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <p style={{
        fontFamily: goldFrame ? 'var(--font-serif-accent)' : 'inherit',
        fontStyle: goldFrame ? 'italic' : 'normal',
        fontSize: 'var(--text-body-sm)',
        lineHeight: 1.5,
        color: 'var(--color-text-primary)',
        margin: 0,
      }}>
        {goldFrame ? `“${text}”` : text}
      </p>
      {attribution && (
        <p style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 600,
          color: goldFrame ? 'var(--color-gold)' : 'var(--color-text-muted)',
          margin: 0,
        }}>
          — {attribution}
        </p>
      )}
    </div>
  )
}

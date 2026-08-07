'use client'

export default function PromptCard({ eyebrow, prompt, subtitle }) {
  return (
    <div style={{
      padding: '14px 14px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-subtle)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      {eyebrow && (
        <span style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
        }}>
          {eyebrow}
        </span>
      )}
      <p style={{
        fontSize: 'var(--text-body-sm)',
        fontWeight: 700,
        lineHeight: 1.35,
        color: 'var(--color-text-primary)',
        margin: 0,
      }}>
        {prompt}
      </p>
      {subtitle && (
        <p style={{
          fontSize: 'var(--text-tiny)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

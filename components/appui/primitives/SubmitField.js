'use client'

export default function SubmitField({ placeholder, value, charLimit, buttonLabel = 'Send' }) {
  const chars = value?.length ?? 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        padding: '11px 12px',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid var(--color-border-strong)',
        background: 'var(--color-bg)',
        minHeight: 84,
        fontSize: 'var(--text-body-sm)',
        color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
      }}>
        {value || placeholder}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        {charLimit ? (
          <span style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-muted)',
          }}>
            {chars} / {charLimit}
          </span>
        ) : <span />}
        <div style={{
          padding: '9px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-accent)',
          color: '#fff',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
        }}>
          {buttonLabel}
        </div>
      </div>
    </div>
  )
}

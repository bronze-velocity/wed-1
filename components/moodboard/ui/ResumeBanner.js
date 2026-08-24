'use client'

export default function ResumeBanner({ savedAt, onContinue, onStartFresh }) {
  const relative = savedAt ? formatRelative(savedAt) : ''

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        top: 'calc(var(--nav-height) + var(--space-3))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 45,
        maxWidth: 'min(560px, calc(100vw - var(--space-6)))',
        width: 'max-content',
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        animation: 'fadeInUp 300ms ease-out both',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-primary)',
          fontWeight: 600,
          margin: 0,
        }}
      >
        Pick up where you left off{relative ? ` (${relative})` : ''}?
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <button
          type="button"
          onClick={onContinue}
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-text-inverse)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '6px 14px',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onStartFresh}
          style={{
            background: 'none',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 14px',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Start fresh
        </button>
      </div>
    </div>
  )
}

function formatRelative(savedAt) {
  const diff = Date.now() - savedAt
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

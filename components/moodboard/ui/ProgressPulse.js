'use client'

export default function ProgressPulse({ total, current }) {
  return (
    <div
      aria-label={`Step ${current + 1} of ${total}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        position: 'absolute',
        top: 'calc(var(--nav-height) + var(--space-4))',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      className="lg:left-auto lg:right-[var(--space-8)] lg:transform-none"
    >
      {Array.from({ length: total }, (_, i) => {
        const isVisited = i < current
        const isCurrent = i === current
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'block',
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: isVisited
                ? 'var(--color-accent)'
                : isCurrent
                ? 'transparent'
                : 'var(--color-border)',
              border: isCurrent
                ? '2px solid var(--color-accent)'
                : '2px solid transparent',
              transition: 'background 200ms ease, border-color 200ms ease',
            }}
          />
        )
      })}
    </div>
  )
}

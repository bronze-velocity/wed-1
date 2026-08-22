'use client'

import Image from 'next/image'
import { useState } from 'react'

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 'var(--space-2)',
        right: 'var(--space-2)',
        width: 24,
        height: 24,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 2,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6l3 3 5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function TapCard({
  type = 'illustrated',
  selected = false,
  onClick,
  maxSelect = 99,
  // photo variant
  src,
  alt = '',
  label,
  // illustrated variant
  icon,
  sublabel,
  labelStyle,
}) {
  const [pressing, setPressing] = useState(false)

  const role = maxSelect === 1 ? 'radio' : 'checkbox'

  const pressTransition = 'transform 80ms ease-out'
  const releaseTransition =
    'transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease'

  const sharedStyle = {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: selected ? 'inset 0 0 0 3px var(--color-accent)' : 'inset 0 0 0 0px transparent',
    transform: pressing ? 'scale(0.96)' : selected ? 'scale(1.02)' : 'scale(1)',
    transition: pressing ? pressTransition : releaseTransition,
  }

  const handlers = {
    onClick,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.()
      }
    },
    onPointerDown: () => setPressing(true),
    onPointerUp: () => setPressing(false),
    onPointerLeave: () => setPressing(false),
    onPointerCancel: () => setPressing(false),
  }

  if (type === 'photo') {
    return (
      <div
        role={role}
        aria-checked={selected}
        tabIndex={0}
        {...handlers}
        style={{
          ...sharedStyle,
          aspectRatio: '2 / 3',
          background: 'var(--color-bg-subtle)',
        }}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 240px"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />
        {label && (
          <span
            style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              left: 'var(--space-4)',
              right: 'var(--space-4)',
              fontSize: 'var(--text-body-lg)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
              zIndex: 1,
            }}
          >
            {label}
          </span>
        )}
        {selected && <CheckBadge />}
      </div>
    )
  }

  return (
    <div
      role={role}
      aria-checked={selected}
      tabIndex={0}
      {...handlers}
      style={{
        ...sharedStyle,
        padding: 'var(--space-5) var(--space-4)',
        background: selected ? 'var(--color-accent-light)' : 'var(--color-bg-subtle)',
        transition: pressing
          ? pressTransition
          : releaseTransition + ', background 200ms ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        minHeight: 96,
        textAlign: 'center',
      }}
    >
      {icon && (
        <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1 }}>
          {icon}
        </span>
      )}
      {label && (
        <span
          style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
            ...labelStyle,
          }}
        >
          {label}
        </span>
      )}
      {sublabel && (
        <span
          style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          {sublabel}
        </span>
      )}
      {selected && <CheckBadge />}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

export default function HScrollControls({ targetRef, step = 0.9, ariaLabel = 'Scroll' }) {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = targetRef?.current
    if (!el) return

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth
      setCanPrev(el.scrollLeft > 4)
      setCanNext(el.scrollLeft < maxScroll - 4)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [targetRef])

  const scrollBy = (dir) => {
    const el = targetRef?.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * step, behavior: 'smooth' })
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'center',
      }}
    >
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label={`${ariaLabel} left`}
        disabled={!canPrev}
        style={buttonStyle(canPrev)}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label={`${ariaLabel} right`}
        disabled={!canNext}
        style={buttonStyle(canNext)}
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}

function buttonStyle(enabled) {
  return {
    width: 44,
    height: 44,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    color: 'var(--color-text-primary)',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.35,
    transition: 'opacity var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
  }
}

function Chevron({ direction }) {
  const rotate = direction === 'left' ? 180 : 0
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

'use client'

import { useRef } from 'react'

export default function TiltCard({ children, max = 6, className = '', style, ...rest }) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const enabledRef = useRef(null)

  function isEnabled() {
    if (enabledRef.current !== null) return enabledRef.current
    if (typeof window === 'undefined') return false
    enabledRef.current =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(hover: none)').matches
    return enabledRef.current
  }

  function onMove(e) {
    if (!isEnabled()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
      el.style.setProperty('--sheen-x', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--sheen-y', `${(py * 100).toFixed(1)}%`)
    })
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card ${className}`.trim()}
      style={{ position: 'relative', ...style }}
      {...rest}
    >
      {children}
      <span className="tilt-card__sheen" aria-hidden="true" />
    </div>
  )
}

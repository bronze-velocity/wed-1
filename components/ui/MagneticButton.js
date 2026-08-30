'use client'

import { useEffect, useRef } from 'react'

export default function MagneticButton({ children, radius = 80, strength = 0.25, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    let inside = false

    function apply(tx, ty, withTransition) {
      el.style.transition = withTransition ? 'transform 400ms cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
      el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`
    }

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist > radius) {
        if (inside) {
          inside = false
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => apply(0, 0, true))
        }
        return
      }

      inside = true
      const falloff = 1 - dist / radius
      const tx = dx * strength * falloff
      const ty = dy * strength * falloff
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => apply(tx, ty, false))
    }

    function onLeave() {
      inside = false
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => apply(0, 0, true))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [radius, strength])

  return (
    <Tag
      ref={ref}
      style={{
        display: 'inline-block',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

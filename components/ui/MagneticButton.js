'use client'

import { useEffect, useRef } from 'react'

export default function MagneticButton({ children, radius = 120, strength = 0.35, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    let tx = 0
    let ty = 0

    function apply() {
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
        tx = 0
        ty = 0
      } else {
        const falloff = 1 - dist / radius
        tx = dx * strength * falloff
        ty = dy * strength * falloff
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }

    function onLeave() {
      tx = 0
      ty = 0
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
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
        transition: 'transform var(--duration-slow) var(--ease-spring)',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

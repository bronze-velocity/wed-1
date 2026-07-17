'use client'

import Image from 'next/image'
import useParallax from '@/hooks/useParallax'

export default function ParallaxHeroBackdrop({ src, alt, strength = 'medium' }) {
  const ref = useParallax(0.15)

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <div ref={ref} style={{ position: 'absolute', top: '-10%', left: 0, right: 0, height: '130%' }}>
        <Image src={src} alt={alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `var(--scrim-${strength})` }} />
    </div>
  )
}

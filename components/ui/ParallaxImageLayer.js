'use client'

import Image from 'next/image'
import useParallax from '@/hooks/useParallax'

export default function ParallaxImageLayer({ src, alt, priority = false, speed = 0.12 }) {
  const ref = useParallax(speed)
  return (
    <div ref={ref} style={{ position: 'absolute', top: '-10%', left: 0, right: 0, height: '130%' }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: 'cover' }} />
    </div>
  )
}

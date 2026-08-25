import Image from 'next/image'
import ParallaxImageLayer from './ParallaxImageLayer'

export default function PhotoBackdrop({ src, alt, strength = 'medium', priority = false, parallax = false, className = '' }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {parallax ? (
        <ParallaxImageLayer src={src} alt={alt} priority={priority} />
      ) : (
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: 'cover' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: `var(--scrim-${strength})` }} />
    </div>
  )
}

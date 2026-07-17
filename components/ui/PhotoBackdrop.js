import Image from 'next/image'

export default function PhotoBackdrop({ src, alt, strength = 'medium', priority = false }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: `var(--scrim-${strength})` }} />
    </div>
  )
}

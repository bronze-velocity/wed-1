'use client'

import Image from 'next/image'

export default function CoupleHeader({ couple, tint }) {
  return (
    <div style={{
      position: 'relative',
      height: 64,
      margin: '0 -16px',
      overflow: 'hidden',
    }}>
      <Image
        src={couple.photo}
        alt={`${couple.name} at the reception`}
        fill
        sizes="280px"
        style={{ objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: tint
          ? `linear-gradient(180deg, ${tint} 0%, rgba(17,17,17,0.7) 100%)`
          : 'linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.55) 100%)',
      }} />
      <p style={{
        position: 'absolute',
        left: 12,
        bottom: 7,
        margin: 0,
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontSize: 15,
        color: '#fff',
        letterSpacing: '0.01em',
      }}>
        {couple.name} &middot; {couple.date}
      </p>
    </div>
  )
}

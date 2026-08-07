'use client'

import Image from 'next/image'

export default function ChapterCard({ chapter, total, title, body, photo }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 12,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      {photo && (
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: 'var(--color-bg-subtle)',
        }}>
          <Image
            src={photo}
            alt=""
            fill
            sizes="260px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {(chapter && total) && (
          <span style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}>
            Chapter {chapter} of {total}
          </span>
        )}
        <p style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-h4)',
          lineHeight: 1.2,
          color: 'var(--color-text-primary)',
          margin: 0,
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

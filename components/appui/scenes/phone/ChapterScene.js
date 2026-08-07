'use client'

import ChapterCard from '../../primitives/ChapterCard'

export default function ChapterScene({
  chapter,
  total,
  title,
  body,
  photo,
  nextLabel = 'Next chapter',
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ChapterCard
        chapter={chapter}
        total={total}
        title={title}
        body={body}
        photo={photo}
      />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-bg)',
      }}>
        <span style={{
          fontSize: 'var(--text-tiny)',
          color: 'var(--color-text-muted)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          Found by scanning
        </span>
        <span style={{
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          color: 'var(--color-accent)',
        }}>
          {nextLabel} →
        </span>
      </div>
    </div>
  )
}

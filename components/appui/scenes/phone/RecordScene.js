'use client'

import PromptCard from '../../primitives/PromptCard'

export default function RecordScene({
  eyebrow,
  prompt,
  subtitle,
  timer = '0:12',
  maxDuration = '2:00',
  recording = true,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PromptCard eyebrow={eyebrow} prompt={prompt} subtitle={subtitle} />
      <div style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 'var(--radius-lg)',
        background: '#111',
        overflow: 'hidden',
        border: '2px solid var(--color-border-strong)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 12,
          border: '1.5px dashed rgba(255,255,255,0.3)',
          borderRadius: 'var(--radius-md)',
        }} />
        {recording && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.55)',
          }}>
            <span className="pulse-dot" style={{
              width: 7,
              height: 7,
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-rose)',
            }} />
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>REC</span>
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#fff',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          letterSpacing: '0.05em',
        }}>
          {timer} / {maxDuration}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-rose)',
          border: '4px solid #fff',
          boxShadow: '0 0 0 2px var(--color-rose), var(--shadow-md)',
        }} />
      </div>
    </div>
  )
}

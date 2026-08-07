'use client'

import PromptCard from '../../primitives/PromptCard'
import PulseSlider from '../../primitives/PulseSlider'

export default function PulseScene({
  eyebrow,
  prompt,
  subtitle,
  emoji,
  leftLabel,
  rightLabel,
  position,
  liveNote,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PromptCard eyebrow={eyebrow} prompt={prompt} subtitle={subtitle} />
      <PulseSlider
        emoji={emoji}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        position={position}
      />
      {liveNote && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
        }}>
          <span className="pulse-dot" style={{
            width: 8,
            height: 8,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-accent)',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}>
            {liveNote}
          </span>
        </div>
      )}
    </div>
  )
}

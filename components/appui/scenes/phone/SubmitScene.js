'use client'

import PromptCard from '../../primitives/PromptCard'
import SubmitField from '../../primitives/SubmitField'

export default function SubmitScene({
  eyebrow,
  prompt,
  subtitle,
  placeholder,
  draft,
  charLimit,
  buttonLabel,
  toOptions,
  toSelected,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PromptCard eyebrow={eyebrow} prompt={prompt} subtitle={subtitle} />

      {toOptions && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            To
          </span>
          {toOptions.map((opt, i) => {
            const active = toSelected === i
            return (
              <span
                key={i}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-tiny)',
                  fontWeight: 700,
                  background: active ? 'var(--color-accent)' : 'transparent',
                  color: active ? '#fff' : 'var(--color-text-secondary)',
                  border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                }}
              >
                {opt}
              </span>
            )
          })}
        </div>
      )}

      <SubmitField
        placeholder={placeholder}
        value={draft}
        charLimit={charLimit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

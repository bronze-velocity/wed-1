'use client'

import PromptCard from '../../primitives/PromptCard'
import PickerGrid from '../../primitives/PickerGrid'

export default function PickerScene({
  eyebrow,
  prompt,
  subtitle,
  items,
  columns,
  footer,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PromptCard eyebrow={eyebrow} prompt={prompt} subtitle={subtitle} />
      <PickerGrid items={items} columns={columns} />
      {footer && (
        <p style={{
          fontSize: 'var(--text-tiny)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          margin: 0,
        }}>
          {footer}
        </p>
      )}
    </div>
  )
}

'use client'

import PromptCard from '../../primitives/PromptCard'
import LiveFeedItem from '../../primitives/LiveFeedItem'

export default function FeedScene({ eyebrow, prompt, items, replyLabel = 'Send one back' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <PromptCard eyebrow={eyebrow} prompt={prompt} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <LiveFeedItem
            key={i}
            text={item.text}
            attribution={item.attribution}
            kind={item.kind}
          />
        ))}
      </div>
      <div style={{
        marginTop: 4,
        padding: '10px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-accent)',
        color: '#fff',
        fontSize: 'var(--text-body-sm)',
        fontWeight: 700,
        textAlign: 'center',
      }}>
        {replyLabel}
      </div>
    </div>
  )
}

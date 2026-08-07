'use client'

import PromptCard from '../../primitives/PromptCard'
import VoteButtons from '../../primitives/VoteButtons'
import CountdownRing from '../../primitives/CountdownRing'

export default function VoteScene({
  eyebrow,
  prompt,
  subtitle,
  options,
  selectedIndex,
  columns,
  countdown,
  countdownTotal,
  questionIndex,
  questionTotal,
  score,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(questionIndex || score) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {questionIndex ? (
            <span style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Question {questionIndex} of {questionTotal}
            </span>
          ) : <span />}
          {score && (
            <span style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
            }}>
              Score {score}
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <PromptCard eyebrow={eyebrow} prompt={prompt} subtitle={subtitle} />
        </div>
        {countdown != null && (
          <CountdownRing seconds={countdown} total={countdownTotal || 20} />
        )}
      </div>

      <VoteButtons
        options={options}
        selectedIndex={selectedIndex}
        columns={columns}
      />

      <p style={{
        marginTop: 2,
        fontSize: 'var(--text-tiny)',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
      }}>
        Tap to lock in — everyone answers at once.
      </p>
    </div>
  )
}

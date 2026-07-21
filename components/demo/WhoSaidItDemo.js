'use client'

import { useState } from 'react'
import WhoSaidItPhone from './WhoSaidItPhone'
import WhoSaidItHost from './WhoSaidItHost'
import WhoSaidItBigScreen from './WhoSaidItBigScreen'

const ROOM_SIZE = 48
const HOST_LABEL = 'Host'

const QUESTIONS = [
  {
    id: 1,
    text: 'i cannot believe you made me watch a two-hour documentary about the history of paperclips',
    sender: 'Simone',
    votes: { Jack: 78, Simone: 22 },
    roomAccuracy: 22,
    context: '78% of the room got this one wrong.',
    standings: { his: 6, her: 8 },
    streak: null,
    hostNote: 'Simone picked the documentary. Ask the room who else has been trapped by one of her “quick 20-minute” watches.',
  },
  {
    id: 2,
    text: 'babe the cat threw up on the keyboard again please come home',
    sender: 'Jack',
    votes: { Jack: 50, Simone: 50 },
    roomAccuracy: 50,
    context: 'Split down the middle. Simone denies ownership of the cat.',
    standings: { his: 13, her: 15 },
    streak: null,
    hostNote: 'The cat is named Gerald. Simone still insists Gerald is “technically Jack’s cat.” Let that land.',
  },
  {
    id: 3,
    text: 'you were right about the shoes. i’m sorry. i love you. don’t gloat.',
    sender: 'Jack',
    votes: { Jack: 34, Simone: 66 },
    roomAccuracy: 34,
    context: 'Only 34% guessed this one. The gloat is very much in progress.',
    standings: { his: 20, her: 21 },
    streak: 'Table 4 is on a 3-question streak.',
    hostNote: 'This is the only recorded time Jack admitted he was wrong. Pause for effect before you reveal it.',
  },
  {
    id: 4,
    text: 'if you eat the last piece of leftover thai i will actually leave you',
    sender: 'Simone',
    votes: { Jack: 8, Simone: 92 },
    roomAccuracy: 92,
    context: '92% got it right. Simone has receipts.',
    standings: { his: 27, her: 29 },
    streak: null,
    hostNote: 'There is a real labeled note in their fridge about these leftovers. A photo exists — ask Simone to confirm.',
  },
  {
    id: 5,
    text: 'just so you know: i’ve been humming that song from our first dance all day and now everyone at work thinks i’m losing it',
    sender: 'Jack',
    votes: { Jack: 100, Simone: 0 },
    roomAccuracy: 100,
    context: 'A rare 100%. Everyone knew.',
    standings: { his: 34, her: 31 },
    streak: 'Aunt Denise: 5 in a row.',
    hostNote: 'Cue the first-dance song the second you reveal this — the DJ is watching for your nod.',
  },
]

export default function WhoSaidItDemo() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [done, setDone] = useState(false)

  const current = QUESTIONS[index]

  function submitGuess(name) {
    if (guess !== null) return
    setGuess(name)
    setScore((s) => ({
      correct: s.correct + (name === current.sender ? 1 : 0),
      total: s.total + 1,
    }))
  }

  function reveal() {
    setRevealed(true)
  }

  function next() {
    setIndex((i) => i + 1)
    setGuess(null)
    setRevealed(false)
  }

  function finish() {
    setDone(true)
  }

  function reset() {
    setIndex(0)
    setGuess(null)
    setRevealed(false)
    setScore({ correct: 0, total: 0 })
    setDone(false)
  }

  const phone = (
    <WhoSaidItPhone
      question={current}
      index={index}
      total={QUESTIONS.length}
      guess={guess}
      revealed={revealed}
      score={score}
      onGuess={submitGuess}
      done={done}
      finalScore={score}
      onReset={reset}
      hostLabel={HOST_LABEL}
    />
  )

  const host = (
    <WhoSaidItHost
      question={current}
      index={index}
      total={QUESTIONS.length}
      isRevealed={revealed}
      done={done}
      roomSize={ROOM_SIZE}
      onReveal={reveal}
      onNext={next}
      onFinish={finish}
      hostLabel={HOST_LABEL}
    />
  )

  const bigScreen = (
    <WhoSaidItBigScreen
      question={current}
      isRevealed={revealed}
      index={index}
      total={QUESTIONS.length}
      done={done}
    />
  )

  return (
    <div style={{ width: '100%' }}>
      {/* Desktop: three panels side by side */}
      <div
        className="hidden lg:flex"
        style={{
          gap: 24,
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflowX: 'auto',
          padding: '4px 0',
        }}
      >
        <Panel label="What your guest taps" width={280}>{phone}</Panel>
        <Panel label="What the host sees" width={280}>{host}</Panel>
        <Panel label="What the whole room sees" width={460}>{bigScreen}</Panel>
      </div>

      {/* Mobile: stacked, labelled */}
      <div className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}>
        <Panel label="What your guest taps">{phone}</Panel>
        <Panel label="What the host sees">{host}</Panel>
        <Panel label="What the whole room sees" fullWidth>{bigScreen}</Panel>
      </div>
    </div>
  )
}

function Panel({ label, width, fullWidth, children }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: width ?? undefined,
        maxWidth: fullWidth ? 520 : undefined,
        ...(fullWidth ? { width: '100%' } : {}),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          margin: '0 0 var(--space-3)',
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

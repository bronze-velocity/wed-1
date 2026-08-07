'use client'

import PhoneShell from '@/components/demo/PhoneShell'
import CoupleHeader from './primitives/CoupleHeader'
import VoteScene from './scenes/phone/VoteScene'
import SubmitScene from './scenes/phone/SubmitScene'
import ChapterScene from './scenes/phone/ChapterScene'
import PickerScene from './scenes/phone/PickerScene'
import PulseScene from './scenes/phone/PulseScene'
import FeedScene from './scenes/phone/FeedScene'
import RecordScene from './scenes/phone/RecordScene'

const REGISTRY = {
  vote: VoteScene,
  submit: SubmitScene,
  chapter: ChapterScene,
  picker: PickerScene,
  pulse: PulseScene,
  feed: FeedScene,
  record: RecordScene,
}

export default function PhoneScene({ scene, couple }) {
  const Scene = REGISTRY[scene?.layout]
  if (!Scene) return null

  return (
    <PhoneShell>
      <div style={{
        padding: '0 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <CoupleHeader couple={couple} tint={scene.tint} />
        <Scene {...scene} />
      </div>
    </PhoneShell>
  )
}

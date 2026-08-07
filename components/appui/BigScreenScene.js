'use client'

import LeaderboardBigScreen from './scenes/bigscreen/LeaderboardBigScreen'
import FeedBigScreen from './scenes/bigscreen/FeedBigScreen'
import AggregatorBigScreen from './scenes/bigscreen/AggregatorBigScreen'
import MapBigScreen from './scenes/bigscreen/MapBigScreen'
import GalleryBigScreen from './scenes/bigscreen/GalleryBigScreen'
import MomentBigScreen from './scenes/bigscreen/MomentBigScreen'

const REGISTRY = {
  leaderboard: LeaderboardBigScreen,
  feed: FeedBigScreen,
  aggregator: AggregatorBigScreen,
  map: MapBigScreen,
  gallery: GalleryBigScreen,
  moment: MomentBigScreen,
}

const PETALS = [
  { left: '8%',  duration: '7.4s', delay: '0s',   size: 7,  drift: '14px',  color: 'rgba(173,138,62,0.5)' },
  { left: '24%', duration: '8.2s', delay: '1.6s', size: 6,  drift: '-12px', color: 'rgba(242,78,120,0.35)' },
  { left: '46%', duration: '7.6s', delay: '2.8s', size: 9,  drift: '16px',  color: 'rgba(173,138,62,0.4)' },
  { left: '68%', duration: '8.4s', delay: '0.9s', size: 6,  drift: '-14px', color: 'rgba(242,78,120,0.32)' },
  { left: '88%', duration: '7.1s', delay: '2.2s', size: 8,  drift: '12px',  color: 'rgba(173,138,62,0.5)' },
]

export default function BigScreenScene({ scene }) {
  const Scene = REGISTRY[scene?.layout]
  if (!Scene) return null

  const showPetals = scene.layout === 'feed' || scene.layout === 'moment'

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '16 / 9',
      background: 'var(--color-bg-dark)',
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8)',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(173,138,62,0.18) 0%, rgba(17,17,17,0) 62%)',
      }} />

      {showPetals && PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: '50% 0 50% 50%',
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--petal-drift-x': p.drift,
          }}
        />
      ))}

      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Scene {...scene} />
      </div>

      <span style={{
        position: 'absolute',
        bottom: 'var(--space-4)',
        right: 'var(--space-5)',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: 'rgba(255,255,255,0.28)',
      }}>
        Wepho
      </span>
    </div>
  )
}

const PETALS = [
  { left: '8%',  size: 10, duration: '11s', delay: '0s',   drift: '18px',  color: 'rgba(242, 78, 120, 0.55)' },
  { left: '32%', size: 8,  duration: '13s', delay: '3.5s', drift: '-14px', color: 'rgba(248, 163, 36, 0.5)'  },
  { left: '68%', size: 12, duration: '15s', delay: '1.8s', drift: '22px',  color: 'rgba(107, 92, 231, 0.55)' },
  { left: '88%', size: 9,  duration: '12s', delay: '6s',   drift: '-10px', color: 'rgba(255, 255, 255, 0.45)' },
]

export default function AmbientPetals() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: 'var(--radius-full)',
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--petal-drift-x': p.drift,
          }}
        />
      ))}
    </div>
  )
}

import Container from '@/components/layout/Container'

const TIMELINE_POINTS = [
  { label: '1', caption: 'First week' },
  { label: '5', caption: '' },
  { label: '10', caption: 'Moving in' },
  { label: '14', caption: '' },
  { label: '17', caption: 'Proposal' },
  { label: '20', caption: 'Last week' },
]

export default function AppChronology({ app }) {
  const data = app?.extended?.chronology
  if (!data) return null

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--color-bg)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
            aria-hidden="true"
          >
            The arc
          </p>
          <h2
            className="mb-6 font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {data.headline}
          </h2>
          <p
            className="mx-auto text-text-secondary"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              maxWidth: '640px',
            }}
          >
            {data.description}
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-10) var(--space-8)',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '4px',
                right: '4px',
                height: '2px',
                background:
                  'linear-gradient(to right, var(--color-accent-light), var(--color-accent))',
                borderRadius: 'var(--radius-full)',
              }}
              aria-hidden="true"
            />
            {TIMELINE_POINTS.map((pt, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  flex: '1 1 0',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg)',
                    border: '2px solid var(--color-accent)',
                    zIndex: 1,
                    marginBottom: 'var(--space-3)',
                  }}
                />
                <p
                  style={{
                    fontSize: 'var(--text-label)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.05em',
                  }}
                >
                  #{pt.label}
                </p>
                {pt.caption && (
                  <p
                    className="text-text-secondary"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      lineHeight: 1.3,
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    {pt.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

import Container from '@/components/layout/Container'

const BAR_COLORS = [
  'var(--color-accent)',
  'var(--color-accent-light)',
  'rgba(255, 255, 255, 0.55)',
]

export default function AppFamilyScoreboard({ app }) {
  const data = app?.extended?.scoreboard
  if (!data) return null

  const rows = data.threeWay || []
  const max = Math.max(...rows.map((r) => r.score || 0), 1)

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
            aria-hidden="true"
          >
            The scoreboard
          </p>
          <h2
            className="mb-6 font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            His side. Her side. The people who introduced you.
          </h2>
          {data.copy && (
            <p
              className="mx-auto text-text-secondary"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.6,
                maxWidth: '640px',
                fontStyle: 'italic',
              }}
            >
              {data.copy}
            </p>
          )}
        </div>

        <div
          style={{
            background: 'var(--color-bg-dark)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8) var(--space-8) var(--space-10)',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.08), var(--shadow-xl)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            Live · The Big Screen
          </p>

          <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
            {rows.map((row, i) => {
              const pct = Math.round(((row.score || 0) / max) * 100)
              return (
                <div key={row.label}>
                  <div
                    className="flex items-baseline justify-between"
                    style={{ marginBottom: 'var(--space-2)' }}
                  >
                    <p
                      style={{
                        fontSize: 'var(--text-body-lg)',
                        fontWeight: 600,
                        color: 'var(--color-text-inverse)',
                      }}
                    >
                      {row.label}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-h4)',
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--color-text-inverse)',
                      }}
                    >
                      {row.score}
                    </p>
                  </div>
                  <div
                    style={{
                      height: '14px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: BAR_COLORS[i % BAR_COLORS.length],
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'var(--space-5)' }}
        >
          {data.individualNote && (
            <InsetCard label="Individual leaderboard" body={data.individualNote} />
          )}
          {data.subLeaderboardsNote && (
            <InsetCard label="Sub-leaderboards" body={data.subLeaderboardsNote} />
          )}
        </div>
      </Container>
    </section>
  )
}

function InsetCard({ label, body }) {
  return (
    <div
      style={{
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-7)',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-label)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {label}
      </p>
      <p
        className="text-text-primary"
        style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
      >
        {body}
      </p>
    </div>
  )
}

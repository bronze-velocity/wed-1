import Container from '@/components/layout/Container'

export default function AppSetupEffort({ app }) {
  const data = app?.extended?.setupEffort
  if (!data) return null

  const columns = [
    { label: 'Time from you', body: data.timeFromYou },
    { label: 'We handle', body: data.weHandle },
    { label: 'Optional', body: data.optional },
  ].filter((c) => c.body)

  if (columns.length === 0) return null

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
            No surprises
          </p>
          <h2
            className="mb-6 font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            What we&rsquo;ll need from you
          </h2>
          <p
            className="mx-auto text-text-secondary"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              maxWidth: '640px',
            }}
          >
            The honest ask, up front. This is one of the higher-content apps we build — planning it in helps.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--space-5)' }}
        >
          {columns.map((col) => (
            <div
              key={col.label}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
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
                {col.label}
              </p>
              <p
                className="text-text-primary"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
              >
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

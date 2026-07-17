export default function AppHowItWorks({ app }) {
  const hiw = app.extended?.howItWorks
  if (!hiw || (!hiw.setup?.detail && !hiw.guests?.detail && !hiw.keepsake?.detail)) return null

  const columns = [
    {
      number: '01',
      heading: 'You set it up',
      meta: hiw.setup?.time,
      detail: hiw.setup?.detail,
    },
    {
      number: '02',
      heading: 'Guests use it',
      meta: null,
      detail: hiw.guests?.detail,
    },
    {
      number: '03',
      heading: 'You keep it',
      meta: hiw.keepsake?.artifact,
      detail: hiw.keepsake?.detail,
    },
  ]

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
          aria-hidden="true"
        >
          How it works
        </p>
        <h2
          className="mb-12 font-bold text-text-primary"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Three moments. One extraordinary night.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div
              key={col.number}
              className="relative overflow-hidden rounded-2xl p-8 md:p-10"
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: '3px', background: 'var(--gradient-accent)' }}
              />

              <span
                className="block font-extrabold leading-none mb-6"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-accent-light)',
                }}
              >
                {col.number}
              </span>

              <h3
                className="font-semibold text-text-primary mb-2"
                style={{
                  fontSize: 'var(--text-h4)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                }}
              >
                {col.heading}
              </h3>

              {col.meta && (
                <p
                  className="mb-3 font-semibold text-accent"
                  style={{ fontSize: 'var(--text-body-sm)' }}
                >
                  {col.meta}
                </p>
              )}

              {col.detail && (
                <p
                  className="text-text-secondary"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
                >
                  {col.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

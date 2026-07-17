export default function AppBigScreen({ app }) {
  const description = app.extended?.bigScreen
  if (!description) return null

  const primaryVibe = app.alt1_vibe?.[0]

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
          aria-hidden="true"
        >
          Live on the night
        </p>
        <h2
          className="mb-6 font-bold text-text-primary"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          What the room sees
        </h2>
        <p
          className="mx-auto mb-12 max-w-xl text-text-secondary"
          style={{ fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
        >
          {description}
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-2xl px-8"
          style={{
            background: 'var(--color-bg-dark)',
            aspectRatio: '16 / 9',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.08), var(--shadow-xl)',
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            {primaryVibe && (
              <p
                className="font-semibold uppercase tracking-[0.12em] text-accent"
                style={{ fontSize: 'var(--text-label)' }}
              >
                {primaryVibe}
              </p>
            )}
            <p
              className="font-bold"
              style={{
                fontSize: 'var(--text-h3)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-inverse)',
              }}
            >
              {app.title}
            </p>
          </div>

          <span
            className="absolute bottom-4 right-5 font-bold"
            style={{
              fontSize: 'var(--text-tiny)',
              letterSpacing: '0.04em',
              color: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            Wepho
          </span>
        </div>
      </div>
    </section>
  )
}

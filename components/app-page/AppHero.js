import Link from 'next/link'
import Container from '@/components/layout/Container'

const vibeConfig = {
  'Make them laugh':   { textClass: 'text-amber',  bg: 'color-mix(in srgb, var(--color-amber)  14%, transparent)' },
  'Make them cry':     { textClass: 'text-rose',   bg: 'color-mix(in srgb, var(--color-rose)   14%, transparent)' },
  'Get them talking':  { textClass: 'text-teal',   bg: 'color-mix(in srgb, var(--color-teal)   14%, transparent)' },
  'Create a keepsake': { textClass: 'text-green',  bg: 'color-mix(in srgb, var(--color-green)  14%, transparent)' },
  'Stop the room':     { textClass: 'text-accent', bg: 'color-mix(in srgb, var(--color-accent) 14%, transparent)' },
}

export default function AppHero({ app }) {
  const primaryVibe = app.alt1_vibe?.[0]
  const vibe = vibeConfig[primaryVibe]
  const headline = app.extended?.hero?.headline || app.title
  const subhead = app.extended?.hero?.subhead || app.description

  return (
    <section
      className="pt-24 pb-16 md:pt-32 md:pb-20 lg:pb-28"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div>
            {primaryVibe && vibe && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase mb-6 ${vibe.textClass}`}
                style={{ backgroundColor: vibe.bg }}
              >
                {primaryVibe}
              </span>
            )}

            <h1
              className="text-4xl md:text-5xl font-bold text-text-primary mb-5 leading-[1.1]"
              style={{ letterSpacing: '-0.025em' }}
            >
              {headline}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              {subhead}
            </p>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-[background,transform,box-shadow] duration-150 ease-out hover:-translate-y-px hover:shadow-[var(--shadow-glow-accent)]"
              style={{ background: 'var(--gradient-accent)' }}
            >
              Book this app — $2,000
            </Link>

            <p className="mt-4 text-sm text-text-muted">
              No download for guests. No login. Just a QR code.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[260px]">
              <div
                className="relative rounded-[40px] overflow-hidden border-[10px]"
                style={{
                  borderColor: '#1A1A1A',
                  aspectRatio: '9 / 19.5',
                  boxShadow: 'var(--shadow-xl), 0 0 0 1px rgba(0,0,0,0.08)',
                }}
              >
                {/* Notch */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-2xl"
                  style={{ width: 90, height: 26, background: '#1A1A1A' }}
                />

                {/* Screen */}
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-4 px-5 pt-8"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  {primaryVibe && vibe && (
                    <span
                      className={`text-[10px] font-semibold tracking-[0.1em] uppercase rounded-full px-3 py-1 ${vibe.textClass}`}
                      style={{ backgroundColor: vibe.bg }}
                    >
                      {primaryVibe}
                    </span>
                  )}
                  <p className="text-center text-sm font-semibold text-text-primary leading-snug px-2">
                    {app.title}
                  </p>
                  <p className="text-center text-xs text-text-secondary leading-relaxed line-clamp-5 px-1">
                    {app.description}
                  </p>
                  <div
                    className="mt-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    Scan to join
                  </div>
                </div>
              </div>

              {/* Decorative glow behind phone */}
              <div
                className="absolute inset-0 -z-10 rounded-[40px] blur-3xl opacity-20"
                style={{ background: 'var(--gradient-accent)' }}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

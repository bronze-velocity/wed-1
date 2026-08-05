import { existsSync } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'

const vibeConfig = {
  'Make them laugh':   { textClass: 'text-amber',  bg: 'color-mix(in srgb, var(--color-amber)  22%, transparent)', photo: '/images/apps/vibe-laugh.jpg' },
  'Make them cry':     { textClass: 'text-rose',   bg: 'color-mix(in srgb, var(--color-rose)   22%, transparent)', photo: '/images/apps/vibe-cry.jpg' },
  'Get them talking':  { textClass: 'text-teal',   bg: 'color-mix(in srgb, var(--color-teal)   22%, transparent)', photo: '/images/apps/vibe-talk.jpg' },
  'Create a keepsake': { textClass: 'text-green',  bg: 'color-mix(in srgb, var(--color-green)  22%, transparent)', photo: '/images/apps/vibe-keepsake.jpg' },
  'Stop the room':     { textClass: 'text-accent', bg: 'color-mix(in srgb, var(--color-accent) 22%, transparent)', photo: '/images/apps/vibe-stop-room.jpg' },
}

export default function AppHero({ app }) {
  const primaryVibe = app.alt1_vibe?.[0]
  const vibe = vibeConfig[primaryVibe] || vibeConfig['Stop the room']
  const headline = app.extended?.hero?.headline || app.title
  const subhead = app.extended?.hero?.subhead || app.description
  const perAppImage = app.extended?.hero?.image || `/images/apps/hero-${app.slug}.jpg`
  const perAppExists = existsSync(path.join(process.cwd(), 'public', perAppImage))
  const heroImage = perAppExists ? perAppImage : vibe.photo

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-24)',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PhotoBackdrop
        src={heroImage}
        alt={`${app.title} — ambient scene`}
        strength="heavy"
        priority
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">

          <div>
            <span
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.1em] uppercase mb-6 ${vibe.textClass}`}
              style={{ backgroundColor: vibe.bg, backdropFilter: 'blur(8px)' }}
            >
              {app.title}
            </span>

            <h1
              style={{
                fontSize: 'var(--text-display)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: 'var(--color-text-inverse)',
                marginBottom: 'var(--space-6)',
                textShadow: '0 2px 24px rgba(0,0,0,0.35)',
              }}
            >
              {headline}
            </h1>

            <p
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.6,
                color: 'var(--color-text-inverse-secondary)',
                marginBottom: 'var(--space-8)',
                maxWidth: '32rem',
              }}
            >
              {subhead}
            </p>

            <div className="flex flex-wrap items-center" style={{ gap: 'var(--space-4)' }}>
              <Link
                href="#book-it"
                className="inline-flex items-center justify-center rounded-lg px-7 py-4 text-base font-semibold text-white transition-[background,transform,box-shadow] duration-150 ease-out hover:-translate-y-px hover:shadow-[var(--shadow-glow-accent)]"
                style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--shadow-glow-accent)' }}
              >
                Book this app
              </Link>
              <Link
                href="/apps"
                className="link-underline"
                style={{
                  fontSize: 'var(--text-label)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-inverse-secondary)',
                }}
              >
                See all example apps
              </Link>
            </div>

            <p
              style={{
                marginTop: 'var(--space-5)',
                fontSize: 'var(--text-body-sm)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              No download for guests. No login. Just a QR code.
            </p>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative w-[280px]" style={{ transform: 'rotate(-4deg)' }}>
              <div
                className="relative overflow-hidden border-[10px]"
                style={{
                  borderColor: '#0A0A0A',
                  borderRadius: '44px',
                  aspectRatio: '9 / 19.5',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-2xl"
                  style={{ width: 96, height: 28, background: '#0A0A0A' }}
                />

                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-4 px-5 pt-10"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  {primaryVibe && (
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
                    className="mt-2 rounded-md px-4 py-2 text-xs font-semibold text-white"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    Scan to join
                  </div>
                </div>
              </div>

              <div
                className="absolute -inset-4 -z-10 blur-3xl opacity-40"
                style={{ background: 'var(--gradient-accent)', borderRadius: '44px' }}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

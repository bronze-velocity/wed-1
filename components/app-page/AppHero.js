import { existsSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import PhoneScene from '@/components/appui/PhoneScene'
import { IPHONE } from '@/components/demo/deviceSpec'
import { COUPLE_DEFAULT } from '@/lib/couple'

const PHONE_W = IPHONE.width
const PHONE_H = Math.round(PHONE_W * 852 / 393)

const vibeConfig = {
  'Make them laugh':   { dot: 'var(--color-amber)',  photo: '/images/apps/vibe-laugh.jpg' },
  'Make them cry':     { dot: 'var(--color-rose)',   photo: '/images/apps/vibe-cry.jpg' },
  'Get them talking':  { dot: 'var(--color-teal)',   photo: '/images/apps/vibe-talk.jpg' },
  'Create a keepsake': { dot: 'var(--color-green)',  photo: '/images/apps/vibe-keepsake.jpg' },
  'Stop the room':     { dot: 'var(--color-accent)', photo: '/images/apps/vibe-stop-room.jpg' },
}

export default function AppHero({ app }) {
  const primaryVibe = app.alt1_vibe?.[0]
  const vibe = vibeConfig[primaryVibe] || vibeConfig['Stop the room']
  const headline = app.extended?.hero?.headline || app.title
  const subhead = app.extended?.hero?.subhead || app.description
  const perAppImage = app.extended?.hero?.image || `/images/apps/hero-${app.slug}.jpg`
  const perAppExists = existsSync(path.join(process.cwd(), 'public', perAppImage))
  const heroImage = perAppExists ? perAppImage : vibe.photo
  const phoneImage = `/images/apps/phones/${app.slug}.png`
  const phoneImageExists = existsSync(path.join(process.cwd(), 'public', phoneImage))

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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold tracking-[0.1em] uppercase mb-6"
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-inverse)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 'var(--radius-full)',
                  background: vibe.dot,
                  display: 'inline-block',
                }}
              />
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
            <div className="relative">
              {phoneImageExists ? (
                <div style={{ transform: 'rotate(-4deg)', transformOrigin: 'center center' }}>
                  <Image
                    src={phoneImage}
                    alt=""
                    width={PHONE_W}
                    height={PHONE_H}
                    priority
                    style={{ display: 'block', width: PHONE_W, height: 'auto' }}
                  />
                </div>
              ) : app.extended?.deviceScenes?.phone ? (
                <PhoneScene scene={app.extended.deviceScenes.phone} couple={COUPLE_DEFAULT} />
              ) : (
                <FallbackPhone app={app} primaryVibe={primaryVibe} vibe={vibe} />
              )}

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

function FallbackPhone({ app, primaryVibe, vibe }) {
  return (
    <div className="w-[280px]">
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
              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1"
              style={{
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg)',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 'var(--radius-full)',
                  background: vibe.dot,
                  display: 'inline-block',
                }}
              />
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
    </div>
  )
}

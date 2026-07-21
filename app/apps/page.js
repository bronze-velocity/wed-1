import Container from '@/components/layout/Container'
import AppGalleryFull from '../../components/sections/AppGalleryFull'
import { getApps } from '../../lib/getApps'

export const metadata = {
  title: 'Explore 12 Wedding Apps — Wepho',
  description:
    'Browse all 12 custom wedding experience apps — from live trivia about your relationship to a Love Letter Machine that reads messages aloud in front of the whole room. Filter by vibe or wedding moment to find yours.',
}

export default function AppsPage() {
  const apps = getApps()

  return (
    <main style={{ background: 'var(--color-bg)' }}>
      <section
        style={{
          background: 'var(--gradient-hero)',
          paddingTop: 'calc(var(--nav-height) + var(--space-16))',
          paddingBottom: 'var(--space-16)',
        }}
      >
        <Container>
          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-5)',
            }}
          >
            The full catalog
          </p>

          <h1
            style={{
              fontSize: 'var(--text-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              maxWidth: '820px',
            }}
          >
            Twelve apps we&rsquo;ve built. Zero off the shelf.
          </h1>

          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              marginBottom: 'var(--space-4)',
            }}
          >
            Pick one and we&rsquo;ll rebuild it around your couple — every question, every prompt,
            every reveal shaped by how you actually met, who proposed, and the joke your table
            has been telling since 2019. Or bring us something no one has done at a wedding
            before.
          </p>

          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              marginBottom: 'var(--space-8)',
            }}
          >
            If a decorated jar or a good MC would do the job just as well, we&rsquo;ll tell you
            and send you to a nice stationer. We only build the ones where the app is doing
            something paper structurally can&rsquo;t.
          </p>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              maxWidth: '640px',
            }}
          >
            Filter by the mood you want to create or the moment you want to fill.
          </p>
        </Container>
      </section>

      <section style={{ padding: 'var(--space-16) 0 var(--space-24)' }}>
        <Container>
          <AppGalleryFull apps={apps} />
        </Container>
      </section>
    </main>
  )
}

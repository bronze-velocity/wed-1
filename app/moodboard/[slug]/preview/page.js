import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/layout/Container'
import { getBrief } from '@/lib/moodboard/briefStore'

export const dynamic = 'force-dynamic'

function isPreviewLive(brief) {
  return Boolean(brief && brief.meta?.socialPreviewEnabled)
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)
  const site = (process.env.SITE_URL || 'https://wepho.com').replace(/\/$/, '')
  const url = `${site}/moodboard/${slug}/preview`

  if (!isPreviewLive(brief)) {
    return {
      title: 'Wedding app moodboard | Wepho',
      description: 'A custom wedding reception app moodboard, built with Wepho.',
      alternates: { canonical: url },
      robots: { index: false, follow: false },
    }
  }

  const coupleName = brief.meta?.coupleName
  const threeWords = brief.results?.threeWords
  const title = coupleName
    ? `${coupleName}'s wedding app moodboard | Wepho`
    : 'Wedding app moodboard | Wepho'
  const description = coupleName && threeWords
    ? `${threeWords} A custom reception experience shaped around ${coupleName}'s people, stories, and energy.`
    : threeWords
    ? `${threeWords} A custom reception experience shaped around their people, stories, and energy.`
    : 'A custom wedding reception app moodboard, built with Wepho.'
  const version = brief.updatedAt || brief.createdAt || ''
  const imageUrl = `${site}/moodboard/${slug}/preview/opengraph-image${
    version ? `?v=${encodeURIComponent(version)}` : ''
  }`
  const imageAlt = coupleName
    ? `${coupleName}'s Wepho wedding app moodboard`
    : 'A Wepho wedding app moodboard'

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Wepho',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function PublicPreviewPage({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)

  if (!isPreviewLive(brief)) notFound()

  const coupleName = brief.meta?.coupleName || null
  const threeWords = brief.results?.threeWords || ''
  const directions = (brief.results?.matches ?? []).slice(0, 3)

  return (
    <main className="moodboard-public-preview">
      <section
        className="section-py"
        style={{
          background: 'var(--gradient-hero)',
          textAlign: 'center',
          minHeight: '80dvh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container narrow>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Wepho · Wedding app moodboard
          </p>

          {coupleName && (
            <p
              style={{
                fontSize: 'var(--text-h3)',
                fontWeight: 800,
                color: 'var(--color-accent-dark)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {coupleName}
            </p>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-serif-accent)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {threeWords}
          </h1>

          {directions.length > 0 && (
            <ul
              aria-label="Broad directions"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 var(--space-8)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                justifyContent: 'center',
              }}
            >
              {directions.map((m) => (
                <li
                  key={m.id}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {m.title || m.id
                    .split('-')
                    .map((w) => w[0]?.toUpperCase() + w.slice(1))
                    .join(' ')}
                </li>
              ))}
            </ul>
          )}

          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: 560,
              margin: '0 auto var(--space-10)',
              lineHeight: 1.55,
            }}
          >
            A custom reception experience shaped around their people, stories, and energy.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-8)',
            }}
          >
            <Link href={`/moodboard/${slug}`} className="btn btn-primary" style={{ minHeight: 44 }}>
              Open the private brief →
            </Link>
            <Link href="/moodboard" className="btn btn-secondary" style={{ minHeight: 44 }}>
              Build your own moodboard
            </Link>
          </div>

          <p
            style={{
              fontSize: 'var(--text-tiny)',
              color: 'var(--color-text-muted)',
            }}
          >
            The full brief is private.
          </p>
        </Container>
      </section>
    </main>
  )
}

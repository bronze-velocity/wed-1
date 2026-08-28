import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/layout/Container'
import MoodboardResults from '@/components/moodboard/results/MoodboardResults'
import BriefPasswordGate from '@/components/moodboard/results/BriefPasswordGate'
import BriefViewBeacon from '@/components/moodboard/results/BriefViewBeacon'
import { getBrief, recordView } from '@/lib/moodboard/briefStore'
import { cookieMatchesHash, cookieNameFor } from '@/lib/moodboard/passwords'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)

  if (!brief) {
    return {
      title: 'Brief not found | Wepho',
      robots: { index: false, follow: false },
    }
  }

  const coupleName = brief.meta?.coupleName
  const threeWords = brief.results?.threeWords
  const title = coupleName
    ? `${coupleName}'s wedding app moodboard | Wepho`
    : 'Wedding app moodboard | Wepho'
  const description = threeWords
    ? `${threeWords} A custom reception experience shaped around their people, stories, and energy.`
    : 'A private, password-protected custom wedding reception app moodboard, built with Wepho.'
  const site = (process.env.SITE_URL || 'https://wepho.com').replace(/\/$/, '')
  const url = `${site}/moodboard/${slug}`
  const version = brief.updatedAt || brief.createdAt || ''
  const imageUrl = `${site}/moodboard/${slug}/opengraph-image${
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

export default async function SharedBriefPage({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)

  if (!brief) notFound()

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(cookieNameFor(slug))?.value
  const unlocked = cookieMatchesHash(cookieValue, brief.auth?.passwordHash)

  if (!unlocked) {
    return (
      <div className="moodboard-protected-page">
        <BriefPasswordGate slug={slug} />
      </div>
    )
  }

  void recordView(slug)

  return (
    <div>
      <BriefViewBeacon
        slug={slug}
        threeWords={brief.results?.threeWords}
        coupleName={brief.meta?.coupleName}
      />
      <MoodboardResults
        results={brief.results}
        answers={brief.answers}
        shared
        sharedBrief={{
          slug,
          coupleName: brief.meta?.coupleName ?? null,
          socialPreviewEnabled: Boolean(brief.meta?.socialPreviewEnabled),
        }}
      />
      <section
        className="section-py"
        style={{ background: 'var(--color-bg-subtle)', textAlign: 'center' }}
      >
        <Container narrow>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Something you want to tweak?
          </p>
          <Link
            href={`/moodboard/${slug}/edit`}
            className="btn btn-secondary"
            style={{ display: 'inline-block' }}
          >
            Edit this brief →
          </Link>
        </Container>
      </section>
    </div>
  )
}

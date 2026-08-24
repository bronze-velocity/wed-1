import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/layout/Container'
import {
  getPostBySlug,
  getPostSlugs,
  formatPostDate,
} from '../../../lib/getPosts.js'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const title = `${post.title} — Wepho`
  const description = post.excerpt || post.description || ''
  return {
    title,
    description,
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date || undefined,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main style={{ background: 'var(--color-bg)' }}>
      <article>
        <header
          style={{
            background: 'var(--gradient-hero)',
            paddingTop: 'calc(var(--nav-height) + var(--space-16))',
            paddingBottom: 'var(--space-12)',
          }}
        >
          <Container narrow>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                fontSize: 'var(--text-label)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-5)',
                textDecoration: 'none',
              }}
            >
              ← Essays
            </Link>
            <h1
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-5)',
              }}
            >
              {post.title}
            </h1>
            {post.date && (
              <p
                style={{
                  fontSize: 'var(--text-label)',
                  color: 'var(--color-text-tertiary)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {formatPostDate(post.date)}
              </p>
            )}
          </Container>
        </header>

        <section className="section-py">
          <Container narrow>
            {post.Body ? (
              <post.Body />
            ) : (
              <div
                style={{
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                }}
                dangerouslySetInnerHTML={{ __html: post.html || '' }}
              />
            )}
          </Container>
        </section>
      </article>
    </main>
  )
}

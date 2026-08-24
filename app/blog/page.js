import Link from 'next/link'
import Container from '@/components/layout/Container'
import { getPosts, formatPostDate } from '../../lib/getPosts.js'

export function generateMetadata() {
  const title = 'Essays — Wepho'
  const description =
    'Notes on wedding-day design, guest experience, and the craft of building one-night-only apps for individual couples.'
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  }
}

export default function BlogIndexPage() {
  const posts = getPosts()

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
            Essays
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
            Notes from the studio.
          </h1>
          <p
            style={{
              fontSize: 'var(--text-lead)',
              lineHeight: 1.55,
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
            }}
          >
            Field notes on wedding-day design, guest experience, and the craft
            of building one-night-only apps for individual couples.
          </p>
        </Container>
      </section>

      <section className="section-py">
        <Container narrow>
          {posts.length === 0 ? (
            <p
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-secondary)',
              }}
            >
              New essays coming soon.
            </p>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
              }}
            >
              {posts.map((post) => (
                <li
                  key={post.slug}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: 'var(--space-8)',
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {(post.date || post.draft) && (
                      <p
                        style={{
                          fontSize: 'var(--text-label)',
                          color: post.draft
                            ? 'var(--color-accent)'
                            : 'var(--color-text-tertiary)',
                          marginBottom: 'var(--space-2)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {post.draft ? 'Draft' : formatPostDate(post.date)}
                      </p>
                    )}
                    <h2
                      style={{
                        fontSize: 'var(--text-h2)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p
                        style={{
                          fontSize: 'var(--text-body)',
                          lineHeight: 1.6,
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  )
}

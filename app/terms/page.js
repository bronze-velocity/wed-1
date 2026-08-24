import Container from '@/components/layout/Container'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Wepho',
  description: 'The terms that apply when you use wepho.com or commission a custom wedding app from us.',
}

const CONTACT_EMAIL = 'hello@wepho.com'

export default function TermsOfServicePage() {
  return (
    <main
      style={{
        background: 'var(--color-bg-subtle)',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <Container narrow>
        <article
          style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-12)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
            Terms of Service
          </h1>
          <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
            Last updated: August 2026
          </p>

          <Section title="1. Agreement to terms">
            <p>
              These Terms of Service ("Terms") govern your use of <strong>wepho.com</strong> and any custom wedding app
              we build for you (together, the "Services"). By using the site or commissioning an app from us, you agree
              to these Terms.
            </p>
            <p>
              We may update these Terms with reasonable notice. Continued use after we post the updated version counts as
              acceptance. If you don't agree with a change, please stop using the Services.
            </p>
          </Section>

          <Section title="2. What Wepho is (and isn't)">
            <List
              items={[
                <>Wepho designs and builds <strong>one-night-only interactive web apps</strong> for individual weddings — used by guests on their phones during the reception.</>,
                <>Every app is custom-built for a specific couple. Pricing is roughly <strong>$2,000 per custom app</strong>, confirmed in writing during your enquiry.</>,
                'We are a small studio, not a self-serve platform. We do not offer templates for guests to log into and edit themselves.',
                'Our apps are entertainment experiences. They are not designed for medical, legal, financial, or safety-critical use.',
              ]}
            />
          </Section>

          <Section title="3. Using the website">
            <SubHeading>3.1 Eligibility</SubHeading>
            <p>
              To commission an app from us you must be at least 18 (or the age of majority where you live) and have the
              legal capacity to enter contracts. The website itself is open to anyone browsing.
            </p>

            <SubHeading>3.2 Acceptable use</SubHeading>
            <p>You agree not to:</p>
            <List
              items={[
                'Use the site for anything illegal, fraudulent, or misleading',
                'Attempt to scrape, crawl, or otherwise automate access to the site beyond normal browsing',
                'Upload malware or attempt to compromise our infrastructure',
                'Reverse-engineer, decompile, or copy our proprietary code or designs',
                'Impersonate Wepho or any of its employees',
                'Harass Wepho staff or misuse our contact form (spam, phishing, or repeated abusive submissions)',
              ]}
            />
          </Section>

          <Section title="4. Commissioning a custom app">
            <SubHeading>4.1 Enquiries and quotes</SubHeading>
            <p>
              Submitting the contact form or moodboard wizard is a request for a conversation, not a binding order. We
              confirm scope, timelines, and price in writing before starting work.
            </p>

            <SubHeading>4.2 Deposit and payment</SubHeading>
            <p>
              Unless otherwise agreed, we require a deposit to reserve your wedding date on our build calendar, with the
              balance due before the app goes live. Exact amounts are confirmed in your quote.
            </p>

            <SubHeading>4.3 Cancellation and refunds</SubHeading>
            <List
              items={[
                'Cancel more than 90 days before the wedding: 50% of the deposit refunded.',
                'Cancel 30–90 days before the wedding: deposit is non-refundable but can be credited towards a rescheduled date within 12 months.',
                'Cancel within 30 days of the wedding: deposit and any completed work are non-refundable.',
                'Wedding postponements are always accommodated where our schedule allows, with no additional fee.',
              ]}
            />
            <p>
              Refund requests go to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={emailLink}>{CONTACT_EMAIL}</a>.
            </p>

            <SubHeading>4.4 Your content</SubHeading>
            <p>
              To personalise your app we ask for content: your names, quotes, photos, guest lists, playlists, "how you
              met" stories, etc. You confirm that:
            </p>
            <List
              items={[
                'You own or have permission to use everything you send us.',
                'The content does not infringe anyone else’s copyright, trademark, or privacy.',
                'You have permission from anyone identifiable in photos we’re asked to feature.',
              ]}
            />
            <p>
              You grant Wepho a limited licence to use that content to build and run your app, and — with your
              permission — to include anonymised screenshots or short video clips in our public portfolio and marketing.
              You can withdraw portfolio permission at any time by emailing us.
            </p>
          </Section>

          <Section title="5. Guests and the live app">
            <List
              items={[
                'On the night of the wedding, guests interact with the app on their own phones. We provide the technology; you (the couple) decide what content, prompts, and moderation apply.',
                <>For the purpose of privacy law, <strong>you (the couple) are the data controller</strong> for any guest submissions collected through the app during your reception. Wepho acts as a data processor and stores that content only for the retention window agreed in your quote (typically 12 months post-wedding).</>,
                'Where guest submissions include names, photos, or personal messages, you are responsible for letting guests know how the content will be used (usually a short line in your invitation or on a sign at the venue).',
                'We are not responsible for the content guests submit. If something inappropriate is submitted, we’ll help you moderate or remove it as quickly as we reasonably can.',
              ]}
            />
          </Section>

          <Section title="6. Intellectual property">
            <SubHeading>6.1 Wepho’s IP</SubHeading>
            <p>
              The Wepho platform, our app codebase, UI patterns, templates, brand, and website copy are our
              intellectual property and protected by copyright and other laws. Nothing in these Terms transfers ownership
              of them to you.
            </p>

            <SubHeading>6.2 Your finished app</SubHeading>
            <p>
              You get an exclusive right to use the finished app for your wedding and any private replay of it
              afterwards. You may not resell, sublicense, or reuse the underlying app code for other events.
            </p>

            <SubHeading>6.3 Your content</SubHeading>
            <p>
              You keep ownership of the photos, quotes, and other content you supply. See §4.4 for the licence you grant
              us to use it.
            </p>
          </Section>

          <Section title="7. Third-party services">
            <p>
              To build and run your app we rely on third-party services (hosting, email delivery, analytics, sometimes
              music APIs, live-display hardware at the venue). We choose reputable providers, but we don’t control
              their uptime and are not liable for failures caused by them.
            </p>
          </Section>

          <Section title="8. Disclaimers">
            <SubHeading>8.1 No warranties</SubHeading>
            <p>
              The website is provided "as is" and "as available." We don’t promise it will always be up, error-free,
              or immune to bugs. For commissioned apps, specific service commitments (e.g. uptime during your reception,
              on-call support the night of) are set out in your project agreement.
            </p>

            <SubHeading>8.2 Limitation of liability</SubHeading>
            <p>To the maximum extent permitted by law, Wepho is not liable for:</p>
            <List
              items={[
                'Indirect, incidental, special, consequential, or punitive damages',
                'Loss of enjoyment, emotional distress, or opportunity',
                'Failures caused by venue Wi-Fi, mobile-network coverage, or guest devices',
                'Failures caused by third-party integrations or APIs',
                'Anything guests submit through the app',
              ]}
            />
            <p>
              Our total liability arising from or connected to the Services is capped at the amount you paid us for your
              app (or £/$100 if you’ve paid nothing, e.g. website-only interactions).
            </p>
            <p>
              Nothing in these Terms limits liability that cannot be limited by law (for example, gross negligence,
              fraud, or death or personal injury caused by negligence).
            </p>
          </Section>

          <Section title="9. Indemnification">
            <p>
              You agree to indemnify and hold Wepho harmless from claims, damages, or expenses arising from:
            </p>
            <List
              items={[
                'Content you supply that infringes someone else’s rights',
                'Failure to obtain consent from guests whose data is captured by your app',
                'Any breach of these Terms',
                'Your negligence or wilful misconduct',
              ]}
            />
          </Section>

          <Section title="10. Data and privacy">
            <p>
              How we handle information from the website is set out in our{' '}
              <Link href="/privacy" style={emailLink}>Privacy Policy</Link>. How we handle guest data captured through
              your commissioned app is set out in your project agreement (typically: stored only for the retention
              window we agreed, encrypted in transit, deleted on request).
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              You can stop using the website at any time. We can suspend or terminate access to the website or an
              in-progress project if you breach these Terms, misuse the Services, or if we’re required to by law.
              Sections that should sensibly survive termination (IP, liability, indemnity, dispute resolution) will
              continue to apply.
            </p>
          </Section>

          <Section title="12. Dispute resolution">
            <p>
              Before starting any legal action, please email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={emailLink}>{CONTACT_EMAIL}</a> and give us at least 30 days to
              resolve the issue informally. If we can’t, disputes will be resolved through the courts of our
              registered jurisdiction, unless local consumer-protection law gives you an inalienable right to sue
              somewhere else.
            </p>
          </Section>

          <Section title="13. General">
            <SubHeading>13.1 Entire agreement</SubHeading>
            <p>
              These Terms plus your project agreement (if any) and the Privacy Policy are the entire agreement between
              you and Wepho about the Services.
            </p>

            <SubHeading>13.2 Severability</SubHeading>
            <p>If any part of these Terms turns out to be unenforceable, the rest still applies.</p>

            <SubHeading>13.3 No waiver</SubHeading>
            <p>If we don’t enforce a right immediately, that doesn’t waive it.</p>

            <SubHeading>13.4 Assignment</SubHeading>
            <p>You can’t transfer these Terms without our written permission. We can assign them (for example, if
              Wepho is acquired).</p>

            <SubHeading>13.5 Force majeure</SubHeading>
            <p>
              We’re not liable for delays or failures caused by events beyond our reasonable control (natural
              disasters, major outages, government actions).
            </p>
          </Section>

          <Section title="14. Contact">
            <p>Questions about these Terms?</p>
            <div
              style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-4) var(--space-5)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <strong>Email:</strong>{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={emailLink}>{CONTACT_EMAIL}</a>
            </div>
          </Section>

          <div
            style={{
              marginTop: 'var(--space-10)',
              padding: 'var(--space-6)',
              background: 'var(--color-accent-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              By using wepho.com or commissioning an app from us, you confirm that you have read, understood, and agree
              to these Terms of Service.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/" style={{ color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>
              ← Back to home
            </Link>
          </div>
        </article>
      </Container>
    </main>
  )
}

const emailLink = { color: 'var(--color-accent)', textDecoration: 'underline' }

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 'var(--space-10)', color: 'var(--color-text-primary)' }}>
      <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 700, margin: `0 0 var(--space-4)` }}>{title}</h2>
      <div style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{children}</div>
    </section>
  )
}

function SubHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: 'var(--text-h4)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        margin: `var(--space-6) 0 var(--space-3)`,
      }}
    >
      {children}
    </h3>
  )
}

function List({ items }) {
  return (
    <ul style={{ margin: `var(--space-3) 0`, paddingLeft: 'var(--space-6)' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 'var(--space-2)' }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

import Container from '@/components/layout/Container'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Wepho',
  description: 'How Wepho collects, uses, and protects your information.',
}

const CONTACT_EMAIL = 'hello@wepho.com'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
            Last updated: August 2026
          </p>

          <Section title="1. Introduction">
            <p>
              Wepho ("we," "our," or "us") builds custom interactive web apps that couples and their guests use during
              wedding receptions, and this website sells and explains that service. This policy covers information we
              collect through <strong>wepho.com</strong> — not information a couple's guests submit to the one-night
              wedding app itself, which is governed separately by the couple who commissioned it.
            </p>
            <p>
              If you don't agree with this policy, please don't use the site.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <SubHeading>2.1 Information you give us</SubHeading>
            <p>When you fill in our contact form to book a wedding app, we collect:</p>
            <List
              items={[
                'Your name and email address',
                'Your wedding or event date (if provided)',
                'Anything you type in the message field (venue, guest count, app ideas, planner name, etc.)',
              ]}
            />
            <p>
              We use this to reply to you and plan your custom app. That's it. We don't sell it, and we don't add you to a
              newsletter without a separate opt-in.
            </p>

            <SubHeading>2.2 Moodboard wizard</SubHeading>
            <p>
              Our optional moodboard tool ("Design your wedding moodboard") stores your in-progress answers in your
              browser's local storage so you can come back later. Nothing you type into the wizard leaves your browser
              until you click submit.
            </p>
            <p>
              At the results screen, if you enter your email to receive a copy of your brief, we send you the brief and
              may follow up <strong>once</strong> to talk through your picks — that's it. Beyond that, we only keep the
              brief on our side if you tick the optional "keep my brief so we can pick up the conversation" box. If you
              don't, the server-side copy is deleted within 90 days (see §7).
            </p>

            <SubHeading>2.3 Automatic information</SubHeading>
            <p>Like most websites, we automatically collect basic technical information when you visit:</p>
            <List
              items={[
                'IP address and general location (country / region)',
                'Browser type and device information',
                'Pages you visit and how you got here (referrer)',
                'Timestamp of your visit',
              ]}
            />

            <SubHeading>2.4 Cookies and analytics</SubHeading>
            <p>We use a small number of cookies and similar technologies:</p>
            <List
              items={[
                <><strong>Essential:</strong> remembering your cookie choice and, when relevant, keeping your moodboard progress. Always on.</>,
                <><strong>Analytics:</strong> anonymised page-view and traffic-source data so we know which apps and blog posts people find useful. Off by default in the EU/UK and turned on only with your consent.</>,
                <><strong>Marketing:</strong> not currently in use. Reserved in case we ever run paid ads for wedding planners.</>,
              ]}
            />
            <p>
              You can change your choice any time from the "Cookie preferences" link in the footer.
            </p>
          </Section>

          <Section title="3. How we use your information">
            <List
              items={[
                'Replying to your contact-form or moodboard enquiry',
                'Planning, quoting, and delivering the custom wedding app you commission',
                'Understanding which pages and apps couples find helpful, so we can improve the site',
                'Preventing spam and abuse of the contact form',
                'Complying with our legal obligations',
              ]}
            />
            <p>
              Our lawful bases (for EU/UK visitors): performing the contract you asked us to enter into (replying to your
              enquiry, building your app), our legitimate interest in a functional website free from spam, and your
              consent for optional analytics cookies.
            </p>
          </Section>

          <Section title="4. Analytics services">
            <p>
              We use PostHog (on their EU-hosted cloud) as our privacy-focused analytics provider, to understand
              aggregate traffic patterns. It collects page views, referrers, and anonymous event data — never names,
              email addresses, or the contents of your contact form.
            </p>
            <p>
              Analytics that use cookies are only loaded after you opt in through the cookie banner. We do not sell or
              share your data with third parties for advertising.
            </p>
          </Section>

          <Section title="5. How we share your information">
            <p>We do not sell your personal information. We may share it in these limited situations:</p>
            <List
              items={[
                <><strong>Service providers:</strong> hosting (Vercel), transactional email delivery (our SMTP provider), and analytics — all under confidentiality and only for these purposes.</>,
                <><strong>Legal requirements:</strong> when required by law, court order, or a valid legal request.</>,
                <><strong>Business transfers:</strong> if Wepho is ever acquired or merged, your information may transfer as part of that deal.</>,
                <><strong>With your consent:</strong> anywhere else you explicitly ask us to share it.</>,
              ]}
            />
          </Section>

          <Section title="6. Data security">
            <List
              items={[
                'HTTPS/TLS encryption for all traffic to and from wepho.com',
                'Secure hosting infrastructure (Vercel) with access controls',
                'Access to enquiry emails limited to the small Wepho team',
              ]}
            />
            <p>
              No method of transmission over the internet is 100% secure. We do our best to protect your data, but we
              can't guarantee absolute security.
            </p>
          </Section>

          <Section title="7. Data retention">
            <List
              items={[
                <><strong>Contact-form enquiries:</strong> kept for as long as needed to fulfil the enquiry and typical follow-up (usually up to 24 months), then deleted on request or during periodic cleanup.</>,
                <><strong>Moodboard briefs submitted by email:</strong> the email itself sits in our inbox alongside other enquiries. Any server-side copy of the underlying answers is <strong>deleted after 90 days by default</strong>. If, at the email gate, you tick the optional "keep my brief so we can pick up the conversation" box, we keep it alongside your enquiry so we can follow up — you can ask us to delete it any time.</>,
                <><strong>Delivered wedding apps and their creative assets:</strong> archived for up to 12 months after your wedding for support and portfolio purposes, then deleted on request.</>,
                <><strong>Guest submissions collected through a live wedding app:</strong> retained only for the window agreed in your project — typically up to 12 months post-wedding — then deleted.</>,
                <><strong>Analytics data:</strong> aggregated and retained for up to 24 months.</>,
                <><strong>Server logs:</strong> retained for up to 90 days for security purposes. We redact freeform moodboard answers and mask email addresses in any error logs.</>,
              ]}
            />
          </Section>

          <Section title="8. Your privacy rights">
            <SubHeading>8.1 Everyone</SubHeading>
            <p>Regardless of where you live, you can ask us to:</p>
            <List
              items={[
                'Tell you what personal data we hold about you',
                'Correct anything that is wrong',
                'Delete your data (unless we are legally required to keep it)',
                'Withdraw your consent to analytics cookies at any time',
              ]}
            />

            <SubHeading>8.2 EU / UK residents (GDPR)</SubHeading>
            <p>Under GDPR and UK GDPR, you also have the right to:</p>
            <List
              items={[
                'Object to processing based on legitimate interest',
                'Ask for your data in a portable format',
                'Request that we restrict processing',
                'Lodge a complaint with your local data-protection authority',
              ]}
            />

            <SubHeading>8.3 California residents (CCPA)</SubHeading>
            <p>Under CCPA you have the right to:</p>
            <List
              items={[
                'Know what personal information we collect and why',
                'Know whether we sell or share it (we do not sell it)',
                'Request deletion',
                'Not be discriminated against for exercising these rights',
              ]}
            />

            <p style={{ marginTop: 'var(--space-6)' }}>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={emailLink}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section title="9. Children's privacy">
            <p>
              Wepho is a service sold to adults planning a wedding. It's not directed at children under 13, and we don't
              knowingly collect information from them. If a child under 13 has submitted information, contact us and
              we'll delete it.
            </p>
          </Section>

          <Section title="10. International transfers">
            <p>
              Wepho operates globally but our hosting and analytics providers may process data in the EU, UK, or US.
              Where data leaves the EU/UK, we rely on Standard Contractual Clauses or an adequacy decision.
            </p>
          </Section>

          <Section title="11. Changes to this policy">
            <p>
              We may update this policy from time to time. We'll change the "Last updated" date at the top and, for
              anything significant, put a note on the homepage or email people who have an active enquiry with us.
            </p>
          </Section>

          <Section title="12. Contact us">
            <p>
              Questions about this policy, or want to exercise a privacy right?
            </p>
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

          <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
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

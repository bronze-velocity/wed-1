import Link from 'next/link'
import Container from '@/components/layout/Container'
import ContactLink from '@/components/ui/ContactLink'

export const metadata = {
  title: 'How it works — the technical side of a Wepho app',
  description:
    'Built for the messiness of a wedding reception. QR entry, no downloads, mobile-first, offline-tolerant, moderated, and monitored on the night. Here is exactly how a Wepho app behaves on your guests’ phones and on the big screen.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How it works — the technical side of a Wepho app',
    description:
      'QR entry, no downloads, mobile-first, offline-tolerant, moderated, and monitored on the night.',
    type: 'website',
  },
}

const SECTIONS = [
  {
    id: 'access',
    eyebrow: '01 — Getting in',
    heading: 'Zero-install access. Scan and you’re in.',
    body: [
      'Every Wepho app opens in the browser your guests already have. There is no App Store, no download, no password, no email prompt. A guest lifts their phone to a QR on the table card and they are inside the app in the time it takes to put the phone back down.',
      'Every QR points to a specific activity, not a homepage. If the current moment is the toast-time love-letter machine, that is the exact screen a guest lands on — no menus, no navigation, no reading required.',
      'Every event also has a short vanity URL printed underneath the QR, in case someone’s camera app is being difficult. Guests can type it in twelve characters or less.',
      'If someone wants to keep the app on their phone as a keepsake, a modern browser will let them add it to their home screen with two taps. Installing is optional and quiet — never a prerequisite.',
    ],
  },
  {
    id: 'speed',
    eyebrow: '02 — Speed on real venue networks',
    heading: 'Fast on the phones and the connections your guests actually have.',
    body: [
      'A wedding is not a laboratory. Guests are on venue Wi‑Fi they’ve never joined, on carrier data from the middle of a converted barn, on phones that are two upgrades behind. We build for that reality, not the reality of a fibre connection in a design studio.',
      'Every app is built with a small, focused JavaScript bundle — we only ship the code the current activity needs. Images are compressed and served in modern formats. The first screen a guest sees is rendered on the server so it appears before their phone has finished waking up.',
      'When guests tap, the UI responds immediately. Nothing waits on a slow round-trip to feel alive.',
    ],
  },
  {
    id: 'offline',
    eyebrow: '03 — When the Wi-Fi struggles',
    heading: 'Keeps working when the connection doesn’t.',
    body: [
      'Venue Wi‑Fi is the single most common thing that goes wrong at a reception. Wepho apps are built to keep going when it does.',
      'If a guest loses signal mid-submission, the app holds onto what they typed. When their phone reconnects — a few seconds later, on the other side of the room, in the smoking area — the submission syncs on its own. Nothing is lost, and nothing has to be re‑done.',
      'If the backend has a hiccup, the app degrades quietly: it keeps showing what it already has, tells the guest something like “we’ll send this the moment we’re back,” and never falls into a white-screen error state. No one on the dance floor should ever see a stack trace.',
    ],
  },
  {
    id: 'realtime',
    eyebrow: '04 — Real-time, without the noise',
    heading: 'Submissions appear on the big screen while the guest is still smiling about sending them.',
    body: [
      'Every Wepho app has a live connection between guest phones and the big-screen view. When someone answers a trivia question or writes a message, the display reflects it almost immediately — that near-instant feedback is what makes a room lean in.',
      'Real-time also means guarding against too much of a good thing. Every activity has rate limits and pacing built into it, so a table of ten enthusiastic guests can’t drown out the rest of the room or overwhelm the display.',
    ],
  },
  {
    id: 'mobile',
    eyebrow: '05 — Mobile-first, one-handed, dim-lit',
    heading: 'Designed for the phone you’re holding in the hand that isn’t holding a drink.',
    body: [
      'Every screen is portrait-first, with tap targets sized so a slightly tipsy thumb can hit them the first time. Nothing important lives near the top of the phone; you should not need two hands to play.',
      'Type is large. Contrast is high. Colour is never the only signal for meaning. That combination keeps the app legible in the low, warm lighting most receptions use.',
      'The software keyboard never covers the input a guest is typing into. The layout knows about notches, home indicators, and the awkward glass real estate at the edges of a modern phone.',
      'Older phones matter as much as new ones. We build against the reality that the least-technical guest at the least-flagship phone will still be the person the couple most wants to hear from.',
    ],
  },
  {
    id: 'big-screen',
    eyebrow: '06 — The big-screen view',
    heading: 'Designed to look right on a projector across the room.',
    body: [
      'The display view is a separate, purpose-built screen, not the guest app zoomed out. It runs fullscreen, hides cursors and browser chrome, and uses type that reads from thirty feet away.',
      'It adapts to whatever aspect ratio the venue happens to have — a widescreen TV over the bar, a projector at 4:3, a pair of screens flanking the dance floor. Content is composed so nothing important lives at the edges that some venues crop.',
      'When many guests submit at once, the display batches and animates them in a rhythm that feels intentional, not frantic. The screen is part of the room’s pacing, not fighting it.',
    ],
  },
  {
    id: 'moderation',
    eyebrow: '07 — Moderation the couple can trust',
    heading: 'A private queue between guests and the big screen.',
    body: [
      'Anything a guest submits that will be shown to the room passes through a moderation queue first. The MC, a designated friend, or (if you’d rather not think about it) a Wepho operator on standby approves or rejects each item with one tap on their own phone or laptop.',
      'A first-pass profanity and spam filter catches the obvious cases before anyone has to look at them. Anything questionable can be hidden or removed after the fact with the same one-tap flow.',
      'Approvals feel fast in the room because they are: the person moderating is spending seconds per submission, not minutes.',
    ],
  },
  {
    id: 'privacy',
    eyebrow: '08 — Privacy',
    heading: 'No accounts. No harvesting. No living beyond the night.',
    body: [
      'Guests never make an account. We do not ask for an email address, a phone number, or a login. There is no identity to leak because we never collected one.',
      'Each event runs on its own private URL. Nothing about your wedding is visible to any other couple, and nothing about any other couple leaks into yours.',
      'Traffic is encrypted end to end. No third-party ad trackers ever load inside a live wedding app. Guest submissions belong to the couple and are handled according to the retention terms you approve up front.',
      <>
        Full detail on how the marketing site handles data is in our{' '}
        <Link href="/privacy" style={inlineLink}>
          privacy policy
        </Link>
        .
      </>,
    ],
  },
  {
    id: 'day-of',
    eyebrow: '09 — Day-of reliability',
    heading: 'Someone is watching this on the night. It is us.',
    body: [
      'Wepho apps are monitored live during your event. If something starts to drift — a slow response time, a spike of errors, an unexpected surge of traffic — we know about it before anyone in the room does, and we handle it.',
      'Before the wedding, we do a real dress rehearsal on your venue’s network. If the venue Wi‑Fi is unreliable, we plan a mobile-data fallback with your planner and, if it helps, hand your AV lead a short written runbook so nobody is surprised on the day.',
      'A couple of days out, we send a private test link that a few trusted friends or bridal-party members can use to try the app end to end. It is the cheapest possible way to find the one weird thing before the wedding, and it also tends to make the friends who try it very excited.',
    ],
  },
  {
    id: 'accessibility',
    eyebrow: '10 — Accessibility and the keepsake',
    heading: 'Older guests included by default. Nothing evaporates the next morning.',
    body: [
      'Screens are structured with proper labels, so a guest using a screen reader can navigate them. Type sizes work for guests whose reading glasses are on someone else’s table. Nothing important is communicated through colour alone.',
      'After the wedding, the couple gets a private archive of everything that happened inside the app — messages, photos, quiz results, whatever the specific app collected — as a downloadable keepsake. The moment ends; the record doesn’t.',
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <main
      style={{
        background: 'var(--color-bg-subtle)',
      }}
    >
      <section
        style={{
          background: 'var(--gradient-hero)',
          paddingTop: 'calc(var(--nav-height) + var(--space-16))',
          paddingBottom: 'var(--space-20)',
        }}
      >
        <Container narrow>
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
            How it works
          </p>
          <h1
            style={{
              fontSize: 'var(--text-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Built for the messiness of a real reception.
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-6)',
              maxWidth: '620px',
            }}
          >
            No app downloads. No accounts. No &ldquo;please refresh.&rdquo; This page is what a Wepho
            app does, technically, so it holds up on the phones your guests actually have, on the
            Wi‑Fi the venue actually gives you, and on the night the couple actually cares
            about.
          </p>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              maxWidth: '620px',
            }}
          >
            Written for the technically curious couple, and for the planner or venue AV lead who is
            about to ask us the questions below.
          </p>
        </Container>
      </section>

      <section
        className="section-py"
        style={{ background: 'var(--color-bg-subtle)' }}
      >
        <Container narrow>
          <nav
            aria-label="On this page"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6) var(--space-7)',
              marginBottom: 'var(--space-12)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-label)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-3)',
              }}
            >
              On this page
            </p>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-2) var(--space-6)',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="link-underline"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    {stripEyebrowNumber(s.eyebrow)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {SECTIONS.map((section) => (
            <TechSection key={section.id} {...section} />
          ))}

          <div
            style={{
              marginTop: 'var(--space-16)',
              padding: 'var(--space-10) var(--space-8)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Still worried about the one thing we didn’t answer?
            </h2>
            <p
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-8)',
                maxWidth: '540px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Every wedding, and every venue, has its own strange edge. Tell us yours — the
              network, the room, the parts of your guest list you’re nervous about — and
              we’ll talk through how it’ll actually work on the night.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <ContactLink className="btn btn-lg btn-primary">
                Talk through your setup
              </ContactLink>
              <Link href="/moodboard" className="btn btn-lg btn-secondary">
                Start a moodboard
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: 'var(--space-12)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Link href="/" style={inlineLink}>
              &larr; Back to home
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}

function TechSection({ id, eyebrow, heading, body }) {
  return (
    <section
      id={id}
      style={{
        marginBottom: 'var(--space-16)',
        scrollMarginTop: 'calc(var(--nav-height) + var(--space-6))',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-label)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {body.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

function stripEyebrowNumber(eyebrow) {
  const dashIndex = eyebrow.indexOf('—')
  if (dashIndex === -1) return eyebrow
  return eyebrow.slice(dashIndex + 1).trim()
}

const inlineLink = {
  color: 'var(--color-accent)',
  fontWeight: 500,
  textDecoration: 'underline',
}

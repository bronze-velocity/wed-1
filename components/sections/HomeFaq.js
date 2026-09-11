import Link from 'next/link'
import FaqList from '@/components/ui/FaqList'
import { universalFaqs } from '@/data/faqs'

export default function HomeFaq() {
  return (
    <FaqList
      items={universalFaqs}
      fitViewport
      eyebrow="Questions"
      heading="What couples ask before booking"
      subheading="The objections that come up most on discovery calls — grandma, WiFi, price, and whether this is just Kahoot in a nice dress."
      background="var(--color-bg-subtle)"
      footer={
        <>
          Want the technical side — QR entry, offline behaviour, moderation, day-of monitoring?{' '}
          <Link
            href="/how-it-works"
            className="link-underline"
            style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            See how a Wepho app actually works &rarr;
          </Link>
        </>
      }
    />
  )
}

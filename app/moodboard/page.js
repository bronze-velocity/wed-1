import MoodboardWizard from '@/components/moodboard/MoodboardWizard'

const TITLE = 'Design Your Wedding Reception App | Wepho'
const DESCRIPTION =
  'Answer a few questions about your couple and your guests. We’ll match you to the reception experience that fits — including ideas we’ve never built for anyone else.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://wepho.com/moodboard' },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://wepho.com/moodboard',
    type: 'website',
    images: [
      {
        url: '/images/moodboard/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Design your wedding reception app — Wepho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/moodboard/og.jpg'],
  },
}

export default function MoodboardPage() {
  return <MoodboardWizard />
}

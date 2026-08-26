import MoodboardWizard from '@/components/moodboard/MoodboardWizard'

const TITLE = 'Design Your Wedding Reception App | Wepho'
const DESCRIPTION =
  'Choose a reception scene, tell us about your guests, and build a shortlist of custom wedding app directions that fit your room.'

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

export default async function MoodboardPage({ searchParams }) {
  const params = (await searchParams) || {}
  const seed = typeof params.seed === 'string' ? params.seed : null
  const role = params.role === 'planner' ? 'planner' : null
  return <MoodboardWizard initialSeed={seed} role={role} />
}

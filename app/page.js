import HomeHero from '@/components/sections/HomeHero'
import StoryBeat1 from '@/components/sections/StoryBeat1'
import DemoSection from '@/components/sections/DemoSection'
import AppGalleryTeaser from '@/components/sections/AppGalleryTeaser'
import StoryBeat2 from '@/components/sections/StoryBeat2'
import HowItWorks from '@/components/sections/HowItWorks'
import PlannersCallout from '@/components/sections/PlannersCallout'
import FinalCta from '@/components/sections/FinalCta'
import { getApps } from '@/lib/getApps'

export const metadata = {
  title: 'Wepho — Custom Wedding Experience Studio',
  description:
    'A wedding app built around who you actually are. 20 custom interactive apps for your guests — trivia, time capsules, love letters, and more.',
  openGraph: {
    title: 'Wepho — Custom Wedding Experience Studio',
    description:
      'Not a template. Not Kahoot. Built for your wedding, from scratch. Every question is yours.',
  },
}

export default function HomePage() {
  const apps = getApps()

  return (
    <main>
      <HomeHero />
      <StoryBeat1 />
      <DemoSection />
      <AppGalleryTeaser apps={apps} />
      <StoryBeat2 />
      <HowItWorks />
      {/* PriceReframe goes here — T24 */}
      {/* Testimonials goes here — T25 */}
      <PlannersCallout />
      <FinalCta />
    </main>
  )
}

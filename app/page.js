import HomeHero from '@/components/sections/HomeHero'
import StoryBeat1 from '@/components/sections/StoryBeat1'
import DemoSection from '@/components/sections/DemoSection'
import DemoSectionTwo from '@/components/sections/DemoSectionTwo'
import AppGalleryTeaser from '@/components/sections/AppGalleryTeaser'
import StoryBeat2 from '@/components/sections/StoryBeat2'
import HowItWorks from '@/components/sections/HowItWorks'
import SixRules from '@/components/sections/SixRules'
import PaperReframe from '@/components/sections/PaperReframe'
import PlannersCallout from '@/components/sections/PlannersCallout'
import FinalCta from '@/components/sections/FinalCta'
import { getApps } from '@/lib/getApps'

export const metadata = {
  title: 'Wepho — Custom Wedding Experience Studio',
  description:
    'A wedding app built for one couple. Yours. Bring us an idea, or pick one of ours. We build it from scratch — grandma-friendly, phone-out in seconds, and only when the app beats paper.',
  openGraph: {
    title: 'Wepho — Custom Wedding Experience Studio',
    description:
      'Bring us an idea, or pick one of ours. Built from scratch for your wedding. We only build when the app beats paper. ~$2,000.',
  },
}

export default function HomePage() {
  const apps = getApps()

  return (
    <main>
      <HomeHero />
      <StoryBeat1 />
      <DemoSection />
      <DemoSectionTwo />
      <AppGalleryTeaser apps={apps} />
      <StoryBeat2 />
      <HowItWorks />
      <SixRules />
      <PaperReframe />
      {/* PriceReframe goes here — T24 */}
      {/* Testimonials goes here — T25 */}
      <PlannersCallout />
      <FinalCta />
    </main>
  )
}

import AppGalleryFull from '../../components/sections/AppGalleryFull'
import { getApps } from '../../lib/getApps'

export const metadata = {
  title: 'Explore 20 Wedding Apps — Wepho',
  description:
    'Browse all 20 custom wedding experience apps — from live trivia about your relationship to a Love Letter Machine that reads messages aloud in front of the whole room. Filter by vibe or wedding moment to find yours.',
}

export default function AppsPage() {
  const apps = getApps()

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 leading-tight">
            20 apps. One is yours.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            Every app is built around what actually happened between you two — your stories, your guests,
            your night. Filter by the mood you want to create or the moment you want to fill.
          </p>
        </div>

        <AppGalleryFull apps={apps} />
      </div>
    </main>
  )
}

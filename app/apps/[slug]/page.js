import { getAppBySlug, getAppSlugs } from '../../../lib/getApps.js'
import { notFound } from 'next/navigation'
import AppHero from '../../../components/app-page/AppHero.js'
import AppScene from '../../../components/app-page/AppScene.js'
import AppHowItWorks from '../../../components/app-page/AppHowItWorks.js'
import AppBigScreen from '../../../components/app-page/AppBigScreen.js'
import AppIsThisYou from '../../../components/app-page/AppIsThisYou.js'
import AppBookIt from '../../../components/app-page/AppBookIt.js'
import AppFaq from '../../../components/app-page/AppFaq.js'

export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const app = getAppBySlug(slug)
  if (!app) return {}
  return {
    title: app.title,
    description: app.description,
    openGraph: {
      title: `${app.title} — Wepho`,
      description: app.description,
      type: 'website',
    },
  }
}

export default async function AppPage({ params }) {
  const { slug } = await params
  const app = getAppBySlug(slug)
  if (!app) notFound()

  return (
    <main>
      <AppHero app={app} />
      <AppScene app={app} />
      <AppHowItWorks app={app} />
      <AppBigScreen app={app} />
      <AppIsThisYou app={app} />
      <AppBookIt app={app} />
      <AppFaq app={app} />
    </main>
  )
}

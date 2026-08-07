import { notFound } from 'next/navigation'
import PhoneScene from '@/components/appui/PhoneScene'
import { getAppBySlug, getAppSlugs } from '@/lib/getApps'
import { COUPLE_DEFAULT } from '@/lib/couple'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }))
}

export const metadata = { robots: { index: false, follow: false } }

export default async function DevPhonePage({ params }) {
  const { slug } = await params
  const app = getAppBySlug(slug)
  const scene = app?.extended?.deviceScenes?.phone
  if (!app || !scene) notFound()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 24,
      }}
    >
      <div id="phone-target" style={{ display: 'inline-block' }}>
        <PhoneScene scene={scene} couple={COUPLE_DEFAULT} />
      </div>
    </div>
  )
}

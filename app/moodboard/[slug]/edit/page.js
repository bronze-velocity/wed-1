import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import MoodboardWizard from '@/components/moodboard/MoodboardWizard'
import BriefPasswordGate from '@/components/moodboard/results/BriefPasswordGate'
import { getBrief } from '@/lib/moodboard/briefStore'
import { cookieMatchesHash, cookieNameFor } from '@/lib/moodboard/passwords'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit brief | Wepho',
  robots: { index: false, follow: false },
}

export default async function EditBriefPage({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)

  if (!brief) notFound()

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(cookieNameFor(slug))?.value
  const unlocked = cookieMatchesHash(cookieValue, brief.auth?.passwordHash)

  if (!unlocked) {
    return (
      <div style={{ paddingTop: 'var(--nav-height)' }}>
        <BriefPasswordGate slug={slug} />
      </div>
    )
  }

  return (
    <MoodboardWizard
      initialAnswers={brief.answers}
      lockedSlug={slug}
      role={brief.meta?.role ?? null}
    />
  )
}

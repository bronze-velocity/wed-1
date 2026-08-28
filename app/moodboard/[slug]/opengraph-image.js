import { ImageResponse } from 'next/og'
import { getBrief } from '@/lib/moodboard/briefStore'
import { renderMoodboardOgImage } from '@/lib/moodboard/ogImage'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }
export const alt = 'A Wepho wedding app moodboard'

export default async function OpenGraphImage({ params }) {
  const { slug } = await params
  const brief = await getBrief(slug)

  return new ImageResponse(
    renderMoodboardOgImage({
      coupleName: brief?.meta?.coupleName || null,
      threeWords: brief?.results?.threeWords || null,
    }),
    { ...size }
  )
}

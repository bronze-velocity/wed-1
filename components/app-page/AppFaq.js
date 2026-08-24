import FaqList from '@/components/ui/FaqList'
import { getFaqsForApp, universalFaqs } from '@/data/faqs'

export default function AppFaq({ app }) {
  const perApp = getFaqsForApp(app.slug)
  const items = [...perApp, ...universalFaqs]
  if (items.length === 0) return null

  return (
    <FaqList
      items={items}
      eyebrow="Questions"
      heading={`Common questions about ${app.title}`}
      subheading="The objections that come up most on discovery calls — plus a few Wepho-wide ones every couple asks."
      background="var(--color-bg-subtle)"
    />
  )
}

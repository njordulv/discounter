import { getCategoryName } from '@/utils/functions'
import { notFound } from 'next/navigation'
import AllDeals from '@/components/emag/AllDeals'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const tagName = getCategoryName(decodedSlug)

  if (!tagName) {
    notFound()
  }

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {tagName}
      </h1>
      <AllDeals slug={decodedSlug} />
    </>
  )
}

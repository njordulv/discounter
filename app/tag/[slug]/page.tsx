import { getCategoryName } from '@/utils/functions'
import { notFound } from 'next/navigation'
import AllDeals from '@/components/emag/AllDeals'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const category = getCategoryName(decodedSlug)

  if (!category) {
    notFound()
  }

  return (
    <>
      <h1 className="text-2xl font-medium">{category}</h1>
      <AllDeals slug={decodedSlug} />
    </>
  )
}

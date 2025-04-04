import { notFound } from 'next/navigation'
import { slugToName } from '@/utils/functions'
import AllDeals from '@/components/emag/AllDeals'

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const title = slugToName(slug)

  if (!title) return notFound()

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {title}
      </h1>
      <AllDeals slug={slug} />
    </>
  )
}

export default Page

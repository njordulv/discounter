import { slugToName } from '@/utils/functions'
import { notFound } from 'next/navigation'
import { Discover } from '@/components/tags'
import AllDeals from '@/components/emag/AllDeals'

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const title = slugToName(slug)

  if (!title) return notFound()

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {title}
      </h1>
      <Discover slug={slug} />
      <AllDeals slug={slug} />
    </>
  )
}

export default Page

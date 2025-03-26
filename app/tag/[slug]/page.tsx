import { getCategoryName } from '@/utils/functions'
import { notFound } from 'next/navigation'
import TagCats from '@/components/TagCats'
import AllDeals from '@/components/emag/AllDeals'

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const title = getCategoryName(slug)

  if (!title) notFound()

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {title}
      </h1>
      <TagCats slug={slug} />
      <AllDeals slug={slug} />
    </>
  )
}

export default Page

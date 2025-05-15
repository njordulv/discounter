import { notFound } from 'next/navigation'
import { slugToName } from '@/utils'
import Deals from '@/components/emag/Deals'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = slugToName(slug)

  if (!title) {
    return notFound()
  }

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {title}
      </h1>
      <Deals slug={slug} />
    </>
  )
}

import { Discover, CatsList } from '@/components/tags'

export const Hero = ({ slug }: { slug: string | undefined }) => {
  if (!slug) return null

  return (
    <>
      <Discover slug={slug} />
      <CatsList />
    </>
  )
}

import { Discover, CatsList } from '@/components/tags'

export const Hero = ({ slug }: { slug: string }) => {
  return (
    <>
      <Discover slug={slug!} />
      <CatsList slug={slug!} />
    </>
  )
}

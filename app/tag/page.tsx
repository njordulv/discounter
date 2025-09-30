import { Discover, CatsList } from '@/components/tags'

export default function Page() {
  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">All Categories</h1>
      <Discover slug="" />
      <CatsList />
    </>
  )
}

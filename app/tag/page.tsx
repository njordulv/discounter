import { Discover, CatsList } from '@/components/tags'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {config.text.categories}
      </h1>
      <Discover slug="" showCount={false} />
      <CatsList />
    </>
  )
}

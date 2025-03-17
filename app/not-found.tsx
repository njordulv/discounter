import config from '@/config'
import NotFound from '@/components/ui/NotFound'

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-medium text-foreground">
          {config.pages.notFound.error}
        </h1>
        <h2 className="text-lg font-medium text-foreground">
          {config.pages.notFound.title}
        </h2>
      </div>
      <NotFound />
    </>
  )
}

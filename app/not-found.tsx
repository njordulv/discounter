import config from '@/config'
import NotFound from '@/components/ui/NotFound'

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-14rem)] justify-center align-center flex flex-col items-center gap-4">
      <h1 className="text-4xl font-medium text-foreground">
        {config.pages.notFound.error}
      </h1>
      <h2 className="text-lg font-medium text-foreground">
        {config.pages.notFound.title}
      </h2>
      <NotFound />
    </div>
  )
}

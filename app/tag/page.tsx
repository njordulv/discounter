import Link from 'next/link'
import config from '@/config'

export default function Page() {
  const tags = config.emag.categories

  return (
    <div className="m-auto w-full max-w-4xl">
      <h1 className="sm:text-4xl text-2xl text-left font-medium text-foreground">
        Popular Categories
      </h1>
      <div className="grid grid-cols-4 gap-2 my-8">
        {Object.entries(tags).map(([key, item]) => (
          <Link
            href={`/tag/${item.slug}`}
            key={key}
            className="w-full flex gap-3 p-3 border rounded-lg bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-all"
          >
            <span className="flex items-center justify-center border min-w-13 min-h-13 bg-[hsl(var(--foreground))] rounded-full">
              {item.icon && (
                <item.icon size={36} color="hsl(var(--background))" />
              )}
            </span>
            <h3 className="text-foreground">{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

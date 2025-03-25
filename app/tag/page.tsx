import Link from 'next/link'
import { catsConfig } from '@/config/categories'

export default function Page() {
  const tags = catsConfig

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        Popular Categories
      </h1>
      <div className="grid grid-cols-1 gap-3 my-8">
        {Object.entries(tags).map(([key, item]) => (
          <section
            key={key}
            className="w-full flex flex-col gap-4 p-3 border rounded-lg bg-[hsl(var(--card))] transition-all"
          >
            <h2 className="text-2xl font-medium text-primary">{item.name}</h2>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-4 gap-2">
              <li>
                <Link
                  key={key}
                  href={`/tag/${item.slug}`}
                  className="w-full flex gap-3 p-3 border rounded-lg bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-all"
                >
                  <span className="flex items-center justify-center border min-w-13 min-h-13 bg-[hsl(var(--foreground))] rounded-lg">
                    {item.icon && (
                      <item.icon size={36} color="hsl(var(--background))" />
                    )}
                  </span>
                  {item.name}
                </Link>
              </li>
              {Object.values(item.subcategories).map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/tag/${sub.slug}`}
                    className="w-full flex gap-3 p-3 border rounded-lg bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-all"
                  >
                    <span className="flex items-center justify-center border min-w-13 min-h-13 bg-[hsl(var(--foreground))] rounded-lg">
                      {sub.icon && (
                        <sub.icon size={36} color="hsl(var(--background))" />
                      )}
                    </span>
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

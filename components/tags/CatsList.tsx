'use client'

import { catsConfig } from '@/config/categories'

export const CatsList = () => {
  const cats = catsConfig

  if (!cats) return null

  return (
    <ul className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6 pb-6">
      {Object.values(cats).map((item) => (
        <li key={item.slug}>
          <a
            href={`/tag/${item.slug}`}
            className="flex flex-col items-center text-center flex-nowrap gap-3 leading-5 w-full text-sm"
          >
            {item.icon && (
              <item.icon
                size={30}
                color="hsl(var(--secondary))"
                className="w-full h-full p-4 shadow-sm bg-[hsl(var(--foreground))] hover:scale-90 rounded-lg transition-all duration-300"
              />
            )}
            <p>{item.name}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}

import { useMemo } from 'react'
import { catsConfig } from '@/config/categories'

const TagCats = ({ slug }: { slug: string }) => {
  const category = useMemo(() => {
    return Object.values(catsConfig).find((cat) => {
      return cat.slug === slug
    })
  }, [slug])

  const hasSubCats = useMemo(() => {
    if (category && category.subcategories) {
      return Object.values(category.subcategories).map((item) => (
        <li key={item.slug}>
          <a
            href={`/tag/${item.slug}`}
            className="flex flex-col items-center text-center flex-nowrap gap-3 leading-5 w-full text-md"
          >
            {item.icon && (
              <item.icon
                size={30}
                color="hsl(var(--secondary))"
                className="w-full h-full p-4 shadow-sm bg-[hsl(var(--foreground))] rounded-lg"
              />
            )}
            <p>{item.name}</p>
          </a>
        </li>
      ))
    }
    return null
  }, [category])

  if (!hasSubCats) return null

  return <ul className="grid grid-cols-10 gap-4">{hasSubCats}</ul>
}

export default TagCats

import { LuTag, LuHouse, LuLayoutList } from 'react-icons/lu'
import Link from 'next/link'
import config from '@/config'

export const Categories = () => {
  const cats = [
    {
      name: config.emag.categories.livingRoom.name,
      slug: config.emag.categories.livingRoom.slug,
    },
    {
      name: config.emag.categories.pcComponents.name,
      slug: config.emag.categories.pcComponents.slug,
    },
  ]

  return (
    <>
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/" className="flex items-center gap-3">
            <LuHouse size={23} color="hsl(var(--muted-foreground))" /> Home
          </Link>
        </li>
        <li>
          <Link href="/all-deals" className="flex items-center gap-3">
            <LuTag size={23} color="hsl(var(--muted-foreground))" /> All Deals
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <LuLayoutList size={23} color="hsl(var(--muted-foreground))" />{' '}
        Categories:
      </div>
      <ul className="flex flex-col gap-4">
        {cats.map((cat) => (
          <li key={cat.slug} className="pl-9">
            <Link href={`/tag/${cat.slug}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

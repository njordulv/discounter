import Link from 'next/link'
import config from '@/config'

const Categories = () => {
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
    <ul className="flex items-center gap-4">
      {cats.map((cat) => (
        <li key={cat.slug}>
          <Link href={`/tag/${cat.slug}`}>{cat.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Categories

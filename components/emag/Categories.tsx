'use client'

import {
  LuTag,
  LuHouse,
  LuLayoutList,
  LuSofa,
  LuUtensils,
  LuCar,
  LuShirt,
  LuSprayCan,
  LuPuzzle,
  LuWrench,
  LuSmartphone,
  LuPlug,
  LuSpeaker,
  LuMonitor,
} from 'react-icons/lu'
import Link from 'next/link'
import config from '@/config'

export const Categories = () => {
  const cats = [
    {
      name: config.emag.categories.livingRoom.name,
      slug: config.emag.categories.livingRoom.slug,
      icon: <LuSofa size={20} />,
    },
    {
      name: config.emag.categories.cooking.name,
      slug: config.emag.categories.cooking.slug,
      icon: <LuUtensils size={20} />,
    },
    {
      name: config.emag.categories.auto.name,
      slug: config.emag.categories.auto.slug,
      icon: <LuCar size={20} />,
    },
    {
      name: config.emag.categories.clothing.name,
      slug: config.emag.categories.clothing.slug,
      icon: <LuShirt size={20} />,
    },
    {
      name: config.emag.categories.perfumes.name,
      slug: config.emag.categories.perfumes.slug,
      icon: <LuSprayCan size={20} />,
    },
    {
      name: config.emag.categories.toys.name,
      slug: config.emag.categories.toys.slug,
      icon: <LuPuzzle size={20} />,
    },
    {
      name: config.emag.categories.cleaning.name,
      slug: config.emag.categories.cleaning.slug,
      icon: <LuWrench size={20} />,
    },
    {
      name: config.emag.categories.casesAndCards.name,
      slug: config.emag.categories.casesAndCards.slug,
      icon: <LuSmartphone size={20} />,
    },
    {
      name: config.emag.categories.mda.name,
      slug: config.emag.categories.mda.slug,
      icon: <LuPlug size={20} />,
    },
    {
      name: config.emag.categories.audioAndVideo.name,
      slug: config.emag.categories.audioAndVideo.slug,
      icon: <LuSpeaker size={20} />,
    },
    {
      name: config.emag.categories.pcComponents.name,
      slug: config.emag.categories.pcComponents.slug,
      icon: <LuMonitor size={20} />,
    },
  ]

  return (
    <>
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/" className="flex items-center gap-3">
            <LuHouse size={20} color="hsl(var(--muted-foreground))" /> Home
          </Link>
        </li>
        <li>
          <Link href="/all-deals" className="flex items-center gap-3">
            <LuTag size={20} color="hsl(var(--muted-foreground))" /> All Deals
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <LuLayoutList size={20} color="hsl(var(--muted-foreground))" />{' '}
        Categories:
      </div>
      <ul className="flex flex-col gap-1">
        {cats.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/tag/${cat.slug}`}
              className="flex py-1 px-2 items-center text-[hsl(var(--muted-foreground))] hover:text-white w-full hover:bg-[hsl(var(--accent))] rounded-sm"
            >
              {cat.icon && <span className="mr-2 text-white">{cat.icon}</span>}
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

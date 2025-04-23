import Link from 'next/link'
import { useMemo } from 'react'
import { SheetClose } from '@/components/ui/sheet'
import { catsConfig } from '@/config/categories'
import config from '@/config'

export const Categories = () => {
  const menu = useMemo(() => config.mainMenu, [])
  const cats = useMemo(() => catsConfig, [])

  const menuItems = useMemo(
    () =>
      Object.entries(menu).map(([key, item]) => (
        <li key={key}>
          <SheetClose asChild>
            <Link
              href={item.slug}
              className="flex py-1 px-2 items-center gap-3 text-[hsl(var(--muted-foreground))] dark:hover:text-white w-full hover:bg-[hsl(var(--accent))] rounded-sm"
            >
              {item.icon && <item.icon size={20} color="hsl(var(--primary))" />}
              <span>{item.name}</span>
            </Link>
          </SheetClose>
        </li>
      )),
    [menu]
  )

  const catsItems = useMemo(
    () =>
      Object.values(cats).map((cat) => (
        <li key={cat.slug}>
          <SheetClose asChild>
            <Link
              href={`/tag/${cat.slug}`}
              className="flex py-1 px-2 items-center gap-3 text-[hsl(var(--muted-foreground))] dark:hover:text-white w-full hover:bg-[hsl(var(--accent))] rounded-sm"
            >
              {cat.icon && <cat.icon size={20} color="hsl(var(--primary))" />}
              <span>{cat.name}</span>
            </Link>
          </SheetClose>
        </li>
      )),
    [cats]
  )

  return (
    <>
      <ul className="flex flex-col gap-1">{menuItems}</ul>
      <hr className="border-input" />
      <ul className="flex flex-col gap-1">{catsItems}</ul>
    </>
  )
}

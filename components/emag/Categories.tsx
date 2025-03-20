import Link from 'next/link'
import { SheetClose } from '@/components/ui/sheet'
import config from '@/config'

export const Categories = () => {
  const menu = config.emag.mainMenu
  const cats = config.emag.categories

  return (
    <>
      <ul className="flex flex-col gap-1">
        {Object.entries(menu).map(([key, item]) => (
          <li key={key}>
            <SheetClose asChild>
              <Link
                href={item.slug}
                className="flex py-1 px-2 items-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-white w-full hover:bg-[hsl(var(--accent))] rounded-sm"
              >
                {item.icon && (
                  <item.icon
                    size={20}
                    color="hsl(var(--secondary-foreground))"
                  />
                )}
                <span>{item.name}</span>
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
      <hr className="border-input" />
      <ul className="flex flex-col gap-1">
        {Object.values(cats).map((cat) => (
          <li key={cat.slug}>
            <SheetClose asChild>
              <Link
                href={`/tag/${cat.slug}`}
                className="flex py-1 px-2 items-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-white w-full hover:bg-[hsl(var(--accent))] rounded-sm"
              >
                {cat.icon && (
                  <cat.icon
                    size={20}
                    color="hsl(var(--secondary-foreground))"
                  />
                )}
                <span>{cat.name}</span>
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </>
  )
}

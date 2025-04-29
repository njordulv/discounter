'use client'

import Link from 'next/link'
import { createContext, useContext } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { catsConfig } from '@/config/categories'
import { useStore } from '@/store'
import { SidebarMenuListProps } from '@/interfaces/ui'
import { ThemeToggle } from '@/components/ThemeToggle'
import Logo from '@/components/Logo'
import config from '@/config'

interface SidebarUIContextProps {
  open: boolean
  setOpen: (value: boolean) => void
  animate: boolean
}

const SidebarUIContext = createContext<SidebarUIContextProps | undefined>(
  undefined
)

export const useSidebar = () => {
  const context = useContext(SidebarUIContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export const SidebarProvider = ({
  children,
  animate = true,
}: {
  children: React.ReactNode
  animate?: boolean
}) => {
  const open = useStore((state) => state.openSidebar)
  const setOpen = useStore((state) => state.setOpenSidebar)

  return (
    <SidebarUIContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarUIContext.Provider>
  )
}

export const Sidebar = ({
  children,
  animate,
}: {
  children: React.ReactNode
  animate?: boolean
}) => {
  return <SidebarProvider animate={animate}>{children}</SidebarProvider>
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return <DesktopSidebar {...props} />
}

export const SidebarContent = () => {
  const { open, animate } = useSidebar()

  return (
    <motion.div
      className="aside-wrapper"
      animate={{ width: animate ? (open ? '253px' : '32px') : '253px' }}
    >
      <Logo />
      <div className="mt-8 flex flex-col gap-1">
        <SidebarMenu />
        <hr className="border-input my-1" />
        <CategoryMenu />
        <hr className="border-input mt-1" />
        <div className="min-w-fit flex items-center gap-2 text-secondary-foreground">
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()

  return (
    <motion.aside
      className={cn(
        'h-full hidden md:flex md:flex-col bg-card w-[47px] bg-card p-2 border-input border-r shrink-0',
        className
      )}
      animate={{ width: animate ? (open ? '268px' : '47px') : '268px' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.aside>
  )
}

export const SidebarMenuList = ({
  items,
  ariaLabel,
  hrefPattern = '/{slug}',
}: SidebarMenuListProps) => {
  const pathname = usePathname()

  return (
    <nav aria-label={ariaLabel}>
      <ul>
        {items.map(({ slug, name, icon: Icon }) => {
          const href = hrefPattern.replace('{slug}', slug)
          const isActive = pathname === href

          return (
            <li key={slug}>
              <Link
                href={href}
                className="flex items-center gap-2 px-1 py-2 rounded-sm transition-all hover:bg-[hsl(var(--accent))]"
              >
                <Icon
                  size={23}
                  className={cn(
                    'shrink-0',
                    isActive ? 'text-primary' : 'text-secondary'
                  )}
                />
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export const SidebarMenu = () => (
  <SidebarMenuList
    items={Object.values(config.mainMenu)}
    ariaLabel="Main menu"
    hrefPattern="{slug}"
  />
)

export const CategoryMenu = () => (
  <SidebarMenuList
    items={Object.values(catsConfig)}
    ariaLabel="Categories"
    hrefPattern="/tag/{slug}"
  />
)

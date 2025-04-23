'use client'

import Link, { LinkProps } from 'next/link'
import { createContext, useContext } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { catsConfig } from '@/config/categories'
import { useStore } from '@/store'
import { ThemeToggle } from '@/components/ThemeToggle'
import config from '@/config'
import SVGIcon from '@/components/ui/SVGIcon'

type CategoryItem = (typeof catsConfig)[keyof typeof catsConfig]

type SidebarLinkProps =
  | { link: { label: string; href: string; icon: React.ReactNode } }
  | { category: CategoryItem }

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
      className="flex flex-1 flex-col overflow-hidden fixed w-[34px]"
      animate={{ width: animate ? (open ? '262px' : '34px') : '262px' }}
    >
      <Logo />
      <div className="mt-8 flex flex-col gap-1">
        {Object.values(config.mainMenu).map((item) => (
          <SidebarLink key={item.slug} category={item} />
        ))}
        <hr className="border-input my-2" />
        {Object.values(catsConfig).map((item) => (
          <SidebarLink key={item.slug} category={item} />
        ))}
        <hr className="border-input mt-2" />
        <Theme />
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
        'h-full p-2 hidden md:flex md:flex-col bg-card w-[50px] shrink-0',
        className
      )}
      animate={{ width: animate ? (open ? '288px' : '50px') : '288px' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.aside>
  )
}

export const SidebarLink = ({
  className,
  ...props
}: SidebarLinkProps & { className?: string; props?: LinkProps }) => {
  const isCategory = 'category' in props
  const label = isCategory ? props.category.name : props.link.label
  const href = isCategory ? `/tag/${props.category.slug}` : props.link.href
  const Icon = isCategory ? props.category.icon : null
  const icon = isCategory
    ? Icon && (
        <Icon
          size={22}
          className="shrink-0 text-secondary group-hover/sidebar:text-[hsl(var(--primary))] transition-colors duration-200"
        />
      )
    : props.link.icon

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-start gap-2 transition-all duration-200 group/sidebar py-2 px-1 rounded-sm hover:bg-[hsl(var(--accent))]',
        className
      )}
      {...props}
    >
      {icon}
      <span className="text-secondary text-sm group-hover/sidebar:translate-x-1 transition duration-200 whitespace-pre !p-0 !m-0">
        {label}
      </span>
    </Link>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-secondary-foreground"
      >
        <SVGIcon width={162} height={32} />
      </motion.span>
    </Link>
  )
}

export const Theme = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-w-fit flex items-center gap-2 text-secondary-foreground"
    >
      <ThemeToggle />
    </motion.div>
  )
}

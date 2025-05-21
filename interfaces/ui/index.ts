import { ButtonHTMLAttributes } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/Button'

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode
  text?: string | number
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export interface StoreProps {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  setTotalPages: (page: number) => void
  tagProducts: number
  setTagProducts: (products: number) => void
  isGridView: boolean
  setIsGridView: (value: boolean) => void
  perPage: number
  setPerPage: (page: number) => void
  openSidebar: boolean
  setOpenSidebar: (value: boolean) => void
  sortOrder: string
  setSortOrder: (order: string) => void
}

export interface MotionCardVariants {
  initial: {
    opacity: number
    scale: number
    y: number
  }
  animate: {
    opacity: number
    scale: number
    y: number
  }
  transition: {
    delay: number
    duration: number
    type: 'spring' | 'tween' | 'inertia'
    bounce: number
  }
}

export interface SidebarItem {
  name: string
  slug: string
  icon: React.ElementType
}

export interface SidebarMenuListProps {
  items: SidebarItem[]
  ariaLabel: string
  hrefPattern?: string
}

export interface Suggestion {
  title: string
  image: string
  _id: string
}

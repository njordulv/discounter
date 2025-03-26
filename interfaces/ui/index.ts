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
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  setTotalPages: (page: number) => void
  tagProducts: number
  setTagProducts: (products: number) => void
}

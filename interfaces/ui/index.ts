import { ReactNode } from 'react'

export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'round'
  color?: 'orange' | 'sky' | 'cyan' | 'gray'
  text?: string | number
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

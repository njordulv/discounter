import { ReactNode } from 'react'

export interface ButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'round'
  color?: 'orange' | 'sky' | 'cyan' | 'gray' | 'primary' | 'secondary'
  text?: string | number
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

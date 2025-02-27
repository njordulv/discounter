import { ReactNode } from 'react'

export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'orange' | 'sky' | 'cyan'
  text: string
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import type { BaseButtonProps } from '@/interfaces/ui'

export const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'default',
      outline: 'outline',
      ghost: 'ghost',
      destructive: 'destructive',
    },
    size: {
      sm: 'h-8 px-2 text-sm rounded-sm min-w-8',
      md: 'h-10 px-4 text-sm rounded-md',
      lg: 'h-12 px-6 text-lg rounded-md',
      icon: 'h-10 w-10 p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export const Button: React.FC<BaseButtonProps> = ({
  variant,
  size,
  icon,
  text,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(className, buttonVariants({ variant, size }))}
      {...props}
    >
      {text}
      {icon ? <span>{icon}</span> : null}
    </button>
  )
}

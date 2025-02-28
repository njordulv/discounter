import { twMerge } from 'tailwind-merge'
import { ButtonProps } from '@/interfaces/ui'
import config from '@/config'

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  color = 'orange',
  text,
  onClick,
  icon,
  type = 'button',
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        'flex gap-2 justify-center items-center border rounded-full py-1 px-7 sm:w-fit w-full cursor-pointer transition-all',
        config.sizes[size],
        config.colors[color],
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      {text} {icon}
    </button>
  )
}

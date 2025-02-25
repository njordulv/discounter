interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text: string
  icon?: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  size,
  text,
  onClick,
  icon,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-2 justify-center items-center text-${size} bg-orange-500/60 border border-orange-500/70 rounded-full py-1 px-7 w-fit text-orange-50 hover:bg-orange-500/80 hover:text-white cursor-pointer transition-all`}
    >
      {text} {icon}
    </button>
  )
}

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
      className={`flex gap-2 justify-center items-center text-${size} bg-sky-500/30 border border-sky-500/50 rounded-full py-2 px-10 w-fit text-sky-50 hover:bg-sky-500/60 hover:text-white cursor-pointer transition-all`}
    >
      {text} {icon}
    </button>
  )
}

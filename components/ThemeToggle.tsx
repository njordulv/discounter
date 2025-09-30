'use client'

import { useState, useEffect } from 'react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import config from '@/config'

const toggleClass =
  'text-sm font-medium flex items-center gap-2 py-2 px-7 transition-colors relative z-10 cursor-pointer'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isPressed, setIsPressed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLight = theme === 'light'
  const isDark = theme === 'dark'

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center gap-2 p-1">
      {theme === 'dark' ? <IoMoonOutline size={20} className="w-6" /> : <IoSunnyOutline size={20} className="w-6" />}
      <div
        className={cn(
          'relative flex items-center border-0 rounded-full transition-all',
          isLight ? 'bg-input' : 'bg-gray-950',
        )}
      >
        <button
          type="button"
          className={cn(toggleClass, isLight ? 'text-secondary-foreground' : ' text-muted-foreground')}
          onClick={handleClick}
          aria-label={config.theme.switchToDark}
          title={config.theme.labelLight}
        >
          {config.theme.light}
        </button>
        <button
         type="button"
          className={cn(toggleClass, isDark ? 'text-secondary' : ' text-muted-foreground')}
          onClick={handleClick}
          aria-label={config.theme.switchToLight}
          title={config.theme.labelDark}
        >
          {config.theme.dark}
        </button>
        <div className={cn('absolute inset-0 z-0 flex', isDark ? 'justify-end' : 'justify-start')}>
          <motion.span
            layout
            animate={{
              width: isPressed ? '70%' : '50%',
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 250 }}
            className="h-full w-1/2 rounded-full bg-secondary shadow-md"
          />
        </div>
      </div>
    </div>
  )
}

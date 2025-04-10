'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useStore } from '@/store'

export const ThemeSync = () => {
  const { theme } = useTheme()
  const setThemeStore = useStore((state) => state.setTheme)

  useEffect(() => {
    if (theme) {
      setThemeStore(theme as 'dark' | 'light')
    }
  }, [theme, setThemeStore])

  return null
}

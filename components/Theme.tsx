'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState(theme === 'dark')

  const handleChange = (value: boolean) => {
    setChecked(value)
    setTimeout(() => {
      setTheme(value ? 'dark' : 'light')
    }, 150)
  }

  return (
    <div className="flex items-center gap-4 transition-colors duration-300">
      <Switch
        id="theme-toggle"
        checked={checked}
        onCheckedChange={handleChange}
      />
      <Label
        htmlFor="theme-toggle"
        className="text-[hsl(var(--muted-foreground))] transition-colors duration-300"
      >
        {checked ? 'Dark' : 'Light'} Mode
      </Label>
    </div>
  )
}

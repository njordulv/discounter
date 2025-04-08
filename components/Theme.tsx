'use client'

import { useTheme } from 'next-themes'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const themeHandler = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center gap-4">
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={themeHandler}
      />
      <Label
        htmlFor="theme-toggle"
        className="text-[hsl(var(--muted-foreground))]"
      >
        {theme === 'dark' ? 'Dark' : 'Light'} Mode
      </Label>
    </div>
  )
}

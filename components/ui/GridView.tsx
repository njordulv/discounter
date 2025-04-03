import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export const GridView = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="grid-mode">{checked ? 'Grid View' : 'List View'}</Label>
      <Switch id="grid-mode" checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}

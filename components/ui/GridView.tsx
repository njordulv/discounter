import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useStore } from '@/store'

export const GridView = () => {
  const { isGridView, setIsGridView } = useStore()

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="grid-mode">
        {isGridView ? 'Grid View' : 'List View'}
      </Label>
      <Switch
        id="grid-mode"
        checked={isGridView}
        onCheckedChange={setIsGridView}
      />
    </div>
  )
}

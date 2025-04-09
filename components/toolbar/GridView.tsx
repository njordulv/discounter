import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useStore } from '@/store'
import { useHasHydrated } from '@/hooks/useHasHydrated'
import { GridViewSkeleton } from '@/components/ui/Skeletons'

export const GridView = () => {
  const { isGridView, setIsGridView } = useStore()
  const hasHydrated = useHasHydrated()

  if (!hasHydrated) return <GridViewSkeleton />

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

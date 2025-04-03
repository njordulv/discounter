import { GridView } from '@/components/ui/GridView'

export const Toolbar = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-row justify-between space-y-1.5 p-6">
      <div className="filters"></div>
      <GridView />
    </div>
  )
}

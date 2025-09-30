import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore } from '@/store'
import { useHasHydrated } from '@/hooks/useHasHydrated'
import { ListingSkeleton } from '@/components/ui/Skeletons'
import config from '@/config'

export function Order() {
  const { sortOrder, setSortOrder, setCurrentPage } = useStore()
  const hasHydrated = useHasHydrated()

  if (!hasHydrated) return <ListingSkeleton />

  const handleSortOrder = (value: string) => {
    setSortOrder(value === 'default' ? '' : value)
    setCurrentPage(1)
  }

  return (
    <Select onValueChange={handleSortOrder} defaultValue={sortOrder || 'default'}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder={sortOrder} />
      </SelectTrigger>
      <SelectContent className="bg-card">
        <SelectGroup>
          <SelectLabel>{config.sorting.sortBy}</SelectLabel>
          <SelectItem value="default">{config.sorting.default}</SelectItem>
          <SelectItem value="price_asc">{config.sorting.priceAsc}</SelectItem>
          <SelectItem value="price_desc">{config.sorting.priceDesc}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

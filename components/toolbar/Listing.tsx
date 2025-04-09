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
import { PAGINATION } from '@/config/constants'
import config from '@/config'

export function Listing() {
  const { perPage, setPerPage, setCurrentPage } = useStore()
  const hasHydrated = useHasHydrated()

  if (!hasHydrated) return <ListingSkeleton />

  const handlePerPage = (value: string) => {
    setPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <Select onValueChange={handlePerPage} defaultValue={perPage.toString()}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder={config.pagination.productsPerPage} />
      </SelectTrigger>
      <SelectContent className="bg-card">
        <SelectGroup>
          <SelectLabel>{config.pagination.productsPerPage}</SelectLabel>
          {PAGINATION.PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option} {config.pagination.perPage}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

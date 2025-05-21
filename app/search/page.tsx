import { Suspense } from 'react'
import Loader from '@/components/ui/Loader'
import SearchResults from '@/components/SearchResults'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchResults />
    </Suspense>
  )
}

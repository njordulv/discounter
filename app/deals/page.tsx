import { Suspense } from 'react'
import Loader from '@/components/ui/Loader'
import Deals from '@/components/emag/Deals'

export default function Page() {
  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">All Deals</h1>
      <Suspense fallback={<Loader />}>
        <Deals slug="" />
      </Suspense>
    </>
  )
}

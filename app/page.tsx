'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/app/hooks/useFetcher'
import Loader from '@/components/Loader'
import getTodayDeals from '@/utils/getTodayDeals'
import { DealProps } from '@/interfaces'
import { ItemSkeleton } from '@/components/Skeletons'
import config from '@/config'

const EmagItem = dynamic(
  () => import('@/components/EmagItem').then((mod) => mod.EmagItem),
  {
    loading: () => <ItemSkeleton />,
  }
)

export default function Page() {
  const { data, error, isLoading } = useFetcher({ url: '/api/scrape' })

  const url = getTodayDeals()
  console.log('URL:', url)

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        🔥 {config.emag.title} Hot Deals
      </h1>
      {data && (
        <div className="m-auto w-full max-w-4xl">
          <ul className="space-y-4 grid grid-cols-2 gap-3">
            {data.map((deal: DealProps) => (
              <EmagItem key={deal.title} deal={deal} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

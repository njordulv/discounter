'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/Loader'
import { DealProps } from '@/interfaces'
import { ItemSkeleton } from '@/components/Skeletons'

const Item = dynamic(
  () => import('@/components/emag/Item').then((mod) => mod.Item),
  {
    loading: () => <ItemSkeleton />,
  }
)

function AllDeals() {
  const { data, error, isLoading } = useFetcher({
    url: '/api/deals',
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {data && (
        <div className="m-auto w-full max-w-4xl">
          <ul className="space-y-4 grid grid-cols-2 gap-3">
            {data.map((deal: DealProps, index: number) => (
              <Item key={index} deal={deal} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default AllDeals

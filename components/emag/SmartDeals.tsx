'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/ui/Loader'
import { ItemSkeleton } from '@/components/ui/Skeletons'
import { DealProps } from '@/interfaces/emag'
import { Button } from '@/components/ui/Button'

const Item = dynamic(
  () => import('@/components/emag/Item').then((mod) => mod.Item),
  {
    loading: () => <ItemSkeleton />,
  }
)

function SmartDeals() {
  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/smart-deals',
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  const deals = data?.data?.product_collection

  return (
    <>
      {deals && (
        <div className="m-auto w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-3 mt-8">
            {deals.map((deal: DealProps) => (
              <Item
                key={deal.id}
                name={deal.name}
                image={deal.image}
                url={deal.url}
                offer={deal.offer}
              />
            ))}
          </div>
        </div>
      )}
      <Button
        size="md"
        variant="outline"
        text="All Deals"
        className="!w-fit"
        onClick={() => window.open('/all-deals', '_self')}
      />
    </>
  )
}

export default SmartDeals

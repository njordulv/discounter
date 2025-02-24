'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/Button'
import { DealProps } from '@/interfaces/emag'

const Item = dynamic(
  () => import('@/components/emag/Item').then((mod) => mod.Item),
  {
    loading: () => <Loader />,
  }
)

function TodayDeals() {
  const { data, error, isLoading } = useFetcher({
    url: '/api/deals/emag',
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  const deals = data?.data?.product_collection

  return (
    <>
      {deals && (
        <div className="m-auto w-full max-w-4xl">
          <ul className="space-y-4 grid grid-cols-2 gap-3">
            {deals.map((deal: DealProps) => (
              <Item
                key={deal.id}
                name={deal.name}
                image={deal.image}
                url={deal.url}
                offer={deal.offer}
              />
            ))}
          </ul>
        </div>
      )}
      <Button
        text="All Deals"
        onClick={() => window.open('/all-deals', '_self')}
      />
    </>
  )
}

export default TodayDeals

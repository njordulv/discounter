'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/Loader'
import { DealProps } from '@/interfaces/emag'

const Item = dynamic(
  () => import('@/components/emag/Item').then((mod) => mod.Item),
  {
    loading: () => <Loader />,
  }
)

function AllDeals() {
  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/all-deals',
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  const deals = data?.results[0]

  return (
    <>
      {console.log(deals)}
      {/* {deals && (
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
      )} */}
    </>
  )
}

export default AllDeals

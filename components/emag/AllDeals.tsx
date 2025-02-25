'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/Loader'
import { CardSkeleton } from '@/components/Skeletons'
import { CardProps } from '@/interfaces/emag/categories'

const Card = dynamic(
  () => import('@/components/emag/Card').then((mod) => mod.Card),
  {
    loading: () => <CardSkeleton />,
  }
)

function AllDeals() {
  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/categories',
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  if (!Array.isArray(data)) {
    return <div>Data format is incorrect</div>
  }

  return (
    <div className="m-auto w-full max-w-4xl">
      <ul className="grid grid-cols-1 gap-3 p-4">
        {data.map((product: CardProps) => (
          <Card key={product.title} {...product} />
        ))}
      </ul>
    </div>
  )
}

export default AllDeals

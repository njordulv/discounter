'use client'

import dynamic from 'next/dynamic'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/Loader'
import { CardProps } from '@/interfaces/emag/categories'

const Card = dynamic(
  () => import('@/components/emag/Card').then((mod) => mod.Card),
  {
    loading: () => <Loader />,
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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data.map((product: CardProps) => (
        <Card key={product.title} {...product} />
      ))}
    </ul>
  )
}

export default AllDeals

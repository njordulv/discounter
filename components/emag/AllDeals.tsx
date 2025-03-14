'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import useFetcher from '@/hooks/useFetcher'
import useScrollTrigger from '@/hooks/useScrollTrigger'
import Loader from '@/components/ui/Loader'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { CardProps } from '@/interfaces/emag'
import config from '@/config'

const Card = dynamic(
  () => import('@/components/emag/card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function AllDeals() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [accumulatedData, setAccumulatedData] = useState<CardProps[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const perPage = 20

  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/all-deals',
    params: { page: currentPage, perPage },
  })

  useEffect(() => {
    if (data?.data) {
      setAccumulatedData((prev) => [...prev, ...data.data])
      setTotalPages(data.meta.totalPages)
      setIsFetching(false)
    }
  }, [data])

  const loadMore = () => {
    if (currentPage < totalPages && !isFetching && !isLoading) {
      setIsFetching(true)
      setCurrentPage((prev) => prev + 1)
    }
  }

  useScrollTrigger(
    () => {
      loadMore()
    },
    200,
    200
  )

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="m-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-3">
        {accumulatedData.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>

      {isLoading && <Loader />}

      {data?.meta && currentPage >= data.meta.totalPages && (
        <div className="mt-6 text-center text-muted-foreground">
          {config.messages.endOfDeals}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setAccumulatedData={setAccumulatedData}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default AllDeals

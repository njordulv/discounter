'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import useFetcher from '@/hooks/useFetcher'
import useScrollTrigger from '@/hooks/useScrollTrigger'
import Loader from '@/components/ui/Loader'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { CardProps } from '@/interfaces/emag'
import config from '@/config'

const Card = dynamic(
  () => import('@/components/emag/Card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function AllDeals() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [accumulatedData, setAccumulatedData] = useState<CardProps[]>([])
  const isFetchingRef = useRef(false)
  const perPage = 20

  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/all-deals',
    params: { page: currentPage, perPage },
  })

  const total = data?.meta?.totalPages

  useEffect(() => {
    if (data?.data) {
      setAccumulatedData((prev) => [...prev, ...data.data])
      setTotalPages(data.meta.totalPages)
    }
    isFetchingRef.current = false
  }, [data])

  const loadMore = () => {
    if (currentPage < totalPages && !isFetchingRef.current) {
      isFetchingRef.current = true
      setCurrentPage((prev) => prev + 1)
    }
  }

  useScrollTrigger(() => {
    if (!isLoading) loadMore()
  }, 500)

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="m-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-3">
        {accumulatedData.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>

      {isLoading && <Loader />}

      {currentPage >= total && (
        <div className="mt-6 text-center text-muted-foreground">
          {config.messages.endOfDeals}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={total}
        setAccumulatedData={setAccumulatedData}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default AllDeals

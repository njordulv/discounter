'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/ui/Loader'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { CardProps } from '@/interfaces/emag'
import config from '@/config'

const Card = dynamic(
  () => import('@/components/emag/card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function AllDeals({ slug }: { slug: string }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [accumulatedData, setAccumulatedData] = useState<CardProps[]>([])
  const perPage = 20
  const categoryPath = Object.values(config.emag.categories).find(
    (cat) => cat.slug === slug
  )?.path

  const { data, error, isLoading } = useFetcher({
    url: categoryPath
      ? `/api/emag/all-deals?${new URLSearchParams({
          category: categoryPath,
          page: currentPage.toString(),
          perPage: perPage.toString(),
        })}`
      : `/api/emag/all-deals`,
  })

  useEffect(() => {
    if (data?.data) {
      setAccumulatedData((prev) => [...prev, ...data.data])
      setTotalPages(data.meta.totalPages)
    }
  }, [data])

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="m-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-2">
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

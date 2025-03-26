'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useMemo } from 'react'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/ui/Loader'
import { useStore } from '@/store'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { ScrapeProps } from '@/interfaces/emag'
import config from '@/config'

const Card = dynamic(
  () => import('@/components/emag/card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function AllDeals({ slug }: { slug: string }) {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    setTagProducts,
  } = useStore()
  const [accumulatedData, setAccumulatedData] = useState<ScrapeProps[]>([])
  const perPage = 20

  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    })
    if (slug) params.append('category', slug.toLowerCase())
    return params.toString()
  }, [slug, currentPage])

  const { data, error, isLoading } = useFetcher({
    url: `/api/emag/all-deals?${queryParams}`,
  })

  useEffect(() => {
    if (!data?.data) return
    setAccumulatedData((prev) =>
      currentPage === 1 ? data.data : [...prev, ...data.data]
    )
    setTotalPages(data.meta.totalPages)
    setTagProducts(data.meta.totalItems)
  }, [data, currentPage, setTagProducts, setTotalPages])

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-2">
        {accumulatedData.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>

      {isLoading && <Loader />}

      {data?.meta && currentPage >= data.meta.totalPages && (
        <div className="mt-6 text-center text-muted">
          {config.messages.endOfDeals}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setAccumulatedData={setAccumulatedData}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default AllDeals

'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/ui/Loader'
import { Discover } from '@/components/tags'
import { useStore } from '@/store'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { Toolbar } from '@/components/toolbar'
import type { ScrapeProps } from '@/interfaces/emag'
import styles from '@/styles/Products.module.scss'
import config from '@/config'

const Card = dynamic(
  () => import('@/components/emag/card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function Deals({ slug }: { slug: string }) {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    setTagProducts,
    isGridView,
    perPage,
    sortOrder,
  } = useStore()
  const [accumulatedData, setAccumulatedData] = useState<ScrapeProps[]>([])
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    })
    if (slug) params.append('category', slug.toLowerCase())
    if (sortOrder) params.append('sort', sortOrder)
    if (search) params.append('search', search)

    return params.toString()
  }, [slug, currentPage, perPage, sortOrder, search])

  const { data, error, isLoading } = useFetcher({
    url: `/api/emag/deals?${queryParams}`,
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
      <Discover slug={slug} />
      <Toolbar />
      <div
        className={`${styles.card__items} ${
          isGridView ? styles['card__items--grid'] : styles['card__items--list']
        }`}
      >
        {accumulatedData.map((product, index) => (
          <Card key={product._id} {...product} index={index} />
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

export default Deals

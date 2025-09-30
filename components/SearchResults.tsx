'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/ui/Loader'
import { useStore } from '@/store'
import { Pagination } from '@/components/emag/Pagination'
import { CardSkeleton, DiscoverSkeleton } from '@/components/ui/Skeletons'
import { Discover } from '@/components/tags'
import type { ScrapeProps } from '@/interfaces/emag'
import { Toolbar } from '@/components/toolbar'
import styles from '@/styles/Products.module.scss'

const Card = dynamic(
  () => import('@/components/emag/card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

const SearchResults = () => {
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
  const query = searchParams.get('q') || ''

  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    })
    if (sortOrder) params.append('sort', sortOrder)
    if (query) params.append('search', query)

    return params.toString()
  }, [currentPage, perPage, sortOrder, query])

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
  }, [data, currentPage, setTotalPages, setTagProducts])

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        Search for &quot;{query}&quot;
      </h1>
      {isLoading ? <DiscoverSkeleton /> : <Discover slug={query} />}
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

export default SearchResults

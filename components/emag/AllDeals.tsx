'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import useFetcher from '@/hooks/useFetcher'
import useScrollTrigger from '@/hooks/useScrollTrigger'
import Loader from '@/components/ui/Loader'
import { CardSkeleton } from '@/components/ui/Skeletons'
import { CardProps } from '@/interfaces/emag'

const Card = dynamic(
  () => import('@/components/emag/Card').then((mod) => mod.Card),
  { loading: () => <CardSkeleton /> }
)

function AllDeals() {
  const [currentPage, setCurrentPage] = useState(1)
  const [accumulatedData, setAccumulatedData] = useState<CardProps[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const isFetchingRef = useRef(false) // Флаг, чтобы избежать лишних вызовов
  const perPage = 20

  const { data, error, isLoading } = useFetcher({
    url: '/api/emag/all-deals',
    params: { page: currentPage, perPage },
  })

  useEffect(() => {
    if (data?.data) {
      setAccumulatedData((prev) => [...prev, ...data.data])
      setTotalPages(data.meta.totalPages)
    }
    isFetchingRef.current = false // Сбрасываем флаг после успешной загрузки
  }, [data])

  const loadMore = () => {
    if (currentPage < totalPages && !isFetchingRef.current) {
      isFetchingRef.current = true // Ставим флаг, чтобы избежать повторных вызовов
      setCurrentPage((prev) => prev + 1)
    }
  }

  useScrollTrigger(() => {
    if (!isLoading) loadMore()
  }, 500)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setAccumulatedData([]) // Очищаем старые данные
      setCurrentPage((p) => p - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setAccumulatedData([]) // Очищаем старые данные
      setCurrentPage((p) => p + 1)
    }
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="m-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-3">
        {accumulatedData.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>

      {isLoading && <Loader />}

      {currentPage >= totalPages && (
        <div className="mt-6 text-center text-muted-foreground">
          Вы достигли конца списка
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>

        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllDeals

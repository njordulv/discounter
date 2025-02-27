'use client'

import { GrNext, GrPrevious } from 'react-icons/gr'
import { Button } from '@/components/ui/Button'
import { CardProps } from '@/interfaces/emag'

interface PaginationProps {
  currentPage: number
  totalPages: number
  setAccumulatedData: (data: CardProps[]) => void
  setCurrentPage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setAccumulatedData,
  setCurrentPage,
}) => {
  const handleFirstPage = () => {
    if (currentPage >= 1) {
      setAccumulatedData([])
      setCurrentPage(1)
    }
  }

  const handleLastPage = () => {
    setAccumulatedData([])
    setCurrentPage(totalPages)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setAccumulatedData([])
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setAccumulatedData([])
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
      <div className="m-auto w-full max-w-xl flex items-center justify-between gap-4">
        <span className="flex items-end gap-1">
          <Button
            size="round"
            color="gray"
            text="1"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          ...
        </span>
        <Button
          size="round"
          color="gray"
          icon={<GrPrevious size={13} />}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Page
          <span className="inline-flex justify-center items-center bg-cyan-300/10 rounded-full w-8 h-8 text-orange-400">
            {currentPage}
          </span>
          of
          <span className="inline-flex justify-center items-center bg-cyan-300/10 rounded-full w-8 h-8">
            {totalPages}
          </span>
        </div>
        <Button
          size="round"
          color="gray"
          icon={<GrNext size={13} />}
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        />
        <span className="flex items-end gap-1">
          ...
          <Button
            size="round"
            color="gray"
            text={totalPages}
            onClick={handleLastPage}
            disabled={currentPage >= totalPages}
          />
        </span>
      </div>
    </div>
  )
}

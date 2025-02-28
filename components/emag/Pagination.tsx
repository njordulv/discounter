'use client'

import { GrNext, GrPrevious } from 'react-icons/gr'
import { RxDotsHorizontal } from 'react-icons/rx'
import { Button } from '@/components/ui/Button'
import { PaginationProps } from '@/interfaces/emag'
import config from '@/config'

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
    <div className="fixed bottom-0 left-0 right-0 p-3 px-3 bg-black">
      <div className="m-auto w-full max-w-xl flex items-center justify-between gap-3">
        <div className="flex items-end gap-1">
          <Button
            size="round"
            color="gray"
            text="1"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          <RxDotsHorizontal />
        </div>
        <div className="flex items-center sm:gap-4 gap-2 text-sm text-muted-foreground">
          <Button
            size="round"
            color="gray"
            icon={<GrPrevious size={13} />}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
          <div className="flex items-center gap-1">
            <span>{config.pagination.page}</span>
            <span className="inline-flex justify-center w-6 items-center text-orange-400">
              {currentPage}
            </span>
          </div>
          <Button
            size="round"
            color="gray"
            icon={<GrNext size={13} />}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          />
        </div>
        <div className="flex items-end gap-1">
          <RxDotsHorizontal />
          <Button
            size="round"
            color="gray"
            text={totalPages}
            onClick={handleLastPage}
            disabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </div>
  )
}

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
    <div className="fixed bottom-0 left-0 right-0 p-3 px-3 bg-card text-card-foreground border border-t-1">
      <div className="m-auto w-full max-w-xl flex items-center justify-between gap-3">
        <div className="flex items-end gap-2">
          <Button
            size="sm"
            variant="outline"
            text="1"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          <RxDotsHorizontal />
        </div>
        <div className="flex items-center sm:gap-4 gap-2 text-sm text-muted-foreground">
          <Button
            size="sm"
            variant="outline"
            icon={<GrPrevious size={13} />}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
          <div className="flex items-center gap-1">
            <span>{config.pagination.page}</span>
            <span className="flex-inline items-center text-center w-7 text-lg font-semibold bg-gradient !bg-clip-text text-transparent">
              {currentPage}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            icon={<GrNext size={13} />}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          />
        </div>
        <div className="flex items-end gap-2">
          <RxDotsHorizontal />
          <Button
            size="sm"
            variant="outline"
            text={totalPages}
            onClick={handleLastPage}
            disabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </div>
  )
}

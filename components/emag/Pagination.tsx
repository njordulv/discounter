'use client'

import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Button } from '@/components/ui/Button'
import type { PaginationProps } from '@/interfaces/emag'
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
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-card text-card-foreground border border-t-1">
      <div className="m-auto w-full max-w-2xl flex items-center justify-between gap-3">
        <div className="flex items-end gap-2">
          <Button
            size="sm"
            variant="outline"
            text="1"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          <span className="text-muted-foreground tracking-wide">...</span>
        </div>
        <div className="flex items-center sm:gap-4 gap-2 text-sm text-muted-foreground">
          <Button
            size="sm"
            variant="outline"
            icon={<TbChevronLeft size={18} />}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
          <div className="flex items-center gap-1">
            <span>{config.pagination.page}</span>
            <span className="flex-inline items-center text-center min-w-8 text-lg font-semibold bg-gradient !bg-clip-text text-transparent">
              {currentPage}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            icon={<TbChevronRight size={18} />}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          />
        </div>
        <div className="flex items-end gap-2">
          <span className="text-muted-foreground tracking-wide">...</span>
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

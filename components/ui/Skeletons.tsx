import { forwardRef } from 'react'
import { useStore } from '@/store'

export const ItemSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      className="animate-pulse w-full flex items-start sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden rounded-lg border bg-card text-card-foreground"
    >
      <div className="flex items-start w-24 h-24 bg-transparent rounded-lg">
        <svg
          className="w-24 h-24 text-primary/50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-full overflow-hidden">
        <div className="h-4 bg-primary/20 rounded-md w-full mb-3"></div>
        <div className="h-4 bg-primary/20 rounded-md w-3/5 mb-6"></div>
        <div className="h-7 bg-primary/20 rounded-md w-4/5 mb-10"></div>
        <div className="h-8 bg-primary/20 rounded-md w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

ItemSkeleton.displayName = 'ItemSkeleton'

export const CardSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  const { isGridView } = useStore()

  return (
    <div
      ref={ref}
      role="status"
      className={`animate-pulse w-full grid items-start sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden rounded-lg border bg-card text-card-foreground ${
        isGridView ? 'grid-cols-[1fr]' : 'grid-cols-[auto_1fr]'
      }`}
    >
      <div
        className={`flex items-start bg-secondary rounded-lg p-4 ${
          isGridView ? 'w-full h-52' : 'w-24 h-24 sm:w-full sm:max-w-44 sm:h-44'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="2 4 16 10"
          fill="currentColor"
          className="w-full h-full text-primary/50"
          aria-hidden="true"
        >
          <path d="M12.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div>
        <div className="h-5 bg-primary/20 rounded-md w-full mb-2"></div>
        <div className="h-5 bg-primary/20 rounded-md w-3/5 mb-4"></div>
        <div
          className={`flex flex-wrap flex-start mb-3 gap-x-2 gap-y-1 ${
            isGridView ? '' : 'sm:mb-12'
          }`}
        >
          <div className="h-5 bg-primary/20 rounded-md w-full max-w-28"></div>
          <div className="h-5 bg-primary/20 rounded-md w-full max-w-20"></div>
          <div className="h-5 bg-primary/20 rounded-md w-full max-w-20"></div>
          <div className="h-5 bg-primary/20 rounded-md w-full max-w-32"></div>
        </div>
        <div className="h-10 bg-primary/20 rounded-md w-full max-w-52"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

CardSkeleton.displayName = 'CardSkeleton'

export const GridViewSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} role="status" className="animate-pulse w-full max-w-[76px]">
      <div className="w-full">
        <div className="flex h-9 items-center justify-end gap-2">
          <div className="h-6 bg-primary/20 rounded-md w-full max-w-6"></div>
          <div className="h-6 bg-primary/20 rounded-full w-full max-w-11"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

GridViewSkeleton.displayName = 'GridViewSkeleton'

export const ListingSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} role="status" className="animate-pulse w-full max-w-44">
      <div className="w-full flex justify-self-end">
        <div className=" w-full h-9 bg-primary/20 rounded-lg"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

ListingSkeleton.displayName = 'ListingSkeleton'

export const DiscoverSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} role="status" className="animate-pulse w-full mb-4">
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 bg-muted rounded-md w-3/4"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

DiscoverSkeleton.displayName = 'DiscoverSkeleton'

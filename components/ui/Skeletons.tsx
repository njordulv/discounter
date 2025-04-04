import { forwardRef } from 'react'

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
  return (
    <div
      ref={ref}
      role="status"
      className="animate-pulse w-full flex items-start sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden rounded-lg border bg-card text-card-foreground"
    >
      <div className="flex items-start w-44 h-44 bg-transparent rounded-md">
        <svg
          className="w-44 h-44 text-primary/50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-full overflow-hidden">
        <div className="h-5 bg-primary/20 rounded-md w-full mb-2"></div>
        <div className="h-5 bg-primary/20 rounded-md w-3/5 mb-3"></div>
        <div className="flex gap-3 mb-12">
          <div className="h-6 bg-primary/20 rounded-md w-full max-w-20"></div>
          <div className="h-6 bg-primary/20 rounded-md w-full max-w-20"></div>
          <div className="h-6 bg-primary/20 rounded-md w-full max-w-20"></div>
          <div className="h-6 bg-primary/20 rounded-md w-full max-w-32"></div>
        </div>
        <div className="h-10 bg-primary/20 rounded-md w-full max-w-96"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

CardSkeleton.displayName = 'CardSkeleton'

export const GridViewSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} role="status" className="animate-pulse w-full">
      <div className="w-full overflow-hidden">
        <div className="flex items-center justify-end gap-2">
          <div className="h-3.5 bg-primary/20 rounded-md w-full max-w-16"></div>
          <div className="h-6 bg-primary/20 rounded-full w-full max-w-11"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
})

GridViewSkeleton.displayName = 'GridViewSkeleton'

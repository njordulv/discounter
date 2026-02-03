'use client'

import { slugToName, getMonth, getYear } from '@/utils'
import { useStore } from '@/store'
import config from '@/config'

export const Discover = ({
  slug,
  showCount = true,
}: {
  slug: string
  showCount?: boolean
}) => {
  const { tagProducts } = useStore()

  return (
    <p className="w-full flex gap-1 mb-4 text-foreground dark:text-shadow-2xs">
      {showCount ? (
        <>
          <span>
            {tagProducts || <span className="animate-pulse w-4">0</span>} deals
            in {slugToName(slug) || ''} ·
          </span>
          <span>
            {config.site.locale} · {getMonth()} {getYear()}
          </span>
        </>
      ) : (
        <span>
          {`All deals in ${config.site.locale} · ${getMonth()} ${getYear()}.`}
        </span>
      )}
    </p>
  )
}

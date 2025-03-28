'use client'

import { getMonth, getYear } from '@/utils/functions'
import { useStore } from '@/store'
import config from '@/config'

export const Discover = ({ slug }: { slug: string }) => {
  const { tagProducts } = useStore()

  return (
    <p className="w-full flex sm:flex-row flex-col gap-1 mb-4 text-foreground">
      <span>
        <b>{tagProducts}</b>{' '}
        {tagProducts === 1 ? 'deal & offer' : 'deals & offers'}.
      </span>
      <span>{`Discover ${slug || 'all'} offers and sales in ${
        config.site.locale
      }, ${getMonth()} ${getYear()}.`}</span>
    </p>
  )
}

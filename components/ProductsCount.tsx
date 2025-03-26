'use client'

import { getMonth, getYear } from '@/utils/functions'
import config from '@/config'

export const ProductsCount = ({
  tagProducts,
  slug,
}: {
  tagProducts: number
  slug: string
}) => {
  return (
    <p className="w-full flex sm:flex-row flex-col gap-1 mb-8 text-foreground">
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

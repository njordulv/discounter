'use client'

import { getMonth, getYear } from '@/utils/functions'
import config from '@/config'

export const ProductsCount = ({
  tagProducts,
  categoryPath,
}: {
  tagProducts: number
  categoryPath: string
}) => {
  return (
    <p className="flex items-center gap-1 mb-8 text-foreground">
      <span>
        <b>{tagProducts}</b>{' '}
        {tagProducts === 1 ? 'deal & offer' : 'deals & offers'}.
      </span>
      <span>{`Discover ${categoryPath || 'all'} offers and sales in ${
        config.site.locale
      }, ${getMonth()} ${getYear()}.`}</span>
    </p>
  )
}

'use client'

import { slugToName, getMonth, getYear } from '@/utils/functions'
import { useStore } from '@/store'
import config from '@/config'

export const Discover = ({ slug }: { slug: string }) => {
  const { tagProducts } = useStore()

  return (
    <p className="w-full flex sm:flex-row flex-col gap-1 mb-4 text-foreground">
      {tagProducts > 0 && (
        <span>
          <b>{tagProducts}</b>{' '}
          {tagProducts === 1 ? 'deal and offer' : 'deals and offers'}.
        </span>
      )}
      <span>{`Discover ${
        slugToName(slug)
          ? 'offers and sales in'
          : 'the best deals and discounts in'
      } ${config.site.locale}, ${getMonth()} ${getYear()}.`}</span>
    </p>
  )
}

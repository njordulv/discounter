'use client'

import Image from 'next/image'
import Link from 'next/link'
import { StockProps } from '@/interfaces/emag'
import { formatPrice, shortenText } from '@/utils/functions'
import { useStore } from '@/store'
import config from '@/config'
import styles from '@/styles/Products.module.scss'

export const Heading = ({ title }: { title: string }) => {
  const { isGridView } = useStore()
  const MAX_TITLE_LENGTH = 60

  return (
    <h2
      className={`text-foreground font-semibold ${
        isGridView ? 'mb-1 text-sm' : 'mb-1 sm:mb-3 text-md'
      }`}
    >
      {isGridView ? shortenText(title, MAX_TITLE_LENGTH) : title}
    </h2>
  )
}

export const Discount = ({
  discount,
  isGenius,
}: {
  discount: number
  isGenius: boolean | undefined
}) => {
  return (
    <span
      className={`${styles.card__discount} ${
        isGenius
          ? 'bg-gradient-to-b bg-gradient-genius'
          : 'bg-gradient-to-b bg-gradient'
      }`}
      title={isGenius ? 'Genius Deals' : undefined}
    >
      <b>{`-${discount}%`}</b>
    </span>
  )
}

export const Genius = () => {
  return (
    <span
      className={`${styles.card__discount} bg-gradient-genius`}
      title="Genius Deals"
    >
      <b>Genius</b>
    </span>
  )
}

export const Img = ({
  imageUrl,
  title,
  width,
  height,
}: {
  imageUrl: string
  title: string
  width?: number
  height?: number
}) => {
  const { isGridView } = useStore()

  return (
    <Image
      className={`${styles.card__image} ${
        isGridView
          ? 'w-auto h-52 sm:w-full sm:h-auto'
          : 'w-24 h-24 sm:w-44 sm:h-44'
      }`}
      src={imageUrl}
      alt={title}
      width={width || 176}
      height={height || 176}
      priority={false}
      placeholder="blur"
      blurDataURL={config.imageBase64}
    />
  )
}

export const NewPrice = ({ price }: { price?: number }) => (
  <span className="text-xl font-semibold bg-gradient inline !bg-clip-text text-transparent">
    {price !== undefined ? formatPrice(price) : '—'} {config.emag.currency}
  </span>
)

export const OldPrice = ({ oldPrice }: { oldPrice: number }) => (
  <span className="text-md line-through text-muted-foreground">
    {oldPrice !== undefined ? formatPrice(oldPrice) : '—'}{' '}
    {config.emag.currency}
  </span>
)

export const StockStatus: React.FC<{ stockInfo: StockProps }> = ({
  stockInfo,
}) => {
  const { stockOut, stockLimited, toOrder, stock } = stockInfo

  return (
    <>
      {stockOut && (
        <span className="rounded-md px-3 text-sm text-[hsl(var(--destructive-foreground))]">
          {stockOut}
        </span>
      )}
      {stockLimited && (
        <span className="rounded-md px-3 text-sm bg-[hsl(var(--destructive))] text-destructive">
          {stockLimited}
        </span>
      )}
      {toOrder && (
        <span className="rounded-md px-3 text-sm bg-muted text-card-foreground">
          {toOrder}
        </span>
      )}
      {stock && (
        <span className="rounded-md px-3 text-sm bg-[lightseagreen] text-card-foreground">
          {stock}
        </span>
      )}
    </>
  )
}

export const LinkToShop = ({ store }: { store: string }) => {
  return (
    <span className="text-sm sm:text-base text-muted-foreground">
      {config.card.shop}
      <Link
        className="text-sm hover:text-[hsl(var(--primary))] transition"
        href={config.emag.url}
      >
        {store}
      </Link>
    </span>
  )
}

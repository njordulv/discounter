import Image from 'next/image'
import Link from 'next/link'
import { StockProps } from '@/interfaces/emag'
import config from '@/config'

export const Discount = ({
  discount,
  isGenius,
}: {
  discount: string
  isGenius: boolean | undefined
}) => {
  return (
    <span
      className={`absolute w-20 h-20 rotate-[-45deg] left-[-40px] top-[-40px] ${
        isGenius
          ? 'bg-gradient-to-b bg-gradient-genius'
          : 'bg-gradient-to-b bg-gradient'
      }`}
      title={isGenius ? 'Genius Deals' : undefined}
    >
      <b className="absolute rotate-[45deg] text-xs text-primary-foreground font-normal left-7 top-14">
        {discount}
      </b>
    </span>
  )
}

export const Genius = () => {
  return (
    <span
      className="absolute bg-gradient-genius left-[-40px] top-[-40px] w-20 h-20 rotate-[-45deg]"
      title="Genius Deals"
    >
      <b className="absolute rotate-[45deg] text-foreground text-xs font-normal left-3 top-14">
        Genius
      </b>
    </span>
  )
}

export const Img = ({
  imageUrl,
  title,
}: {
  imageUrl: string
  title: string
}) => {
  return (
    <Image
      src={imageUrl}
      alt={title}
      width={176}
      height={176}
      className="sm:w-44 sm:h-44 w-28 h-28 object-cover aspect-square rounded-lg border border-cyan-900/60"
      priority={false}
      placeholder="blur"
      blurDataURL={config.imageBase64}
    />
  )
}

export const NewPrice = ({ price }: { price: string | null }) => (
  <span className="text-xl font-semibold bg-gradient inline !bg-clip-text text-transparent">
    {price}
  </span>
)

export const OldPrice = ({ oldPrice }: { oldPrice: string | null }) => (
  <span className="text-md line-through text-muted-foreground">{oldPrice}</span>
)

export const StockStatus: React.FC<{ stockInfo: StockProps }> = ({
  stockInfo,
}) => {
  const { stockOut, stockLimited, toOrder, stock } = stockInfo

  return (
    <div className="flex rounded-md px-2 py-1 text-sm bg-muted">
      {stockOut && (
        <span className="text-[hsl(var(--accent))]">{stockOut}</span>
      )}
      {stockLimited && (
        <span className="text-[hsl(var(--primary))]">{stockLimited}</span>
      )}
      {toOrder && <span className="text-orange-400">{toOrder}</span>}
      {stock && (
        <span className="text-[hsl(var(--accent-foreground))]">{stock}</span>
      )}
    </div>
  )
}

export const LinkToShop = () => {
  return (
    <span className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">
      {config.card.shop}
      <Link
        className="text-white hover:text-[hsl(var(--primary))] transition-all"
        href={config.emag.url}
      >
        {config.emag.title}
      </Link>
    </span>
  )
}

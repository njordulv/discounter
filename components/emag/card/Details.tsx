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
      className="sm:w-44 sm:h-44 w-28 h-28 object-cover aspect-square rounded-lg bg-background border"
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

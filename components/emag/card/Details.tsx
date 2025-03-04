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
          ? 'bg-gradient-to-b from-[#090171] to-[#ff005a]'
          : 'bg-gradient-to-b from-cyan-600 to-cyan-900'
      }`}
      title={isGenius ? 'Genius Deals' : undefined}
    >
      <b className="absolute rotate-[45deg] text-xs font-normal left-7 top-14">
        {discount}
      </b>
    </span>
  )
}

export const Genius = () => {
  return (
    <span
      className="absolute bg-gradient-to-b from-[#090171] to-[#ff005a] left-[-40px] top-[-40px] w-20 h-20 rotate-[-45deg]"
      title="Genius Deals"
    >
      <b className="absolute rotate-[45deg] text-xs font-normal left-3 top-14">
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
  <span className="text-xl font-semibold text-orange-400">{price}</span>
)

export const OldPrice = ({ oldPrice }: { oldPrice: string | null }) => (
  <span className="text-md line-through text-slate-400">{oldPrice}</span>
)

export const StockStatus: React.FC<{ stockInfo: StockProps }> = ({
  stockInfo,
}) => {
  const { stockOut, stockLimited, toOrder, stock } = stockInfo

  return (
    <>
      {stockOut && (
        <span className="text-green-400 text-sm sm:text-base">{stockOut}</span>
      )}
      {stockLimited && (
        <span className="text-red-500 text-sm sm:text-base">
          {stockLimited}
        </span>
      )}
      {toOrder && (
        <span className="text-orange-400 text-sm sm:text-base">{toOrder}</span>
      )}
      {stock && (
        <span className="text-green-400 text-sm sm:text-base">{stock}</span>
      )}
    </>
  )
}

export const LinkToShop = () => {
  return (
    <span className="text-gray-400 text-sm sm:text-base">
      {config.card.shop}
      <Link
        className="text-white hover:text-orange-500 transition-all"
        href={config.emag.url}
      >
        {config.emag.title}
      </Link>
    </span>
  )
}

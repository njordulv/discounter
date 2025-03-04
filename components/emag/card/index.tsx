import { TbExternalLink } from 'react-icons/tb'
import { CardProps } from '@/interfaces/emag'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import {
  Discount,
  Genius,
  Img,
  NewPrice,
  OldPrice,
  StockStatus,
  LinkToShop,
} from '@/components/emag/card/Details'
import { Button } from '@/components/ui/Button'
import { CardSkeleton } from '@/components/ui/Skeletons'

export const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  price,
  oldPrice,
  discount,
  isGenius,
  stock,
  stockOut,
  stockLimited,
  toOrder,
  link,
}) => {
  const { ref, isVisible } = useLazyLoad()

  if (!isVisible) return <CardSkeleton ref={ref} />

  return (
    <div
      ref={ref}
      className="flex sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden border border-cyan-900/60 bg-gradient-to-b from-cyan-800/10 to-cyan-800/20 rounded-lg shadow"
    >
      {discount && <Discount discount={discount} isGenius={isGenius} />}
      {isGenius && !discount && <Genius />}
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Img imageUrl={imageUrl} title={title} />
      )}
      <div className="flex flex-col sm:gap-4 gap-2 justify-between">
        <div className="flex flex-col sm:gap-4 gap-1 justify-between h-full">
          <div>
            <h2 className="sm:text-lg text-md font-semibold sm:mb-3">
              {title}
            </h2>
            <div className="flex sm:flex-row flex-col sm:gap-2 sm:items-end">
              {price && <NewPrice price={price} />}
              {oldPrice && <OldPrice oldPrice={oldPrice} />}
              <StockStatus
                stockInfo={{ stockOut, stockLimited, toOrder, stock }}
              />
              <LinkToShop />
            </div>
          </div>
          <Button
            size="sm"
            color="orange"
            text="Get Deal"
            onClick={() => window.open(link, '_blank')}
            icon={<TbExternalLink size={21} />}
          />
        </div>
      </div>
    </div>
  )
}

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
      className="flex sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden rounded-lg border bg-card/9 text-card-foreground"
    >
      {discount && <Discount discount={discount} isGenius={isGenius} />}
      {isGenius && !discount && <Genius />}
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Img imageUrl={imageUrl} title={title} />
      )}
      <div className="flex flex-col sm:gap-4 gap-2 justify-between w-full">
        <div className="flex flex-col sm:gap-4 gap-1 justify-between h-full">
          <div>
            <h2 className="text-md text-foreground font-semibold sm:mb-3">
              {title}
            </h2>
            <div className="grid auto-cols-max sm:flex sm:flex-wrap sm:items-center">
              {price && <NewPrice price={price} />}
              {oldPrice && <OldPrice oldPrice={oldPrice} />}
              <StockStatus
                stockInfo={{ stockOut, stockLimited, toOrder, stock }}
              />
              <LinkToShop />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-3">
            <Button
              size="md"
              variant="default"
              text="Get Deal"
              disabled={false}
              onClick={() => window.open(link, '_blank')}
              icon={<TbExternalLink size={18} />}
            />
            <div className="bg-transparent w-full h-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

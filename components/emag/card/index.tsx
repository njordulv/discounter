import { TbExternalLink } from 'react-icons/tb'
import { ScrapeProps } from '@/interfaces/emag'
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
import { useStore } from '@/store'
import styles from '@/styles/Products.module.scss'

export const Card: React.FC<ScrapeProps> = ({
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
  store,
}) => {
  const { ref, isVisible } = useLazyLoad()
  const { isGridView } = useStore()

  if (!isVisible) return <CardSkeleton ref={ref} />

  return (
    <div ref={ref} className={`${styles.card__item}`}>
      {discount && <Discount discount={discount} isGenius={isGenius} />}
      {isGenius && !discount && <Genius />}
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Img
          imageUrl={imageUrl}
          title={title}
          width={isGridView ? 216 : 176}
          height={isGridView ? 216 : 176}
        />
      )}

      <div className="flex flex-col sm:gap-4 gap-1 justify-between h-full">
        <div>
          <h2
            className={`text-foreground font-semibold ${
              isGridView ? 'mb-1 text-sm' : 'mb-1 sm:mb-3 text-md'
            }`}
          >
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {price && <NewPrice price={price} />}
            {oldPrice && <OldPrice oldPrice={oldPrice} />}
            <StockStatus
              stockInfo={{ stockOut, stockLimited, toOrder, stock }}
            />
            <LinkToShop store={store} />
          </div>
        </div>
        <div className="grid gap-3 items-center grid-cols-1 max-w-52">
          <Button
            size="md"
            variant="default"
            text="Get Deal"
            disabled={false}
            onClick={() => window.open(link, '_blank')}
            icon={<TbExternalLink size={18} />}
          />
        </div>
      </div>
    </div>
  )
}

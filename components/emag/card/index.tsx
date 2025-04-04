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
          <h2 className="text-md text-foreground font-semibold sm:mb-3">
            {title}
          </h2>
          <div className="grid auto-cols-max sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            {price && <NewPrice price={price} />}
            {oldPrice && <OldPrice oldPrice={oldPrice} />}
            <StockStatus
              stockInfo={{ stockOut, stockLimited, toOrder, stock }}
            />
            <LinkToShop store={store} />
          </div>
        </div>
        <div
          className={`grid gap-3 items-center ${
            isGridView ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
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
  )
}

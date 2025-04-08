import { motion as m } from 'framer-motion'
import { TbExternalLink } from 'react-icons/tb'
import { ScrapeProps } from '@/interfaces/emag'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import {
  Heading,
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
import { motionCard } from '@/variants'
import styles from '@/styles/Products.module.scss'

export const Card: React.FC<ScrapeProps> = ({
  index,
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
    <m.div {...motionCard(index)} ref={ref} className={`${styles.card__item}`}>
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

      <div className={`${styles.card__content}`}>
        <div className={styles['card__content--top']}>
          <Heading title={title} />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {price && <NewPrice price={price} />}
            {oldPrice && <OldPrice oldPrice={oldPrice} />}
            <StockStatus
              stockInfo={{ stockOut, stockLimited, toOrder, stock }}
            />
            <LinkToShop store={store} />
          </div>
        </div>
        <div
          className={`${styles['card__content--bottom']} ${
            isGridView ? 'w-full' : 'sm:max-w-52'
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
        </div>
      </div>
    </m.div>
  )
}

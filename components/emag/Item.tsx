import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import { DealProps } from '@/interfaces/emag'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import { ItemSkeleton } from '@/components/ui/Skeletons'
import { Button } from '@/components/ui/Button'
import config from '@/config'

export const Item: React.FC<DealProps> = ({ name, image, url, offer }) => {
  const { ref, isVisible } = useLazyLoad()

  if (!isVisible) return <ItemSkeleton ref={ref} />

  return (
    <div
      ref={ref}
      className="flex sm:gap-4 gap-3 sm:p-4 p-2 relative overflow-hidden rounded-lg border bg-card text-card-foreground"
    >
      {image ? (
        <Image
          src={image.resized_images[0].url}
          alt={name}
          width={96}
          height={96}
          className="w-24 h-24 object-cover aspect-square rounded-lg bg-background border"
          priority={false}
          placeholder="blur"
          blurDataURL={config.imageBase64}
        />
      ) : (
        <FallbackImage />
      )}
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-md text-foreground font-semibold sm:mb-3">
            {name}
          </h2>
          <div className="flex gap-2 items-center text-cyan-400">
            <span className="text-xl font-semibold bg-gradient inline !bg-clip-text text-transparent">
              {offer.price.current} {offer.price.currency.name.default}
            </span>
            <span className="text-md line-through text-muted-foreground">
              {offer.price.lowest_price_30_days.amount} BGN
            </span>
            <span className="text-xs text-primary-foreground font-medium bg-gradient py-1 px-2 rounded-lg">{`-${offer.price.discount.percent}%`}</span>
          </div>
        </div>
        <Button
          size="sm"
          text="Get Deal"
          onClick={() =>
            window.open(`${url.desktop_base}${url.path}`, '_blank')
          }
          icon={<TbExternalLink size={18} />}
        />
      </div>
    </div>
  )
}

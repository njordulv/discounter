import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import { DealProps } from '@/interfaces/emag/deals'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import { ItemSkeleton } from '@/components/Skeletons'
import { Button } from '@/components/ui/Button'
import config from '@/config'

export const Item: React.FC<DealProps> = ({ name, image, url, offer }) => {
  const { ref, isVisible } = useLazyLoad()

  if (!isVisible) return <ItemSkeleton ref={ref} />

  return (
    <div
      ref={ref}
      className="flex gap-5 p-4 border border-cyan-900/60 bg-cyan-800/10 rounded-lg shadow"
    >
      {image ? (
        <Image
          src={image.resized_images[0].url}
          alt={name}
          width={96}
          height={96}
          className="w-24 h-24 object-cover aspect-square rounded-lg"
          priority={false}
          placeholder="blur"
          blurDataURL={config.imageBase64}
        />
      ) : (
        <FallbackImage />
      )}
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex gap-2 items-center text-cyan-400">
            <span>
              {offer.price.current} {offer.price.currency.name.default}
            </span>
            <span className="line-through text-slate-400">
              {offer.price.lowest_price_30_days.amount} BGN
            </span>
            <span className="text-cyan-500 font-medium bg-cyan-500/10 px-2 rounded-lg">{`-${offer.price.discount.percent}%`}</span>
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

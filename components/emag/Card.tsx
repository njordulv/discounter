import Image from 'next/image'
import Link from 'next/link'
import { TbExternalLink } from 'react-icons/tb'
import { CardProps } from '@/interfaces/emag'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import { Button } from '@/components/ui/Button'
import { CardSkeleton } from '@/components/ui/Skeletons'
import config from '@/config'

export const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  price,
  oldPrice,
  link,
}) => {
  const { ref, isVisible } = useLazyLoad()

  if (!isVisible) return <CardSkeleton ref={ref} />

  return (
    <div
      ref={ref}
      className="flex sm:gap-4 gap-3 sm:p-4 p-2 border border-cyan-900/60 bg-cyan-800/10 rounded-lg shadow"
    >
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          width={176}
          height={176}
          className="sm:w-44 sm:h-44 w-28 h-28 object-cover aspect-square rounded-lg"
          priority={false}
          placeholder="blur"
          blurDataURL={config.imageBase64}
        />
      )}
      <div className="flex flex-col sm:gap-4 gap-2 justify-between">
        <div className="flex flex-col sm:gap-4 gap-1">
          <h2 className="sm:text-lg text-md font-semibold">{title}</h2>
          <p className="flex sm:flex-row flex-col sm:gap-2 sm:items-end text-cyan-300">
            <span className="text-xl font-semibold">{price}</span>
            {oldPrice && (
              <span className="line-through text-slate-400">{oldPrice}</span>
            )}
            <span className="text-gray-400 text-sm sm:text-base">
              {'Available at'}{' '}
              <Link
                className="text-white hover:text-orange-500 transition-all"
                href={config.emag.url}
              >
                {config.emag.title}
              </Link>
            </span>
          </p>
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

import Image from 'next/image'
import Link from 'next/link'
import { TbExternalLink } from 'react-icons/tb'
import { CardProps } from '@/interfaces/emag/categories'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import { Button } from '@/components/ui/Button'
import { CardSkeleton } from '@/components/Skeletons'
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
      className="flex gap-4 p-4 border border-cyan-900/60 bg-cyan-800/10 rounded-lg shadow"
    >
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          width={176}
          height={176}
          className="object-cover aspect-square rounded-lg w-auto h-auto"
          priority={false}
        />
      )}
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="flex gap-2 items-center text-cyan-300">
            <span className="text-xl font-semibold">{price}</span>
            {oldPrice && (
              <span className="line-through text-slate-400">{oldPrice}</span>
            )}
            <span className="text-gray-400">
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
            size="md"
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

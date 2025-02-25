import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import { CardProps } from '@/interfaces/emag/categories'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { Button } from '@/components/ui/Button'

export const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  price,
  oldPrice,
  link,
}) => {
  return (
    <div className="flex gap-5 p-5 border border-slate-500 bg-gray-900 rounded-lg shadow">
      {!imageUrl || imageUrl.startsWith('https:https://') ? (
        <FallbackImage />
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          width={96}
          height={96}
          className="w-24 h-24 object-cover aspect-square rounded-lg"
        />
      )}
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="flex gap-1 items-center text-sky-400">
            {price}
            {oldPrice && (
              <span className="line-through text-slate-400">{oldPrice}</span>
            )}
          </p>
        </div>
        <Button
          size="sm"
          text="Get Deal"
          onClick={() => window.open(link, '_blank')}
          icon={<TbExternalLink size={18} />}
        />
      </div>
    </div>
  )
}

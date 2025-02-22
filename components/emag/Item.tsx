import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import { DealProps } from '@/interfaces'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { Button } from '@/components/ui/Button'

export const Item = ({ deal }: { deal: DealProps }) => {
  return (
    <li className="flex gap-5 p-5 border border-slate-500 rounded-lg shadow">
      {deal.image ? (
        <Image
          src={deal.image}
          alt={deal.title}
          width={96}
          height={96}
          className="w-24 h-24 object-cover aspect-square rounded-lg"
        />
      ) : (
        <FallbackImage />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{deal.title}</h2>
        <p className="text-gray-400">{deal.discount || deal.price}</p>
        <Button
          size="sm"
          text="View Deal"
          onClick={() => window.open(deal.url, '_blank')}
          icon={<TbExternalLink size={18} />}
        />
      </div>
    </li>
  )
}

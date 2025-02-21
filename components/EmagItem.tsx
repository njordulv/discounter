import { TbExternalLink } from 'react-icons/tb'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/config'
import { DealProps } from '@/interfaces'

export const EmagItem = ({ deal }: { deal: DealProps }) => {
  return (
    <li className="flex gap-5 p-5 border border-slate-500 rounded-lg shadow">
      <Image
        src={deal.image}
        alt={deal.title}
        width={96}
        height={96}
        className="w-24 h-24 object-cover aspect-square rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{deal.title}</h2>
        <p className="text-gray-400">{deal.newPrice}</p>
        <Link
          href={`${config.emag.url}${deal.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 w-fit hover:bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center gap-1 transition-all"
        >
          View Deal <TbExternalLink size={18} />
        </Link>
      </div>
    </li>
  )
}

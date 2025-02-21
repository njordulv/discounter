'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import useFetcher from '@/app/hooks/useFetcher'
import config from '@/config'
import Loader from '@/components/Loader'
import getTodayDeals from '@/utils/getTodayDeals'

interface Deal {
  title: string
  newPrice: string
  url: string
  image: string
}

export default function Page() {
  const { data, error, isLoading } = useFetcher({ url: '/api/scrape' })

  const url = getTodayDeals()
  console.log('URL:', url)

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        🔥 {config.emag.title} Hot Deals
      </h1>
      {data && (
        <div className="m-auto w-full max-w-4xl">
          <ul className="space-y-4 grid grid-cols-2 gap-3">
            {data.map((deal: Deal, index: number) => (
              <li
                key={index}
                className="flex gap-5 p-5 border border-slate-500 rounded-lg shadow"
              >
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
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

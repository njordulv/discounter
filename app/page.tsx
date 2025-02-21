'use client'

import Link from 'next/link'
import useFetcher from '@/app/hooks/useFetcher'
import config from '@/config'

interface Deal {
  title: string
  url: string
}

export default function Page() {
  const { data, error, isLoading } = useFetcher({ url: '/api/scrape' })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        🔥 {config.emag.title} Hot Deals
      </h1>
      <ul className="space-y-4">
        {data.map((deal: Deal) => (
          <li
            key={deal.title}
            className="p-5 border border-slate-500 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{deal.title}</h2>
            {/* <p className="text-gray-500">{deal.description}</p> */}
            <Link
              href={`${config.emag.url}${deal.url}`}
              className="text-blue-500 hover:underline"
            >
              View Deal
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

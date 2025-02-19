'use client'

import { useParams } from 'next/navigation'

const dealDetails = [
  {
    id: '1',
    title: '50% Off on Electronics',
    description:
      'Get 50% off on selected electronics. Offer valid until the end of the month.',
    link: 'https://example.com/deal/1',
  },
  {
    id: '2',
    title: 'Free Shipping Coupon',
    description: 'Use this coupon code to get free shipping on all orders.',
    link: 'https://example.com/deal/2',
  },
]

export default function DealPage() {
  const params = useParams()
  const id = params.id as string
  const deal = dealDetails.find((deal) => deal.id === id)

  if (!deal) {
    return <p className="text-red-500">Deal not found.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{deal.title}</h1>
      <p className="text-gray-700">{deal.description}</p>
      <a
        href={deal.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View Deal
      </a>
    </div>
  )
}

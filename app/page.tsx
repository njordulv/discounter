import Link from 'next/link'
import getTodayDeals from '@/utils/getTodayDeals'

const mockDeals = [
  {
    id: 1,
    title: '50% Off on Electronics',
    description: 'Only until the end of the month!',
    link: '/deal/1',
  },
  {
    id: 2,
    title: 'Free Shipping Coupon',
    description: 'For all new customers.',
    link: '/deal/2',
  },
]

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥 Hot Deals</h1>
      <div>{getTodayDeals()}</div>
      <ul className="space-y-4">
        {mockDeals.map((deal) => (
          <li
            key={deal.id}
            className="p-5 border border-slate-500 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{deal.title}</h2>
            <p className="text-gray-500">{deal.description}</p>
            <Link href={deal.link} className="text-blue-500 hover:underline">
              View Deal
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

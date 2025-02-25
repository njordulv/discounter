import SmartDeals from '@/components/emag/SmartDeals'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-medium">
        🔥 {config.emag.title} Smart Deals
      </h1>
      <SmartDeals />
    </>
  )
}

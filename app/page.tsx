import TodayDeals from '@/components/emag/TodayDeals'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        🔥 {config.emag.title} Deal Of The Day
      </h1>
      <TodayDeals />
    </>
  )
}

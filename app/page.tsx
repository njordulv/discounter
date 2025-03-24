import SmartDeals from '@/components/emag/SmartDeals'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="w-full w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {config.emag.title} Smart Deals
      </h1>
      <SmartDeals />
    </>
  )
}

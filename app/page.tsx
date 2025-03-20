import SmartDeals from '@/components/emag/SmartDeals'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="m-auto w-full max-w-4xl sm:text-4xl text-2xl text-left font-medium text-foreground">
        {config.emag.title} Smart Deals
      </h1>
      <SmartDeals />
    </>
  )
}

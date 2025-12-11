import Deals from '@/components/emag/Deals'
import config from '@/config'

export default function Page() {
  return (
    <>
      <h1 className="w-full sm:text-4xl text-2xl text-left font-medium text-foreground">
        {config.emag.title} Smart Deals
      </h1>
      <Deals slug="" />
    </>
  )
}

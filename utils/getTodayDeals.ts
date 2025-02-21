import config from '@/config'

const getTodayDeals = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const today = config.weekday[dayOfWeek]
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()

  return `https://www.emag.bg/label-campaign/emag-deal-of-the-day-${today}-${dd}-${mm}-${yyyy}`
}

export default getTodayDeals

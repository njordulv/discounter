import config from '@/config'

export const getTodayDeals = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const today = config.weekday[dayOfWeek]
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()

  return `https://www.emag.bg/label-campaign/deal-of-the-day-${today}-${dd}-${mm}-${yyyy}`
}

export const getAllDeals = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const today = config.weekday[dayOfWeek]
  const todayShort = config.weekdayShort[dayOfWeek]
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()

  return `https://www.emag.bg/label/Deal-Of-The-Day-${today}-${dd}-${mm}-${yyyy}-Deal-Of-The-Day-${todayShort}-See-All-Products`
}

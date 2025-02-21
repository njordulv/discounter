import config from '@/config'

const getTodayDeals = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const today = config.weekday[dayOfWeek]
  const todayShort = config.weekdayShort[dayOfWeek]
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()

  return `https://www.emag.bg/label/Emag-Deal-Of-The-Day-${today}-${dd}-${mm}-${yyyy}-Deal-Of-The-Day-${todayShort}-See-All-Products`
}

export default getTodayDeals

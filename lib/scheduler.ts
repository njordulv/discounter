import { updateDeals } from '@/lib/dealsService'

export function scheduleNextRun() {
  setTimeout(async () => {
    console.log('🔄 Running updateDeals...')
    await updateDeals()
    scheduleNextRun()
  }, 3600 * 1000) // Once an hour
}

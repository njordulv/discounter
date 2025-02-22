import { scrapeEmagDeals } from '@/utils/scrapers/emag'

export async function scrapeAllDeals() {
  try {
    const [emagDeals] = await Promise.all([scrapeEmagDeals()])
    const allDeals = [...emagDeals]

    return allDeals
  } catch (error) {
    console.error('Parser error:', error)
    return []
  }
}

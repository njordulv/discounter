import { scraperConfig } from '@/config/scrape'
import { EmagScraper } from '@/scrapers/emag'

export const runAllScrapers = async () => {
  for (const [storeKey, store] of Object.entries(scraperConfig)) {
    const scraper = storeKey === 'emag' ? EmagScraper : null

    if (!scraper) continue

    const categoriesToScrape = Object.entries(store.categories).map(
      ([catSlug, url]) => ({
        name: catSlug,
        url,
      })
    )

    await scraper.scrapeAndSave(categoriesToScrape)
  }
}

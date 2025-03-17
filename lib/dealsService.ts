import { scrapeEmag } from '@/lib/scraper'
import { redis, collection } from '@/lib/db'
import { CardProps } from '@/interfaces/emag'
import config from '@/config'

export async function updateDeals() {
  const categories = [
    config.emag.categories.livingRoom,
    config.emag.categories.pcComponents,
  ]
  let allProducts: CardProps[] = []

  for (const category of categories) {
    const products = await scrapeEmag(category)
    allProducts = [...allProducts, ...products]

    if (products.length > 0) {
      await collection.deleteMany({})
      await collection.insertMany(products)
      await redis.set('discounts', JSON.stringify(products), 'EX', 3600)
      console.log('✅ Data saved to MongoDB and Redis cache')
    }
  }
}

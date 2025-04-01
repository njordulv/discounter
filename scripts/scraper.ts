import { scrapeAndSaveEmag } from '@/lib/scraper'
import { connectDB } from '@/lib/mongo'
import { catsConfig } from '@/config/categories'

async function testMongo() {
  try {
    await connectDB()
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
  }
}

testMongo()
;(async () => {
  const cats = Object.values(catsConfig).map((tag) => ({
    name: tag.slug,
    url: tag.scrapeUrl,
  }))

  await scrapeAndSaveEmag(cats)

  process.exit(0)
})()

import { scrapeAndSaveEmag } from '@/lib/scraper'
import { connectDB } from '@/lib/mongo'
import config from '@/config'

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
  const categories = [
    config.emag.categories.livingRoom,
    config.emag.categories.pcComponents,
  ]
  for (const category of categories) {
    await scrapeAndSaveEmag(category)
  }
  process.exit(0)
})()

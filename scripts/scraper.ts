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
  const categories = config.emag.categories.livingRoom
  await scrapeAndSaveEmag(categories)
  process.exit(0)
})()

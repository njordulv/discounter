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
    {
      name: config.emag.categories.livingRoom.name,
      url: config.emag.categories.livingRoom.url,
    },
    {
      name: config.emag.categories.pcComponents.name,
      url: config.emag.categories.pcComponents.url,
    },
  ]

  await scrapeAndSaveEmag(categories)

  process.exit(0)
})()

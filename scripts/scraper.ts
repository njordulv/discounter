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
      name: config.emag.categories.cooking.name,
      url: config.emag.categories.cooking.url,
    },
    {
      name: config.emag.categories.auto.name,
      url: config.emag.categories.auto.url,
    },
    {
      name: config.emag.categories.clothing.name,
      url: config.emag.categories.clothing.url,
    },
    {
      name: config.emag.categories.perfumes.name,
      url: config.emag.categories.perfumes.url,
    },
    {
      name: config.emag.categories.toys.name,
      url: config.emag.categories.toys.url,
    },
    {
      name: config.emag.categories.cleaning.name,
      url: config.emag.categories.cleaning.url,
    },
    {
      name: config.emag.categories.casesAndCards.name,
      url: config.emag.categories.casesAndCards.url,
    },
    {
      name: config.emag.categories.mda.name,
      url: config.emag.categories.mda.url,
    },
    {
      name: config.emag.categories.audioAndVideo.name,
      url: config.emag.categories.audioAndVideo.url,
    },
    {
      name: config.emag.categories.pcComponents.name,
      url: config.emag.categories.pcComponents.url,
    },
  ]

  await scrapeAndSaveEmag(categories)

  process.exit(0)
})()

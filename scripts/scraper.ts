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
  const subCats = Object.values(catsConfig).flatMap((tag) =>
    Object.values(tag.subcategories || {}).map((sub) => ({
      name: `${sub.slug}`,
      url: sub.scrapeUrl,
    }))
  )

  await scrapeAndSaveEmag(subCats)

  process.exit(0)
})()

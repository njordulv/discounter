import { runAllScrapers } from '@/lib/scraper'
import { connectDB } from '@/lib/mongo'

async function main() {
  try {
    await connectDB()
    console.log('✅ MongoDB connected successfully')

    await runAllScrapers()
    console.log('✅ Scraping completed')
  } catch (error) {
    console.error('❌ Error during scraping:', error)
  } finally {
    process.exit(0)
  }
}

main()

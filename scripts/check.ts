import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'

async function main() {
  try {
    await connectDB()
    const count = await Product.countDocuments({ outdated: false })
    console.log(`✅ Actual products: ${count}`)

    const latest = await Product.find({ outdated: false })
      .sort({ timestamp: -1 })
      .limit(5)

    console.log('✅ Example of actual products:', latest)
  } catch (error) {
    console.error('❌ Error during scraping:', error)
  } finally {
    process.exit(0)
  }
}

main()

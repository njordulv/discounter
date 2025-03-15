import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { scrapeEmag } from '@/lib/scraper'
import config from '@/config'
import Product from '@/models/Product'
import { redis } from '@/lib/redis'

export async function GET() {
  try {
    await connectToDatabase()

    // Check Redis cache before parsing
    const cachedData = await redis.get('scraped_products')
    if (cachedData) {
      console.log('Using cached data')
      return NextResponse.json({
        message: 'Scraping skipped (cached data used)',
        count: JSON.parse(cachedData).length,
      })
    }

    // Parse products
    const scrapedProducts = await scrapeEmag(config.emag.categories.livingRoom)
    console.log('Scraped Products:', scrapedProducts)

    if (!scrapedProducts.length) {
      return NextResponse.json({ error: 'No products found' }, { status: 400 })
    }

    let addedCount = 0
    let updatedCount = 0

    for (const product of scrapedProducts) {
      const existingProduct = await Product.findOne({ link: product.link })

      if (existingProduct) {
        await Product.updateOne(
          { link: product.link },
          {
            $set: {
              ...product, // Update all fields from the product object
              timestamp: new Date(), // Update only timestamp
            },
          }
        )
        updatedCount++
      } else {
        await Product.create(product)
        addedCount++
      }
    }

    // Save to Redis cache for 1 hour (3600 seconds)
    await redis.setEx('scraped_products', 3600, JSON.stringify(scrapedProducts))

    return NextResponse.json({
      message: 'Scraping completed',
      added: addedCount,
      updated: updatedCount,
    })
  } catch (error) {
    console.error('Error scraping:', error)
    return NextResponse.json({ error: 'Error scraping' }, { status: 500 })
  }
}

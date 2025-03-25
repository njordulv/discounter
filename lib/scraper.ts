import axios from 'axios'
import * as cheerio from 'cheerio'
import { CardProps } from '@/interfaces/emag'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'
import Product from '@/models/Product'
import { connectDB } from '@/lib/mongo'
import { EmagCats } from '@/interfaces/emag'
import { sleep, userAgent } from '@/utils/functions'
import { client } from '@/lib/redis'
import { CACHE_EXPIRATION } from '@/config/cache'

export async function scrapeEmag(categoryUrl: string): Promise<CardProps[]> {
  let allProducts: CardProps[] = []
  let currentPage = 1
  const maxPages = 15

  try {
    while (currentPage <= maxPages) {
      await sleep(2000 + Math.random() * 2400)

      const url = categoryUrl + (currentPage > 1 ? `/p${currentPage}` : '')
      console.log(`Scraping page ${currentPage}: ${url}`)

      const { data } = await axios.get(url, {
        headers: { 'User-Agent': userAgent() },
      })

      const $ = cheerio.load(data)
      const products: CardProps[] = []

      $('.card-v2').each((_, element) => {
        const title = $(element).find('.card-v2-title').text().trim()
        const price = $(element)
          .find('.product-new-price')
          .first()
          .text()
          .trim()
        const oldPrice =
          $(element).find('.pricing .rrp-lp30d-content s').text().trim() || null
        const discount = $(element)
          .find('.card-v2-badge.badge-discount')
          .text()
          .trim()
        const isGenius = $(element).find('.badge-genius').length > 0
        const stock =
          $(element).find('.text-availability-in_stock').text().trim() || null
        const stockOut = $(element)
          .find('.text-availability-out_of_stock')
          .text()
        const stockLimited = $(element)
          .find('.text-availability-limited_stock_qty')
          .text()
        const toOrder = $(element).find('.text-availability-to_order').text()
        const rawImageUrl =
          $(element).find('.img-component img').attr('src') || ''
        const imageUrl = normalizeImageUrl(rawImageUrl)
        const link = $(element).find('a.js-product-url').attr('href') || ''

        if (title && price) {
          products.push({
            title,
            price,
            oldPrice,
            discount,
            isGenius,
            stock,
            stockOut,
            stockLimited,
            toOrder,
            imageUrl,
            link: link.startsWith('http')
              ? link
              : new URL(link, config.emag.url).toString(),
            timestamp: new Date().toISOString(),
          })
        }
      })

      if (products.length === 0) break
      allProducts = [...allProducts, ...products]
      currentPage++
    }

    return allProducts
  } catch (error) {
    console.error('Error scraping:', error)
    return []
  }
}

export async function scrapeAndSaveEmag(categories: EmagCats[]) {
  await connectDB()

  const categoriesCount: { [key: string]: number } = {}

  for (const category of categories) {
    await client.del(`products_${category.name}`)
    console.log(`🗑️ Cache for category ${category.name} deleted`)

    // 1️. Before scraping, mark all products in the category as outdated
    await Product.updateMany(
      { category: category.name },
      { $set: { outdated: true } }
    )

    // 2️. Scraping new data
    const products = await scrapeEmag(category.url)

    for (const product of products) {
      await Product.updateOne(
        { link: product.link }, // Check by link
        { $set: { ...product, category: category.name, outdated: false } }, // Reset outdated data flag
        { upsert: true } // Create or add new product
      )
    }

    categoriesCount[category.name] = products.length
    const productCounts = Object.values(categoriesCount).join(', ')
    const categoryNames = Object.keys(categoriesCount).join(', ')

    console.log(
      `Saved ${productCounts} products in categories: ${categoryNames}`
    )

    // 3️. After scraping, delete products that are still marked as outdated (they no longer exist on the website)
    const deletedCount = await Product.deleteMany({
      category: category.name,
      outdated: true,
    })
    console.log(
      `🗑️ Deleted ${deletedCount.deletedCount} outdated products in category: ${category.name}`
    )

    // 4️. Cache the scraped data
    try {
      await client.setex(
        `products_${category.name}`,
        CACHE_EXPIRATION,
        JSON.stringify(products)
      )
      console.log(`✅ Cache updated for category ${category.name}`)
    } catch (cacheError) {
      console.error('Error caching data:', cacheError)
    }
  }
}

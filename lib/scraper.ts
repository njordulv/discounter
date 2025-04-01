import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import config from '@/config'
import Product from '@/models/Product'
import { normalizeImageUrl, randomDelay, processLink } from '@/utils/functions'
import { ScrapeProps, EmagCats } from '@/interfaces/emag'
import { connectDB } from '@/lib/mongo'
import { redisClient } from '@/lib/redis'
import { CACHE_EXPIRATION } from '@/config/cache'

puppeteer.use(StealthPlugin())

// Extract text content safely
const extractText = (
  $: cheerio.Root,
  element: cheerio.Element,
  selector: string
): string => $(element).find(selector).text().trim() || ''

// Parse product data
const parseProductData = (
  $: cheerio.Root,
  element: cheerio.Element
): ScrapeProps | null => {
  const title = extractText($, element, '.card-v2-title')
  const price = extractText($, element, '.product-new-price')

  if (!title || !price) return null

  return {
    title,
    price,
    oldPrice: extractText($, element, '.pricing s') || null,
    discount: extractText($, element, '.card-v2-badge.badge-discount'),
    isGenius: $(element).find('.badge-genius').length > 0,
    stock: extractText($, element, '.text-availability-in_stock') || null,
    stockOut: extractText($, element, '.text-availability-out_of_stock'),
    stockLimited: extractText(
      $,
      element,
      '.text-availability-limited_stock_qty'
    ),
    toOrder: extractText($, element, '.text-availability-to_order'),
    imageUrl: normalizeImageUrl(
      $(element).find('.img-component img').attr('src') || ''
    ),
    link: processLink($(element).find('a.js-product-url').attr('href') || ''),
    timestamp: Date.now(),
    store: config.emag.title,
  }
}

// Main scraping function
export async function scrapeEmag(categoryUrl: string): Promise<ScrapeProps[]> {
  const browser = await puppeteer.launch({
    ...config.browserConfig,
    headless: true,
  })
  const page = await browser.newPage()
  const allProducts: ScrapeProps[] = []
  const MAX_PAGES = 15

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    )
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.google.com/',
    })

    let currentPage = 1
    const hasNextPage = true

    while (currentPage <= MAX_PAGES && hasNextPage) {
      await randomDelay()

      const url =
        currentPage > 1 ? `${categoryUrl}/p${currentPage}` : categoryUrl

      console.log(`🌐 Loading page ${currentPage}: ${url}`)

      try {
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })

        // Check if the page returns 404, then stop scraping
        if (response && response.status() === 404) {
          console.log(`❌ Page ${currentPage} not found, stopping.`)
          break // If page not found, stop the loop
        }

        // Try to parse content
        const content = await page.content()
        const $ = cheerio.load(content)
        const products: ScrapeProps[] = []

        $('.card-v2').each((_, element) => {
          const product = parseProductData($, element)
          if (product) products.push(product)
        })

        if (products.length === 0) {
          console.log(`⚠️ No more products on page ${currentPage}, stopping.`)
          break // Stop the loop if no products are found
        }

        allProducts.push(...products)
        console.log(
          `✅ Found ${products.length} products on page ${currentPage}`
        )

        // If content is present, check if the next page exists
        const nextPageUrl = `${categoryUrl}/p${currentPage + 1}`
        const nextPageResponse = await page
          .goto(nextPageUrl, { timeout: 5000 })
          .catch(() => null)

        // If the next page does not exist (failed request), stop scraping
        if (!nextPageResponse || nextPageResponse.status() === 404) {
          console.log(`🚀 No more pages available, moving to next category.`)
          break
        }

        currentPage++ // If all ok, go to the next page
      } catch (error) {
        console.error(`❌ Error on page ${currentPage}:`, error)
        break // Stop in case of error
      }
    }

    return allProducts
  } finally {
    if (browser.isConnected()) {
      await browser.close()
      console.log(`🧹 Browser closed for ${categoryUrl}`)
    }
  }
}

// Scrape and save data to MongoDB
export async function scrapeAndSaveEmag(categories: EmagCats[]) {
  await connectDB()

  for (const category of categories) {
    try {
      console.log(`🔄 Processing category: ${category.name}`)
      await redisClient.del(`products_${category.name}`)

      // Mark old products as outdated instead of deleting immediately
      await Product.updateMany(
        { category: category.name },
        { $set: { outdated: true } }
      )

      // Scrape data
      const products = await scrapeEmag(category.url)

      // If new products are found, update the database
      if (products.length > 0) {
        const bulkOps = products.map((product) => ({
          updateOne: {
            filter: { link: product.link },
            update: {
              $set: { ...product, category: category.name, outdated: false },
            },
            upsert: true,
          },
        }))

        await Product.bulkWrite(bulkOps)

        // Delete outdated products only if new ones are added
        const { deletedCount } = await Product.deleteMany({
          category: category.name,
          outdated: true,
        })

        console.log(
          `✅ Saved: ${products.length} | 🗑 Removed outdated: ${deletedCount}`
        )
      } else {
        console.warn(`⚠️ No new products found for ${category.name}`)
      }

      // Cache products only if data is available
      if (products.length > 0) {
        await redisClient.setex(
          `products_${category.name}`,
          CACHE_EXPIRATION,
          JSON.stringify(products)
        )
      }
    } catch (error) {
      console.error(`❌ Error processing ${category.name}:`, error)
    }
  }
}

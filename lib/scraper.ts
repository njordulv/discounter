import * as cheerio from 'cheerio'
import { Element } from 'domhandler'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import config from '@/config'
import Product from '@/models/Product'
import { normalizeImageUrl, randomDelay, processLink } from '@/utils/functions'
import { ScrapeProps, EmagCats } from '@/interfaces/emag'
import { connectDB } from '@/lib/mongo'
import { client } from '@/lib/redis'
import { CACHE_EXPIRATION } from '@/config/cache'

puppeteer.use(StealthPlugin())

// Product data parsing function
const parseProductData = (
  $: cheerio.CheerioAPI,
  element: Element
): ScrapeProps | null => {
  const title = $(element).find('.card-v2-title').text().trim()
  const price = $(element).find('.product-new-price').first().text().trim()

  if (!title || !price) return null

  return {
    title,
    price,
    oldPrice:
      $(element).find('.pricing .rrp-lp30d-content s').text().trim() || null,
    discount: $(element).find('.card-v2-badge.badge-discount').text().trim(),
    isGenius: $(element).find('.badge-genius').length > 0,
    stock: $(element).find('.text-availability-in_stock').text().trim() || null,
    stockOut: $(element).find('.text-availability-out_of_stock').text(),
    stockLimited: $(element)
      .find('.text-availability-limited_stock_qty')
      .text(),
    toOrder: $(element).find('.text-availability-to_order').text(),
    imageUrl: normalizeImageUrl(
      $(element).find('.img-component img').attr('src') || ''
    ),
    link: processLink($(element).find('a.js-product-url').attr('href') || ''),
    timestamp: new Date().getTime(),
    store: config.emag.title,
  }
}

// Main scraper function
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

    while (currentPage <= MAX_PAGES) {
      await randomDelay()

      const url =
        currentPage > 1 ? `${categoryUrl}/p${currentPage}` : categoryUrl

      console.log(`🌐 Loading page ${currentPage}: ${url}`)

      try {
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 60000,
        })

        // Cloudflare security check
        if (await page.$('#challenge-form')) {
          throw new Error('Cloudflare security check detected')
        }

        // Content parsing
        const content = await page.content()
        const $ = cheerio.load(content)
        const products: ScrapeProps[] = []

        $('.card-v2').each((_, element) => {
          const product = parseProductData($, element)
          if (product) products.push(product)
        })

        if (products.length === 0) break

        allProducts.push(...products)
        console.log(
          `✅ Found ${products.length} products on page ${currentPage}`
        )

        currentPage++
      } catch (error) {
        console.error(`❌ Error on page ${currentPage}:`, error)
        break
      }
    }

    return allProducts
  } finally {
    await browser.close()
    console.log(`🧹 Browser closed for ${categoryUrl}`)
  }
}

// Data saving function
export async function scrapeAndSaveEmag(categories: EmagCats[]) {
  await connectDB()

  for (const category of categories) {
    try {
      console.log(`🔄 Processing category: ${category.name}`)
      await client.del(`products_${category.name}`)

      // Mark old products
      await Product.updateMany(
        { category: category.name },
        { $set: { outdated: true } }
      )

      // Scraping data
      const products = await scrapeEmag(category.url)

      // Update database
      const bulkOps = products.map((product) => ({
        updateOne: {
          filter: { link: product.link },
          update: {
            $set: { ...product, category: category.name, outdated: false },
          },
          upsert: true,
        },
      }))

      if (bulkOps.length > 0) {
        await Product.bulkWrite(bulkOps)
      }

      // Clear old products
      const { deletedCount } = await Product.deleteMany({
        category: category.name,
        outdated: true,
      })

      // Cache products
      await client.setex(
        `products_${category.name}`,
        CACHE_EXPIRATION,
        JSON.stringify(products)
      )

      console.log(
        `✅ ${products.length} products saved | 🗑 ${deletedCount} removed`
      )
    } catch (error) {
      console.error(`❌ Error processing ${category.name}:`, error)
    }
  }
}

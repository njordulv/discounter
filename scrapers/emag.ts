import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import config from '@/config'
import Product from '@/models/Product'
import {
  normalizeImageUrl,
  parsePrice,
  randomDelay,
  processLink,
} from '@/utils'
import { connectDB } from '@/lib/mongo'
import { initRedis } from '@/lib/redis'
import { CACHE_EXPIRATION, SCRAPER } from '@/config/constants'
import type { EmagCats, ScrapeProps } from '@/interfaces/emag'

puppeteer.use(StealthPlugin())

const extractText = (
  $: cheerio.Root,
  element: cheerio.Element,
  selector: string
): string => $(element).find(selector).text().trim() || ''

const parseProductData = (
  $: cheerio.Root,
  element: cheerio.Element
): ScrapeProps | null => {
  const title = extractText($, element, '.card-v2-title')
  const rawPrice = extractText($, element, '.product-new-price')
  const price = parsePrice(rawPrice)
  const rawOldPrice = extractText($, element, '.pricing s')
  const oldPrice = parsePrice(rawOldPrice)
  const discountText = extractText(
    $,
    element,
    '.card-v2-badge.badge-discount'
  ).trim()
  const discountMatch = discountText.match(/-?(\d+(\.\d+)?)%?/)

  if (!title || !price) return null

  return {
    title,
    price,
    oldPrice,
    discount: discountMatch ? parseFloat(discountMatch[1]) : 0,
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

const scrapeCategory = async (categoryUrl: string): Promise<ScrapeProps[]> => {
  const browser = await puppeteer.launch({
    ...config.browserConfig,
    headless: true,
  })
  const page = await browser.newPage()
  const allProducts: ScrapeProps[] = []
  const maxPages = SCRAPER.MAX_PAGES
  let currentPage = 1

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    )
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.google.com/',
    })

    while (currentPage <= maxPages) {
      await randomDelay()

      const url =
        currentPage > 1 ? `${categoryUrl}/p${currentPage}` : categoryUrl

      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      })

      if (!response || response.status() === 404) break

      const content = await page.content()
      const $ = cheerio.load(content)
      const products: ScrapeProps[] = []

      $('.card-v2').each((_, element) => {
        const product = parseProductData($, element)
        if (product) products.push(product)
      })

      if (products.length === 0) break

      allProducts.push(...products)

      const nextPageUrl = `${categoryUrl}/p${currentPage + 1}`
      const nextPageResponse = await page
        .goto(nextPageUrl, {
          timeout: 5000,
        })
        .catch(() => null)

      if (!nextPageResponse || nextPageResponse.status() === 404) break

      currentPage++
    }

    return allProducts
  } finally {
    if (browser.isConnected()) {
      await browser.close()
    }
  }
}

const scrapeAndSave = async (categories: EmagCats[]) => {
  await connectDB()

  for (const category of categories) {
    try {
      console.log(`🔄 eMag: ${category.name}`)
      const redisClient = await initRedis()
      if (!redisClient) throw new Error('Redis client not initialized')
      await redisClient.del(`products_${category.name}`)

      await Product.updateMany(
        { category: category.name },
        { $set: { outdated: true } }
      )

      const products = await scrapeCategory(category.url)

      if (products.length > 0) {
        const bulkOps = products.map((product) => ({
          updateOne: {
            filter: { link: product.link },
            update: {
              $set: {
                ...product,
                category: category.name,
                outdated: false,
              },
            },
            upsert: true,
          },
        }))
        await Product.bulkWrite(bulkOps)

        const { deletedCount } = await Product.deleteMany({
          category: category.name,
          outdated: true,
        })

        console.log(
          `✅ eMag ${category.name}: Saved ${products.length}, Removed ${deletedCount}`
        )

        await redisClient.set(
          `products_${category.name}`,
          JSON.stringify(products),
          {
            EX: CACHE_EXPIRATION.DEFAULT,
          }
        )
      } else {
        console.warn(`⚠️ No products found for ${category.name}`)
      }
    } catch (err) {
      console.error(`❌ Error in eMag category ${category.name}:`, err)
    }
  }
}

export const EmagScraper = {
  scrapeAndSave,
  storeName: 'eMag',
}

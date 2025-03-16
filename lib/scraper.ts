import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import { CardProps } from '@/interfaces/emag'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'

export async function scrapeEmag(categoryUrl: string): Promise<CardProps[]> {
  let allProducts: CardProps[] = []
  let currentPage = 1
  const maxPages = 20

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  )

  try {
    while (currentPage <= maxPages) {
      const url = categoryUrl + (currentPage > 1 ? `/p${currentPage}` : '')
      console.log(`Scraping page ${currentPage}: ${url}`)

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })

      // Wait for content to load (can change selector)
      await page.waitForSelector('.card-v2', { timeout: 5000 })

      const html = await page.content()
      const load = cheerio.load(html)
      const products: CardProps[] = []

      load('.card-v2').each((_, element) => {
        const title = load(element).find('.card-v2-title').text().trim()
        const price = load(element)
          .find('.product-new-price')
          .first()
          .text()
          .trim()
        const oldPrice =
          load(element).find('.pricing .rrp-lp30d-content s').text().trim() ||
          null
        const discount = load(element)
          .find('.card-v2-badge.badge-discount')
          .text()
          .trim()
        const isGenius = load(element).find('.badge-genius').length > 0
        const stock =
          load(element).find('.text-availability-in_stock').text().trim() ||
          null
        const stockOut = load(element)
          .find('.text-availability-out_of_stock')
          .text()
        const stockLimited = load(element)
          .find('.text-availability-limited_stock_qty')
          .text()
        const toOrder = load(element).find('.text-availability-to_order').text()
        const rawImageUrl =
          load(element).find('.img-component img').attr('src') || ''
        const imageUrl = normalizeImageUrl(rawImageUrl)
        const link = load(element).find('a.js-product-url').attr('href') || ''

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
  } finally {
    await browser.close()
  }
}

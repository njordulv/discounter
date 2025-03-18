import axios from 'axios'
import * as cheerio from 'cheerio'
import { CardProps } from '@/interfaces/emag'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'
import Product from '@/models/Product'
import { connectDB } from '@/lib/mongo'

export async function scrapeEmag(categoryUrl: string): Promise<CardProps[]> {
  let allProducts: CardProps[] = []
  let currentPage = 1
  const maxPages = 20

  try {
    while (currentPage <= maxPages) {
      const url = categoryUrl + (currentPage > 1 ? `/p${currentPage}` : '')
      console.log(`Scraping page ${currentPage}: ${url}`)

      const { data } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
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

export async function scrapeAndSaveEmag(categoryUrl: string) {
  const products = await scrapeEmag(categoryUrl)

  await connectDB()

  for (const product of products) {
    await Product.updateOne(
      { link: product.link }, // Check by link
      { $set: product }, // Update data
      { upsert: true } // Create if not exists
    )
  }

  console.log(`Saved ${products.length} products to MongoDB`)
}

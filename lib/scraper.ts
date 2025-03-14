import axios from 'axios'
import * as cheerio from 'cheerio'
import { normalizeImageUrl } from '@/utils/functions'
import { CardProps } from '@/interfaces/emag'
import config from '@/config'

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

export async function scrapeEmag(categoryUrl: string) {
  let allProducts: CardProps[] = []
  let currentPage = 1
  const maxPages = 20

  try {
    while (currentPage <= maxPages) {
      const url = categoryUrl + (currentPage > 1 ? `/p${currentPage}` : '')
      console.log(`Scraping page ${currentPage}: ${url}`)

      const { data } = await axios.get(url, { headers })
      const load = cheerio.load(data)
      const products: CardProps[] = []
      const loadElements = load('.card-v2')

      loadElements.each((_, element) => {
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

      if (products.length === 0) {
        console.log(`No more products found, stopping at page ${currentPage}`)
        break
      }

      allProducts = [...allProducts, ...products]

      const lastPageNumber = Math.max(
        ...load('.pagination a.js-change-page')
          .map((_, el) => Number(load(el).attr('data-page')))
          .get()
          .filter((n) => !isNaN(n))
      )

      if (isNaN(lastPageNumber) || currentPage >= lastPageNumber) {
        console.log(`Reached last page (${lastPageNumber}), stopping.`)
        break
      }

      currentPage++
    }

    console.log(`Total ${allProducts.length} products found for ${categoryUrl}`)
    return allProducts
  } catch (error) {
    console.error('Error parsing:', error)
    return []
  }
}

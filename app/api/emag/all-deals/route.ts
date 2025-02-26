import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import { CardProps } from '@/interfaces/emag/categories'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

async function scrapeEmag(categoryUrl: string): Promise<CardProps[]> {
  let allProducts: CardProps[] = []
  let currentPage = 1
  const maxPages = 20

  try {
    while (currentPage <= maxPages) {
      const url = categoryUrl + (currentPage > 1 ? `/p${currentPage}` : '')
      console.log(`Scraping page ${currentPage}: ${url}`)

      const { data } = await axios.get(url, { headers })
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
        ...$('.pagination a.js-change-page')
          .map((_, el) => Number($(el).attr('data-page')))
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

export async function GET() {
  const categories = [
    config.emag.categories.livingRoom,
    // config.emag.categories.cooking,
    // config.emag.categories.auto,
    // config.emag.categories.clothing,
    // config.emag.categories.perfumes,
    // config.emag.categories.toys,
    // config.emag.categories.cleaning,
    // config.emag.categories.casesAndCards,
    // config.emag.categories.mda,
    // config.emag.categories.audioAndVideo,
    // config.emag.categories.pcComponents,
  ]

  try {
    const results = []

    for (const category of categories) {
      const products = await scrapeEmag(category)
      results.push({ category, count: products.length })

      if (products.length > 0) {
        const { error } = await supabase
          .from('discounts')
          .upsert(products, { onConflict: 'link' })

        if (error) {
          console.error('Error Supabase:', error)
          results.push({ error: error.message })
        }
      }
    }

    return NextResponse.json({
      message: 'Completed',
      results,
      supabaseKey: !!process.env.SUPABASE_KEY,
    })
  } catch (error) {
    console.error('General Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

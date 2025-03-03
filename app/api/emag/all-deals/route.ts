import 'dotenv/config'
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { supabase } from '@/utils/supabaseClient'
import { CardProps } from '@/interfaces/emag'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'

const FILE_PATH = path.join(process.cwd(), 'public', 'all-deals.json')

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

async function updateDeals() {
  const categories = [config.emag.categories.livingRoom]

  let allProducts: CardProps[] = []

  for (const category of categories) {
    const products = await scrapeEmag(category)
    allProducts = [...allProducts, ...products]

    if (products.length > 0) {
      const { error } = await supabase
        .from('discounts')
        .upsert(products, { onConflict: 'id' })

      if (error) {
        console.error('❌ Error Supabase:', error.message, error.details)
      } else {
        console.log('✅ Data saved to Supabase successfully')
      }
    }
  }

  if (allProducts.length > 0) {
    try {
      await fs.writeFile(FILE_PATH, JSON.stringify(allProducts, null, 2))
      console.log('✅ Saved products to all-deals.json')
    } catch (err) {
      console.error('❌ Error saving JSON file:', err)
    }
  }
}

function scheduleNextRun() {
  const now = new Date()
  const nextRun = new Date(now)

  nextRun.setMinutes(0, 0, 0)
  nextRun.setHours(now.getHours() + 1)

  const delay = nextRun.getTime() - now.getTime()
  const time = Math.floor(delay / 1000 / 60)
  console.log(
    `🔄 Next update scheduled in ${time} minutes at ${nextRun.toISOString()}`
  )

  setTimeout(async () => {
    console.log('🔄 Running updateDeals...')
    await updateDeals()
    scheduleNextRun()
  }, delay)
}

scheduleNextRun()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 20

    if (isNaN(page) || page < 1 || isNaN(perPage) || perPage < 1) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      )
    }

    const { data, error, count } = await supabase
      .from('discounts')
      .select('*', { count: 'exact' })
      .range((page - 1) * perPage, page * perPage - 1)

    if (error || !data?.length) {
      console.warn('⚠️ Supabase is down, using cached JSON')

      try {
        const jsonData = await fs.readFile(FILE_PATH, 'utf-8')
        const allData: CardProps[] = JSON.parse(jsonData)
        const total = allData.length
        const paginatedData = allData.slice(
          (page - 1) * perPage,
          page * perPage
        )

        return NextResponse.json({
          data: paginatedData,
          meta: {
            currentPage: page,
            perPage,
            totalPages: Math.ceil(total / perPage),
            totalItems: total,
          },
        })
      } catch (err) {
        console.error('❌ Failed to load cached JSON:', err)
        return NextResponse.json(
          { error: 'No data available' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      data,
      meta: {
        currentPage: page,
        perPage,
        totalPages: Math.ceil((count || 0) / perPage),
        totalItems: count,
      },
    })
  } catch (error) {
    console.error('❌ General Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

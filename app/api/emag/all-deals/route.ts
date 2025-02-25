import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import { CardProps } from '@/interfaces/emag/categories'
import config from '@/config'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

async function scrapeEmag(url: string): Promise<CardProps[]> {
  try {
    const { data } = await axios.get(url, { headers })
    const $ = cheerio.load(data)
    const products: CardProps[] = []

    $('.card-v2').each((_, element) => {
      const title = $(element).find('.card-v2-title').text().trim()
      const price = $(element).find('.product-new-price').first().text().trim()
      const oldPrice =
        $(element).find('.pricing .rrp-lp30d-content s').text().trim() || null
      const discount = $(element)
        .find('.card-v2-badge.badge-discount')
        .text()
        .trim()
      const rawImageUrl =
        $(element).find('.img-component img').attr('src') || ''
      const imageUrl = rawImageUrl
        .replace(/^https?:https?:\/\//, 'https://')
        .replace(/^\/\//, 'https://')
      const link = $(element).find('a.js-product-url').attr('href') || ''

      if (title && price) {
        products.push({
          title,
          price,
          oldPrice,
          discount,
          imageUrl: imageUrl?.replace(/^https?:https?:\/\//, 'https://'),
          link: link.startsWith('http')
            ? link
            : new URL(link, config.emag.url).toString(),
          timestamp: new Date().toISOString(),
        })
      }
    })

    console.log(`Found ${products.length} products for ${url}`)
    return products
  } catch (error) {
    console.error('Error parsing:', error)
    return []
  }
}

export async function GET() {
  const categories = [
    config.emag.categories.clothing,
    config.emag.categories.livingRoom,
    config.emag.categories.auto,
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

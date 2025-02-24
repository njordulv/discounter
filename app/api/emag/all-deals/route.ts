import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface Product {
  title: string
  price: string
  oldPrice: string | null
  image?: string
  link: string
  timestamp: string
}

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

async function scrapeEmag(url: string): Promise<Product[]> {
  try {
    const { data } = await axios.get(url, { headers })
    const $ = cheerio.load(data)
    const products: Product[] = []

    $('.card-v2').each((_, element) => {
      const title = $(element).find('.card-v2-title').text().trim()
      const price = $(element).find('.product-new-price').first().text().trim()
      const oldPrice =
        $(element).find('.product-old-price').text().trim() || null
      const image = $(element).find('.img-component img').attr('src') || ''
      const link = $(element).find('a.js-product-url').attr('href') || ''

      if (title && price) {
        products.push({
          title,
          price,
          oldPrice,
          image: image.replace('//', 'https://'),
          link: link.startsWith('http') ? link : `https://www.emag.bg${link}`,
          timestamp: new Date().toISOString(),
        })
      }
    })

    console.log(`Найдено ${products.length} товаров для ${url}`)
    return products
  } catch (error) {
    console.error('Ошибка парсинга:', error)
    return []
  }
}

export async function GET() {
  const categories = [
    'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Men-And-Women-Clothing',
    'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
    'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
  ]

  try {
    const results = []

    for (const category of categories) {
      const products = await scrapeEmag(category)
      results.push({ category, count: products.length })

      if (products.length > 0) {
        // Добавляем проверку ошибок Supabase
        const { error } = await supabase
          .from('discounts')
          .upsert(products, { onConflict: 'link' }) // Уточняем поле для upsert

        if (error) {
          console.error('Ошибка Supabase:', error)
          results.push({ error: error.message })
        }
      }
    }

    return NextResponse.json({
      message: 'Завершено',
      results,
      supabaseKey: !!process.env.SUPABASE_KEY, // Проверка наличия ключа
    })
  } catch (error) {
    console.error('Общая ошибка:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

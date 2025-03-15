import 'dotenv/config'
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import Redis from 'ioredis'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { CardProps } from '@/interfaces/emag'
import { normalizeImageUrl } from '@/utils/functions'
import config from '@/config'

const redis = new Redis(process.env.REDIS_URL!)
const mongoClient = new MongoClient(process.env.MONGODB_URI!)
const dbName = 'productsDB'
const collectionName = 'products'

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

      if (products.length === 0) break
      allProducts = [...allProducts, ...products]
      currentPage++
    }

    return allProducts
  } catch (error) {
    console.error('Error parsing:', error)
    return []
  }
}

async function updateDeals() {
  await mongoClient.connect()
  const db = mongoClient.db(dbName)
  const collection = db.collection(collectionName)

  const categories = [config.emag.categories.livingRoom]
  let allProducts: CardProps[] = []

  for (const category of categories) {
    const products = await scrapeEmag(category)
    allProducts = [...allProducts, ...products]

    if (products.length > 0) {
      await collection.deleteMany({})
      await collection.insertMany(products)
      await redis.set('discounts', JSON.stringify(products), 'EX', 3600)
      console.log('✅ Data saved to MongoDB and Redis cache')
    }
  }
}

function scheduleNextRun() {
  setTimeout(async () => {
    console.log('🔄 Running updateDeals...')
    await updateDeals()
    scheduleNextRun()
  }, 3600 * 1000)
}

scheduleNextRun()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 20

    const cachedData = await redis.get('discounts')

    if (cachedData) {
      const allData: CardProps[] = JSON.parse(cachedData)
      return NextResponse.json({
        data: allData.slice((page - 1) * perPage, page * perPage),
        meta: {
          currentPage: page,
          perPage,
          totalPages: Math.ceil(allData.length / perPage),
          totalItems: allData.length,
        },
      })
    }

    await mongoClient.connect()
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const total = await collection.countDocuments()
    const data = await collection
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray()

    return NextResponse.json({
      data,
      meta: {
        currentPage: page,
        perPage,
        totalPages: Math.ceil(total / perPage),
        totalItems: total,
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

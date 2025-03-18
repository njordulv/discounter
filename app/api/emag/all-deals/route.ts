// pages/api/products.ts
import { NextResponse } from 'next/server'
import Product from '@/models/Product'
import { connectDB } from '@/lib/mongo'
import { getAsync, client } from '@/lib/redis'

const CACHE_EXPIRATION = 60 * 60 // 1 hour in seconds

export async function GET(request: Request) {
  const cacheKey = 'products_all' // Unique cache key

  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 20

    // Try to get data from Redis cache
    const cachedData = await getAsync(cacheKey)

    if (cachedData) {
      // If data exists in cache, return it
      return NextResponse.json({
        data: JSON.parse(cachedData).slice(
          (page - 1) * perPage,
          page * perPage
        ),
        meta: {
          currentPage: page,
          perPage,
          totalPages: Math.ceil(JSON.parse(cachedData).length / perPage),
          totalItems: JSON.parse(cachedData).length,
        },
      })
    }

    // If no data in cache, connect to MongoDB and get products
    await connectDB()
    const products = await Product.find({})

    // Save data in Redis with 1 hour expiration
    await client.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(products))

    console.log('Returning data from MongoDB')
    return NextResponse.json(products)
  } catch (error) {
    NextResponse.json({ message: 'Error fetching data', error })
  }
}

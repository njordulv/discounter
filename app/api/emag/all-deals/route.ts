import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import { getAsync, client } from '@/lib/redis'
import Product from '@/models/Product'

const CACHE_EXPIRATION = 60 * 60 // 1 hour in seconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page')) || 1
  const perPage = Number(searchParams.get('perPage')) || 20

  // Create cache key based on category
  const cacheKey = category ? `products_${category}` : 'products_all'

  try {
    // Try to get data from Redis cache
    const cachedData = await getAsync(cacheKey)

    if (cachedData) {
      const parsedData = JSON.parse(cachedData)
      return NextResponse.json({
        data: parsedData.slice((page - 1) * perPage, page * perPage),
        meta: {
          currentPage: page,
          perPage,
          category,
          totalPages: Math.ceil(parsedData.length / perPage),
          totalItems: parsedData.length,
        },
      })
    }

    // If no data in cache, connect to MongoDB
    await connectDB()

    // Form query with category filter (if provided)
    const query = category ? { category } : {}
    const totalItems = await Product.countDocuments(query)
    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)

    // Save full category list in cache, but only if first page is requested
    if (page === 1) {
      const allProducts = await Product.find(query)
      await client.setex(
        cacheKey,
        CACHE_EXPIRATION,
        JSON.stringify(allProducts)
      )
    }

    console.log('Returning data from MongoDB')

    return NextResponse.json({
      data: products,
      meta: {
        currentPage: page,
        perPage,
        category,
        totalPages: Math.ceil(totalItems / perPage),
        totalItems,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error })
  }
}

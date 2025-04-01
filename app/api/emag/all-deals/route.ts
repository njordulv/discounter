import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import { getAsync, redisClient } from '@/lib/redis'
import { CACHE_EXPIRATION } from '@/config/cache'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page')) || 1
  const perPage = Number(searchParams.get('perPage')) || 20

  const cacheKey = `products_${category}_page_${page}`
  const countKey = `products_${category}_count`
  // const countKey = `products_${category}_count`

  try {
    // 1. Reading cached data for page
    const cachedPage = await getAsync(cacheKey)
    const cachedCount = await getAsync(countKey)

    if (cachedPage && cachedCount) {
      console.log(`✅ Loaded page ${page} from Redis`)

      return NextResponse.json({
        data: JSON.parse(cachedPage),
        meta: {
          currentPage: page,
          perPage,
          category,
          totalPages: Math.ceil(Number(cachedCount) / perPage),
          totalItems: Number(cachedCount),
        },
      })
    }

    // 2. No cache, fetching from MongoDB
    console.log('❌ No cache, fetching from MongoDB')
    await connectDB()

    const query = category ? { category } : {}

    // If no cache for count, get it
    const totalItems = cachedCount
      ? Number(cachedCount)
      : await Product.countDocuments(query)

    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)

    // 3. Caching data
    await redisClient.setex(
      cacheKey,
      CACHE_EXPIRATION,
      JSON.stringify(products)
    )

    if (!cachedCount) {
      await redisClient.setex(countKey, CACHE_EXPIRATION, totalItems.toString())
    }

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

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import type { SortOrder } from 'mongoose'
import { getAsync, redisClient } from '@/lib/redis'
import { CACHE_EXPIRATION, PAGINATION } from '@/config/constants'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page')) || 1
  const perPage =
    Number(searchParams.get('perPage')) || PAGINATION.PER_PAGE_DEFAULT
  const sort = searchParams.get('sort')

  const sortSuffix = sort ? `_sort_${sort}` : ''
  const cacheKey = `products_${category}_page_${page}_perPage_${perPage}${sortSuffix}`
  const countKey = `products_${category}_count_perPage_${perPage}${sortSuffix}`

  try {
    // 1. Reading cached data
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
          sort,
        },
      })
    }

    // 2. No cache, fetch from DB
    console.log('❌ No cache, fetching from MongoDB')
    await connectDB()

    const query = category ? { category } : {}

    // Optional: Ensure index exists (safe to call multiple times)
    await Product.collection.createIndex({ category: 1, price: 1 })

    const sortOption: Record<string, SortOrder> = {}
    if (sort === 'price_asc') sortOption.price = 1
    else if (sort === 'price_desc') sortOption.price = -1

    // Count items
    const totalItems = cachedCount
      ? Number(cachedCount)
      : await Product.countDocuments(query)

    // Fetch sorted and paginated products
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)

    // Optional: Debug index usage
    // const explain = await Product.find(query)
    //   .sort(sortOption)
    //   .skip((page - 1) * perPage)
    //   .limit(perPage)
    //   .explain('executionStats')
    // console.log('MongoDB query performance:', explain)

    // 3. Cache result
    await redisClient.setex(
      cacheKey,
      CACHE_EXPIRATION.DEFAULT,
      JSON.stringify(products)
    )

    if (!cachedCount) {
      await redisClient.setex(
        countKey,
        CACHE_EXPIRATION.DEFAULT,
        totalItems.toString()
      )
    }

    return NextResponse.json({
      data: products,
      meta: {
        currentPage: page,
        perPage,
        category,
        totalPages: Math.ceil(totalItems / perPage),
        totalItems,
        sort,
      },
    })
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return NextResponse.json({ message: 'Error fetching data', error })
  }
}

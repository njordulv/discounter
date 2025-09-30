import { NextResponse } from 'next/server'
import type { SortOrder, FilterQuery } from 'mongoose'
import { connectDB } from '@/lib/mongo'
import { initRedis } from '@/lib/redis'
import { CACHE_EXPIRATION, PAGINATION } from '@/config/constants'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page')) || 1
  const perPage = Number(searchParams.get('perPage')) || PAGINATION.PER_PAGE_DEFAULT
  const sort = searchParams.get('sort')
  const search = searchParams.get('search') || ''

  const sortSuffix = sort ? `_sort_${sort}` : ''
  const searchSuffix = search ? `_search_${search}` : ''
  const cacheKey = `products_${category}_page_${page}_perPage_${perPage}${sortSuffix}${searchSuffix}`
  const countKey = `products_${category}_count_perPage_${perPage}${sortSuffix}${searchSuffix}`

  try {
    // 1. Reading cached data
    const redisClient = await initRedis()
    const cachedPage = await redisClient.get(cacheKey)
    const cachedCount = await redisClient.get(countKey)

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

    const query: FilterQuery<typeof Product> = {}
    if (category) query.category = category
    if (search) query.$text = { $search: search }

    const sortOption: Record<string, SortOrder | { $meta: string }> = {}
    if (sort === 'price_asc') sortOption.price = 1
    else if (sort === 'price_desc') sortOption.price = -1
    if (search) sortOption.score = { $meta: 'textScore' }

    const projection = search ? { score: { $meta: 'textScore' } } : {}

    // Count items
    const totalItems = cachedCount ? Number(cachedCount) : await Product.countDocuments(query)

    // Fetch sorted and paginated products
    const products = await Product.find(query, projection)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)

    // 3. Cache result
    await redisClient.set(cacheKey, JSON.stringify(products), {
      EX: CACHE_EXPIRATION.DEFAULT,
    })

    if (!cachedCount) {
      await redisClient.set(countKey, totalItems.toString(), {
        EX: CACHE_EXPIRATION.DEFAULT,
      })
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

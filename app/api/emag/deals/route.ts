// app/api/products/route.ts
import type { SortOrder, FilterQuery } from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import { withRedisFallback } from '@/lib/redis'
import { CACHE_EXPIRATION, PAGINATION } from '@/config/constants'
import Product from '@/models/Product'

async function fetchFromDatabase(
  category: string,
  page: number,
  perPage: number,
  sort: string | null,
  search: string
) {
  await connectDB()

  const query: FilterQuery<typeof Product> = {}
  if (category) query.category = category
  if (search) query.$text = { $search: search }

  const sortOption: Record<string, SortOrder | { $meta: string }> = {}
  if (sort === 'price_asc') sortOption.price = 1
  else if (sort === 'price_desc') sortOption.price = -1
  if (search) sortOption.score = { $meta: 'textScore' }

  const projection = search ? { score: { $meta: 'textScore' } } : {}

  const [totalItems, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query, projection)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage),
  ])

  return { products, totalItems }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page')) || 1
  const perPage =
    Number(searchParams.get('perPage')) || PAGINATION.PER_PAGE_DEFAULT
  const sort = searchParams.get('sort')
  const search = searchParams.get('search') || ''

  const sortSuffix = sort ? `_sort_${sort}` : ''
  const searchSuffix = search ? `_search_${search}` : ''
  const cacheKey = `products_${category}_page_${page}_perPage_${perPage}${sortSuffix}${searchSuffix}`
  const countKey = `products_${category}_count_perPage_${perPage}${sortSuffix}${searchSuffix}`

  try {
    // Get if Redis unavailable from cache automatically with fallback to DB
    const result = await withRedisFallback(
      // Redis operation
      async (redisClient) => {
        const [cachedPage, cachedCount] = await Promise.all([
          redisClient.get(cacheKey),
          redisClient.get(countKey),
        ])

        if (cachedPage && cachedCount) {
          console.log(`✅ Loaded page ${page} from Redis`)
          return {
            data: JSON.parse(cachedPage),
            totalItems: Number(cachedCount),
            fromCache: true,
          }
        }

        // If cache miss, fetch from DB and cache
        const { products, totalItems } = await fetchFromDatabase(
          category,
          page,
          perPage,
          sort,
          search
        )

        // Caching asynchronously, not waiting for completion.
        Promise.all([
          redisClient.set(cacheKey, JSON.stringify(products), {
            EX: CACHE_EXPIRATION.DEFAULT,
          }),
          redisClient.set(countKey, totalItems.toString(), {
            EX: CACHE_EXPIRATION.DEFAULT,
          }),
        ]).catch(() => {
          /* Ignore caching errors */
        })

        return {
          data: products,
          totalItems,
          fromCache: false,
        }
      },
      // Fallback operation - always DB
      async () => {
        console.log('🔄 Using database fallback (Redis unavailable)')
        const { products, totalItems } = await fetchFromDatabase(
          category,
          page,
          perPage,
          sort,
          search
        )
        return {
          data: products,
          totalItems,
          fromCache: false,
        }
      }
    )

    return NextResponse.json({
      data: result.data,
      meta: {
        currentPage: page,
        perPage,
        category,
        totalPages: Math.ceil(result.totalItems / perPage),
        totalItems: result.totalItems,
        sort,
        source: result.fromCache ? 'cache' : 'database',
      },
    })
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return NextResponse.json(
      {
        message: 'Error fetching data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

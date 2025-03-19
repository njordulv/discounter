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

  // Создаём ключ кеша в зависимости от категории
  const cacheKey = category ? `products_${category}` : 'products_all'

  try {
    // Пытаемся получить данные из кеша Redis
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

    // Если данных в кеше нет, подключаемся к MongoDB
    await connectDB()

    // Формируем запрос с фильтрацией по категории (если передана)
    const query = category ? { category } : {}
    const totalItems = await Product.countDocuments(query)
    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)

    // Сохраняем полный список категории в кеш, но только если запрашивается 1-я страница
    if (page === 1) {
      try {
        const allProducts = await Product.find(query)
        console.log('Caching data count:', allProducts.length)
        await client.setex(
          cacheKey,
          CACHE_EXPIRATION,
          JSON.stringify(allProducts)
        )
        console.log('Data cached successfully')
      } catch (redisError) {
        console.error('Failed to cache data:', redisError)
      }
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

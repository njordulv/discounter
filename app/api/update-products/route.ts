import { NextResponse } from 'next/server'
import { redis, collection } from '@/lib/db'
import { updateDeals } from '@/lib/dealsService'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 20

    // 1. Check Redis cache
    let cachedData = await redis.get('discounts')

    // 2. If cache is expired, update data
    if (!cachedData) {
      console.log('♻️ Cache expired, updating data...')
      await updateDeals()
      cachedData = await redis.get('discounts')
    }

    // 3. If data exists in cache, return it
    if (cachedData) {
      const allData = JSON.parse(cachedData)
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

    // 4. If cache is empty, try MongoDB
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

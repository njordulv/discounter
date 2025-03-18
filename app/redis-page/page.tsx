// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next'
import Product from '@/models/Product'
import { connectDB } from '@/lib/mongo'
import { getAsync, client } from '@/lib/redis'

const CACHE_EXPIRATION = 60 * 60 // 1 час в секундах

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cacheKey = 'products_all' // Unique cache key

  try {
    // Try to get data from Redis cache
    const cachedData = await getAsync(cacheKey)

    if (cachedData) {
      // If data exists in cache, return it
      console.log('Returning data from Redis cache')
      return res.status(200).json(JSON.parse(cachedData))
    }

    // If no data in cache, connect to MongoDB and get products
    await connectDB()
    const products = await Product.find({})

    // Save data in Redis with 1 hour expiration
    await client.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(products))

    console.log('Returning data from MongoDB')
    return res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error })
  }
}

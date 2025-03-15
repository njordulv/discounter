import { createClient } from 'redis'

// Create Redis Client
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

redis.on('error', (err) => console.log('Redis Client Error', err))

// Connect to Redis
const connectRedis = async () => {
  await redis.connect()
}

connectRedis().catch(console.error)

export { redis }

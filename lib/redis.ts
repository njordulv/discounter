import { createClient, type RedisClientType } from 'redis'
import databaseConfig from '@/config/database'

let redisClient: RedisClientType

export async function initRedis(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      url: databaseConfig.redis.url,
    })

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
    })

    await redisClient.connect()
  }

  return redisClient
}

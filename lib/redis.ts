// lib/redis.ts
import { createClient, type RedisClientType } from 'redis'
import databaseConfig from '@/config/database'

let redisClient: RedisClientType | null = null
let connectionAttempted = false

export async function initRedis(): Promise<RedisClientType | null> {
  // If already tried to connect and failed, don't try again
  if (connectionAttempted && !redisClient) {
    return null
  }

  if (redisClient) {
    return redisClient
  }

  connectionAttempted = true

  try {
    redisClient = createClient({
      url: databaseConfig.redis.url,
      socket: {
        connectTimeout: 5000, // 5 sec timeout
        timeout: 5000,
        // Disable auto-reconnects
        reconnectStrategy: false,
      },
    })

    // Remove all error handlers to avoid spam
    redisClient.on('error', (err) => {
      // Only one error to console, don't spam
      if (!connectionAttempted) {
        console.error('❌ Redis connection failed:', err.message)
      }
    })

    await redisClient.connect()
    console.log('✅ Redis connected successfully')
    return redisClient
  } catch (error) {
    console.error(
      '❌ Redis connection failed, disabling cache:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    redisClient = null
    return null
  }
}

export function isRedisAvailable(): boolean {
  return redisClient?.isOpen || false
}

// Function for safe Redis operations
export async function withRedisFallback<T>(
  operation: (client: RedisClientType) => Promise<T>,
  fallback: () => Promise<T>
): Promise<T> {
  const client = await initRedis()
  if (!client) {
    return fallback()
  }

  try {
    return await operation(client)
  } catch (error) {
    console.log('🔄 Redis operation failed, using fallback: ', error)
    return fallback()
  }
}

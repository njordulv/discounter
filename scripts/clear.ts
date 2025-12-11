import { initRedis } from '@/lib/redis'

// Clear Redis cache
async function main() {
  try {
    const redis = await initRedis()

    if (!redis) {
      console.warn('⚠️ Redis do not initialized, cache not cleared')
      return
    }

    const keys = await redis.keys('products_*')

    if (keys.length > 0) {
      await redis.del(keys)
      console.log(`🗑️ Cleared ${keys.length} product cache keys`)
    } else {
      console.log('✅ No product cache keys found')
    }
  } catch (error) {
    console.error('❌ Something went wrong: ', error)
  } finally {
    process.exit(0)
  }
}

main()

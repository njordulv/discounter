import type { DatabaseConfig } from '@/interfaces/ui'
import 'dotenv/config'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables')
}

const databaseConfig: DatabaseConfig = {
  mongo: {
    url: process.env.MONGODB_URI,
    defaultDb: 'discounter',
    collections: {
      products: 'products',
    },
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
}

export default databaseConfig

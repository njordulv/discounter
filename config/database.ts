import 'dotenv/config'

interface DatabaseConfig {
  mongo: {
    url: string
    defaultDb: string
    collections: {
      products: string
    }
  }
  redis: {
    url: string
  }
}

const databaseConfig: DatabaseConfig = {
  mongo: {
    url: process.env.MONGODB_URI!,
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

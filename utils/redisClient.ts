import Redis from 'ioredis'

// Create Redis Client
export const redis = new Redis(process.env.REDIS_URL!)

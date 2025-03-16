import Redis from 'ioredis'
import { MongoClient } from 'mongodb'
import { scheduleNextRun } from '@/lib/scheduler'
import databaseConfig from '@/config/database'

export const redis = new Redis(databaseConfig.redis.url)
export const mongoClient = new MongoClient(databaseConfig.mongo.url)
export const db = mongoClient.db(databaseConfig.mongo.defaultDb)
export const collection = db.collection(
  databaseConfig.mongo.collections.products
)

// Execute auto update of discounts every hour
scheduleNextRun()

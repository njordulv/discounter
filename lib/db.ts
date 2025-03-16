import Redis from 'ioredis'
import { MongoClient } from 'mongodb'
import { scheduleNextRun } from '@/lib/scheduler'

export const redis = new Redis(process.env.REDIS_URL!)
export const mongoClient = new MongoClient(process.env.MONGODB_URI!)
export const db = mongoClient.db('productsDB')
export const collection = db.collection('products')

// Execute auto update of discounts every hour
scheduleNextRun()

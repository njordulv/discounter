import mongoose from 'mongoose'
import databaseConfig from '@/config/database'

const MONGODB_URI = databaseConfig.mongo.url
const DB_NAME = databaseConfig.mongo.defaultDb

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file')
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME })
}

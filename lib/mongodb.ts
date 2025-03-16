import { MongoClient } from 'mongodb'
import 'dotenv/config'

const MONGO_URI = process.env.MONGODB_URI as string

const client = new MongoClient(MONGO_URI)

async function connectToDatabase() {
  try {
    await client.connect()
    console.log('✅ Successfully connected to MongoDB')

    const db = client.db()
    return { db }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to database')
  }
}

export default connectToDatabase

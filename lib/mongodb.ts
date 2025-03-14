import mongoose from 'mongoose'
import 'dotenv/config'

const connectToDatabase = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to the database')
      return
    }

    await mongoose.connect(process.env.MONGODB_URI || '')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}

export default connectToDatabase

import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  oldPrice: String,
  discount: String,
  isGenius: Boolean,
  stock: String,
  stockOut: String,
  stockLimited: String,
  toOrder: String,
  imageUrl: String,
  link: String,
  timestamp: { type: Date, default: Date.now },
})

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)

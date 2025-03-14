import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: String,
  discount: String,
  isGenius: Boolean,
  stock: String,
  stockOut: String,
  stockLimited: String,
  toOrder: String,
  imageUrl: String,
  link: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product

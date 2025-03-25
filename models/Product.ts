import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
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
    category: String,
    timestamp: { type: Number, default: () => Date.now() },
  },
  { versionKey: false } // Disable versionKey __v field
)

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)

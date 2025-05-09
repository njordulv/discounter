import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    oldPrice: Number,
    discount: Number,
    isGenius: Boolean,
    stock: String,
    stockOut: String,
    stockLimited: String,
    toOrder: String,
    imageUrl: String,
    link: String,
    category: String,
    store: { type: String, required: true },
    outdated: { type: Boolean, default: false },
    timestamp: { type: Number, default: () => Date.now() },
  },
  { versionKey: false }
)

ProductSchema.index({ title: 'text' })

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)

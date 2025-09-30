import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  await connectDB()

  const results = await Product.find({ $text: { $search: q } }, { title: 1, imageUrl: 1, _id: 1 })
    .limit(5)
    .sort({ score: { $meta: 'textScore' } })

  return NextResponse.json({
    results: results.map((item) => ({
      title: item.title,
      image: item.imageUrl,
      _id: item._id.toString(),
    })),
  })
}

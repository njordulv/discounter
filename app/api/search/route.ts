// app/api/search/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  await connectDB()

  const products = await Product.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } }).sort({
    score: { $meta: 'textScore' },
  })

  return NextResponse.json({ data: products })
}

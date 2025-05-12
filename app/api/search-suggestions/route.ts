import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  await connectDB()

  const results = await Product.find({ $text: { $search: q } }, { title: 1 })
    .limit(5)
    .sort({ score: { $meta: 'textScore' } })

  const titles = results.map((item) => item.title)

  return NextResponse.json({ results: titles })
}

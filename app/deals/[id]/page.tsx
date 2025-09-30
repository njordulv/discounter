import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'
import { Deal } from '@/components/emag/Deal'
import type { ScrapeProps } from '@/interfaces/emag'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params
  await connectDB()

  const product = await Product.findById(params.id).lean<ScrapeProps>()

  if (!product) return notFound()

  return <Deal {...product} />
}

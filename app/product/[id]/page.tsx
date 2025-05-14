export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { TbExternalLink } from 'react-icons/tb'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'
import { FallbackImage } from '@/components/ui/FallbackImage'
import type { ScrapeProps } from '@/interfaces/emag'
import config from '@/config'

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  await connectDB()

  const product = await Product.findById(params.id).lean<ScrapeProps>()

  if (!product) return notFound()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-[2fr_3fr] gap-4">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={384}
            height={384}
            className="w-96 h-96 object-cover aspect-square rounded-lg bg-background border"
            priority={false}
            placeholder="blur"
            blurDataURL={config.imageBase64}
          />
        ) : (
          <FallbackImage />
        )}
        <div className="flex flex-col gap-2 rounded-xl p-6 border bg-card text-sm text-muted-foreground shadow w-full">
          <h1 className="text-2xl font-semibold text-card-foreground mb-4">
            {product.title}
          </h1>
          <p className="text-lg">
            Цена: <span className="font-semibold">{product.price} лв</span>
          </p>
          {product.oldPrice && (
            <p className="text-sm text-muted-foreground">
              Старая цена:{' '}
              <span className="line-through">{product.oldPrice} лв</span>
            </p>
          )}
          {product.discount > 0 && (
            <p className="text-green-600 font-semibold">
              Скидка: {product.discount}%
            </p>
          )}
          <p>
            Avaible at: <a href={config.emag.url}>{product.store}</a>
          </p>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            <span>Перейти в магазин</span>
            <TbExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}

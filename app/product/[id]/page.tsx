export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { TbExternalLink } from 'react-icons/tb'
import { connectDB } from '@/lib/mongo'
import Product from '@/models/Product'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { LinkToShop } from '@/components/emag/card/Details'
import type { ScrapeProps } from '@/interfaces/emag'
import config from '@/config'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params
  await connectDB()

  const product = await Product.findById(params.id).lean<ScrapeProps>()

  if (!product) return notFound()

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4">
        <div>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={384}
              height={384}
              className="object-cover rounded-lg bg-background w-full h-full sm:w-auto sm:h-auto sm:min-w-96"
              priority={false}
              placeholder="blur"
              blurDataURL={config.imageBase64}
            />
          ) : (
            <FallbackImage />
          )}
        </div>
        <div className="w-full flex flex-col justify-between gap-4 rounded-xl sm:p-6 p-3 border bg-card text-sm text-muted-foreground shadow">
          <div>
            <h1 className="md:text-2xl text-xl font-semibold text-card-foreground mb-4">
              {product.title}
            </h1>
            <p>
              <span className="text-3xl font-semibold bg-gradient inline !bg-clip-text text-transparent">
                {product.price} лв
              </span>
            </p>
            {product.discount > 0 && (
              <p className="text-accent font-semibold">
                Скидка: {product.discount}%
              </p>
            )}
            <p>
              <LinkToShop store={product.store} />
            </p>
          </div>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border shadow-sm border-input h-9 px-4 py-2 modern"
          >
            <span>Перейти в магазин</span>
            <TbExternalLink size={18} />
          </a>
        </div>
      </div>
    </>
  )
}

import Image from 'next/image'
import { TbExternalLink } from 'react-icons/tb'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { StockStatus, LinkToShop } from '@/components/emag/card/Details'
import { cleanUrl } from '@/utils'
import type { ScrapeProps } from '@/interfaces/emag'
import config from '@/config'

export const Deal = (product: ScrapeProps) => {
  return (
    <div className="rounded-xl sm:p-5 sm:gap-6 md:p-5 p-2 gap-3 border bg-card flex flex-col md:flex-row">
      <div className="max-w-96 flex-shrink-0 relative overflow-hidden rounded-lg">
        {product.imageUrl ? (
          <Image
            src={cleanUrl(product.imageUrl)}
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
      <div className="flex flex-col justify-between gap-4 text-sm sm:text-base text-muted-foreground">
        <div className="flex flex-col gap-1">
          <h1 className="md:text-2xl text-lg font-semibold text-card-foreground mb-4">
            {product.title}
          </h1>
          <p>
            <span className="text-3xl font-semibold bg-gradient inline !bg-clip-text text-transparent">
              {product.price} лв
            </span>
          </p>
          <StockStatus
            stockInfo={{
              stockOut: product.stockOut,
              stockLimited: product.stockLimited,
              toOrder: product.toOrder,
              stock: product.stock,
            }}
          />
          {product.discount > 0 && <p>Скидка: {product.discount}%</p>}
          <p>
            <LinkToShop store={product.store} />
          </p>
        </div>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-link modern"
        >
          <span>Перейти в магазин</span>
          <TbExternalLink size={18} />
        </a>
      </div>
    </div>
  )
}

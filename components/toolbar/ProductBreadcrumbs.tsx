import Link from 'next/link'
import { TbHome } from 'react-icons/tb'
import { BackBtn } from '@/components/Back'
import styles from '@/styles/Toolbar.module.scss'
import type { ScrapeProps } from '@/interfaces/emag'

export const ProductBreadcrumbs = (product: ScrapeProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.breadcrumbs}>
        <Link href="/">
          <TbHome size={16} />
        </Link>
        {'/'}
        {product.category && (
          <Link href={`/tag/${product.category}`}>
            {product.category.replace(/-/g, ' ')}
          </Link>
        )}
        {'/'}
        <BackBtn />
      </div>
    </div>
  )
}

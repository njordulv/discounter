import { Listing } from '@/components/toolbar/Listing'
import { GridView } from '@/components/toolbar/GridView'
import styles from '@/styles/Toolbar.module.scss'

export const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filters}></div>
      <Listing />
      <GridView />
    </div>
  )
}

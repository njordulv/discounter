import { GridView } from '@/components/ui/GridView'
import styles from '@/styles/Toolbar.module.scss'

export const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filters}></div>
      <GridView />
    </div>
  )
}

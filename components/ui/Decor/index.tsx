import { WaveOne, WaveTwo } from '@/components/ui/Decor/Waves'
import styles from '@/styles/Decor.module.scss'

const Decor = () => {
  return (
    <div className={styles.decor}>
      <WaveOne />
      <WaveTwo />
    </div>
  )
}

export default Decor

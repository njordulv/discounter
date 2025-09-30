import { twMerge } from 'tailwind-merge'
import styles from '@/styles/Decor.module.scss'

export const WaveOne = () => {
  return (
    <div className={twMerge('bg-gradient-decoration', styles.decor__waves)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5120"
        height="440"
        viewBox="0 0 5120 440"
        preserveAspectRatio="none"
        className={styles.decor__vector}
        aria-hidden="true"
      >
        <path
          fill="var(--accent)"
          d="M0 170
  C 100 60, 140 120, 230 156 
  S 300 90, 400 137 
  S 487 96, 590 190 
  S 715 100, 800 140 
  S 910 190, 1000 190 
  S 1100 130, 1260 200 
  S 1390 140, 1530 200
  S 1660 140, 1760 170 
  S 1930 270, 2100 190 
  S 2330 500, 2600 201 
  S 3030 402, 3660 160 
  S 4000 400, 4500 440 
  S 4700 80, 5120 200 V 440 H 0 Z"
        />
      </svg>
    </div>
  )
}

export const WaveTwo = () => {
  return (
    <div className={twMerge(styles.decor__waves, styles.decor__wave2)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5120"
        height="440"
        viewBox="0 0 5120 440"
        preserveAspectRatio="none"
        className={styles.decor__vector}
        aria-hidden="true"
      >
        <path
          fill="var(--background)"
          d="M0 250 
  C 290 30, 330 250, 560 290 
  S 890 50, 1150 200 
  S 1350 90, 1500 220 
  S 1800 70, 2000 260 
  S 2500 50, 2800 200 
  S 3000 50, 3200 160 
  S 3450 50, 3650 150 
  S 3800 300, 4100 250 
  S 4630 0, 4800 160 
  S 5120 250, 5120 150 V 440 H 0 Z"
        />
      </svg>
    </div>
  )
}

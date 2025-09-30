import type { MotionCardVariants } from '@/interfaces/ui'

export const motionCard = (index: number): MotionCardVariants => ({
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    delay: index * 0.009,
    duration: 0.9,
    type: 'spring',
    bounce: 0.35,
  },
})

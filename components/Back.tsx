'use client'

import { useRouter } from 'next/navigation'
import config from '@/config'

export const BackBtn = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button type="button" onClick={handleBack}>
      {config.text.back}
    </button>
  )
}

'use client'

import { useRouter } from 'next/navigation'

export const BackBtn = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button type="button" onClick={handleBack}>
      Back
    </button>
  )
}

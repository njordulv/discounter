import { useEffect, useState } from 'react'
import { useStore } from '@/store'

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })

    if (useStore.persist.hasHydrated()) {
      setHasHydrated(true)
    }

    return () => {
      unsub?.()
    }
  }, [])

  return hasHydrated
}

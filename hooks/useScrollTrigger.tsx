import { useEffect } from 'react'

const useScrollTrigger = (callback: () => void, offset = 200) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - offset) {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback, offset])
}

export default useScrollTrigger

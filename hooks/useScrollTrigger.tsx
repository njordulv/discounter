import { useEffect } from 'react'

const useScrollTrigger = (
  callback: () => void,
  offset = 200,
  debounceTime = 200
) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement
        if (scrollTop + clientHeight >= scrollHeight - offset) {
          callback()
        }
      }, debounceTime)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, offset, debounceTime])
}

export default useScrollTrigger

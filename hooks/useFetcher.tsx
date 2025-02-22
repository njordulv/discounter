import useSWR from 'swr'

const useFetcher = (options: { url: string }) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  const { data, error, isLoading } = useSWR(options.url, fetcher)

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetcher

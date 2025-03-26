import config from '@/config'
import { catsConfig } from '@/config/categories'

export function normalizeImageUrl(url: string): string {
  url = url.replace(/^https?:/i, 'https://')
  const parts = url.split('://')
  const lastPart = parts.pop() || ''
  return `https://${lastPart}`.replace(/\/+/g, '/')
}

export function getCategoryName(slug: string) {
  return Object.values(catsConfig)
    .flatMap((cat) => [
      { slug: cat.slug, name: cat.name },
      ...Object.values(cat.subcategories || {}).map((sub) => ({
        slug: sub.slug,
        name: sub.name,
      })),
    ])
    .find((item) => item.slug === slug)?.name
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const randomDelay = () => sleep(3000 + Math.random() * 7000)

export function userAgent() {
  return config.userAgents[Math.floor(Math.random() * config.userAgents.length)]
}

// Link processing function
export const processLink = (link: string): string => {
  return link.startsWith('http')
    ? link
    : new URL(link, config.emag.url).toString()
}

export const getMonth = () =>
  new Date().toLocaleString('en-US', { month: 'long' })

export const getYear = () => new Date().getFullYear()

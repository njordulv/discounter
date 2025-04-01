import config from '@/config'
import { catsConfig } from '@/config/categories'

// Normalize image URL
export function normalizeImageUrl(url: string): string {
  url = url.replace(/^https?:/i, 'https://')
  const parts = url.split('://')
  const lastPart = parts.pop() || ''
  return `https://${lastPart}`.replace(/\/+/g, '/')
}

// Slug to name
export function slugToName(slug: string) {
  return Object.values(catsConfig)
    .flatMap((cat) => [{ slug: cat.slug, name: cat.name }])
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

// Get full month
export const getMonth = () =>
  new Date().toLocaleString('en-US', { month: 'long' })

// Get full year
export const getYear = () => new Date().getFullYear()

// Parse price from mongodb with correct format
export const parsePrice = (priceText: string): number | null => {
  if (!priceText) return null

  const cleanText = priceText.replace(/[^0-9.,]/g, '').trim()
  const normalizedPrice = cleanText.replace(',', '.')
  const price = parseFloat(normalizedPrice)

  return isNaN(price) ? null : price
}

// Format price output
export const formatPrice = (price: number): string => {
  const [intPart, decimalPart = '00'] = price.toString().split('.')

  const formattedDecimal =
    decimalPart.length === 1 ? `${decimalPart}0` : decimalPart

  return `${intPart},${formattedDecimal}`
}

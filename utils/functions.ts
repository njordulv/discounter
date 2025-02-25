export function normalizeImageUrl(url: string): string {
  url = url.replace(/^https?:/i, 'https://')
  const parts = url.split('://')
  const lastPart = parts.pop() || ''
  return `https://${lastPart}`.replace(/\/+/g, '/')
}

import fs from 'fs/promises'
import path from 'path'
import { DealProps } from '@/interfaces/emag/deals'

const CACHE_FILE = path.resolve(process.cwd(), 'public/deals.json')

export async function saveDealsToCache(deals: DealProps[]) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(deals, null, 2), 'utf-8')
}

export async function getDealsFromCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Cache read error:', error)
    return []
  }
}

import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { DealProps } from '@/interfaces'
import { getAllDeals } from '@/utils/getDeals'

export async function scrapeEmagDeals(): Promise<DealProps[]> {
  const url = getAllDeals()

  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    const deals: DealProps[] = []

    $('.card-item').each((_, el) => {
      const title = $(el).find('.card-v2-title').text().trim()
      const price = $(el).find('.product-new-price').text().trim()
      const discount = $(el).find('.product-discount').text().trim()
      const image = $(el).find('.img-component img').attr('src') || ''
      const link = $(el).find('a.card-v2-title').attr('href') || ''

      deals.push({ title, price, discount, image, url: link })
    })

    return deals
  } catch (error) {
    console.error('Parse error from eMAG:', error)
    return []
  }
}

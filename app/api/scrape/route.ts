import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import getTodayDeals from '@/utils/getTodayDeals'

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(getTodayDeals(), { waitUntil: 'domcontentloaded' })

    const categories = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.card-item')).map((card) => {
        const titleElement = card.querySelector(
          '.card-v2-title'
        ) as HTMLAnchorElement | null
        const imageElement = card.querySelector(
          '.img-component img'
        ) as HTMLImageElement | null
        const newPriceElement = card.querySelector('.product-new-price')
        const linkElement = card.querySelector(
          'a.card-v2-title'
        ) as HTMLAnchorElement | null

        return {
          title:
            titleElement instanceof HTMLElement
              ? titleElement.innerText.trim()
              : '',
          newPrice:
            newPriceElement instanceof HTMLElement
              ? newPriceElement.innerText.trim()
              : '',
          url: linkElement?.href || '',
          image: imageElement?.src || '',
        }
      })
    })

    const limitedCategories = categories.slice(0, 60)

    await browser.close()

    return NextResponse.json(limitedCategories)
  } catch (error) {
    console.error(
      'Parser error:',
      error instanceof Error ? error.message : 'Unknown error'
    )

    return NextResponse.json(
      {
        error: 'Parser error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

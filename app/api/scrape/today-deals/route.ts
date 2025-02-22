import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { getTodayDeals } from '@/utils/getDeals'

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(getTodayDeals(), { waitUntil: 'domcontentloaded' })

    const categories = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.lc-section')).map(
        (card) => {
          const titleElement = card.querySelector(
            '.lc-section-title'
          ) as HTMLAnchorElement | null
          const imageElement = card.querySelector(
            '.lc-section-image img'
          ) as HTMLImageElement | null
          const discountElement = card.querySelector(
            '.lc-section-title div + div'
          )
          const linkElement = card.querySelector(
            'a.lc-section-title'
          ) as HTMLAnchorElement | null

          return {
            title:
              titleElement instanceof HTMLElement
                ? titleElement.innerText.trim()
                : '',
            discount:
              discountElement instanceof HTMLElement
                ? discountElement.innerText.trim()
                : '',
            url: linkElement?.href || '',
            image: imageElement?.src || '',
          }
        }
      )
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

import { NextResponse } from 'next/server'
import axios from 'axios'
import { load } from 'cheerio'

export async function GET() {
  try {
    const response = await axios.get(
      'https://www.emag.bg/label-campaign/emag-deal-of-the-day-friday-21-02-2025'
    )

    const $ = load(response.data)
    const categories = $('.lc-section .lc-section-title')
      .map((_, element) => {
        const el = $(element)
        return {
          title: el.text().trim(),
          url: el.attr('href'),
        }
      })
      .get()

    return NextResponse.json(categories)
  } catch (error) {
    console.error(
      'Parser error:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error details:',
        error.response?.status,
        error.response?.data
      )
    }
    return NextResponse.json(
      {
        error: 'Parser error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

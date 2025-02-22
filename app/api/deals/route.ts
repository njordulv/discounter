import { NextResponse } from 'next/server'
import { scrapeAllDeals } from '@/utils/scraper'

export async function GET() {
  try {
    const deals = await scrapeAllDeals()

    return NextResponse.json(deals)
  } catch (error) {
    console.error('Error API:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

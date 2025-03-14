import { NextResponse } from 'next/server'
import { scrapeEmag } from '@/lib/scraper'
import config from '@/config'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = parseInt(searchParams.get('perPage') || '20', 10)

  try {
    const categoryUrl = config.emag.categories.livingRoom
    const allProducts = await scrapeEmag(categoryUrl)

    const startIdx = (page - 1) * perPage
    const endIdx = startIdx + perPage
    const paginatedData = allProducts.slice(startIdx, endIdx)

    return NextResponse.json({
      data: paginatedData,
      meta: {
        currentPage: page,
        perPage,
        totalItems: allProducts.length,
        totalPages: Math.ceil(allProducts.length / perPage),
      },
    })
  } catch (error) {
    console.error('Error scraping products:', error)
    return NextResponse.json({ success: false, message: 'Error fetching data' })
  }
}

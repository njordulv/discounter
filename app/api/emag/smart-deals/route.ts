import { NextRequest, NextResponse } from 'next/server'
import config from '@/config'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const source_id = searchParams.get('source_id') || '7'
    const apiUrl = `${config.emag.smartDeals}${source_id}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: config.emag.errorFetch }, { status: 500 })
  }
}

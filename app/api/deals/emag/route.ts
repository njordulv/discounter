import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const source_id = searchParams.get('source_id') || '7'
    const zone = searchParams.get('zone') || ''
    const position = searchParams.get('position') || '0'

    const apiUrl = `https://sapi.emag.bg/label-campaign/flash-deals?source_id=${source_id}&zone=${zone}&position=${position}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching deals.' },
      { status: 500 }
    )
  }
}

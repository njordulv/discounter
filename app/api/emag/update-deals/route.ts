import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Get data from Supabase
    const { data, error } = await supabase.from('discounts').select('*')

    if (error) throw error

    const filePath = path.join(process.cwd(), 'public', 'all-deals.json')

    // Save data to JSON
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ message: 'Deals updated successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update deals' },
      { status: 500 }
    )
  }
}

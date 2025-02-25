import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import config from '@/config'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) throw error

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: config.emag.errorFetch }, { status: 500 })
  }
}

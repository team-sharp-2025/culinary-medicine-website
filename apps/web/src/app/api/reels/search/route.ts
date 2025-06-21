import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { supabase } from '../../../../../../../packages/lib/src/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { page = 1, size = 10, searchTerm = '' } = await req.json()
    const from = (page - 1) * size
    const to = from + size - 1

    const { data: reels, error, count } = await supabase
      .from('Reel')
      .select('*', { count: 'exact' })
      .ilike('title', `${searchTerm}%`) // case-insensitive search
      .order('createdAt', { ascending: false })
      .range(from, to)

    if (error) throw error

    return NextResponse.json(
      ApiResponse.success({ reels, total: count, page, size }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in reel search:', error)
    return NextResponse.json(ApiResponse.error('Failed to fetch reels'), { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { supabase } from '../../../../../../../packages/lib/src/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { page = 1, size = 10, searchTerm = '' } = await req.json()
    const from = (page - 1) * size
    const to = from + size - 1

    const { data: blogs, error, count } = await supabase
      .from('Blog')
      .select('*', { count: 'exact' })
      .ilike('title', `${searchTerm}%`) // Case-insensitive search
      .order('createdAt', { ascending: false })
      .range(from, to)

    if (error) throw error

    return NextResponse.json(ApiResponse.success({ blogs, total: count, page, size }), { status: 200 })
  } catch (error) {
    console.error('Error in blog search:', error)
    return NextResponse.json(ApiResponse.error('Failed to fetch blogs'), { status: 500 })
  }
}

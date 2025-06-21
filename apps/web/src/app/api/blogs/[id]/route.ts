import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { supabase } from '../../../../../../../packages/lib/src/supabaseClient';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(ApiResponse.error('Invalid ID'), { status: 400 })
    }

    const { data: blog, error } = await supabase
      .from('Blog')
      .select('*')
      .eq('id', id)
      .single() // returns just one row instead of an array

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
      }
      throw error
    }

    return NextResponse.json(ApiResponse.success(blog))
  } catch (error) {
    console.error('Error fetching blog by ID:', error)
    return NextResponse.json(ApiResponse.error('Failed to fetch blog'), { status: 500 })
  }
}

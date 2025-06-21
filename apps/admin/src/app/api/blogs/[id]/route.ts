import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { blogService } from '../../../../../../../packages/lib/src/services/blogService';
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await req.json();

        if (!body.title || !body.content) {
            return NextResponse.json(ApiResponse.error('Title and content are required'), { status: 400 })
        }

        const existing = await blogService.getById(id);
        if (!existing) {
            return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
        }

        const updatedBlog = await blogService.update(id, body);
        return NextResponse.json(ApiResponse.success(updatedBlog));
    } catch (error) {
        console.error("Error occured while updating the blog: ", error);
        return NextResponse.json(ApiResponse.error('Failed to update blog'), { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        const existing = await blogService.getById(id);
        if (!existing) {
            return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
        }

        await blogService.delete(id);
        return NextResponse.json(ApiResponse.success(`Blog ${id} deleted`));
    } catch (error) {
        console.error("Error occured while deleting the blog: ", error);
        return NextResponse.json(ApiResponse.error('Failed to delete blog'), { status: 400 });
    }
}

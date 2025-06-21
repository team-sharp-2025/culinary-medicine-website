import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { blogService } from '../../../../../../../packages/lib/src/services/blogService';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const blog = await blogService.getById(id);
        if (!blog) return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 });
        return NextResponse.json(ApiResponse.success(blog));
    } catch (error) {
        console.error("Error occured while fetching the blog by ID: ", error);
        return NextResponse.json(ApiResponse.error('Failed to fetch blog'), { status: 500 });
    }
}

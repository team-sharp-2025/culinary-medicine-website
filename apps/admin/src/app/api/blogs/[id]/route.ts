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

import { NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../packages/lib/src/ApiResponse';
import { blogService } from '../../../../../../packages/lib/src/services/blogService';

export async function GET() {
  try {
    const blogs = await blogService.getAll();
    return NextResponse.json(ApiResponse.success(blogs));
  } catch (error) {
    console.error("Error occured while fetching all the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to fetch blogs'), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json(ApiResponse.error('Title and content are required'), { status: 400 })
    }

    const body = await req.json();
    const blog = await blogService.create(body);
    return NextResponse.json(ApiResponse.success(blog));
  } catch (error) {
    console.error("Error occured while inserting the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to create blog'), { status: 400 });
  }
}

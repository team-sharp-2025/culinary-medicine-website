import { NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../packages/lib/src/ApiResponse';
import { blogService } from '../../../../../../packages/lib/src/services/blogService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(ApiResponse.error('Title and content are required'), { status: 400 })
    }

    const blog = await blogService.create(body);
    return NextResponse.json(ApiResponse.success(blog));
  } catch (error) {
    console.error("Error occured while inserting the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to create blog'), { status: 400 });
  }
}

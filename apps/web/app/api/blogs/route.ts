import { ApiResponse } from '@/app/lib/ApiResponse'
import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(ApiResponse.success(blogs))
  } catch (error) {
    console.error("Error occured while fetching all the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to fetch blogs'), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json(ApiResponse.error('Title and content are required'), { status: 400 })
    }

    const newBlog = await prisma.blog.create({
      data: { title, content },
    })

    return NextResponse.json(ApiResponse.success([newBlog]), { status: 201 })
  } catch (error) {
    console.error("Error occured while inserting the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to create blog'), { status: 500 })
  }
}

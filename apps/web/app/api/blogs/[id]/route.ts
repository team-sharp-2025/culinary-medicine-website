import { ApiResponse } from '@/app/lib/ApiResponse'
import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    const blog = await prisma.blog.findUnique({ where: { id } })

    if (!blog) {
      return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
    }

    return NextResponse.json(ApiResponse.success([blog]), { status: 200 })
  } catch (error) {
    console.error("Error occured while fetching the blog by ID: ", error);
    return NextResponse.json(ApiResponse.error('Failed to fetch blog'), { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json(ApiResponse.error('Title and content are required'), { status: 400 })
    }

    const existing = await prisma.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { title, content },
    })

    return NextResponse.json(ApiResponse.success([updatedBlog]), { status: 200 })
  } catch (error) {
    console.error("Error occured while updating the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to update blog'), { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    const existing = await prisma.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(ApiResponse.error('Blog not found'), { status: 404 })
    }

    const deletedBlog = await prisma.blog.delete({ where: { id } })

    return NextResponse.json(ApiResponse.success([deletedBlog]), { status: 200 })
  } catch (error) {
    console.error("Error occured while deleting the blog: ", error);
    return NextResponse.json(ApiResponse.error('Failed to delete blog'), { status: 500 })
  }
}

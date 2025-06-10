import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { blogService } from '../../../../../../../packages/lib/src/services/blogService';

export async function POST(req: NextRequest) {
    try {
        const { page = 1, size = 10, searchTerm = '' } = await req.json();
        const skip = (page - 1) * size;

        const [blogs, total] = await Promise.all([
            blogService.getPaginated(skip, size, searchTerm),
            blogService.countAll(searchTerm),
        ]);

        return NextResponse.json(
            ApiResponse.success({ blogs, total, page, size }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in blog search:", error);
        return NextResponse.json(ApiResponse.error('Failed to fetch blogs'), { status: 500 });
    }
}

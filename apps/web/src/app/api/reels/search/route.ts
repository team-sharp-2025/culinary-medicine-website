import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { reelService } from '../../../../../../../packages/lib/src/services/reelService';

export async function POST(req: NextRequest) {
    try {
        const { page = 1, size = 10, searchTerm = '' } = await req.json();
        const skip = (page - 1) * size;

        const [reels, total] = await Promise.all([
            reelService.getPaginated(skip, size, searchTerm),
            reelService.countAll(searchTerm),
        ]);

        return NextResponse.json(
            ApiResponse.success({ reels, total, page, size }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in reel search:", error);
        return NextResponse.json(ApiResponse.error('Failed to fetch reels'), { status: 500 });
    }
}

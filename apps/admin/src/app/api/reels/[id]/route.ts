import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../../packages/lib/src/ApiResponse';
import { reelService } from '../../../../../../../packages/lib/src/services/reelService';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await req.json();

        if (!body.title || !body.link) {
            return NextResponse.json(ApiResponse.error('Title and link are required'), { status: 400 })
        }

        const existing = await reelService.getById(id);
        if (!existing) {
            return NextResponse.json(ApiResponse.error('Reel not found'), { status: 404 })
        }

        const updatedReel = await reelService.update(id, body);
        return NextResponse.json(ApiResponse.success(updatedReel));
    } catch (error) {
        console.error("Error occured while updating the Reel: ", error);
        return NextResponse.json(ApiResponse.error('Failed to update Reel'), { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        const existing = await reelService.getById(id);
        if (!existing) {
            return NextResponse.json(ApiResponse.error('Reel not found'), { status: 404 })
        }

        await reelService.delete(id);
        return NextResponse.json(ApiResponse.success(`Reel ${id} deleted`));
    } catch (error) {
        console.error("Error occured while deleting the Reel: ", error);
        return NextResponse.json(ApiResponse.error('Failed to delete Reel'), { status: 400 });
    }
}

// apps/admin/src/app/api/reels/route.ts

import { NextResponse } from 'next/server';
import { ApiResponse } from '../../../../../../packages/lib/src/ApiResponse';
import { reelService } from '../../../../../../packages/lib/src/services/reelService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.link) {
      return NextResponse.json(ApiResponse.error('Title and link are required'), { status: 400 });
    }

    const reel = await reelService.create(body);
    return NextResponse.json(ApiResponse.success(reel));
  } catch (error) {
    console.error('Error occurred while inserting the reel: ', error);
    return NextResponse.json(ApiResponse.error('Failed to create reel'), { status: 400 });
  }
}
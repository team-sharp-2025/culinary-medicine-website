import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '../../../../../../packages/lib/src/services/loginService';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const result = await authenticateUser(username, password);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 401 });
    }

    return NextResponse.json({ success: true, userId: result.userId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
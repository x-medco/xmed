import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const FALLBACK_PASSWORD = 'xmedadmin2026';

export async function GET() {
  const cookieStore = cookies();
  const auth = cookieStore.get('admin_auth')?.value;
  
  if (auth === 'true') {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const envPassword = process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;

    if (password === envPassword) {
      const response = NextResponse.json({ success: true });
      // Set secure HTTP-only cookie valid for 7 days
      response.cookies.set('admin_auth', 'true', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Incorrect credentials' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}

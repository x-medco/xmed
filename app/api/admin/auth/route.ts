import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Client } from 'pg';

const FALLBACK_PASSWORD = 'xmedadmin2026';

const dbConfig = {
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.vhqzdmucrbcdubscyrpl',
  password: "Rubben%27282",
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

export async function GET() {
  const cookieStore = cookies();
  const auth = cookieStore.get('admin_auth')?.value;
  
  if (auth === 'true') {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  const client = new Client(dbConfig);
  try {
    const { password } = await request.json();
    const envPassword = process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;

    await client.connect();

    // 1. Check if already locked
    const lockCheck = await client.query("SELECT value FROM public.site_settings WHERE key = 'admin_locked';");
    const isLocked = lockCheck.rows[0]?.value === 'true';

    if (isLocked) {
      return NextResponse.json({ 
        success: false, 
        error: 'System locked due to intrusion security policy. Must be unlocked via developer terminal.' 
      }, { status: 403 });
    }

    // 2. Validate password
    if (password === envPassword) {
      // Reset attempts on success
      await client.query(`
        INSERT INTO public.site_settings (key, value)
        VALUES ('login_attempts', '0')
        ON CONFLICT (key) DO UPDATE SET value = '0';
      `);

      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_auth', 'true', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    // 3. Increment attempts on failure
    const attemptsRes = await client.query("SELECT value FROM public.site_settings WHERE key = 'login_attempts';");
    const currentAttempts = Number(attemptsRes.rows[0]?.value || 0) + 1;

    if (currentAttempts >= 3) {
      // Lock system and trigger maintenance mode
      await client.query(`
        INSERT INTO public.site_settings (key, value)
        VALUES ('admin_locked', 'true')
        ON CONFLICT (key) DO UPDATE SET value = 'true';
      `);
      
      await client.query(`
        INSERT INTO public.site_settings (key, value)
        VALUES ('maintenance_mode', 'true')
        ON CONFLICT (key) DO UPDATE SET value = 'true';
      `);

      await client.query(`
        INSERT INTO public.site_settings (key, value)
        VALUES ('login_attempts', $1)
        ON CONFLICT (key) DO UPDATE SET value = $1;
      `, [String(currentAttempts)]);

      return NextResponse.json({ 
        success: false, 
        error: 'Too many incorrect attempts. Website has been locked and placed offline.' 
      }, { status: 403 });
    }

    // Update attempts count
    await client.query(`
      INSERT INTO public.site_settings (key, value)
      VALUES ('login_attempts', $1)
      ON CONFLICT (key) DO UPDATE SET value = $1;
    `, [String(currentAttempts)]);

    return NextResponse.json({ 
      success: false, 
      error: `Incorrect credentials. ${3 - currentAttempts} attempts remaining before system lock.` 
    }, { status: 401 });

  } catch (err: any) {
    console.error("Auth API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}

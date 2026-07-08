import { NextResponse } from 'next/server';
import { Client } from 'pg';

const dbConfig = {
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.vhqzdmucrbcdubscyrpl',
  password: "Rubben%27282",
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

// GET current maintenance status
export async function GET() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const res = await client.query("SELECT value FROM public.site_settings WHERE key = 'maintenance_mode';");
    const status = res.rows[0]?.value === 'true';
    return NextResponse.json({ success: true, maintenanceMode: status });
  } catch (err: any) {
    console.error("Maintenance GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

// POST new maintenance status
export async function POST(request: Request) {
  const client = new Client(dbConfig);
  try {
    const body = await request.json();
    const isMaintenance = body.value === true;
    
    await client.connect();
    await client.query(`
      INSERT INTO public.site_settings (key, value, updated_at)
      VALUES ('maintenance_mode', $1, CURRENT_TIMESTAMP)
      ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP;
    `, [isMaintenance ? 'true' : 'false']);

    return NextResponse.json({ success: true, maintenanceMode: isMaintenance });
  } catch (err: any) {
    console.error("Maintenance POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

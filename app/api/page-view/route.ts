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

export async function POST(request: Request) {
  try {
    const { sessionId, pageUrl, device, trafficSource, utmCampaign } = await request.json();

    if (!sessionId || !pageUrl) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    // Retrieve geo metadata from Vercel Edge Headers
    const city = request.headers.get('x-vercel-ip-city') || 'Localhost';
    const country = request.headers.get('x-vercel-ip-country') || 'US';

    const client = new Client(dbConfig);
    await client.connect();

    // Insert the page view log into the database
    const query = `
      INSERT INTO public.page_views (session_id, page_url, city, country, device, traffic_source, utm_campaign)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    
    const res = await client.query(query, [
      sessionId,
      pageUrl,
      city,
      country,
      device,
      trafficSource,
      utmCampaign
    ]);

    await client.end();

    return NextResponse.json({ success: true, pageViewId: res.rows[0].id });

  } catch (err: any) {
    console.error('Error logging page view:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

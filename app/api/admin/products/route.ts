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

export async function PATCH(request: Request) {
  const client = new Client(dbConfig);
  try {
    const { slug, stock_qty, is_active } = await request.json();

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Product slug is required' }, { status: 400 });
    }

    await client.connect();

    // Dynamically build the update query fields
    const updates = [];
    const values = [];
    let placeholderIdx = 1;

    if (stock_qty !== undefined) {
      updates.push(`stock_qty = $${placeholderIdx++}`);
      values.push(Number(stock_qty));
    }

    if (is_active !== undefined) {
      updates.push(`is_active = $${placeholderIdx++}`);
      values.push(Boolean(is_active));
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'No update parameters provided' }, { status: 400 });
    }

    // Add slug as the last placeholder
    values.push(slug);
    const query = `
      UPDATE public.products 
      SET ${updates.join(', ')} 
      WHERE slug = $${placeholderIdx} 
      RETURNING id, slug, name, stock_qty, is_active;
    `;

    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: res.rows[0] });

  } catch (err: any) {
    console.error("Products PATCH error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

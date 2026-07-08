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
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: 'OrderId and Status are required' }, { status: 400 });
    }

    const client = new Client(dbConfig);
    await client.connect();

    // Update order status in the database
    const res = await client.query(
      `UPDATE public.orders SET status = $1 WHERE id = $2 RETURNING id, status;`,
      [status, orderId]
    );

    await client.end();

    if (res.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: res.rows[0] });

  } catch (err: any) {
    console.error('Error updating order status:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

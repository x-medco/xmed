import { NextResponse } from 'next/server';
import { Client } from 'pg';

const dbConfig = {
  host: 'db.vhqzdmucrbcdubscyrpl.supabase.co',
  port: 6543,
  user: 'postgres',
  password: "Rubben%27282",
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

export async function POST(request: Request) {
  const client = new Client(dbConfig);
  try {
    const { orders } = await request.json();

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return NextResponse.json({ success: false, error: 'No orders provided for import' }, { status: 400 });
    }

    await client.connect();

    // Fetch existing product slugs to use as fallbacks for order_items
    const prodRes = await client.query(`SELECT slug, price FROM public.products LIMIT 5;`);
    const dbProducts = prodRes.rows;
    if (dbProducts.length === 0) {
      return NextResponse.json({ success: false, error: 'Cannot import orders: No products found in database to link items to.' }, { status: 400 });
    }

    let importedCount = 0;

    // Start database transaction
    await client.query('BEGIN;');

    for (const order of orders) {
      const email = order.email || 'guest@example.com';
      const name = order.name || 'WooCommerce Customer';
      const city = order.city || 'EU';
      const country = order.country || 'Europe';
      const date = order.date ? new Date(order.date) : new Date();
      const total = Number(order.total) || 50.00;
      
      // Standardize status: WooCommerce completed -> delivered, processing -> confirmed, pending/hold -> placed, refunded -> returned, cancelled -> cancelled
      let status = 'placed';
      const rawStatus = (order.status || '').toLowerCase();
      if (rawStatus === 'completed' || rawStatus === 'delivered') status = 'delivered';
      else if (rawStatus === 'processing') status = 'confirmed';
      else if (rawStatus === 'refunded' || rawStatus === 'returned') status = 'returned';
      else if (rawStatus === 'cancelled' || rawStatus === 'failed') status = 'cancelled';
      else if (rawStatus === 'shipped') status = 'shipped';

      const paymentMethod = order.paymentMethod || 'card';

      // 1. Get or create Customer
      let customerId;
      const custCheck = await client.query(
        `SELECT id FROM public.customers WHERE email = $1;`,
        [email]
      );

      if (custCheck.rows.length > 0) {
        customerId = custCheck.rows[0].id;
      } else {
        const newCust = await client.query(
          `INSERT INTO public.customers (full_name, email, city, country, created_at)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id;`,
          [name, email, city, country, date]
        );
        customerId = newCust.rows[0].id;
      }

      // 2. Insert Order
      const orderRes = await client.query(
        `INSERT INTO public.orders (customer_id, email, name, city, country, total, discount, status, payment_method, refund_amount, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id;`,
        [
          customerId, email, name, city, country, total, 0.00, status, paymentMethod,
          status === 'returned' ? total : 0, date
        ]
      );
      const dbOrderId = orderRes.rows[0].id;

      // 3. Link default items (so product revenue view calculations don't drop the order total)
      // We divide the total among the products or just link one
      const prod = dbProducts[Math.floor(Math.random() * dbProducts.length)];
      await client.query(
        `INSERT INTO public.order_items (order_id, product_slug, quantity, price)
         VALUES ($1, $2, $3, $4);`,
        [dbOrderId, prod.slug, 1, total]
      );

      importedCount++;
    }

    await client.query('COMMIT;');
    await client.end();

    return NextResponse.json({ success: true, imported: importedCount });

  } catch (err: any) {
    await client.query('ROLLBACK;');
    await client.end();
    console.error('Import Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

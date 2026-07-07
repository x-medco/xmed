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

const cities = [
  { city: 'Berlin', state: 'Berlin', country: 'Germany' },
  { city: 'Paris', state: 'Île-de-France', country: 'France' },
  { city: 'Rome', state: 'Lazio', country: 'Italy' },
  { city: 'Madrid', state: 'Madrid', country: 'Spain' },
  { city: 'Amsterdam', state: 'North Holland', country: 'Netherlands' },
  { city: 'London', state: 'Greater London', country: 'United Kingdom' },
  { city: 'Brussels', state: 'Brussels', country: 'Belgium' },
  { city: 'Vienna', state: 'Vienna', country: 'Austria' }
];

const customerNames = [
  'Emma Fischer', 'Lukas Weber', 'Léa Dubois', 'Hugo Martin',
  'Giulia Rossi', 'Alessandro Bianchi', 'Sofia Garcia', 'Lucas Martinez',
  'Sven de Jong', 'Sophie van Dijk', 'Oliver Smith', 'Amelia Jones',
  'Arthur Janssens', 'Charlotte Maes', 'Maximilian Huber', 'Anna Gruber'
];

const trafficSources = ['direct', 'google', 'instagram', 'ads', 'referral', 'email'];
const devices = ['desktop', 'mobile', 'tablet'];
const paymentMethods = ['stripe', 'paypal', 'card', 'bank_transfer'];
const orderStatuses = ['placed', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled'];

export async function POST() {
  const client = new Client(dbConfig);
  try {
    await client.connect();

    // 1. Fetch products
    const productsRes = await client.query(`SELECT slug, price, cost FROM public.products;`);
    const dbProducts = productsRes.rows;
    if (dbProducts.length === 0) {
      return NextResponse.json({ success: false, error: "No products found in database." }, { status: 400 });
    }

    // Update product stock if needed
    await client.query(`
      UPDATE public.products 
      SET 
        cost = ROUND((price * 0.4)::numeric, 2),
        stock_qty = floor(random() * 80) + 5,
        low_stock_threshold = 10
      WHERE cost = 0 OR stock_qty = 50;
    `);

    // 2. Clear old data
    await client.query(`TRUNCATE public.page_views, public.campaigns CASCADE;`);
    await client.query(`DELETE FROM public.order_items;`);
    await client.query(`DELETE FROM public.orders;`);
    await client.query(`DELETE FROM public.customers;`);

    // 3. Seed Customers
    const customerIds = [];
    for (let i = 0; i < 40; i++) {
      const name = customerNames[i % customerNames.length] + ' ' + (10 + i);
      const email = name.toLowerCase().replace(/ /g, '.') + '@example.com';
      const cityObj = cities[Math.floor(Math.random() * cities.length)];
      const res = await client.query(`
        INSERT INTO public.customers (full_name, email, phone, city, state, country, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW() - ($7 || ' days')::INTERVAL)
        RETURNING id;
      `, [name, email, '+49 176 ' + (1000000 + i), cityObj.city, cityObj.state, cityObj.country, Math.floor(Math.random() * 365)]);
      customerIds.push(res.rows[0].id);
    }

    // 4. Seed Orders & Order Items
    let orderCount = 0;
    const now = new Date();
    for (let month = 0; month < 12; month++) {
      const ordersInMonth = 15 + month * 3 + Math.floor(Math.random() * 5);
      for (let o = 0; o < ordersInMonth; o++) {
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        
        const orderDate = new Date();
        orderDate.setMonth(now.getMonth() - month);
        orderDate.setDate(Math.floor(Math.random() * 28) + 1);
        orderDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

        const custRes = await client.query(`SELECT full_name, email FROM public.customers WHERE id = $1;`, [customerId]);
        const cust = custRes.rows[0];

        const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        
        const numItems = Math.floor(Math.random() * 2) + 1;
        let totalAmount = 0;
        const itemsToInsert = [];

        for (let it = 0; it < numItems; it++) {
          const prod = dbProducts[Math.floor(Math.random() * dbProducts.length)];
          const qty = Math.floor(Math.random() * 2) + 1;
          const price = Number(prod.price);
          totalAmount += price * qty;
          itemsToInsert.push({ slug: prod.slug, price, qty });
        }

        const refundAmount = status === 'returned' ? totalAmount : 0;

        const orderRes = await client.query(`
          INSERT INTO public.orders (customer_id, email, name, shipping_address, city, postcode, country, total, discount, status, payment_method, refund_amount, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING id;
        `, [
          customerId, cust.email, cust.full_name, 'Street ' + Math.floor(Math.random() * 100),
          cityObj.city, 'POST-' + Math.floor(Math.random() * 9000), cityObj.country,
          totalAmount, 0.00, status, paymentMethod, refundAmount, orderDate
        ]);
        const orderId = orderRes.rows[0].id;

        for (const item of itemsToInsert) {
          await client.query(`
            INSERT INTO public.order_items (order_id, product_slug, quantity, price)
            VALUES ($1, $2, $3, $4);
          `, [orderId, item.slug, item.qty, item.price]);
        }
        orderCount++;
      }
    }

    // 5. Seed Campaigns
    const campaigns = [
      { name: 'summer_promo_2026', channel: 'ads', spend: 850 },
      { name: 'newsletter_june', channel: 'email', spend: 50 },
      { name: 'instagram_influencers', channel: 'instagram', spend: 1200 },
      { name: 'google_search_brand', channel: 'google', spend: 400 }
    ];

    for (const c of campaigns) {
      await client.query(`
        INSERT INTO public.campaigns (utm_campaign, channel, spend, created_at)
        VALUES ($1, $2, $3, NOW() - INTERVAL '30 days');
      `, [c.name, c.channel, c.spend]);
    }

    // 6. Seed Page Views (30 days)
    for (let day = 0; day < 30; day++) {
      const viewsInDay = 30 + Math.floor(Math.random() * 50);
      for (let v = 0; v < viewsInDay; v++) {
        const sessionId = 'session_' + Math.random().toString(36).substring(2, 12);
        const source = trafficSources[Math.floor(Math.random() * trafficSources.length)];
        const campaign = source === 'ads' || source === 'email' || source === 'instagram' ? campaigns[Math.floor(Math.random() * campaigns.length)].name : null;
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        
        const date = new Date();
        date.setDate(now.getDate() - day);

        const pages = ['/', '/products', '/about', '/cart'];
        const numPages = Math.floor(Math.random() * 2) + 1;
        for (let pIdx = 0; pIdx < numPages; pIdx++) {
          await client.query(`
            INSERT INTO public.page_views (session_id, page_url, city, country, device, traffic_source, utm_campaign, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
          `, [sessionId, pages[pIdx], cityObj.city, cityObj.country, device, source, campaign, new Date(date.getTime() + pIdx * 60 * 1000)]);
        }
      }
    }

    // 7. Active Live Visitors
    const pages = ['/', '/products', '/cart'];
    for (let l = 0; l < 8; l++) {
      const sessionId = 'live_session_' + Math.random().toString(36).substring(2, 12);
      const source = trafficSources[Math.floor(Math.random() * trafficSources.length)];
      const cityObj = cities[Math.floor(Math.random() * cities.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      await client.query(`
        INSERT INTO public.page_views (session_id, page_url, city, country, device, traffic_source, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '30 seconds');
      `, [sessionId, pages[Math.floor(Math.random() * pages.length)], cityObj.city, cityObj.country, device, source]);
    }

    return NextResponse.json({ success: true, seededOrders: orderCount });

  } catch (err: any) {
    console.error("API Seed Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

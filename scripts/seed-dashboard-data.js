const { Client } = require('pg');

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

async function seed() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log("Connected to seed mock data...");

    // 1. Fetch available products
    const productsRes = await client.query(`SELECT slug, price, cost FROM public.products;`);
    const dbProducts = productsRes.rows;
    if (dbProducts.length === 0) {
      console.log("No products found in DB. Please run product seeding first.");
      return;
    }
    console.log(`Found ${dbProducts.length} products to seed orders with.`);

    // Update product stock and costs if they are 0
    await client.query(`
      UPDATE public.products 
      SET 
        cost = ROUND((price * 0.4)::numeric, 2),
        stock_qty = floor(random() * 80) + 5,
        low_stock_threshold = 10
      WHERE cost = 0 OR stock_qty = 50;
    `);

    // 2. Clear old data from customers, page_views, campaigns, order_items, orders
    console.log("Clearing old dashboard data...");
    await client.query(`TRUNCATE public.page_views, public.campaigns CASCADE;`);
    // Delete custom seed orders and customers (we will delete orders/order_items and re-seed)
    await client.query(`DELETE FROM public.order_items;`);
    await client.query(`DELETE FROM public.orders;`);
    await client.query(`DELETE FROM public.customers;`);

    // 3. Seed Customers
    console.log("Seeding customers...");
    const customerIds = [];
    for (let i = 0; i < 60; i++) {
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
    console.log(`Seeded ${customerIds.length} customers.`);

    // 4. Seed Orders & Order Items
    console.log("Seeding orders...");
    let orderCount = 0;
    const now = new Date();
    // Generate orders over the last 12 months
    for (let month = 0; month < 12; month++) {
      // Number of orders per month (increasing trend to make charts look nice)
      const ordersInMonth = 15 + month * 4 + Math.floor(Math.random() * 10);
      for (let o = 0; o < ordersInMonth; o++) {
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        
        // Random date in this historical month
        const orderDate = new Date();
        orderDate.setMonth(now.getMonth() - month);
        orderDate.setDate(Math.floor(Math.random() * 28) + 1);
        orderDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

        // Get customer details
        const custRes = await client.query(`SELECT full_name, email FROM public.customers WHERE id = $1;`, [customerId]);
        const cust = custRes.rows[0];

        const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        
        // Decide how many items in this order
        const numItems = Math.floor(Math.random() * 3) + 1;
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

        // Insert Order
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

        // Insert Order Items
        for (const item of itemsToInsert) {
          await client.query(`
            INSERT INTO public.order_items (order_id, product_slug, quantity, price)
            VALUES ($1, $2, $3, $4);
          `, [orderId, item.slug, item.qty, item.price]);
        }
        orderCount++;
      }
    }
    console.log(`Seeded ${orderCount} orders & associated items.`);

    // 5. Seed Campaigns UTM campaign performance
    console.log("Seeding campaigns...");
    const campaigns = [
      { name: 'summer_promo_2026', channel: 'ads', spend: 850 },
      { name: 'newsletter_june', channel: 'email', spend: 50 },
      { name: 'instagram_influencers', channel: 'instagram', spend: 1200 },
      { name: 'google_search_brand', channel: 'google', spend: 400 },
      { name: 'summer_sale_retargeting', channel: 'ads', spend: 600 }
    ];

    for (const c of campaigns) {
      await client.query(`
        INSERT INTO public.campaigns (utm_campaign, channel, spend, created_at)
        VALUES ($1, $2, $3, NOW() - INTERVAL '30 days');
      `, [c.name, c.channel, c.spend]);
    }

    // 6. Seed Page Views (Historical page views for sources breakdown, bounce rates etc.)
    console.log("Seeding historical page views...");
    let pageViewCount = 0;
    // Generate thousands of page views over the last 30 days
    for (let day = 0; day < 30; day++) {
      const viewsInDay = 50 + Math.floor(Math.random() * 100);
      for (let v = 0; v < viewsInDay; v++) {
        const sessionId = 'session_' + Math.random().toString(36).substring(2, 12);
        const source = trafficSources[Math.floor(Math.random() * trafficSources.length)];
        const campaign = source === 'ads' || source === 'email' || source === 'instagram' ? campaigns[Math.floor(Math.random() * campaigns.length)].name : null;
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        
        const date = new Date();
        date.setDate(now.getDate() - day);
        date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

        // Create a user path of 1-4 pages
        const pages = ['/', '/products', '/about', '/cart', '/checkout'];
        const numPages = Math.floor(Math.random() * 3) + 1;
        for (let pIdx = 0; pIdx < numPages; pIdx++) {
          const page = pages[pIdx];
          const pageTime = new Date(date.getTime() + pIdx * 90 * 1000); // 90 sec average
          await client.query(`
            INSERT INTO public.page_views (session_id, page_url, city, country, device, traffic_source, utm_campaign, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
          `, [sessionId, page, cityObj.city, cityObj.country, device, source, campaign, pageTime]);
          pageViewCount++;
        }
      }
    }
    console.log(`Seeded ${pageViewCount} historical page views.`);

    // 7. Seed Active Live Visitors (views in the last 2-3 minutes)
    console.log("Seeding active live visitors...");
    const liveVisitorSessions = 8 + Math.floor(Math.random() * 10);
    const pages = ['/', '/products', '/products/bpc-157-5mg', '/products/tb-500-10mg', '/cart', '/checkout'];
    for (let l = 0; l < liveVisitorSessions; l++) {
      const sessionId = 'live_session_' + Math.random().toString(36).substring(2, 12);
      const source = trafficSources[Math.floor(Math.random() * trafficSources.length)];
      const cityObj = cities[Math.floor(Math.random() * cities.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      const page = pages[Math.floor(Math.random() * pages.length)];
      const ageInSeconds = Math.floor(Math.random() * 200); // up to 3 mins ago
      const viewTime = new Date(now.getTime() - ageInSeconds * 1000);

      await client.query(`
        INSERT INTO public.page_views (session_id, page_url, city, country, device, traffic_source, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `, [sessionId, page, cityObj.city, cityObj.country, device, source, viewTime]);
    }
    console.log(`Seeded ${liveVisitorSessions} active live visitors.`);

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.end();
  }
}

seed();

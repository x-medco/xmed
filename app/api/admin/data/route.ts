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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '30d';

  // Determine interval WHERE clauses for date ranges
  let dateFilter = `created_at >= NOW() - INTERVAL '30 days'`;
  let prevDateFilter = `created_at >= NOW() - INTERVAL '60 days' AND created_at < NOW() - INTERVAL '30 days'`;
  
  if (range === 'today') {
    dateFilter = `created_at >= CURRENT_DATE`;
    prevDateFilter = `created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE`;
  } else if (range === '7d') {
    dateFilter = `created_at >= NOW() - INTERVAL '7 days'`;
    prevDateFilter = `created_at >= NOW() - INTERVAL '14 days' AND created_at < NOW() - INTERVAL '7 days'`;
  } else if (range === 'month') {
    dateFilter = `created_at >= date_trunc('month', CURRENT_DATE)`;
    prevDateFilter = `created_at >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month') AND created_at < date_trunc('month', CURRENT_DATE)`;
  } else if (range === 'year') {
    dateFilter = `created_at >= date_trunc('year', CURRENT_DATE)`;
    prevDateFilter = `created_at >= date_trunc('year', CURRENT_DATE - INTERVAL '1 year') AND created_at < date_trunc('year', CURRENT_DATE)`;
  } else if (range === 'all') {
    dateFilter = `created_at >= '1970-01-01'`;
    prevDateFilter = `created_at < '1970-01-01'`;
  }

  const client = new Client(dbConfig);
  try {
    await client.connect();

    // 1. Current Period Stats
    const statsRes = await client.query(`
      SELECT 
        COALESCE(SUM(total), 0) as revenue,
        COUNT(*) as orders_count,
        COALESCE(AVG(total), 0) as aov,
        COALESCE(SUM(refund_amount), 0) as refunds
      FROM public.orders
      WHERE status NOT IN ('cancelled') AND ${dateFilter}
    `);
    const currentStats = statsRes.rows[0];

    // 2. Previous Period Stats (for comparison calculations)
    const prevStatsRes = await client.query(`
      SELECT 
        COALESCE(SUM(total), 0) as revenue,
        COUNT(*) as orders_count
      FROM public.orders
      WHERE status NOT IN ('cancelled') AND ${prevDateFilter}
    `);
    const prevStats = prevStatsRes.rows[0];

    // 3. Traffic and Conversion Rates for range
    const trafficRes = await client.query(`
      SELECT COUNT(DISTINCT session_id) as sessions
      FROM public.page_views
      WHERE ${dateFilter}
    `);
    const sessions = Number(trafficRes.rows[0]?.sessions || 0);
    const conversionRate = sessions > 0 ? (Number(currentStats.orders_count) / sessions) * 100 : 0;

    // 4. Live Visitors Count (last 5 minutes)
    const liveRes = await client.query(`
      SELECT COUNT(DISTINCT session_id) as count
      FROM public.page_views
      WHERE created_at > NOW() - INTERVAL '5 minutes'
    `);
    const liveCount = Number(liveRes.rows[0]?.count || 0);

    // 5. Daily Revenue Trend
    const dailyRevRes = await client.query(`
      SELECT date_trunc('day', created_at) as date, 
             COALESCE(SUM(total), 0) as revenue,
             COUNT(*) as orders_count
      FROM public.orders
      WHERE status NOT IN ('cancelled') AND ${dateFilter}
      GROUP BY date
      ORDER BY date ASC
    `);

    // 6. Monthly Revenue Trend (for the Sales tab)
    const monthlyRevRes = await client.query(`
      SELECT date_trunc('month', created_at) as date, 
             COALESCE(SUM(total), 0) as revenue,
             COUNT(*) as orders_count
      FROM public.orders
      WHERE status NOT IN ('cancelled')
      GROUP BY date
      ORDER BY date ASC
    `);

    // 7. Orders vs Refunds
    const ordersVsRefundsRes = await client.query(`
      SELECT status, COUNT(*) as count, COALESCE(SUM(total), 0) as amount
      FROM public.orders
      WHERE ${dateFilter}
      GROUP BY status
    `);

    // 8. All Products
    const topProductsRes = await client.query(`
      SELECT p.id as product_id, p.name, p.category, p.image as image_url,
             COALESCE(SUM(oi.quantity), 0) as units_sold,
             COALESCE(SUM(oi.quantity * oi.price), 0) as revenue,
             p.price, p.cost, p.stock_qty, p.low_stock_threshold, p.is_active, p.slug
      FROM public.products p
      LEFT JOIN public.order_items oi ON p.slug = oi.product_slug
      LEFT JOIN public.orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled') AND o.${dateFilter}
      GROUP BY p.id, p.name, p.category, p.image, p.price, p.cost, p.stock_qty, p.low_stock_threshold, p.is_active, p.slug
      ORDER BY revenue DESC, p.name ASC
    `);

    // 9. Top 5 Cities
    const topCitiesRes = await client.query(`
      SELECT city, SUM(total) as revenue, COUNT(*) as orders_count
      FROM public.orders
      WHERE status NOT IN ('cancelled') AND ${dateFilter}
      GROUP BY city
      ORDER BY revenue DESC
      LIMIT 5
    `);

    // 10. Recent 10 Orders
    const recentOrdersRes = await client.query(`
      SELECT o.id, o.name, o.email, o.city, o.total as total_amount, o.status, o.created_at, o.payment_method
      FROM public.orders o
      ORDER BY o.created_at DESC
      LIMIT 10
    `);

    // 11. Live Page View sessions details (last 5 minutes)
    const liveSessionsRes = await client.query(`
      SELECT session_id, city, country, device, traffic_source, page_url, created_at
      FROM public.page_views
      WHERE created_at > NOW() - INTERVAL '5 minutes'
      ORDER BY created_at DESC
    `);

    // 12. Revenue by category
    const categoryRevRes = await client.query(`
      SELECT p.category, SUM(oi.quantity * oi.price) as revenue
      FROM public.order_items oi
      JOIN public.products p ON p.slug = oi.product_slug
      JOIN public.orders o ON o.id = oi.order_id
      WHERE o.status NOT IN ('cancelled') AND o.${dateFilter}
      GROUP BY p.category
      ORDER BY revenue DESC
    `);

    // 13. Revenue by payment method
    const paymentRevRes = await client.query(`
      SELECT payment_method, SUM(total) as revenue
      FROM public.orders
      WHERE status NOT IN ('cancelled') AND ${dateFilter}
      GROUP BY payment_method
      ORDER BY revenue DESC
    `);

    // 14. Customers LTV & Growth
    const customerStatsRes = await client.query(`
      SELECT COUNT(*) as total_customers,
             COALESCE(AVG(spend.total_spend), 0) as average_ltv
      FROM public.customers c
      LEFT JOIN (
        SELECT customer_id, SUM(total) as total_spend
        FROM public.orders
        WHERE status NOT IN ('cancelled')
        GROUP BY customer_id
      ) spend ON spend.customer_id = c.id
    `);

    // 15. Repeat purchase rate
    const repeatRateRes = await client.query(`
      WITH customer_orders AS (
        SELECT customer_id, COUNT(*) as order_count
        FROM public.orders
        WHERE status NOT IN ('cancelled')
        GROUP BY customer_id
      )
      SELECT 
        (SELECT COUNT(*) FROM customer_orders WHERE order_count > 1)::float / 
        NULLIF((SELECT COUNT(*) FROM customer_orders), 0) * 100 as repeat_rate
    `);

    // 16. Traffic by source
    const trafficSourcesRes = await client.query(`
      SELECT traffic_source, COUNT(DISTINCT session_id) as sessions
      FROM public.page_views
      WHERE ${dateFilter}
      GROUP BY traffic_source
    `);

    // 17. Campaign performance
    const campaignsRes = await client.query(`
      SELECT utm_campaign, COUNT(DISTINCT session_id) as sessions
      FROM public.page_views
      WHERE utm_campaign IS NOT NULL AND ${dateFilter}
      GROUP BY utm_campaign
    `);

    // 18. All Inventory (Low Stock indicators)
    const inventoryRes = await client.query(`
      SELECT id, name, category, price, cost, stock_qty, low_stock_threshold, image, is_active, slug
      FROM public.products
      ORDER BY stock_qty ASC
    `);

    // 19. Full Customers Table (LTV spend)
    const customersTableRes = await client.query(`
      SELECT c.id, c.full_name, c.email, c.city, c.country, c.created_at,
             COALESCE(spend.total_spend, 0) as ltv,
             COALESCE(spend.order_count, 0) as order_count
      FROM public.customers c
      LEFT JOIN (
        SELECT customer_id, SUM(total) as total_spend, COUNT(*) as order_count
        FROM public.orders
        WHERE status NOT IN ('cancelled')
        GROUP BY customer_id
      ) spend ON spend.customer_id = c.id
      ORDER BY ltv DESC
      LIMIT 100
    `);

    // 20. All Orders list for Tab 8
    const allOrdersRes = await client.query(`
      SELECT o.id, o.name, o.email, o.city, o.country, o.total as total_amount, o.status, o.created_at, o.payment_method, o.refund_amount,
             COALESCE(
               json_agg(
                 json_build_object(
                   'product_slug', oi.product_slug,
                   'quantity', oi.quantity,
                   'price', oi.price
                 )
               ) FILTER (WHERE oi.id IS NOT NULL),
               '[]'
             ) as items
      FROM public.orders o
      LEFT JOIN public.order_items oi ON oi.order_id = o.id
      GROUP BY o.id, o.name, o.email, o.city, o.country, o.total, o.status, o.created_at, o.payment_method, o.refund_amount
      ORDER BY o.created_at DESC
      LIMIT 500
    `);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          revenue: Number(currentStats.revenue),
          ordersCount: Number(currentStats.orders_count),
          aov: Number(currentStats.aov),
          refunds: Number(currentStats.refunds),
          conversionRate,
          liveCount,
          sessions,
          revenueGrowth: prevStats.revenue > 0 ? ((currentStats.revenue - prevStats.revenue) / prevStats.revenue) * 100 : 0,
          ordersGrowth: prevStats.orders_count > 0 ? ((currentStats.orders_count - prevStats.orders_count) / prevStats.orders_count) * 100 : 0
        },
        dailyRevenue: dailyRevRes.rows.map(r => ({
          date: new Date(r.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
          revenue: Number(r.revenue),
          orders: Number(r.orders_count)
        })),
        monthlyRevenue: monthlyRevRes.rows.map(r => ({
          date: new Date(r.date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
          revenue: Number(r.revenue),
          orders: Number(r.orders_count)
        })),
        ordersVsRefunds: ordersVsRefundsRes.rows,
        topProducts: topProductsRes.rows.map(r => ({
          id: r.product_id,
          name: r.name,
          category: r.category,
          image_url: r.image_url,
          units_sold: Number(r.units_sold),
          revenue: Number(r.revenue),
          price: Number(r.price),
          cost: Number(r.cost),
          margin: r.price > 0 ? ((r.price - r.cost) / r.price) * 100 : 0,
          stock_qty: Number(r.stock_qty),
          low_stock_threshold: Number(r.low_stock_threshold),
          is_active: r.is_active,
          slug: r.slug
        })),
        topCities: topCitiesRes.rows.map(r => ({
          city: r.city,
          revenue: Number(r.revenue),
          orders: Number(r.orders_count)
        })),
        recentOrders: recentOrdersRes.rows,
        liveSessions: liveSessionsRes.rows,
        categoryRevenue: categoryRevRes.rows.map(r => ({
          category: r.category,
          revenue: Number(r.revenue)
        })),
        paymentRevenue: paymentRevRes.rows.map(r => ({
          method: r.payment_method,
          revenue: Number(r.revenue)
        })),
        customers: {
          total: Number(customerStatsRes.rows[0]?.total_customers || 0),
          averageLTV: Number(customerStatsRes.rows[0]?.average_ltv || 0),
          repeatRate: Number(repeatRateRes.rows[0]?.repeat_rate || 0),
          list: customersTableRes.rows
        },
        trafficSources: trafficSourcesRes.rows.map(r => ({
          source: r.traffic_source || 'direct',
          sessions: Number(r.sessions)
        })),
        campaigns: campaignsRes.rows.map(r => ({
          campaign: r.utm_campaign,
          sessions: Number(r.sessions)
        })),
        inventory: inventoryRes.rows.map(r => ({
          id: r.id,
          name: r.name,
          category: r.category,
          price: Number(r.price),
          cost: Number(r.cost),
          stock_qty: Number(r.stock_qty),
          low_stock_threshold: Number(r.low_stock_threshold),
          image_url: r.image,
          is_active: r.is_active,
          slug: r.slug
        })),
        allOrders: allOrdersRes.rows
      }
    });

  } catch (err: any) {
    console.error("Dashboard API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

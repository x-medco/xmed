const { Client } = require('pg');

const dbConfig = {
  host: 'db.vhqzdmucrbcdubscyrpl.supabase.co',
  port: 6543,
  user: 'postgres',
  password: "Rubben%27282",
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

const migrations = [
  // 1. Add cost, stock_qty, low_stock_threshold to products
  `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cost NUMERIC(10, 2) DEFAULT 0;`,
  `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock_qty INTEGER DEFAULT 50;`,
  `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 10;`,

  // 2. Create customers table
  `CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );`,

  // 3. Add customer_id, refund_amount, payment_method to orders
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL;`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS refund_amount NUMERIC(10, 2) DEFAULT 0;`,
  `ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'card';`,

  // 4. Create page_views table
  `CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    page_url TEXT,
    city TEXT,
    country TEXT,
    device TEXT,
    traffic_source TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );`,

  // 5. Create campaigns table
  `CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utm_campaign TEXT,
    channel TEXT,
    spend NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
  );`,

  // 6. Create indexes
  `CREATE INDEX IF NOT EXISTS idx_orders_created on public.orders(created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_orders_city on public.orders(city);`,
  `CREATE INDEX IF NOT EXISTS idx_order_items_product_slug on public.order_items(product_slug);`,
  `CREATE INDEX IF NOT EXISTS idx_page_views_session on public.page_views(session_id, created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_page_views_created on public.page_views(created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_customers_city on public.customers(city);`,

  // 7. Enable RLS
  `ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;`,
  `ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;`,
  `ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;`,

  // 8. RLS Policies
  `DROP POLICY IF EXISTS "Allow public read access to customers" ON public.customers;`,
  `CREATE POLICY "Allow public read access to customers" ON public.customers FOR SELECT USING (true);`,
  
  `DROP POLICY IF EXISTS "Allow public read access to page_views" ON public.page_views;`,
  `CREATE POLICY "Allow public read access to page_views" ON public.page_views FOR SELECT USING (true);`,
  
  `DROP POLICY IF EXISTS "Allow public read access to campaigns" ON public.campaigns;`,
  `CREATE POLICY "Allow public read access to campaigns" ON public.campaigns FOR SELECT USING (true);`,

  `DROP POLICY IF EXISTS "anyone_can_insert_page_views" ON public.page_views;`,
  `CREATE POLICY "anyone_can_insert_page_views" ON public.page_views FOR INSERT WITH CHECK (true);`,

  // 9. Views
  `CREATE OR REPLACE VIEW v_daily_revenue AS
   SELECT date_trunc('day', created_at) AS day,
          SUM(total) AS revenue,
          COUNT(*) AS orders_count
   FROM public.orders
   WHERE status NOT IN ('cancelled')
   GROUP BY day
   ORDER BY day;`,

  `CREATE OR REPLACE VIEW v_monthly_revenue AS
   SELECT date_trunc('month', created_at) AS month,
          SUM(total) AS revenue,
          COUNT(*) AS orders_count
   FROM public.orders
   WHERE status NOT IN ('cancelled')
   GROUP BY month
   ORDER BY month;`,

  `CREATE OR REPLACE VIEW v_yearly_revenue AS
   SELECT date_trunc('year', created_at) AS year,
          SUM(total) AS revenue,
          COUNT(*) AS orders_count
   FROM public.orders
   WHERE status NOT IN ('cancelled')
   GROUP BY year
   ORDER BY year;`,

  `CREATE OR REPLACE VIEW v_top_products AS
   SELECT p.id AS product_id,
          p.slug AS product_slug,
          p.name,
          p.category,
          SUM(oi.quantity) AS units_sold,
          SUM(oi.quantity * oi.price) AS revenue
   FROM public.order_items oi
   JOIN public.products p ON p.slug = oi.product_slug
   JOIN public.orders o ON o.id = oi.order_id
   WHERE o.status NOT IN ('cancelled')
   GROUP BY p.id, p.slug, p.name, p.category
   ORDER BY revenue DESC;`,

  `CREATE OR REPLACE VIEW v_revenue_by_city AS
   SELECT city, SUM(total) AS revenue, COUNT(*) AS orders_count
   FROM public.orders
   WHERE status NOT IN ('cancelled')
   GROUP BY city
   ORDER BY revenue DESC;`,

  `CREATE OR REPLACE VIEW v_revenue_by_payment_method AS
   SELECT payment_method, SUM(total) AS revenue
   FROM public.orders
   WHERE status NOT IN ('cancelled')
   GROUP BY payment_method;`,

  `CREATE OR REPLACE VIEW v_traffic_by_source AS
   SELECT traffic_source, COUNT(DISTINCT session_id) AS sessions
   FROM public.page_views
   GROUP BY traffic_source;`,

  `CREATE OR REPLACE VIEW v_live_visitors AS
   SELECT session_id, city, country, device, traffic_source,
          MAX(created_at) as last_seen,
          (SELECT page_url FROM public.page_views pv2
            WHERE pv2.session_id = pv.session_id
            ORDER BY created_at DESC LIMIT 1) AS current_page
   FROM public.page_views pv
   WHERE created_at > now() - INTERVAL '5 minutes'
   GROUP BY session_id, city, country, device, traffic_source;`,

  `CREATE OR REPLACE VIEW v_customer_growth AS
   SELECT date_trunc('month', created_at) AS month, COUNT(*) AS new_customers
   FROM public.customers
   GROUP BY month
   ORDER BY month;`,

  // 10. Enable realtime
  `ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;`.replace(';', ''),
  `ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;`.replace(';', '')
];

async function setup() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL for migrations...");
    
    for (let i = 0; i < migrations.length; i++) {
      try {
        await client.query(migrations[i]);
        console.log(`Migration ${i + 1}/${migrations.length} Succeeded.`);
      } catch (err) {
        // If publication errors, it might already be added
        if (err.message.includes('already exists') || err.message.includes('duplicate')) {
          console.log(`Migration ${i + 1}/${migrations.length} Note: ${err.message}`);
        } else {
          console.error(`Migration ${i + 1} Failed:`, err.message);
        }
      }
    }
    console.log("Migrations completed!");
  } catch (err) {
    console.error("Setup failed:", err);
  } finally {
    await client.end();
  }
}

setup();

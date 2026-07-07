-- Supabase SQL Database Schema for X-Med.co

-- 0. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  strength TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('vial', 'tablets', 'pills', 'pen', 'water')),
  price NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  includes_water BOOLEAN DEFAULT true NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT[] NOT NULL,
  highlights TEXT[] NOT NULL,
  keywords TEXT[] NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  faqs JSONB NOT NULL,
  image TEXT NOT NULL,
  bogo BOOLEAN DEFAULT false NOT NULL,
  offer TEXT,
  discount NUMERIC(5, 2) DEFAULT 0.00 NOT NULL,
  specifications JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" 
  ON public.products FOR SELECT USING (true);

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT,
  facility_name TEXT,
  phone TEXT
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to profiles" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0.00,
  status TEXT DEFAULT 'pending_analysis' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own orders" 
  ON public.orders FOR SELECT USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Allow anon order creation" 
  ON public.orders FOR INSERT WITH CHECK (true);

-- 3. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_slug TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own order items" 
  ON public.order_items FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE public.orders.id = order_id 
      AND (public.orders.user_id = auth.uid() OR public.orders.email = auth.email())
    )
  );

CREATE POLICY "Allow anon order items insertion" 
  ON public.order_items FOR INSERT WITH CHECK (true);

-- 4. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to newsletter" 
  ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admins to read subscribers" 
  ON public.newsletter_subscribers FOR SELECT USING (auth.role() = 'service_role');

-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to contact messages" 
  ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admins to read contact messages" 
  ON public.contact_messages FOR SELECT USING (auth.role() = 'service_role');


-- AUTOMATIC PROFILE TRIGGERS ON USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

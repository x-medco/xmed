import { NextRequest, NextResponse } from 'next/server';
import { fetchProductBySlug } from '@/lib/products';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isSupabaseServerConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseServiceKey.trim() !== '';

// Server-side Supabase client for writing orders
const supabaseServer = isSupabaseServerConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    const { lines, customer, amount } = await req.json();

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // 1. Create order record in Supabase if configured on the server
    let dbOrderId: string | null = null;
    if (supabaseServer) {
      const { data: order, error: orderErr } = await supabaseServer
        .from('orders')
        .insert({
          email: customer.email,
          name: customer.name,
          shipping_address: customer.address,
          city: customer.city,
          postcode: customer.postcode,
          country: customer.country,
          total: amount,
          discount: 0,
          status: 'pending_analysis'
        })
        .select()
        .single();

      if (orderErr) {
        console.error('Error inserting order in Supabase:', orderErr);
      } else if (order) {
        dbOrderId = order.id;
        
        // Insert order items
        const orderItemsToInsert = [];
        for (const l of lines) {
          const prod = await fetchProductBySlug(l.slug);
          orderItemsToInsert.push({
            order_id: dbOrderId,
            product_slug: l.slug,
            quantity: l.qty,
            price: prod ? prod.price : 0
          });
        }

        const { error: itemsErr } = await supabaseServer
          .from('order_items')
          .insert(orderItemsToInsert);

        if (itemsErr) {
          console.error('Error inserting order items in Supabase:', itemsErr);
        }
      }
    }

    // 2. N-Genius Online integration
    const ngeniusApiKey = process.env.NGENIUS_API_KEY || 'OWUzZTllMTctZjE2MS00NTE5LTkxNDAtOWZlMzFhODU5NjVhOjI0MGNmMDE3LTIzZDctNGIyMS1hZGU5LTBmNGM5ODI4NTJhMw==';
    const ngeniusOutletId = process.env.NGENIUS_OUTLET_ID || 'edf7ea50-a3cf-4df9-b517-69d34af1d2be';
    const ngeniusEnv = process.env.NGENIUS_ENV || 'live'; // 'sandbox' or 'live'
    
    const gatewayUrl = ngeniusEnv === 'live' 
      ? 'https://api-gateway.ngenius-payments.com' 
      : 'https://api-gateway.sandbox.ngenius-payments.com';

    try {
      console.log(`[N-Genius] Requesting access token on ${ngeniusEnv} environment...`);
      const authRes = await fetch(`${gatewayUrl}/identity/auth/access-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${ngeniusApiKey}`,
          'Content-Type': 'application/vnd.ni-identity.v1+json',
          'Accept': 'application/vnd.ni-identity.v1+json'
        },
        body: JSON.stringify({})
      });

      if (!authRes.ok) {
        const errText = await authRes.text();
        throw new Error(`Auth failed with status ${authRes.status}: ${errText}`);
      }

      const authData = await authRes.json();
      const token = authData.access_token;
      
      const nameParts = (customer?.name || '').trim().split(/\s+/);
      const firstName = nameParts[0] || 'Researcher';
      const lastName = nameParts.slice(1).join(' ') || 'Staff';

      const getCountryCode = (country: string) => {
        const c = (country || '').trim().toLowerCase();
        if (c.includes('spain') || c.includes('espa')) return 'ES';
        if (c.includes('ireland')) return 'IE';
        if (c.includes('france')) return 'FR';
        if (c.includes('germany')) return 'DE';
        if (c.includes('italy')) return 'IT';
        if (c.includes('uk') || c.includes('united kingdom') || c.includes('britain')) return 'GB';
        return 'ES'; // default to Spain
      };

      const origin = req.nextUrl.origin;

      console.log(`[N-Genius] Creating checkout order session...`);
      const orderRes = await fetch(`${gatewayUrl}/transactions/outlets/${ngeniusOutletId}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.ni-payment.v2+json',
          'Accept': 'application/vnd.ni-payment.v2+json'
        },
        body: JSON.stringify({
          action: 'SALE',
          amount: {
            currencyCode: 'EUR',
            value: Math.round(amount * 100) // minor units
          },
          merchantOrderReference: dbOrderId || `XM-${Math.floor(100000 + Math.random() * 900000)}`,
          emailAddress: customer?.email || 'sales@x-med.co',
          billingAddress: {
            firstName,
            lastName,
            address1: customer?.address || 'Laboratory Delivery Office',
            city: customer?.city || 'Madrid',
            countryCode: getCountryCode(customer?.country)
          },
          redirectUrl: `${origin}/thank-you?session_id=${dbOrderId || 'demo'}${dbOrderId ? `&db_id=${dbOrderId}` : ''}`
        })
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        throw new Error(`Order creation failed with status ${orderRes.status}: ${errText}`);
      }

      const orderData = await orderRes.json();
      const redirectUrl = orderData._links?.payment?.href;

      if (!redirectUrl) {
        throw new Error('No payment URL returned in transaction response');
      }

      return NextResponse.json({ redirectUrl });

    } catch (err: any) {
      console.error('[N-Genius Checkout Exception]:', err.message);
      
      if (ngeniusEnv === 'live') {
        return NextResponse.json({ error: 'Payment initialization failed. Please contact support.' }, { status: 500 });
      }
      
      // Sandbox fallback to Demo Mode for developer testing
      console.warn('[N-Genius Fallback]: Redirecting client to Demo checkout page.');
      const orderRef = dbOrderId || `XM-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      return NextResponse.json({ demo: true, redirectUrl: `/thank-you?demo=1&session_id=${orderRef}` });
    }
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

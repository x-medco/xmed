import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
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

    // 2. Stripe integration
    const secretKey = process.env.STRIPE_SECRET_KEY;

    // DEMO MODE: no Stripe key configured yet — skip real payment and go straight
    // to the thank-you page so the flow is fully clickable end-to-end.
    if (!secretKey) {
      const orderRef = dbOrderId || `XM-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      return NextResponse.json({ demo: true, redirectUrl: `/thank-you?demo=1&session_id=${orderRef}` });
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' as any });

    const line_items = [];
    for (const l of lines) {
      const product = await fetchProductBySlug(l.slug);
      if (!product) continue;
      
      line_items.push({
        quantity: l.qty,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(product.price * 100),
          product_data: { name: `${product.name} (${product.strength})` },
        },
      });
    }

    // Include shipping fee in line items if applicable
    const shippingAmount = amount < 150 ? 9.9 : 0;
    if (shippingAmount > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(shippingAmount * 100),
          product_data: { name: 'Laboratory Cold-Chain Shipping' },
        },
      } as any);
    }

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: line_items as Stripe.Checkout.SessionCreateParams.LineItem[],
      customer_email: customer?.email,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}${dbOrderId ? `&db_id=${dbOrderId}` : ''}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ redirectUrl: session.url });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

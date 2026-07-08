import { NextRequest, NextResponse } from 'next/server';
import { fetchProductBySlug } from '@/lib/products';
import { createClient } from '@supabase/supabase-js';
import { emailAutomations } from '@/lib/email-templates';

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
          name: `${customer.name} (WhatsApp: ${customer.phone || 'N/A'})`,
          shipping_address: `${customer.address} (WhatsApp: ${customer.phone || 'N/A'})`,
          city: customer.city,
          postcode: customer.postcode,
          country: customer.country,
          total: amount,
          discount: 0,
          status: 'placed'
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
        } else {
          // 1.5. Send order confirmation email via Resend
          try {
            const resendApiKey = process.env.RESEND_API_KEY;
            if (resendApiKey) {
              console.log(`[Resend] Sending order confirmation email to ${customer.email}...`);
              const template = emailAutomations.find(t => t.id === 'order-confirmation');
              if (template) {
                // Compile product summary string
                const productList = [];
                for (const l of lines) {
                  const prod = await fetchProductBySlug(l.slug);
                  if (prod) {
                    productList.push(`${l.qty}x ${prod.name} (${prod.strength})`);
                  }
                }
                const productSummaryStr = productList.join(', ');

                const html = template.getHtml({
                  productName: productSummaryStr || 'Research Reagents',
                  price: amount,
                  customerName: customer.name,
                  address: `${customer.address}, ${customer.city}, ${customer.postcode}, ${customer.country}`,
                  trackingNumber: 'Pending WhatsApp Payment Setup'
                });

                const emailResponse = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    from: 'X-Med Reagents <sales@x-med.co>',
                    to: [customer.email],
                    subject: `Order Confirmed: Invoice #${(dbOrderId || 'demo').substring(0, 8).toUpperCase()}`,
                    html: html
                  })
                });

                if (!emailResponse.ok) {
                  const errText = await emailResponse.text();
                  console.error('[Resend API Error]:', errText);
                } else {
                  console.log(`[Resend] Order confirmation email sent successfully.`);
                }
              }
            } else {
              console.warn('[Resend] Warning: RESEND_API_KEY environment variable is not defined.');
            }
          } catch (mailErr: any) {
            console.error('[Resend Exception]: Failed to send mail:', mailErr.message);
          }
        }
      }
    }

    // 2. Manual Payment (WhatsApp Payment Options) Flow Redirect
    const redirectUrl = `/thank-you?session_id=${dbOrderId || `XM-DEMO-${Math.floor(100000 + Math.random() * 900000)}`}`;
    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

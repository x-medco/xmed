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
    const { lines, customer, amount, discount = 0 } = await req.json();

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
          discount: Number(discount) || 0,
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

                const fromAddress = 'X-Med <info@x-med.pro>';
                const emailSubject = `Order Confirmed: Invoice #${(dbOrderId || 'demo').substring(0, 8).toUpperCase()}`;

                const emailResponse = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    from: fromAddress,
                    to: [customer.email],
                    subject: emailSubject,
                    html: html
                  })
                });

                let resendId = null;
                let status = 'failed';
                if (!emailResponse.ok) {
                  const errText = await emailResponse.text();
                  console.error('[Resend API Error]:', errText);
                } else {
                  const resendData = await emailResponse.json();
                  resendId = resendData.id;
                  status = 'sent';
                  console.log(`[Resend] Order confirmation email sent successfully.`);
                }

                // Save a copy of the transactional email in the database
                await supabaseServer
                  .from('emails')
                  .insert({
                    sender: fromAddress,
                    recipient: customer.email,
                    subject: emailSubject,
                    html_content: html,
                    text_content: `Order confirmation for ${customer.name}. Total amount: €${amount.toFixed(2)}. Items: ${productSummaryStr}`,
                    direction: 'outgoing',
                    status: status,
                    resend_id: resendId
                  });

                // 1.6. Send new order alert email to admin & xmedeurope@gmail.com
                try {
                  const invoiceTag = (dbOrderId || 'demo').substring(0, 8).toUpperCase();
                  const notificationSubject = `[New Order Alert] Invoice #${invoiceTag} - €${amount.toFixed(2)}`;
                  const cleanPhone = (customer.phone || '').replace(/[^0-9]/g, '');
                  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

                  const notificationText = 
                    `New Order Received!\n\n` +
                    `Invoice ID: #${invoiceTag}\n` +
                    `Customer Name: ${customer.name}\n` +
                    `Email: ${customer.email}\n` +
                    `WhatsApp: ${customer.phone || 'N/A'}${waLink ? ` (${waLink})` : ''}\n` +
                    `Total Amount: €${amount.toFixed(2)}\n\n` +
                    `Shipping Details:\n` +
                    `Address: ${customer.address}\n` +
                    `City: ${customer.city}\n` +
                    `Postcode: ${customer.postcode}\n` +
                    `Country: ${customer.country}\n\n` +
                    `Items Ordered:\n` +
                    `${productSummaryStr}\n`;

                  const notificationHtml = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
                      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 14px; margin-bottom: 20px;">
                        <h2 style="color: #0f172a; margin: 0 0 4px 0; font-size: 22px; font-weight: 800;">🎉 New Order Received!</h2>
                        <p style="color: #64748b; margin: 0; font-size: 14px;">Invoice: <strong style="color: #2563eb;">#${invoiceTag}</strong></p>
                      </div>

                      <div style="background-color: #f8fafc; padding: 18px; border-radius: 10px; margin-bottom: 16px; border: 1px solid #edf2f7;">
                        <h3 style="color: #0f172a; margin: 0 0 12px 0; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Customer & Payment</h3>
                        <p style="margin: 6px 0; font-size: 14px;"><strong>Customer:</strong> ${customer.name}</p>
                        <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color: #2563eb; text-decoration: underline;">${customer.email}</a></p>
                        <p style="margin: 6px 0; font-size: 14px;">
                          <strong>WhatsApp:</strong> 
                          ${customer.phone ? `<a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 3px 10px; border-radius: 6px; text-decoration: none; font-weight: 700; margin-left: 6px;">Chat on WhatsApp (${customer.phone})</a>` : 'N/A'}
                        </p>
                        <p style="margin: 10px 0 0 0; font-size: 16px;"><strong>Total Amount:</strong> <span style="font-size: 18px; font-weight: 800; color: #059669;">€${amount.toFixed(2)}</span></p>
                      </div>

                      <div style="background-color: #f8fafc; padding: 18px; border-radius: 10px; margin-bottom: 16px; border: 1px solid #edf2f7;">
                        <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Destination</h3>
                        <p style="margin: 4px 0; font-size: 14px;">${customer.address}</p>
                        <p style="margin: 4px 0; font-size: 14px;">${customer.city}, ${customer.postcode}</p>
                        <p style="margin: 4px 0; font-size: 14px; font-weight: 600;">${customer.country}</p>
                      </div>

                      <div style="background-color: #f8fafc; padding: 18px; border-radius: 10px; margin-bottom: 24px; border: 1px solid #edf2f7;">
                        <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Items Ordered</h3>
                        <p style="margin: 4px 0; font-size: 14px; line-height: 1.6; color: #0f172a; font-weight: 600;">${productSummaryStr}</p>
                      </div>

                      <div style="text-align: center; padding-top: 8px;">
                        <a href="https://x-med.pro/admin" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px;">Open Admin Dashboard</a>
                      </div>
                    </div>
                  `;

                  // Send order alert to xmedeurope@gmail.com and info@x-med.pro via Resend
                  await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${resendApiKey}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      from: 'X-Med Orders <info@x-med.pro>',
                      to: ['xmedeurope@gmail.com', 'info@x-med.pro'],
                      subject: notificationSubject,
                      text: notificationText,
                      html: notificationHtml
                    })
                  });
                  console.log(`[Resend] Admin notification email sent successfully to xmedeurope@gmail.com and info@x-med.pro.`);

                  // Insert directly into DB as incoming message to bypass webhook latency
                  await supabaseServer
                    .from('emails')
                    .insert({
                      sender: 'X-Med Storefront <info@x-med.pro>',
                      recipient: 'xmedeurope@gmail.com',
                      subject: notificationSubject,
                      text_content: notificationText,
                      html_content: notificationHtml,
                      direction: 'incoming',
                      status: 'unread'
                    });
                  console.log(`[DB] Logged incoming admin notification alert.`);
                } catch (adminMailErr: any) {
                  console.error('[Resend Exception]: Failed to send admin notification email:', adminMailErr.message);
                }
              }
            } else {
              console.warn('[Resend] Warning: RESEND_API_KEY environment variable is not defined.');
            }
          } catch (mailErr: any) {
            console.error('[Resend Exception]: Failed to send mail:', mailErr.message);
          }

          // 1.7. Optional Telegram Bot Notification Alert
          try {
            const botToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;
            if (botToken && chatId) {
              const orderSummary = lines.map(l => `${l.qty}x ${l.slug}`).join(', ');
              const text = `🔔 *New X-Med Order!*\n\n` +
                `👤 *Name:* ${customer.name}\n` +
                `✉️ *Email:* ${customer.email}\n` +
                `📍 *Location:* ${customer.city}, ${customer.country}\n` +
                `💰 *Total:* €${amount.toFixed(2)}\n` +
                `📦 *Items:* ${orderSummary}\n` +
                `💬 *WhatsApp:* ${customer.phone || 'N/A'}`;
              
              const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: text,
                  parse_mode: 'Markdown'
                })
              });
              if (!tgRes.ok) {
                const tgErrText = await tgRes.text();
                console.error('[Telegram API Error]:', tgErrText);
              } else {
                console.log('[Telegram] Notification alert sent successfully.');
              }
            }
          } catch (tgErr: any) {
            console.error('[Telegram Exception]: Failed to send alert:', tgErr.message);
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

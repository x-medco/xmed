import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseServer = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('[Inbound Webhook] Received webhook payload.');

    const { type, data } = payload;

    // Check if the event type is email.received
    if (type !== 'email.received') {
      return NextResponse.json({ success: true, message: 'Ignored non-inbound email event' });
    }

    const { email_id, from, to, subject, message_id } = data || {};

    if (!email_id) {
      return NextResponse.json({ error: 'Missing email_id' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Inbound Webhook Error]: RESEND_API_KEY environment variable is not defined.');
      return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    // Call Resend's API to fetch the full content of the received email
    console.log(`[Inbound Webhook] Fetching full content for email ID: ${email_id}`);
    const fetchResponse = await fetch(`https://api.resend.com/emails/receiving/${email_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'User-Agent': 'x-med-mail/1.0',
        'Accept': 'application/json'
      }
    });

    if (!fetchResponse.ok) {
      const errText = await fetchResponse.text();
      console.error(`[Inbound Webhook Error]: Resend API returned error status ${fetchResponse.status}:`, errText);
      return NextResponse.json({ error: 'Failed to fetch email details from Resend' }, { status: 500 });
    }

    const emailDetails = await fetchResponse.json();

    const textContent = emailDetails.text || '';
    const htmlContent = emailDetails.html || '';

    // Standardize attachments
    const parsedAttachments = Array.isArray(emailDetails.attachments)
      ? emailDetails.attachments.map((att: any) => ({
          id: att.id,
          name: att.filename || att.name || 'attachment',
          contentType: att.content_type || att.contentType || 'application/octet-stream',
          size: att.size || 0,
          url: att.url || null,
          content: att.content || null
        }))
      : [];

    // Parse sender/recipient cleanly
    const cleanSender = from || '';
    const cleanRecipient = Array.isArray(to) ? to.join(', ') : (to || '');

    if (!supabaseServer) {
      console.warn('[Inbound Webhook Warning]: Supabase Server Client is not configured. Email will not be saved.');
      return NextResponse.json({ success: true, warning: 'Database client not initialized' });
    }

    // Insert email into Supabase
    const { error: dbErr } = await supabaseServer
      .from('emails')
      .insert({
        sender: cleanSender,
        recipient: cleanRecipient,
        subject: subject || '(No Subject)',
        text_content: textContent,
        html_content: htmlContent,
        direction: 'incoming',
        status: 'unread',
        attachments: parsedAttachments,
        thread_id: message_id || email_id,
        resend_id: email_id
      });

    if (dbErr) {
      console.error('[Inbound Webhook Error] Failed to insert email into Supabase:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    console.log(`[Inbound Webhook Success] Saved inbound email from ${cleanSender}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Inbound Webhook Exception]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseServer = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Admin Authentication via Cookies
    const adminAuth = req.cookies.get('admin_auth')?.value;
    if (adminAuth !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    // 2. Parse request parameters
    const { from, to, subject, html, text, attachments } = await req.json();

    if (!to) {
      return NextResponse.json({ error: 'Recipient address (to) is required.' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Outgoing Mail Error]: RESEND_API_KEY environment variable is not defined.');
      return NextResponse.json({ error: 'Resend API key not configured on server.' }, { status: 500 });
    }

    // 3. Format and dispatch email via Resend REST API
    // Map the selected from account to Resend domain email format
    let fromAddress = 'X-Med <info@x-med.co>';
    if (from === 'sales') {
      fromAddress = 'X-Med Sales <sales@x-med.co>';
    } else if (from === 'support') {
      fromAddress = 'X-Med Support <support@x-med.co>';
    }
    
    // Format attachments for Resend API if provided
    // Resend expects attachments array with: { content: 'base64ContentString', filename: 'name.pdf' }
    const resendAttachments = Array.isArray(attachments)
      ? attachments.map((att: any) => ({
          filename: att.name,
          content: att.content, // base64 string
          contentType: att.contentType
        }))
      : [];

    const requestBody: any = {
      from: fromAddress,
      to,
      subject: subject || '(No Subject)',
      html: html || text || '<p></p>',
      attachments: resendAttachments
    };

    if (text) {
      requestBody.text = text;
    }

    console.log(`[Outgoing Mail] Dispatching email to ${to} via Resend...`);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'x-med-mail/1.0'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Outgoing Mail Error] Resend API failed:', errText);
      return NextResponse.json({ error: 'Resend service failed to send email.' }, { status: response.status });
    }

    const resendData = await response.json();
    console.log('[Outgoing Mail Success] Email dispatched successfully:', resendData.id);

    // 4. Save a copy of the sent email in the database
    if (supabaseServer) {
      // Map attachments for storing in database (exclude huge base64 contents to save DB storage)
      const dbAttachments = Array.isArray(attachments)
        ? attachments.map((att: any) => ({
            name: att.name,
            contentType: att.contentType,
            size: Math.round((att.content.length * 3) / 4) // estimate size from base64 length
          }))
        : [];

      const { error: dbErr } = await supabaseServer
        .from('emails')
        .insert({
          sender: fromAddress,
          recipient: to,
          subject: subject || '(No Subject)',
          text_content: text || '',
          html_content: html || '',
          direction: 'outgoing',
          status: 'sent',
          attachments: dbAttachments,
          resend_id: resendData.id
        });

      if (dbErr) {
        console.error('[Outgoing Mail Error] Failed to save copy in database:', dbErr);
        // Do not fail the request since the email has been sent successfully
      }
    }

    return NextResponse.json({ success: true, id: resendData.id });
  } catch (err: any) {
    console.error('[Outgoing Mail Exception]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

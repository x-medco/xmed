import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ success: false, error: 'RESEND_API_KEY environment variable is not defined.' }, { status: 400 });
    }

    // Call Resend List Emails API
    const response = await fetch('https://api.resend.com/emails?limit=100', {
      headers: {
        'Authorization': `Bearer ${resendApiKey}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ success: false, error: errText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, emails: data.data || [] });

  } catch (err: any) {
    console.error('Error fetching Resend email logs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

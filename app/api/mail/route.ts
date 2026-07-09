import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseServer = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Helper to check passcode authentication
function checkAuth(req: NextRequest): boolean {
  const adminAuth = req.cookies.get('admin_auth')?.value;
  return adminAuth === 'true';
}

// GET: Fetch all emails securely (server-side bypasses client RLS)
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  if (!supabaseServer) {
    return NextResponse.json({ error: 'Database client not configured.' }, { status: 500 });
  }

  try {
    const { data, error } = await supabaseServer
      .from('emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Mail API Fetch Error]:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, emails: data || [] });
  } catch (err: any) {
    console.error('[Mail API Fetch Exception]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update email fields (e.g. marking status as 'read')
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  if (!supabaseServer) {
    return NextResponse.json({ error: 'Database client not configured.' }, { status: 500 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing parameter: id and status are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('emails')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Mail API Update Error]:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, email: data });
  } catch (err: any) {
    console.error('[Mail API Update Exception]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Delete an email from history
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  if (!supabaseServer) {
    return NextResponse.json({ error: 'Database client not configured.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing parameter: id is required.' }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from('emails')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Mail API Delete Error]:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Mail API Delete Exception]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

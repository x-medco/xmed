-- Create emails table to store mailbox history
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT,
  text_content TEXT,
  html_content TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
  status TEXT NOT NULL CHECK (status IN ('read', 'unread', 'sent', 'draft', 'failed')) DEFAULT 'unread',
  attachments JSONB DEFAULT '[]'::jsonb, -- Array of objects: {name, url, size, type}
  thread_id TEXT, -- To thread related emails (e.g. references message-id)
  resend_id TEXT, -- ID returned by Resend
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow authenticated users full access to emails" ON public.emails;

-- Allow authenticated admin users full access to managing emails
CREATE POLICY "Allow authenticated users full access to emails" 
  ON public.emails FOR ALL TO authenticated USING (true);

-- Create a storage bucket for email attachments (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('email-attachments', 'email-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users full access to the attachments bucket
DROP POLICY IF EXISTS "Allow authenticated users access to attachments" ON storage.objects;
CREATE POLICY "Allow authenticated users access to attachments"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'email-attachments');

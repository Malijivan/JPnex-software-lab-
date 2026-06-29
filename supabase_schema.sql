-- SQL Schema for JPnex Software Lab

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow inserts for our server
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (since server uses anon key)
CREATE POLICY "Allow anonymous inserts for contact body" 
ON public.contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow reading only by authenticated users (or service role)
CREATE POLICY "Allow server to read contacts" 
ON public.contact_submissions 
FOR SELECT 
TO anon
USING (true); -- Note: For strict security, you should only allow service_role to read. 

-- Create policy to allow deleting contacts
CREATE POLICY "Allow server to delete contacts" 
ON public.contact_submissions 
FOR DELETE 
TO anon
USING (true);

-- Create project_orders table
CREATE TABLE IF NOT EXISTS public.project_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    selected_services JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for project orders
ALTER TABLE public.project_orders ENABLE ROW LEVEL SECURITY;

-- Create policy for inserts
CREATE POLICY "Allow anonymous inserts for orders" 
ON public.project_orders 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy for reading 
CREATE POLICY "Allow server to read orders" 
ON public.project_orders 
FOR SELECT 
TO anon
USING (true);

-- Create policy for deleting orders
CREATE POLICY "Allow server to delete orders" 
ON public.project_orders 
FOR DELETE 
TO anon
USING (true);

-- Grant usage on schema public
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;

-- Create api_collections table
CREATE TABLE public.api_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  base_url TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create api_endpoints table
CREATE TABLE public.api_endpoints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID NOT NULL REFERENCES public.api_collections(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
  path TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  parameters JSONB NOT NULL DEFAULT '[]',
  request_body TEXT,
  response_example TEXT NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.api_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_endpoints ENABLE ROW LEVEL SECURITY;

-- Public read/write access (shared workspace knowledge base)
CREATE POLICY "Anyone can read collections" ON public.api_collections FOR SELECT USING (true);
CREATE POLICY "Anyone can insert collections" ON public.api_collections FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update collections" ON public.api_collections FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete collections" ON public.api_collections FOR DELETE USING (true);

CREATE POLICY "Anyone can read endpoints" ON public.api_endpoints FOR SELECT USING (true);
CREATE POLICY "Anyone can insert endpoints" ON public.api_endpoints FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update endpoints" ON public.api_endpoints FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete endpoints" ON public.api_endpoints FOR DELETE USING (true);

-- Indexes
CREATE INDEX idx_endpoints_collection_id ON public.api_endpoints(collection_id);
CREATE INDEX idx_endpoints_method ON public.api_endpoints(method);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_api_collections_updated_at
  BEFORE UPDATE ON public.api_collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_api_endpoints_updated_at
  BEFORE UPDATE ON public.api_endpoints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- Create storage bucket for endpoint documents
INSERT INTO storage.buckets (id, name, public) VALUES ('endpoint-docs', 'endpoint-docs', true);

-- Create table to track uploaded documents
CREATE TABLE public.endpoint_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint_id uuid NOT NULL REFERENCES public.api_endpoints(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_format text NOT NULL, -- 'yaml', 'json', 'pdf', 'xml'
  file_path text NOT NULL, -- storage path
  file_size integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.endpoint_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read endpoint documents" ON public.endpoint_documents FOR SELECT USING (true);
CREATE POLICY "Anyone can insert endpoint documents" ON public.endpoint_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update endpoint documents" ON public.endpoint_documents FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete endpoint documents" ON public.endpoint_documents FOR DELETE USING (true);

-- Storage policies
CREATE POLICY "Anyone can upload endpoint docs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'endpoint-docs');
CREATE POLICY "Anyone can read endpoint docs" ON storage.objects FOR SELECT USING (bucket_id = 'endpoint-docs');
CREATE POLICY "Anyone can delete endpoint docs" ON storage.objects FOR DELETE USING (bucket_id = 'endpoint-docs');

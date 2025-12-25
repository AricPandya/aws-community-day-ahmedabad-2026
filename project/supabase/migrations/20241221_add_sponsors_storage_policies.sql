-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public access to sponsors bucket for uploads and reads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sponsors', 'sponsors', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy to allow public uploads to sponsors bucket
CREATE POLICY "Allow public uploads to sponsors bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'sponsors');

-- Policy to allow public reads from sponsors bucket
CREATE POLICY "Allow public reads from sponsors bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'sponsors');

-- Policy to allow public updates to sponsors bucket
CREATE POLICY "Allow public updates to sponsors bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'sponsors');

-- Policy to allow public deletes from sponsors bucket
CREATE POLICY "Allow public deletes from sponsors bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'sponsors');
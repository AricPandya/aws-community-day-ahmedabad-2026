-- Enable RLS on sponsors table
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Allow public read access to sponsors
CREATE POLICY "Allow public read access to sponsors" ON sponsors
FOR SELECT USING (true);

-- Allow public insert access to sponsors
CREATE POLICY "Allow public insert access to sponsors" ON sponsors
FOR INSERT WITH CHECK (true);

-- Allow public update access to sponsors
CREATE POLICY "Allow public update access to sponsors" ON sponsors
FOR UPDATE USING (true);

-- Allow public delete access to sponsors
CREATE POLICY "Allow public delete access to sponsors" ON sponsors
FOR DELETE USING (true);
-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  time_slot VARCHAR(50) NOT NULL,
  track_number INTEGER NOT NULL CHECK (track_number BETWEEN 1 AND 3),
  title VARCHAR(255) NOT NULL,
  speaker VARCHAR(255),
  room VARCHAR(100),
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX idx_schedules_time_track ON schedules(time_slot, track_number);
CREATE INDEX idx_schedules_sort_order ON schedules(sort_order);

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON schedules FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON schedules FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete" ON schedules FOR DELETE USING (true);
-- Add start_time column to schedules table
ALTER TABLE schedules ADD COLUMN start_time TIMESTAMPTZ;

-- Update sort to use start_time instead of sort_order
CREATE INDEX idx_schedules_start_time ON schedules(start_time);

-- Drop existing check constraint on sponsors tier
ALTER TABLE sponsors DROP CONSTRAINT IF EXISTS sponsors_tier_check;
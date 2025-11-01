-- ====================================
-- Call Analytics Dashboard - Supabase Setup
-- ====================================
-- 
-- Run this SQL in your Supabase SQL Editor
-- to create the required table and policies
-- 

-- Create the call_analytics table
CREATE TABLE IF NOT EXISTS call_analytics (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hourly_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_call_analytics_email ON call_analytics(email);

-- Add a comment to the table
COMMENT ON TABLE call_analytics IS 'Stores user-customized hourly call analytics data';

-- Enable Row Level Security (RLS)
ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable all operations for all users" ON call_analytics;
DROP POLICY IF EXISTS "Allow public read access" ON call_analytics;
DROP POLICY IF EXISTS "Allow public insert access" ON call_analytics;
DROP POLICY IF EXISTS "Allow public update access" ON call_analytics;

-- Create policies to allow all operations (for development)
-- In production, you should implement proper authentication
CREATE POLICY "Allow public read access" ON call_analytics
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access" ON call_analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access" ON call_analytics
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function
DROP TRIGGER IF EXISTS update_call_analytics_updated_at ON call_analytics;

CREATE TRIGGER update_call_analytics_updated_at
    BEFORE UPDATE ON call_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_name = 'call_analytics'
ORDER BY 
  ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Table "call_analytics" created successfully!';
  RAISE NOTICE 'You can now use this table with your Call Analytics Dashboard.';
END $$;


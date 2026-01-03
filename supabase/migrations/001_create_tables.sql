-- Create sessions table
-- Stores metadata about each user session through the app
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE
);

-- Create letters table
-- Stores letters written by author and recipient
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK (author IN ('author', 'recipient')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_letters_session_id ON letters(session_id);
CREATE INDEX IF NOT EXISTS idx_letters_author ON letters(author);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
-- Sessions: anyone can create and read their own session
CREATE POLICY "Allow public to create sessions" ON sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read sessions" ON sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public to update sessions" ON sessions
  FOR UPDATE USING (true);

-- Letters: anyone can create and read letters
CREATE POLICY "Allow public to create letters" ON letters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read letters" ON letters
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

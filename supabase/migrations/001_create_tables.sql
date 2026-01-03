-- ============================================================================
-- CADEADO - Database Schema
-- ============================================================================
-- This schema defines the core tables for the emotional experience app
-- Sessions track user journeys, Letters store written messages between fefe/nana
-- ============================================================================

-- ============================================================================
-- SESSIONS TABLE
-- ============================================================================
-- Stores metadata about each user session through the app
-- Each session represents one complete journey through the experience
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  
  -- Constraints
  CONSTRAINT sessions_valid_completed CHECK (completed IN (true, false))
);

-- Add comment to sessions table
COMMENT ON TABLE sessions IS 'Tracks user sessions through the emotional experience journey';
COMMENT ON COLUMN sessions.id IS 'Unique session identifier';
COMMENT ON COLUMN sessions.created_at IS 'Session creation timestamp';
COMMENT ON COLUMN sessions.updated_at IS 'Last session update timestamp';
COMMENT ON COLUMN sessions.completed IS 'Whether the user completed the experience';

-- ============================================================================
-- LETTERS TABLE
-- ============================================================================
-- Stores letters written by fefe (author) and nana (recipient)
-- Letters are immutable once created and linked to a specific session
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK (author IN ('author', 'recipient')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT letters_non_empty_content CHECK (length(trim(content)) > 0),
  CONSTRAINT letters_valid_author CHECK (author IN ('author', 'recipient'))
);

-- Add comment to letters table
COMMENT ON TABLE letters IS 'Stores letters written during the experience (author=fefe, recipient=nana)';
COMMENT ON COLUMN letters.id IS 'Unique letter identifier';
COMMENT ON COLUMN letters.session_id IS 'Foreign key to sessions table';
COMMENT ON COLUMN letters.author IS 'Letter author: author (fefe) or recipient (nana)';
COMMENT ON COLUMN letters.content IS 'Letter content text';
COMMENT ON COLUMN letters.created_at IS 'Letter creation timestamp (immutable)';

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_letters_session_id ON letters(session_id);
CREATE INDEX IF NOT EXISTS idx_letters_author ON letters(author);
CREATE INDEX IF NOT EXISTS idx_letters_created_at ON letters(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_completed ON sessions(completed);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on all tables
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Allow public to create sessions" ON sessions;
DROP POLICY IF EXISTS "Allow public to read sessions" ON sessions;
DROP POLICY IF EXISTS "Allow public to update sessions" ON sessions;
DROP POLICY IF EXISTS "Allow public to create letters" ON letters;
DROP POLICY IF EXISTS "Allow public to read letters" ON letters;

-- ============================================================================
-- SESSIONS POLICIES
-- ============================================================================
-- Allow anyone to create sessions (no auth required)
CREATE POLICY "sessions_allow_public_insert" ON sessions
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read all sessions
CREATE POLICY "sessions_allow_public_select" ON sessions
  FOR SELECT USING (true);

-- Allow anyone to update sessions (mark as completed)
CREATE POLICY "sessions_allow_public_update" ON sessions
  FOR UPDATE USING (true);

-- ============================================================================
-- LETTERS POLICIES
-- ============================================================================
-- Allow anyone to create letters
CREATE POLICY "letters_allow_public_insert" ON letters
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read all letters
CREATE POLICY "letters_allow_public_select" ON letters
  FOR SELECT USING (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================
-- Create function to update updated_at timestamp on sessions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on sessions
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- GRANTS
-- ============================================================================
-- Grant permissions to anon role (public access)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE ON sessions TO anon;
GRANT SELECT, INSERT ON letters TO anon;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

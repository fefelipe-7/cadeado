-- ============================================================================
-- CADEADO - Database Schema (Clean Rebuild)
-- ============================================================================
-- This schema defines the core tables for the emotional experience app
-- Letters are globally shared between all users
-- ============================================================================

-- ============================================================================
-- DROP ALL EXISTING OBJECTS (Clean slate)
-- ============================================================================
DROP POLICY IF EXISTS "letters_allow_public_insert" ON letters;
DROP POLICY IF EXISTS "letters_allow_public_select" ON letters;
DROP POLICY IF EXISTS "sessions_allow_public_insert" ON sessions;
DROP POLICY IF EXISTS "sessions_allow_public_select" ON sessions;
DROP POLICY IF EXISTS "sessions_allow_public_update" ON sessions;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS letters CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

-- ============================================================================
-- LETTERS TABLE
-- ============================================================================
-- Stores letters written by fefe or nana
-- Letters are immutable once created and globally accessible to all users
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL CHECK (author IN ('fefe', 'nana')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT letters_non_empty_content CHECK (length(trim(content)) > 0),
  CONSTRAINT letters_valid_author CHECK (author IN ('fefe', 'nana'))
);

-- Add comments to letters table
COMMENT ON TABLE letters IS 'Stores letters written during the experience (author=fefe or nana). Globally accessible to all users.';
COMMENT ON COLUMN letters.id IS 'Unique letter identifier';
COMMENT ON COLUMN letters.author IS 'Letter author: fefe or nana';
COMMENT ON COLUMN letters.content IS 'Letter content text';
COMMENT ON COLUMN letters.created_at IS 'Letter creation timestamp (immutable)';

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Create indexes for better query performance
CREATE INDEX idx_letters_author ON letters(author);
CREATE INDEX idx_letters_created_at ON letters(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on letters table
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

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
-- GRANTS
-- ============================================================================
-- Grant permissions to anon role (public access)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON letters TO anon;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

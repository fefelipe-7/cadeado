import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jjrpjqvgdodzctqbenpz.supabase.co'
const supabaseKey = 'sb_publishable_6aQAhpqHXc5oMbF9rrGqqQ_0L0wzeql'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      sessions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          completed: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          completed?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          completed?: boolean
        }
      }
      letters: {
        Row: {
          id: string
          session_id: string
          author: 'author' | 'recipient'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          author: 'author' | 'recipient'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          author?: 'author' | 'recipient'
          content?: string
          created_at?: string
        }
      }
    }
  }
}

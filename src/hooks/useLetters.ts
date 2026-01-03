import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface Letter {
  id: string
  session_id: string
  author: 'author' | 'recipient'
  content: string
  created_at: string
}

export function useLetters(sessionId: string | null) {
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchLetters()
    }
  }, [sessionId])

  const fetchLetters = async () => {
    if (!sessionId) return

    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('letters')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (err) throw err
      setLetters(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar cartas'
      setError(message)
      console.error('Erro ao buscar cartas:', err)
    } finally {
      setLoading(false)
    }
  }

  const addLetter = async (author: 'author' | 'recipient', content: string) => {
    if (!sessionId) return

    try {
      const { data, error: err } = await supabase
        .from('letters')
        .insert({
          session_id: sessionId,
          author,
          content,
        })
        .select()
        .single()

      if (err) throw err
      setLetters([...letters, data])
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao adicionar carta'
      setError(message)
      console.error('Erro ao adicionar carta:', err)
      return null
    }
  }

  const deleteLetter = async (letterId: string) => {
    try {
      const { error: err } = await supabase
        .from('letters')
        .delete()
        .eq('id', letterId)

      if (err) throw err
      setLetters(letters.filter((l) => l.id !== letterId))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar carta'
      setError(message)
      console.error('Erro ao deletar carta:', err)
    }
  }

  return {
    letters,
    loading,
    error,
    addLetter,
    deleteLetter,
    refetch: fetchLetters,
  }
}

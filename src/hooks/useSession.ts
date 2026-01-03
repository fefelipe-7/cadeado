import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Session {
  id: string
  created_at: string
  updated_at: string
  completed: boolean
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    createSession()
  }, [])

  const createSession = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('sessions')
        .insert({ completed: false })
        .select()
        .single()

      if (err) throw err
      setSession(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar sessão'
      setError(message)
      console.error('Erro ao criar sessão:', err)
    } finally {
      setLoading(false)
    }
  }

  const completeSession = async () => {
    if (!session) return

    try {
      const { data, error: err } = await supabase
        .from('sessions')
        .update({ completed: true })
        .eq('id', session.id)
        .select()
        .single()

      if (err) throw err
      setSession(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao completar sessão'
      setError(message)
      console.error('Erro ao completar sessão:', err)
    }
  }

  return {
    session,
    loading,
    error,
    completeSession,
  }
}

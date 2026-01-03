import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Letter {
  id: string
  from: 'fefe' | 'nana'
  to: 'fefe' | 'nana'
  content: string
  timestamp: number
}

interface LettersScreenProps {
  onExit?: () => void
  sessionId?: string
}

type View = 'list' | 'read' | 'compose'

export function LettersScreen({ onExit, sessionId }: LettersScreenProps) {
  const [letters, setLetters] = useState<Letter[]>([])
  const [view, setView] = useState<View>('list')
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null)
  const [composeFrom, setComposeFrom] = useState<'fefe' | 'nana'>('fefe')
  const [composeContent, setComposeContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const selectedLetter = letters.find((l) => l.id === selectedLetterId)

  useEffect(() => {
    loadLetters()
  }, [sessionId])

  const loadLetters = async () => {
    if (!sessionId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('letters')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (err) throw err

      const formattedLetters: Letter[] = (data || []).map((letter: any) => ({
        id: letter.id,
        from: letter.author === 'author' ? 'fefe' : 'nana',
        to: letter.author === 'author' ? 'nana' : 'fefe',
        content: letter.content,
        timestamp: new Date(letter.created_at).getTime(),
      }))

      setLetters(formattedLetters)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar cartas'
      setError(message)
      console.error('Erro ao carregar cartas:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCompose = async () => {
    if (!composeContent.trim()) return
    if (!sessionId) {
      setError('Sessão não encontrada')
      return
    }

    try {
      setError(null)

      const { data, error: err } = await supabase
        .from('letters')
        .insert({
          session_id: sessionId,
          author: composeFrom === 'fefe' ? 'author' : 'recipient',
          content: composeContent,
        })
        .select()
        .single()

      if (err) throw err

      const newLetter: Letter = {
        id: data.id,
        from: composeFrom,
        to: composeFrom === 'fefe' ? 'nana' : 'fefe',
        content: composeContent,
        timestamp: new Date(data.created_at).getTime(),
      }

      setLetters([...letters, newLetter])
      setComposeContent('')
      setView('list')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar carta'
      setError(message)
      console.error('Erro ao salvar carta:', err)
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-neutral-950">
      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
        >
          <div className="w-full max-w-2xl">
            <h2 className="text-white/80 text-2xl mb-2 text-center font-light">
              Cartas
            </h2>
            <p className="text-white/50 text-sm text-center mb-8">
              Expressões, não negociações
            </p>

            <div className="space-y-3 mb-8">
              {loading ? (
                <p className="text-white/50 text-center py-8 font-light">
                  Carregando cartas...
                </p>
              ) : error ? (
                <p className="text-red-400/70 text-center py-8 font-light text-sm">
                  {error}
                </p>
              ) : letters.length === 0 ? (
                <p className="text-white/50 text-center py-8 font-light">
                  Nenhuma carta ainda
                </p>
              ) : (
                letters.map((letter) => (
                  <motion.button
                    key={letter.id}
                    onClick={() => {
                      setSelectedLetterId(letter.id)
                      setView('read')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 text-left border border-white/20 rounded-sm hover:border-white/40 transition-colors bg-neutral-900/30 hover:bg-neutral-900/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/60 text-sm font-light">
                        {letter.from === 'fefe' ? 'fefe' : 'nana'} → {letter.to === 'fefe' ? 'fefe' : 'nana'}
                      </p>
                      <p className="text-white/40 text-xs">
                        {new Date(letter.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <p className="text-white/80 line-clamp-2 font-light">
                      {letter.content}
                    </p>
                  </motion.button>
                ))
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <motion.button
                onClick={() => setView('compose')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/70 hover:text-white/90 border border-white/20 hover:border-white/50 rounded-sm transition-all duration-300"
              >
                escrever carta
              </motion.button>

              {onExit && (
                <motion.button
                  onClick={onExit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/50 hover:text-white/70 border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300"
                >
                  sair
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {view === 'read' && selectedLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
        >
          <div className="w-full max-w-2xl">
            <button
              onClick={() => setView('list')}
              className="text-white/50 hover:text-white/80 text-sm mb-8 transition-colors font-light"
            >
              ← voltar
            </button>

            <div className="bg-neutral-900/30 border border-white/10 rounded-sm p-6 mb-8">
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm font-light">De:</p>
                    <p className="text-white/80 font-light">{selectedLetter.from}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-light">Para:</p>
                    <p className="text-white/80 font-light">{selectedLetter.to}</p>
                  </div>
                </div>
                <p className="text-white/40 text-xs font-light">
                  {new Date(selectedLetter.timestamp).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap font-light">
                  {selectedLetter.content}
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setView('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/70 hover:text-white/90 border border-white/20 hover:border-white/50 rounded-sm transition-all duration-300"
            >
              voltar
            </motion.button>
          </div>
        </motion.div>
      )}

      {view === 'compose' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
        >
          <div className="w-full max-w-2xl">
            <button
              onClick={() => setView('list')}
              className="text-white/50 hover:text-white/80 text-sm mb-8 transition-colors font-light"
            >
              ← voltar
            </button>

            <div className="bg-neutral-900/30 border border-white/10 rounded-sm p-6 mb-8">
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-white/60 text-sm font-light mb-3">Quem está escrevendo?</p>
                <div className="flex gap-3">
                  {(['fefe', 'nana'] as const).map((person) => (
                    <motion.button
                      key={person}
                      onClick={() => setComposeFrom(person)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 px-4 py-2 text-sm font-light rounded-sm transition-all ${
                        composeFrom === person
                          ? 'bg-white/10 border border-white/40 text-white/90'
                          : 'border border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      {person}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white/60 text-sm font-light mb-3">
                  Para: {composeFrom === 'fefe' ? 'nana' : 'fefe'}
                </p>
              </div>

              <div className="mb-6">
                <textarea
                  value={composeContent}
                  onChange={(e) => setComposeContent(e.target.value)}
                  placeholder="Escreva sua carta aqui..."
                  className="w-full h-48 bg-neutral-800/50 border border-white/20 rounded-sm p-4 text-white/80 placeholder-white/30 font-light focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-sm">
                  <p className="text-red-400/70 text-sm font-light">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <motion.button
                  onClick={handleCompose}
                  disabled={!composeContent.trim()}
                  whileHover={{ scale: composeContent.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: composeContent.trim() ? 0.95 : 1 }}
                  className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/70 hover:text-white/90 border border-white/20 hover:border-white/50 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  enviar carta
                </motion.button>

                <motion.button
                  onClick={() => setView('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/50 hover:text-white/70 border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300"
                >
                  cancelar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

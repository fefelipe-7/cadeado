import { motion } from 'motion/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Letter {
  id: string
  author: 'author' | 'recipient'
  content: string
  timestamp: number
}

interface LettersScreenProps {
  onExit?: () => void
}

export function LettersScreen({ onExit }: LettersScreenProps) {
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: '1',
      author: 'author',
      content: 'Esta é uma carta que escrevi para você. Um espaço para expressar o que não consegui dizer de outra forma.',
      timestamp: Date.now(),
    },
  ])

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null)
  const selectedLetter = letters.find((l) => l.id === selectedLetterId)

  return (
    <div className="relative w-full h-full flex flex-col">
      {!selectedLetterId ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <h2 className="text-white/80 text-xl mb-8 text-center">
              Cartas
            </h2>

            <div className="space-y-3">
              {letters.map((letter) => (
                <motion.button
                  key={letter.id}
                  onClick={() => setSelectedLetterId(letter.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 text-left border border-white/20 rounded-lg hover:border-white/40 transition-colors bg-neutral-900/50"
                >
                  <p className="text-white/60 text-sm mb-2">
                    {letter.author === 'author' ? 'Minha carta' : 'Sua carta'}
                  </p>
                  <p className="text-white/80 line-clamp-2">
                    {letter.content}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm text-center mb-4">
                Cartas são expressões, não negociações.
              </p>
              {onExit && (
                <Button
                  onClick={onExit}
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white/90 border border-white/20 hover:border-white/40"
                >
                  sair
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md flex flex-col h-full"
          >
            <button
              onClick={() => setSelectedLetterId(null)}
              className="text-white/50 hover:text-white/80 text-sm mb-6 transition-colors"
            >
              ← voltar
            </button>

            <div className="flex-1 overflow-y-auto">
              <p className="text-white/60 text-sm mb-4">
                {selectedLetter?.author === 'author' ? 'Minha carta' : 'Sua carta'}
              </p>
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                {selectedLetter?.content}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-8">
              <p className="text-white/50 text-xs text-center">
                {new Date(selectedLetter?.timestamp || 0).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

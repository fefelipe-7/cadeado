import { motion } from 'motion/react'
import { useState } from 'react'

interface Screen6RecognitionProps {
  onContinue: () => void
}

export function Screen6Recognition({ onContinue }: Screen6RecognitionProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const textAbove = 'o que a gente viveu existiu'
  const textBelow = 'foi real\nfoi importante\ne faz parte de quem eu sou hoje'
  const subtextAbove = 'não foi ilusão\nnão foi desperdício'

  return (
    <div className="relative w-full h-full flex flex-col bg-neutral-950 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-white/80 text-xl leading-relaxed font-light mb-4">
              {textAbove}
            </p>
            <p className="text-white/60 text-base leading-relaxed font-light whitespace-pre-line">
              {subtextAbove}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <img
              src="/src/assets/us.png"
              alt="Us"
              className="w-full max-w-sm h-auto rounded-sm object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onAnimationComplete={() => setIsAnimating(false)}
            className="text-center"
          >
            <p className="text-white/80 text-lg leading-relaxed font-light whitespace-pre-line">
              {textBelow}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center justify-center px-6 py-8 border-t border-white/10">
        <motion.button
          onClick={onContinue}
          disabled={isAnimating}
          whileHover={{ scale: isAnimating ? 1 : 1.05 }}
          whileTap={{ scale: isAnimating ? 1 : 0.95 }}
          className="px-6 py-3 text-sm font-light tracking-wide text-white/70 hover:text-white/90 border border-white/20 hover:border-white/50 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          continuar
        </motion.button>
      </div>
    </div>
  )
}

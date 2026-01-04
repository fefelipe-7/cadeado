import { motion } from 'motion/react'
import { useState } from 'react'
import { ScreenLayout } from '@/components/ScreenLayout'
import { OptimizedImage } from '@/components/OptimizedImage'

interface Screen6RecognitionProps {
  onContinue: () => void
}

export function Screen6Recognition({ onContinue }: Screen6RecognitionProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const textAbove = 'o que a gente viveu existiu'
  const textBelow = 'foi real\nfoi importante\ne faz parte de quem eu sou hoje'
  const subtextAbove = 'não foi ilusão\nnão foi desperdício'

  return (
    <ScreenLayout
      onContinue={onContinue}
      isAnimating={isAnimating}
    >
      <div className="w-full max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
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
          transition={{ duration: 1.0, delay: 0.9 }}
          className="flex justify-center"
        >
          <OptimizedImage
            src="https://i.imgur.com/QvipQCs_d.webp?maxwidth=1520&fidelity=grand"
            alt="Us"
            className="w-full max-w-sm h-auto rounded-sm object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.4 }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="text-center"
        >
          <p className="text-white/80 text-lg leading-relaxed font-light whitespace-pre-line">
            {textBelow}
          </p>
        </motion.div>
      </div>
    </ScreenLayout>
  )
}

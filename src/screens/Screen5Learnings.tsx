import { motion } from 'motion/react'
import { useState } from 'react'

interface Screen5LearningsProps {
  onContinue: () => void
}

export function Screen5Learnings({ onContinue }: Screen5LearningsProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const sections = [
    {
      image: '/src/assets/1.png',
      text: 'aprendi que amar não precisar falar\ncarinho e cuidado são atos de amor tão sublimes\nque nos faz pensar que amor também pode ter 4 patas',
      imagePosition: 'left' as const,
    },
    {
      image: '/src/assets/2.png',
      text: 'aprendi que amar é amar aquilo que o outro ama\ncomo se tivesse sempre amado\ncomo se sempre fosse querido',
      imagePosition: 'right' as const,
    },
    {
      image: '/src/assets/3.png',
      text: 'aprendi que amor não se mede em distâncias,\nem litros de lágrimas, em peso de dor\namar é sem medidas',
      imagePosition: 'left' as const,
    },
  ]

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-neutral-950 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:px-6">
        <div className="w-full max-w-6xl space-y-8 md:space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.3 }}
              onAnimationComplete={() => {
                if (index === sections.length - 1) {
                  handleAnimationComplete()
                }
              }}
              className={`flex flex-col ${
                section.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
              } gap-6 md:gap-8 items-center`}
            >
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img
                  src={section.image}
                  alt={`Learning ${index + 1}`}
                  className="w-full h-auto rounded-sm object-cover"
                />
              </div>

              <div className="w-full md:w-1/2">
                <p className="text-white/80 text-base md:text-lg leading-relaxed font-light whitespace-pre-line text-center md:text-left">
                  {section.text}
                </p>
              </div>
            </motion.div>
          ))}
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

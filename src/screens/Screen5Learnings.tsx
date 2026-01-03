import { motion } from 'motion/react'
import { useState } from 'react'
import { ScreenLayout } from '@/components/ScreenLayout'

interface Screen5LearningsProps {
  onContinue: () => void
}

export function Screen5Learnings({ onContinue }: Screen5LearningsProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const sections = [
    {
      image: 'src/assets/1.png',
      text: 'aprendi que amar não precisar falar\ncarinho e cuidado são atos de amor tão sublimes\nque nos faz pensar que amor também pode ter 4 patas',
      imagePosition: 'left' as const,
    },
    {
      image: 'src/assets/2.png',
      text: 'aprendi que amar é amar aquilo que o outro ama\ncomo se tivesse sempre amado\ncomo se sempre fosse querido',
      imagePosition: 'right' as const,
    },
    {
      image: 'src/assets/3.png',
      text: 'aprendi que amor não se mede em distâncias,\nem litros de lágrimas, em peso de dor\namar é sem medidas',
      imagePosition: 'left' as const,
    },
  ]

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <ScreenLayout
      onContinue={onContinue}
      isAnimating={isAnimating}
      showButton={false}
    >
      <div className="w-full max-w-4xl space-y-12">
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
              section.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } gap-6 lg:gap-8 items-center`}
          >
            <div className="w-full lg:w-2/5 flex-shrink-0">
              <img
                src={section.image}
                alt={`Learning ${index + 1}`}
                className="w-full h-auto rounded-sm object-cover"
              />
            </div>

            <div className="w-full lg:w-3/5">
              <p className="text-white/80 text-base lg:text-lg leading-relaxed font-light whitespace-pre-line text-center lg:text-left">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenLayout>
  )
}

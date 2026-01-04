import { motion } from 'motion/react'
import { useState } from 'react'
import { ScreenLayout } from '@/components/ScreenLayout'
import { OptimizedImage } from '@/components/OptimizedImage'

interface Screen5LearningsProps {
  onContinue: () => void
}

export function Screen5Learnings({ onContinue }: Screen5LearningsProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const sections = [
    {
      image: 'https://i.ibb.co/Qvgm7nyP/1.png',
      text: 'aprendi que amar não precisar falar\ncarinho e cuidado são atos de amor tão sublimes\nque nos faz pensar que amor também pode ter 4 patas',
      imagePosition: 'left' as const,
    },
    {
      image: 'https://i.ibb.co/WWr7RMd0/2.png',
      text: 'aprendi que amar é amar aquilo que o outro ama\ncomo se tivesse sempre amado\ncomo se sempre fosse querido',
      imagePosition: 'right' as const,
    },
    {
      image: 'https://i.imgur.com/HH8ynJE_d.webp?maxwidth=760&fidelity=grand',
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
    >
      <div className="w-full max-w-5xl space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 + index * 0.5 }}
            onAnimationComplete={() => {
              if (index === sections.length - 1) {
                handleAnimationComplete()
              }
            }}
            className={`flex ${
              section.imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'
            } gap-6 items-center justify-center`}
          >
            <div className="w-40 h-40 flex-shrink-0">
              <OptimizedImage
                src={section.image}
                alt={`Learning ${index + 1}`}
                className="w-full h-full rounded-sm object-cover"
                width={160}
                height={160}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-base leading-relaxed font-light whitespace-pre-line">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenLayout>
  )
}

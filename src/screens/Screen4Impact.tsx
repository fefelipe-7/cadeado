import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen4ImpactProps {
  onContinue: () => void
}

export function Screen4Impact({ onContinue }: Screen4ImpactProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'eu sei que o que aconteceu',
    'não machuca só o momento',
    'machuca a forma de confiar',
    'a forma de se sentir segura',
    'a forma de olhar para alguém',
    'eu assumo esse impacto',
    'mesmo sabendo que ele',
    'não pode ser desfeito',
    'mas com você...',
  ]

  return (
    <ScreenLayout
      onContinue={onContinue}
      isAnimating={isAnimating}
    >
      <AnimatedLines
        lines={lines}
        onAnimationComplete={() => setIsAnimating(false)}
      />
    </ScreenLayout>
  )
}

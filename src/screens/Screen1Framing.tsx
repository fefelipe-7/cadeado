import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen1FramingProps {
  onContinue: () => void
}

export function Screen1Framing({ onContinue }: Screen1FramingProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Este é um espaço para você.',
    'Um lugar para refletir sobre o que aconteceu.',
    'Sem pressa. Sem julgamento.',
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

import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen5LearningsProps {
  onContinue: () => void
}

export function Screen5Learnings({ onContinue }: Screen5LearningsProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Eu aprendi algo com isso.',
    'Não como desculpa, mas como responsabilidade.',
    'Vou carregar isso comigo.',
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

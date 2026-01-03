import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen6RecognitionProps {
  onContinue: () => void
}

export function Screen6Recognition({ onContinue }: Screen6RecognitionProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'O que vivemos foi real.',
    'Isso existiu. Isso importou.',
    'Nada disso é apagado pelo que aconteceu depois.',
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

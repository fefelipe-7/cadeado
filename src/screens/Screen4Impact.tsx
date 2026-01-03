import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen4ImpactProps {
  onContinue: () => void
}

export function Screen4Impact({ onContinue }: Screen4ImpactProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Eu vejo o que minha ação causou.',
    'A dor que você sentiu era real.',
    'Isso não pode ser desfeito com palavras.',
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

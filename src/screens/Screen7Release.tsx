import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen7ReleaseProps {
  onContinue: () => void
}

export function Screen7Release({ onContinue }: Screen7ReleaseProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'você não me deve resposta',
    'nem explicação',
    'nem perdão',
    'não precisa carregar',
    'nenhuma expectativa',
    'nenhuma obrigação',
    'o que vier depois disso',
    'se vier',
    'precisa ser leve',
    'e se não vier',
    'também está tudo bem',
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

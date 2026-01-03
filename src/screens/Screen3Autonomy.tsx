import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen3AutonomyProps {
  onContinue: () => void
}

export function Screen3Autonomy({ onContinue }: Screen3AutonomyProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'quando você terminou',
    'não foi exagero',
    'nem impulso',
    'foi uma forma de se proteger',
    'de algo que te feriu',
    'isso foi um direito seu',
    'e eu respeito essa decisão',
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

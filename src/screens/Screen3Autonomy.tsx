import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen3AutonomyProps {
  onContinue: () => void
}

export function Screen3Autonomy({ onContinue }: Screen3AutonomyProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Você é uma pessoa completa.',
    'Suas escolhas são suas.',
    'Eu não tenho direito sobre você.',
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

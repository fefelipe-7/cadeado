import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen7ReleaseProps {
  onContinue: () => void
}

export function Screen7Release({ onContinue }: Screen7ReleaseProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Você não precisa me perdoar.',
    'Você não precisa responder.',
    'Você é livre.',
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

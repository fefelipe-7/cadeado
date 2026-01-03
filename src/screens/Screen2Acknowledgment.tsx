import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen2AcknowledgmentProps {
  onContinue: () => void
}

export function Screen2Acknowledgment({ onContinue }: Screen2AcknowledgmentProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'Eu cometi um erro.',
    'Isso foi real. Isso importou.',
    'E você merecia melhor.',
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

import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen2AcknowledgmentProps {
  onContinue: () => void
}

export function Screen2Acknowledgment({ onContinue }: Screen2AcknowledgmentProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'eu traí a sua confiança',
    'isso não aconteceu por falta de amor',
    'nem por confusão',
    'nem por momento difícil',
    'aconteceu porque eu fiz uma escolha errada',
    'e não existe justificativa nenhuma',
    'que diminua isso',
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

import { AnimatedLines } from '@/components/AnimatedLines'
import { ScreenLayout } from '@/components/ScreenLayout'
import { useState } from 'react'

interface Screen1FramingProps {
  onContinue: () => void
}

export function Screen1Framing({ onContinue }: Screen1FramingProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const lines = [
    'isso não é um pedido',
    'nem uma tentativa de convencer',
    'não é pra reabrir nada',
    'nem pra mudar decisões',
    'é só um espaço',
    'criado com cuidado',
    'pra dizer o que ficou',
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

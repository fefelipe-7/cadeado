import { motion } from 'motion/react'
import { ReactNode } from 'react'
import { Button } from './ui/button'

interface ScreenLayoutProps {
  children: ReactNode
  onContinue: () => void
  showButton?: boolean
  isAnimating?: boolean
}

export function ScreenLayout({
  children,
  onContinue,
  showButton = true,
  isAnimating = false,
}: ScreenLayoutProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-8">
      <div className="flex-1 flex items-center justify-center w-full max-w-md">
        <div className="w-full">{children}</div>
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md pb-8"
        >
          <Button
            onClick={onContinue}
            disabled={isAnimating}
            variant="ghost"
            className="w-full text-white/60 hover:text-white/90 border border-white/20 hover:border-white/40 transition-all"
          >
            continuar
          </Button>
        </motion.div>
      )}
    </div>
  )
}

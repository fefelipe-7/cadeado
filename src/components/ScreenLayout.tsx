import { motion } from 'motion/react'
import { ReactNode } from 'react'

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
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl">
        <div className="w-full">{children}</div>
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isAnimating ? 0.4 : 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md pb-12"
        >
          <motion.button
            onClick={onContinue}
            disabled={isAnimating}
            whileHover={{ scale: isAnimating ? 1 : 1.05 }}
            whileTap={{ scale: isAnimating ? 1 : 0.95 }}
            className="w-full px-6 py-3 text-sm font-light tracking-wide text-white/70 hover:text-white/90 border border-white/20 hover:border-white/50 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            continuar
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
